'use strict';

const Promise = require('bluebird');
const Producer = require('./Producer');
const HighLevelProducer = require('./HighLevelProducer');
const Consumer = require('./Consumer');
const KafkaClient = require('./KafkaClient');
const Client = require('./Client');


module.exports = KafkaWrap;

function KafkaWrap(config, logger) {
  if (!(this instanceof KafkaWrap)) {
    return new KafkaWrap(config, logger);
  }

  this.client = this.createClient(config);
  this.logger = logger;
  this.producer = this.createProducer();
  this.highLevelProducer = this.createHighLevelProducer();
}


const proto = KafkaWrap.prototype;

proto.createClient = function(config) {
  // create Client instance
  const clientOptions = config[config.enableClient];

  let kafkaClient = null;
  switch (config.enableClient) {
    case 'kafkaClient':
      kafkaClient = KafkaClient(clientOptions);
      break;
    case 'client':
      kafkaClient = Client(clientOptions);
      break;
    default:
      kafkaClient = KafkaClient(clientOptions);
  }
  return kafkaClient;
};

proto.createProducer = function(...args) {
  const client = this.client;
  const logger = this.logger;
  let producer = null;
  if (args.length === 1) {
    producer = Producer(client, args[0], logger);
  } else {
    producer = Producer(client, logger);
  }
  return Promise.promisifyAll(producer);
};

proto.createHighLevelProducer = function(...args) {
  const client = this.client;
  const logger = this.logger;
  let highLevelProducer = null;
  if (args.length === 1) {
    highLevelProducer = HighLevelProducer(client, args[0], logger);
  } else {
    highLevelProducer = HighLevelProducer(client, logger);
  }
  return Promise.promisifyAll(highLevelProducer);
};

proto.createConsumer = function(topics, options) {
  const client = this.client;
  return Promise.promisifyAll(Consumer(client, topics, options));
};
