'use strict';

// app/service/seckill.js
const Service = require('egg').Service;

class SeckillService extends Service {


  async buy(redis) {
    const app = this.app;
    const redisService = this.ctx.service.redis;
    const kafkaService = this.ctx.service.kafka;

    if (redis == null || redis === 'undefined') {
      redis = await app.redis.createInstanceAsync(app.config.redis.client);
    }
    const stock = await redisService.getStock(redis);
    if (stock <= 0) {
      return 'Non stock!';
    }
    const results = await redisService.updateStock(redis);
    if (results != null) {
      await kafkaService.publish();
      return results[0][1];
    }
    const res = await this.buy(redis);
    return res;
  }

  async get() {
    const redisService = this.ctx.service.redis;
    const mysqlService = this.ctx.service.mysql;
    const redisStock = await redisService.getStock();
    const mysqlStock = await mysqlService.getStock();

    return { redisStock, mysqlStock };
  }

}

module.exports = SeckillService;
