'use strict';

// some initialize

module.exports = app => {

  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    await ctx.service.kafka.subscribe();
    this.ctx = ctx;
  });

  app.beforeClose(async () => {
    await this.ctx.service.kafka.end();
  });
};
