'use strict';

const Producer = require('kafka-node').HighLevelProducer;
const Promise = require('bluebird');

const PrmiseProducer = function(...args) {
  const log = args[args.length - 1];
  delete args[args.length - 1];
  this.ProducerPrototype = new Producer(...args);
  this.producer = Promise.promisifyAll(this.ProducerPrototype);
  this.producer.on('ready', function() {
    log.info('connection kafka server success');
  });
  this.producer.on('error', function(err) {
    log.error(err);
  });
};

PrmiseProducer.prototype.instance = function() {
  return this.producer;
};

module.exports = function(...args) {
  return new PrmiseProducer(...args).instance();
};
