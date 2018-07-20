'use strict';

const kafkaNode = require('kafka-node');

/**
 * Kafka Client
 * @return {Object} kafka Client instance
 */
module.exports = function(...args) {
  return new kafkaNode.KafkaClient(...args);
};
