'use strict';

/**
 * egg-kafka-node default config
 * @member Config#kafkaNode
 * @property {String} SOME_KEY - some description
 */
exports.kafkaNode = {
  kafkaHost: '127.0.0.1:9092', // kafkaHost for kafka.KafkaClient
  // load into app, default is open
  app: true,
};
