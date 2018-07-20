'use strict';

/**
 * Producer
 *@class Producer(client, [options])
 *@argument client: client which keeps a connection with the Kafka server.
 *@argument options: options for producer,
 *@example   {
      // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3), default 0
    partitionerType: 2
   }
 */

const Consumer = require('kafka-node').Consumer;
const Promise = require('bluebird');

/**
  * @constructor
  * @param {Object} client : kafka connection instance,
  * @param {Object} topics : topics for consumer,
 * @param {Object} options : options for consumer,
  */
const PromiseConsumer = function(client, topics, options) {
  this.ConsumerPrototype = new Consumer(client, topics, options);
  this.consumer = Promise.promisifyAll(this.ConsumerPrototype);
};

/**
 * Consumer.instance
 *@method send
 *@return {Producer} ProducerAsync Instance
 */

PromiseConsumer.prototype.instance = function() {
  return this.consumer;
};

module.exports = function(...args) {
  return new PromiseConsumer(...args).instance();
};
