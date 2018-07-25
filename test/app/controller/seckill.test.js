'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/seckill.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', async () => {
    await app.httpRequest()
      .get('/')
      .expect(200);
  });

  it('should GET /seckill', async () => {
    await app.httpRequest()
      .get('/seckill')
      .expect(200);
  });

  it('should GET /seckill/init', async () => {
    await app.httpRequest()
      .get('/seckill/init')
      .expect('success')
      .expect(200);
  });

  it('should GET /seckill/buy', async () => {
    await app.httpRequest()
      .get('/seckill/buy')
      .expect('99')
      .expect(200);
  });

  it('should send multi GET /seckill/get', async () => {
    // first time get results, kafka message is not been consumed yet, so stock in mysqlis still 0
    await app.httpRequest()
      .get('/seckill/get')
      .expect('redisStock:99, mysqlStock:0')
      .expect(200);

    // set a timeout to get result again, wait kafka consumer receive message and update stock in mysql DB
    setTimeout(function() {
      const result = app.httpRequest()
        .get('/seckill/get')
        .expect(200);
      assert(result.test === 'redisStock:99, mysqlStock:1');
    }, 1000);
  });

});
