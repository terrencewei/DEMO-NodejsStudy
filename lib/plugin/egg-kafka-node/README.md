# egg-kafka-node

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-kafka-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-kafka-node
[travis-image]: https://img.shields.io/travis/eggjs/egg-kafka-node.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-kafka-node
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-kafka-node.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-kafka-node?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-kafka-node.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-kafka-node
[snyk-image]: https://snyk.io/test/npm/egg-kafka-node/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-kafka-node
[download-image]: https://img.shields.io/npm/dm/egg-kafka-node.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-kafka-node

<!--
Description here.
-->

## Install

```bash
$ npm i egg-kafka-node --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.kafkaNode = {
  enable: true,
  package: 'egg-kafka-node',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.kafkaNode = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
