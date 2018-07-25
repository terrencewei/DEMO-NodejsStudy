'use strict';

const mock = require('egg-mock');

describe('test/kafka-wrapper.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/kafka-wrapper-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, kafka')
      .expect(200);
  });
});
