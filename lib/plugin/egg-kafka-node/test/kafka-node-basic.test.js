'use strict';

const mock = require('egg-mock');

describe('test/kafka-node.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/kafka-node-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, kafkaNode')
      .expect(200);
  });
});
