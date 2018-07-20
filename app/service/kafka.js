'use strict';

// app/service/kafka.js
const Service = require('egg').Service;
// mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});
connection.connect();

class KafkaService extends Service {

  /**
   * subcrile topics
   * @return {Promise<none>} none
   */
  async subscribe() {
    const app = this.app;
    // create kafka consumer
    const topics = [
      { topic: 'CAR_NUMBER', partition: 0 },
    ];
    const options = {
      autoCommit: true,
    };

    const consumer = await app.kafka.createConsumer(topics, options);

    // kafka consumer subscribe message event
    consumer.on('message', function(message) {
      app.logger.info('[app] receive kafka message: %s, %s', message.topic, message.value);
      // mysql
      connection.query('INSERT INTO seckill set ?', { date: new Date() }, function(error, results, fields) {
        app.logger.info('[app] mysql results: %s', results.affectedRows === 1);
      });
    });

    app.logger.info('[app] kafka consumer is ready');

    this.consumer = consumer;
  }

  /**
   * publish topics
   * @return {Promise<none>} none
   */
  async publish() {
    const app = this.app;
    const topics = [
      {
        topic: 'CAR_NUMBER',
        messages: 'buy 1 car',
        partition: 0,
      },
    ];
    const producer = app.kafka.producer;
    await producer.sendAsync(topics);
  }

  /**
   * end consumer
   * @return {Promise<none>} none
   */
  async end() {
    const app = this.app;
    // close kafka consumer
    this.consumer.close(true, function(err) {
      app.logger.info('[app] kafka consumer is closed');
    });
  }
}

module.exports = KafkaService;
