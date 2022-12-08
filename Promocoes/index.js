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
app.use("/Promocoes",require('./Routes/routes'))
app.use('/', express.static(path.join(__dirname, 'static')))


app.get('/', (req, res) => {
    res.status(200).json({msg: "Projeto para a UC de Arquitetura de Integração de Sistemas"})
})



mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.grjgvsy.mongodb.net/?retryWrites=true&w=majority`
  ).then(() => {
  app.listen(8087)
  console.log("Accessed BD")
  }).catch((err) => console.log(err))