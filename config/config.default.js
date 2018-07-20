'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883373332_1104';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      // password: 'auth',
      password: null,
      db: 0,
    },
  };

  config.kafka = {
    client: {
      enableClient: 'kafkaClient',
      kafkaClient: {
        kafkaHost: '127.0.0.1:9092',
      },
    },
  };

  return config;
};
