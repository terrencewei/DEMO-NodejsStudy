// initialize kafka consumer. watch 'CAR_NUMBER' topic
var kafka = require('kafka-node')

var Consumer = kafka.Consumer

var client = new kafka.Client()

var consumer = new Consumer(
  client,
  [
    {topic: 'CAR_NUMBER', partition: 0}
  ],
  {
    autoCommit: true
  }
)
// mysql connection
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mysql'
})

connection.connect()

// kafka consumer watch message event
consumer.on('message', function (message) {
  connection.query('INSERT INTO seckill set ?', {date: new Date()}, function (error, results, fields) {
    if (error) {
      console.error(error)
    }
    console.log('MySql execute results:')
    console.log(results)
    console.log('*********************')
  })
})
