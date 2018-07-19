// app/service/seckill.js
const Service = require('egg').Service

class SeckillService extends Service {
  async buy () {
    const res = await this.consumeStockInRedis()
    return res
  }

  async consumeStockInRedis (redis) {
    if (redis == null || redis === 'undefined') {
      const app = this.app
      redis = await app.redis.createInstanceAsync(app.config.redis.client)
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
        const res = await this.app.kafkaNodeBasic.sendAsync()
        console.log(res)
        return results[0][1]
      } else {
        const res = await this.consumeStockInRedis(redis)
        return res
      }
    }
  }
}

module.exports = SeckillService
