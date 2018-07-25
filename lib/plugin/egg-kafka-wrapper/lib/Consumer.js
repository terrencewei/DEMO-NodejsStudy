'use strict';

const Consumer = require('kafka-node').Consumer;
const Promise = require('bluebird');

const PromiseConsumer = function(client, topics, options) {
  this.ConsumerPrototype = new Consumer(client, topics, options);
  this.consumer = Promise.promisifyAll(this.ConsumerPrototype);
};

PromiseConsumer.prototype.instance = function() {
  return this.consumer;
};

module.exports = function(...args) {
  return new PromiseConsumer(...args).instance();
};
