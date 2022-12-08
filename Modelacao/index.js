const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const port = 8085

app.use('/mapa', require('./route/mapaRoute'))
app.use('/modelo', require('./route/modeloRoute'))

//Mongoose Connection
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ah7ygcg.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
    app.listen(port)
    console.log("Accessed BD")
}).catch((err) => console.log(err))