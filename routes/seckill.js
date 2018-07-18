// import objects of MVC framework of nodejs:
// express, kafka, redis, etc.
var express = require('express');
var router = express.Router();
var redis = require('redis');
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var kafkaClient = new kafka.Client();
var producer = new Producer(kafkaClient);
var methodInvokeCount = 0;

// using router of express, to expose an endpoint '/seckill'
router.post('/seckill', function (request, response) {
    console.log('methodInvokeCount=' + methodInvokeCount++);
    // redis processer
    var consumeStock = function (optionalClient) {
        if (optionalClient == 'undefined' || optionalClient == null) {
            var client = redis.createClient();
        } else {
            var client = optionalClient;
        }
        // error event
        client.on('error', function (er) {
            console.error("Error occurs:");
            console.error(er.stack);
            client.end(true);
        });
        // watch counter, if other transaction modified the counter, then abort current transaction
        client.watch("counter");
        // get counter in async
        client.get("counter", function (err, reply) {
            // if reply is more than 0, means has stock
            if (parseInt(reply) > 0) {
                // create a transaction to decrease stock
                var counterTransaction = client.multi();
                // counter--
                counterTransaction.decr("counter");
                // call back function
                counterTransaction.exec(function (err, replies) {
                    if (replies == null) {
                        // means other transaction has modified the counter during current transaction commit
                        console.log('should have conflict');
                        console.log("*********************");
                        // retry to decrease stock
                        consumeStock(client);
                    } else {
                        // means no conflict, counter has been decreased
                        // then produce a message via kafka to real decrease the stock in mysql DB
                        var payload = [
                            {
                                topic: 'CAR_NUMBER',
                                messages: 'buy 1 car',
                                partition: 0
                            }
                        ];
                        producer.send(payload, function (err, data) {
                            console.log("Producer send topic:");
                            console.log(data);
                            console.log("*********************");
                        });
                        response.send(replies);
                        client.end(true);
                    }
                });
            } else {
                // non stock
                console.log("Non stock!");
                console.log("*********************");
                response.send("sold out!");
                // close client
                client.end(true);
            }
        })
    };
    // call function
    consumeStock();
});

module.exports = router;