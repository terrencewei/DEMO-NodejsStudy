'use strict';

// app/service/redis.js
const Service = require('egg').Service;

class RedisService extends Service {

  /**
   * Initialize stock in redis
   * @return {Promise<void>} none
   */
  async initStock() {
    const app = this.app;
    const config = app.config.service.redis;
    const redis = app.redis;
    const key = config.stock.key;
    const total = config.stock.total;

    const result = await redis.set(key, total);
    app.logger.info('[app/service/redis/initStock] init stock: %s', result);
  }

  /**
   * Get stock in redis
   * @param {object} redis egg-redis
   * @return {Promise<*>} stock
   */
  async getStock(redis) {
    const app = this.app;
    const key = app.config.service.redis.stock.key;

    if (redis) {
      redis.watch(key);
    } else {
      redis = app.redis;
    }
    const stock = await redis.get(key);
    app.logger.info('[app/service/redis/getStock] get stock: %s', stock);
    return stock;
  }

  /**
   * Update stock in redis
   * @param {object} redis egg-redis
   * @return {Promise<*>} stock
   */
  async updateStock(redis) {
    const app = this.app;
    const key = app.config.service.redis.stock.key;

    const result = await redis.multi().decr(key).exec();
    app.logger.info('[app/service/redis/updateStock] update stock: %s', result);
    return result;
  }


}

module.exports = RedisService;
