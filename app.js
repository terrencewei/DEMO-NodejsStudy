'use strict';

// some initialize

module.exports = app => {

  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    const kafkaService = ctx.service.kafka;

    await kafkaService.subscribe();

    this.kafkaService = kafkaService;
  });

  app.beforeClose(async () => {
    await this.kafkaService.end();
  });
};
