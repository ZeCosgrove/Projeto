const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const swaggerAutogen = require('swagger-autogen')()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// load environment vars
require('dotenv').config();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


// app
const app = express()
app.use(bodyParser.json())
app.use("/",require('./routes/routes.js'))
app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Documentation
const outputFile = './swagger_output.json'
const endpointsFiles = ['./Routes/routes.js']

swaggerAutogen(outputFile, endpointsFiles)


mongoose.connect(  
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nl4ehnf.mongodb.net/?retryWrites=true&w=majority`
  ).then(() => {
  app.listen(8086)
  console.log("Accessed BD")
  }).catch((err) => console.log(err))