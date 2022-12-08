const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const Logs = require('./LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")
var amqp = require('amqplib/callback_api');
const queue = 'tasks'

// Constants
const PORT = 8082

//load vars
require('dotenv').config();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// App
const app = express()
//app.use(bodyParser.json())
//app.use("/logs",require('./routes/loggerRoutes.js'))
//app.use('/', express.static(path.join(__dirname, 'static')))
async function LogRegisto(message) {
  const {Level, Action, Description, User} = message
  const LogMoment = Date.now()

  const LogCreated = await Logs.create({
      Level,
      Action,
      Description,
      User,
      LogMoment
  })
}

amqp.connect(`amqp://${process.env.LOGS_URI}`, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function(msg) {
            console.log(JSON.parse(msg.content));
            LogRegisto(JSON.parse(msg.content))
        }, {
            noAck: true
        });
    });
});


mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.grjgvsy.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
app.listen(PORT)
console.log("Accessed BD")
}).catch((err) => console.log(err))