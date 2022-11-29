const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const Logs = require('./LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")
const amqplib = require('amqplib/callback_api')
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

  console.log(LogCreated)
}


amqplib.connect('amqp://localhost', (err, conn) => {
if (err) throw err

// Listener
conn.createChannel((err, ch2) => {
  if (err) throw err

  ch2.assertQueue(queue);

  ch2.consume(queue, (msg) => {
    if (msg !== null) {
      console.log(msg.content.toString());
      LogRegisto(msg.content)
      ch2.ack(msg);
    } else {
      console.log('Consumer cancelled by server')
    }
  })
})
});


mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.grjgvsy.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
app.listen(PORT)
console.log("Accessed BD")
}).catch((err) => console.log(err))