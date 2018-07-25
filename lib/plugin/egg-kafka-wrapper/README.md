# egg-kafka-wrapper

## Description
Kafka plugin for [eggjs](https://eggjs.org/)

Just a wrapper of [kafka-node](https://github.com/SOHU-Co/kafka-node), and fork from [egg-kafka](https://github.com/ntfs32/egg-kafka)

## Install
So far, this plugin is not publish to npm yet, user need to download the source code from git, then:
```bash
$ cp egg-kafka-wrapper {app_root}/lib/plugin/egg-kafka-wrapper
```

`app_root` presents your egg project code dir

## Usage

```js
// {app_root}/config/plugin.js
exports.kafkaWrapper = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-kafka-wrapper'),
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.kafka = {
  client: {
    enableClient: 'kafkaClient',
    kafkaClient: {
      kafkaHost: '127.0.0.1:9092',
    },
  },
};
```

see [config/config.default.js](https://github.com/terrencewei/egg-kafka-wrapper/blob/master/config/config.default.js) for more detail.

## Example
### Producer

```js
async publish() {
  const producer = this.kafka.producer;
  
  const topics = [
    {
      topic: 'CAR_NUMBER',
      messages: 'buy 1 car',
      partition: 0,
    },
  ]
  
  await producer.sendAsync(topics);
}
````

### Consumer

```js
async subscribe() {
  const app = this.app;
  
  const topics = [
    { topic: 'CAR_NUMBER', partition: 0 },
  ]
  
  const options = {
    autoCommit: true,
  }
  
  const consumer = await app.kafka.createConsumer(topics, options);
  
  consumer.on('message', function(message) {
    // handle message
  });
}

```

### More
see [kafka-node](https://github.com/SOHU-Co/kafka-node/blob/master/README.md) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/terrencewei/egg-kafka-wrapper/issues).

## License

[MIT](LICENSE)
