'use strict';

// initialize kafka consumer. watch 'CAR_NUMBER' topic
const kafka = require('kafka-node');

const Consumer = kafka.Consumer;

const client = new kafka.Client();

const consumer = new Consumer(
  client,
  [
    { topic: 'CAR_NUMBER', partition: 0 },
  ],
  {
    autoCommit: true,
  }
);
// mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});

connection.connect();

// kafka consumer watch message event
consumer.on('message', function(message) {
  connection.query('INSERT INTO seckill set ?', { date: new Date() }, function(error, results, fields) {
    if (error) {
      console.error(error);
    }
    console.log('MySql execute results:');
    console.log(results);
    console.log('*********************');
  });
});
