'use strict';

const assert = require('assert');
const KafkaWrap = require('./KafkaWrap');

module.exports = app => {
  app.addSingleton('kafka', createOneClient);
};

function createOneClient(config, app) {

  assert(config.enableClient,
    `[egg-kafka-wrapper] 'enableClient: ${config.enableClient}'is required on config`);

  const clientOptions = config[config.enableClient];
  assert(clientOptions,
    `[egg-kafka-wrapper] 'enableClient: ${config.enableClient}' is not found on config`);

  app.logger.info('[egg-kafka-wrapper] kafkaClient options: %s', clientOptions);

  const kafka = KafkaWrap(config, app.logger);
  return kafka;
}
