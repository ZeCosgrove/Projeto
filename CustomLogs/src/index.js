const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

// Constants
const PORT = 8082
const BD_URL = 'mongodb://localhost:27017/CustomLogs'

//load vars
require('dotenv').config();

// initialize bd
mongoose.Promise = global.Promise
mongoose.connect(BD_URL)
  .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error on Connect to MongoDB: ', err))

// App
const app = express()
app.use(bodyParser.json())
app.use("/logs",require('../routes/loggerRoutes'))
app.use('/', express.static(path.join(__dirname, 'static')))


app.listen(PORT, () => {
  console.log('Running on Port: ', PORT)
})