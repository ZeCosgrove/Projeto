require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
var amqp = require('amqplib/callback_api');

//Demo Variables
const tokenValidation = 60 * 60 * 6  //seconds
const rateLimitTimer = 30 //seconds
const rateLimiter = 10 //attempts

//IP Rate Limiter
const limiter = rateLimit({
    windowMs: 1000 * rateLimitTimer,
    max: rateLimiter
})

//App
const app = express()

//Configs
app.use(express.json())
app.use(limiter)

//Models
const User = require("./model/user")
const Auth = require("./model/auth")

//Routes
app.get('/', (req, res) => {
    res.status(200).json({msg: "Projeto para a UC de Sistemas de Computação na Cloud"})
})

app.post('/auth/register', async(req, res) => {
    const {email, nome, nif, username, password, dubPassword} = req.body
    if (!email){
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: 'Email necessário', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Email necessário"})
    }
    else if (!username){
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: 'Username necessário', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Username necessário"})
    }
    else if (!password){
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: 'Password necessária', User: null }
        SendToLog(dataToLog)
        
        return res.status(422).json({msg: "Password necessária"})
    }
    else if (dubPassword != password){
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: 'Passwords não condizem', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Passwords não condizem"})
    }
    else if (!nome){
        //generate random name
    }

    const userExists = await Auth.findOne({username: username})
    console.log(userExists)

    if (userExists){
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: 'Username já existe', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Username já existe"})
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    
    const auth = new Auth({
        username,
        password: hash
    })

    let generatedId
    try {
        generatedId = await auth.save()
    } catch (err) {
        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: err, User: null }
        SendToLog(dataToLog)

        res.status(500).json({msg: err})
    }

    const user = new User({
        _id: generatedId,
        email,
        nome,
        nif,
        role: 1
    })

    try {
        await user.save()

        dataToLog = {
            Level: 'Info', Action: `/auth/register`,
            Description: req.body, User: null }
        SendToLog(dataToLog)

        res.status(200).json(req.body)
    } catch (err) {

        dataToLog = {
            Level: 'Error', Action: `/auth/register`,
            Description: err, User: null }
        SendToLog(dataToLog)

        res.status(500).json({msg: err})
    }
})


app.post('/auth/login', async(req, res) => {
    const {username, password} = req.body

    if(!username){
        dataToLog = {
            Level: 'Error', Action: `/auth/login`,
            Description: 'Username necessário', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Username necessário"})
    }
    else if(!password){
        dataToLog = {
            Level: 'Error', Action: `/auth/login`,
            Description: 'Password necessária', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Password necessária"})
    }

    const auth = await Auth.findOne({username: username})

    if (!auth){
        dataToLog = {
            Level: 'Error', Action: `/auth/login`,
            Description: 'Username não encontrado', User: null }
        SendToLog(dataToLog)

        return res.status(404).json({msg: "Username não encontrado"})
    }

    const checkPassword = await bcrypt.compare(password, auth.password)
    if(!checkPassword){
        dataToLog = {
            Level: 'Error', Action: `/auth/login`,
            Description: 'Password inválida', User: null }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Password inválida"})
    } 

    const user = await User.findOne({_id: auth._id})

    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: auth._id,
            role: user.role
        }, secret, {
            expiresIn: tokenValidation
        })

        dataToLog = {
            Level: 'Info', Action: `/auth/login`,
            Description: token, User: null }
        SendToLog(dataToLog)

        res.status(200).json({token})

    } catch (err) {
        dataToLog = {
            Level: 'Error', Action: `/auth/login`,
            Description: err, User: null }
        SendToLog(dataToLog)

        res.status(500).json({msg: err})
    }
})


app.post('/auth/password', checkToken, async(req, res) => {
    const {password, newPassword} = req.body

    if(!password){
        dataToLog = {
            Level: 'Error', Action: `/auth/password`,
            Description: 'Password necessária', User: await getIdFromToken(req) }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Password necessária"})
    }
    else if(!newPassword){
        dataToLog = {
            Level: 'Error', Action: `/auth/password`,
            Description: 'Nova password necessária', User: await getIdFromToken(req) }
        SendToLog(dataToLog)
        return res.status(422).json({msg: "Nova password necessária"})
    }

    const auth = await Auth.findOne({_id: await getIdFromToken(req)})

    if (!auth){
        dataToLog = {
            Level: 'Error', Action: `/auth/password`,
            Description: 'Autenticação necessária', User: await getIdFromToken(req) }
        SendToLog(dataToLog)
        return res.status(404).json({msg: "Autenticação necessária"})
    }

    const checkPassword = await bcrypt.compare(password, auth.password)
    if(!checkPassword){
        dataToLog = {
            Level: 'Error', Action: `/auth/password`,
            Description: 'Password inválida', User: await getIdFromToken(req) }
        SendToLog(dataToLog)
        return res.status(422).json({msg: "Password inválida"})
    } 

    try{
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newPassword, salt)

        const updatedUser = await Auth.findOneAndUpdate({username: auth.username}, {password: hash})
        
        dataToLog = {
            Level: 'Info', Action: `/auth/password`,
            Description: updatedUser, User: await getIdFromToken(req) }
        SendToLog(dataToLog)

        res.status(200).json({updatedUser})

    } catch (err) {
        
        dataToLog = {
            Level: 'Error', Action: `/auth/password`,
            Description: err, User: await getIdFromToken(req) }
        SendToLog(dataToLog)

        res.status(500).json({msg: err})
    }
})

app.get('/user/:id', checkToken, async(req, res) => {
    const id = req.params.id
    let dataToLog

    const user = await User.findById(id, '-_id')

    if(!user){
        dataToLog = {
            Level: 'Error', Action: `/user/${id}`,
            Description: user, User: await getIdFromToken(req) }
        SendToLog(dataToLog)

        return res.status(422).json({msg: "Utilizador não encontrado"})
    }

    dataToLog = {
        Level: 'Info', Action: `/user/${id}`,
        Description: user, User: await getIdFromToken(req) }
    SendToLog(dataToLog)

    res.status(200).json(user)
})

//Middleware
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({msg: "Token inválida"})
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (err) {
        res.status(400).json(err)
    }
}

const queue = 'tasks';
function SendToLog(message){
    amqp.connect(`amqp://${process.env.LOGS_URI}`, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'hello';
            var msg = 'Hello world';

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message).toString()));
        });

        setTimeout(function() {
            connection.close();
        }, 500);
    });
}

//Utils
async function getIdFromToken(req){
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);
    return tokenData.id;
}

//Mongoose Connection
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hhyizyw.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
    app.listen(8081)
    console.log("Accessed BD")
}).catch((err) => console.log(err))

