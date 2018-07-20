'use strict';

// app/controller/news.js
const Controller = require('egg').Controller;

class SeckillController extends Controller {
  async buy() {
    const ctx = this.ctx;
    const result = await ctx.service.seckill.buy();
    await ctx.render('seckill/result.tpl', { res: result });
  }
}

module.exports = SeckillController;
