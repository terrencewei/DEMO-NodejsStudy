'use strict';

/**
 * egg-kafka-node-basic default config
 * @member Config#kafkaNodeBasic
 * @property {String} SOME_KEY - some description
 */
exports.kafkaNodeBasic = {
  kafkaHost: '127.0.0.1:9092', // kafkaHost for kafka.KafkaClient
  producer: {
    topics: [// producer send topics payloads
      {
        topic: 'topic name', // topic name
        messages: 'topic message', // topic message
        partition: 0, // topic partition
      },
    ],
  },
  // load into app, default is open
  app: true,
};
