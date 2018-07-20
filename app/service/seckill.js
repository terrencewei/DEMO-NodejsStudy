'use strict';

// app/service/seckill.js
const Service = require('egg').Service;

class SeckillService extends Service {

  async buy() {
    const res = await this.consumeStockInRedis();
    return res;
  }

  async consumeStockInRedis(redis) {
    const app = this.app;
    if (redis == null || redis === 'undefined') {
      redis = await app.redis.createInstanceAsync(app.config.redis.client);
    }
    redis.watch('counter');
    const stock = await redis.get('counter');
    if (stock <= 0) {
      return 'Non stock!';
    }
    const results = await redis.multi().decr('counter').exec();
    if (results != null) {
      // means no conflict, counter has been decreased
      // const topics = [
      //   {
      //     topic: 'CAR_NUMBER',
      //     messages: 'buy 1 car',
      //     partition: 0,
      //   },
      // ];
      // const producer = app.kafka.producer;
      // await producer.sendAsync(topics);
      await this.ctx.service.kafka.publish();
      return results[0][1];
    }
    const res = await this.consumeStockInRedis(redis);
    return res;


  }
}

module.exports = SeckillService;
