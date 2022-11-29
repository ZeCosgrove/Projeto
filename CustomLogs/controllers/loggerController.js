const Logs = require('../LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")

exports.LogRegistInfo = async (req, res) => {
    const {Level, Action, Description, User} = req.body

    if (!Level || !Action || !Description || !User) {
        res.json({status: 'Log Regist Info Error', error: 'Level or Type or Action or User cant be null'})
    }
    const LogMoment = Date.now()
    const response = await Logs.create({
        Level,
        Action,
        Description,
        User,
        LogMoment
    })

    res.json({status: response})
}

async function LogRegisto(message) {
    const {Level, Action, Description, User} = message

    if (!Level || !Action || !Description || !User) {
        res.json({status: 'Log Regist Info Error', error: 'Level or Type or Action or User cant be null'})
    }
    const LogMoment = Date.now()
    const LogCreated = await Logs.create({
        Level,
        Action,
        Description,
        User,
        LogMoment
    })
}

const amqplib = require('amqplib/callback_api')
const queue = 'tasks'

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

