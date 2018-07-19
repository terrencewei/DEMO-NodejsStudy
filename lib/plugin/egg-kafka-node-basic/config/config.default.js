'use strict';

/**
 * egg-kafka-node-basic default config
 * @member Config#kafkaNodeBasic
 * @property {String} SOME_KEY - some description
 */
exports.kafkaNodeBasic = {
  kafkaHost: '127.0.0.1:9092', // kafkaHost for kafka.KafkaClient
  producer: {
    payloads: [// producer send payloads
      {
        topic: 'topic name', // topic name
        messages: 'topic message', // topic message
        partition: 0, // partition
      },
    ],
  },
  app: true,
};
