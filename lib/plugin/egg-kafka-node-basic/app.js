'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const kafka = require('kafka-node');

module.exports = app => {

  class KafkaNodeBasic {

    constructor() {
      const config = app.config.kafkaNodeBasic;

      assert(config.kafkaHost, `[egg-kafka-node-basic] 'kafkaHost: ${config.kafkaHost} are required on config`);

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

    async sendAsync(msg) {
      if (!msg) {
        assert(this.config && this.config.producer && this.config.producer.payloads,
          `[egg-kafka-node-basic] 'config.producer.payloads: ${this.config} are required `);
        msg = this.config.producer.payloads;
      }
      const res = await this.producer.sendAsync(msg);
      return res;
    }
  }

  if (app.config.kafkaNodeBasic.app) {
    app.kafkaNodeBasic = new KafkaNodeBasic();
  }
};
