'use strict';

const kafkaNode = require('kafka-node');

module.exports = function(...args) {
  return new kafkaNode.Client(...args);
};
