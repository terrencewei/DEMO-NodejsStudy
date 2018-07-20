'use strict';

// app/controller/seckill.js
const Controller = require('egg').Controller;

class SeckillController extends Controller {

  async index() {
    const ctx = this.ctx;
    const result = await ctx.service.seckill.get();

    await ctx.render('seckill/index.tpl', { res: result });
  }

  async init() {
    const ctx = this.ctx;
    await ctx.service.mysql.initStock();
    await ctx.service.redis.initStock();
    await ctx.render('seckill/result.tpl', { res: 'success' });
  }

  async buy() {
    const ctx = this.ctx;
    const result = await ctx.service.seckill.buy();
    await ctx.render('seckill/result.tpl', { res: result });
  }

  async get() {
    const ctx = this.ctx;
    const result = await ctx.service.seckill.get();
    await ctx.render('seckill/result.tpl', { res: result });
  }


}

module.exports = SeckillController;
