'use strict';

// app/service/kafka.js
const Service = require('egg').Service;

class KafkaService extends Service {

  /**
   * subcrile topics
   * @return {Promise<none>} none
   */
  async subscribe() {
    const app = this.app;
    const config = app.config.service.kafka.consumer;
    const consumer = await app.kafka.createConsumer(config.topics, config.options);
    const mysqlService = this.ctx.service.mysql;

    // kafka consumer subscribe message event
    consumer.on('message', function(message) {
      app.logger.info('[app/service/kafka/subscribe] receive kafka message: %s, %s', message.topic, message.value);
      mysqlService.updateStock();
    });

    app.logger.info('[app/service/kafka/subscribe] kafka consumer is ready');

    this.consumer = consumer;
  }

  /**
   * publish topics
   * @return {Promise<none>} none
   */
  async publish() {
    const app = this.app;
    const config = app.config.service.kafka.producer;
    const producer = app.kafka.producer;
    await producer.sendAsync(config.topics);
  }

  /**
   * end consumer
   * @return {Promise<none>} none
   */
  async end() {
    const app = this.app;
    // close kafka consumer
    this.consumer.close(true, function(err) {
      app.logger.info('[app/service/kafka/end] kafka consumer is closed');
    });
  }
}

module.exports = KafkaService;
