const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

// load environment vars
require('dotenv').config();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


// app
const app = express()
app.use(bodyParser.json())
app.use("/",require('./routes/routes.js'))
app.use('/', express.static(path.join(__dirname, 'static')))


mongoose.connect(  
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nl4ehnf.mongodb.net/?retryWrites=true&w=majority`
  ).then(() => {
  app.listen(8086)
  console.log("Accessed BD")
  }).catch((err) => console.log(err))