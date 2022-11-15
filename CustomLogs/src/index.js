const express = require('express')
const morgan = require('morgan')
const winston = require('winston')

// Constants
const PORT = 8082
const HOST = '0.0.0.0'

let logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'app.log'})
  ], 
  exitOnError: false,
  level: 'info'
})

const myStream = {
  write: (text) => {
    logger.info(text)
  }
}


// App
const app = express()
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(morgan('combined', {stream: myStream}))
//app.use(morgan('tiny'))

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})