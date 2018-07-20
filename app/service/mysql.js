'use strict';

// app/service/mysql.js
const Service = require('egg').Service;

class MySqlService extends Service {

  /**
   * Initialize stock in database
   * @return {Promise<void>} none
   */
  async initStock() {
    const app = this.app;
    const config = app.config.service.mysql;
    const mysql = app.mysql;
    const table = config.stock.table;

    const result = await mysql.delete(table);
    app.logger.info('[app/service/mysql/initStock] init stock: %s', result.affectedRows);
  }

  /**
   * Update stock in database
   * @return {Promise<void>} none
   */
  async updateStock() {
    const app = this.app;
    const config = app.config.service.mysql;
    const mysql = app.mysql;
    const table = config.stock.table;

    const result = await mysql.insert(table, { date: new Date() });
    const insertSuccess = result.affectedRows === 1;
    app.logger.info('[app/service/mysql/updateStock] update stock: %s', insertSuccess);
  }

  /**
   * Get stock in database
   * @return {Promise<void>} none
   */
  async getStock() {
    const app = this.app;
    const config = app.config.service.mysql;
    const mysql = app.mysql;
    const table = config.stock.table;

    const result = await mysql.count(table);
    app.logger.info('[app/service/mysql/getStock] get stock: %s', result);
    return result;
  }
}

module.exports = MySqlService;
