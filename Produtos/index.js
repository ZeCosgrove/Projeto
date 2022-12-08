const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

// load environment vars
require('dotenv').config();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const Port = process.env.PORTPRODUTO

// app
const app = express()
app.use(bodyParser.json())
app.use("/Produtos",require('./routes/routes.js'))
app.use('/', express.static(path.join(__dirname, 'static')))


mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8704wbn.mongodb.net/?retryWrites=true&w=majority`
  ).then(() => {
  app.listen(Port)
  console.log("Accessed BD")
  }).catch((err) => console.log(err))