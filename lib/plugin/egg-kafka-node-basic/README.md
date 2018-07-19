# egg-kafka-node-basic

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-kafka-node-basic.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-kafka-node-basic
[travis-image]: https://img.shields.io/travis/eggjs/egg-kafka-node-basic.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-kafka-node-basic
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-kafka-node-basic.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-kafka-node-basic?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-kafka-node-basic.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-kafka-node-basic
[snyk-image]: https://snyk.io/test/npm/egg-kafka-node-basic/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-kafka-node-basic
[download-image]: https://img.shields.io/npm/dm/egg-kafka-node-basic.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-kafka-node-basic

<!--
Description here.
-->

## Install

```bash
$ npm i egg-kafka-node-basic --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.kafkaNodeBasic = {
  enable: true,
  package: 'egg-kafka-node-basic',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.kafkaNodeBasic = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
