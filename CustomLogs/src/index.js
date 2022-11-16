const express = require('express')
const loggerSS = require('./logger_SS')

// Constants
const PORT = 8082
const HOST = '0.0.0.0'

// App
const app = express()
app.get('/', (req, res) => {
  loggerSS.debug("This is The / route.")
  res.status(200).send('Hello World!')
})

app.get('/errors', (req, res, next) => {
  try {
    throw new Error("ERROR!!")
  } catch (error) {
    loggerSS.error('Whoops! This broke something: ', error)
    res.status(500).send('Error!')
  }
})

app.listen(PORT, HOST, () => {
  loggerSS.info(`Running on http://${HOST}:${PORT}`)
})