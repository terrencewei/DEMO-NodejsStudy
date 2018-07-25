'use strict';

/**
 * egg-kafka-wrapper default config
 * @member Config#kafka
 * @property {String} SOME_KEY - some description
 */
exports.kafka = {
  client: {// this 'client' key is used for egg-plugin framework! refer: https://eggjs.org/en/advanced/plugin.html#best-practice-of-global-instance-plugin
    enableClient: 'kafkaClient', // enabled client type, MUST be one of 'kafkaClient' or legacy 'client'
    kafkaClient: {// refer to https://github.com/SOHU-Co/kafka-node#kafkaclient
      kafkaHost: 'localhost:9092',
      connectTimeout: 10000,
      requestTimeout: 30000,
      idleConnection: 5 * 60 * 1000,
      autoConnect: true,
      versions: {
        disabled: false,
        requestTimeout: 500,
      },
      connectRetryOptions: {
        retries: 5,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: 60 * 1000,
        randomize: true,
      },
      maxAsyncRequests: 10,
      noAckBatchOptions: null,
    },
    client: {// refer to https://github.com/SOHU-Co/kafka-node#client
      connectionString: 'localhost:2181',
      clientId: 'kafka-node-client',
      zkOptions: {},
      noAckBatchOptions: {
        noAckBatchSize: null,
        noAckBatchAge: null,
      },
      sslOptions: {},
    },
  },
  app: true,
};
