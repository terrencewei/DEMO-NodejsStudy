// app/service/seckill.js
const Service = require('egg').Service
// redis
const Redis = require('ioredis')
// kafka-node
const kafka = require('kafka-node')
const producer = new kafka.Producer(new kafka.Client('localhost:2181'))

class SeckillService extends Service {
  async buy () {
    const res = await this.processRedis()
    return res
  }

  async processRedis (redis) {
    if (redis == null || redis === 'undefined') {
      redis = new Redis()
    }
    redis.watch('counter')
    const stock = await redis.get('counter')
    if (stock <= 0) {
      return 'Non stock!'
    } else {
      const results = await redis.multi().decr('counter').exec()
      if (results != null) {
        // means no conflict, counter has been decreased
        // then produce a message via kafka to real decrease the stock in mysql DB
        this.sendKafka()
        return results
      } else {
        const res = await this.processRedis(redis)
        return res
      }
    }
  }

  sendKafka () {
    var payload = [
      {
        topic: 'CAR_NUMBER',
        messages: 'buy 1 car',
        partition: 0
      }
    ]

    producer.send(payload, function (err, data) {
      if (err != null) {
        console.log('Error occurs:')
        console.log(err)
        throw err
      }
      console.log(data)
    })
  }
}

module.exports = SeckillService
