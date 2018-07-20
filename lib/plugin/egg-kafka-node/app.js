'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const kafka = require('kafka-node');

module.exports = app => {

  class KafkaNodeBasic {

    constructor() {
      const config = app.config.kafkaNode;

      assert(config.kafkaHost, `[egg-kafka-node] 'kafkaHost: ${config.kafkaHost} are required on config`);

      const kafkaClient = new kafka.KafkaClient({kafkaHost: config.kafkaHost});
      const ProducerPrototype = new kafka.Producer(kafkaClient);
      const producer = Promise.promisifyAll(ProducerPrototype);


      function errorHandler(err) {
        app.coreLogger.error(err);
      }

      producer.onAsync('error', errorHandler);

      this.config = config;
      this.client = kafkaClient;
      this.producer = producer;
    }

    async sendAsync(topics) {
      const res = await this.producer.sendAsync(topics);
      return res;
    }
  }

  if (app.config.kafkaNode.app) {
    app.kafkaNode = new KafkaNodeBasic();
  }
};
