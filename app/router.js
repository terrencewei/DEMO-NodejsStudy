// app/router.js
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/news', controller.news.list)
  router.get('/seckill', controller.seckill.buy)
}
