const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

// Constants
const PORT = 8082

//load vars
require('dotenv').config();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// App
const app = express()
app.use(bodyParser.json())
app.use("/logs",require('../routes/loggerRoutes'))
app.use('/', express.static(path.join(__dirname, 'static')))


mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.grjgvsy.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
app.listen(PORT)
console.log("Accessed BD")
}).catch((err) => console.log(err))