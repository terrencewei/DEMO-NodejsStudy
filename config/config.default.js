'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531883373332_1104';

  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  /**
   * Plugin config: redis
   * @type {{client: {port: number, host: string, password: null, db: number}}}
   */
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: null,
      db: 0,
    },
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'test',
    },
  };

  /**
   * Plugin config: kafkaWrapper
   * @type {{client: {enableClient: string, kafkaClient: {kafkaHost: string}}}}
   */
  config.kafka = {
    client: {
      enableClient: 'kafkaClient',
      kafkaClient: {
        kafkaHost: '127.0.0.1:9092',
      },
    },
  };

  /**
   * Application service config
   * @type {{client: {enableClient: string, kafkaClient: {kafkaHost: string}}}}
   */
  config.service = {
    redis: {
      stock: {
        key: 'counter',
        total: 100,
      },
    },
    mysql: {
      stock: {
        table: 'seckill',
      },
    },
    kafka: {
      producer: {
        topics: [
          {
            topic: 'CAR_NUMBER',
            messages: 'buy 1 car',
            partition: 0,
          },
        ],
      },
      consumer: {
        topics: [
          { topic: 'CAR_NUMBER', partition: 0 },
        ],
        options: {
          autoCommit: true,
        },
      },
    },
  };

  return config;
};
