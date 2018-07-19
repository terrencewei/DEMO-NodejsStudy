'use strict'

const path = require('path')

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.kafkaNodeBasic = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-kafka-node-basic')
}
