'use strict';

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/seckill', controller.seckill.buy);
};
