'use strict';

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.seckill.index);
  router.get('/seckill', controller.seckill.index);
  router.get('/seckill/init', controller.seckill.init);
  router.get('/seckill/buy', controller.seckill.buy);
  router.get('/seckill/get', controller.seckill.get);
};
