require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const amqplib = require('amqplib/callback_api');

//Demo Variables
const tokenValidation = 60 * 10 //seconds
const rateLimitTimer = 60 //seconds
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
        return res.status(422).json({msg: "Email necessário"})
    }
    else if (!username){
        return res.status(422).json({msg: "Username necessário"})
    }
    else if (!password){
        return res.status(422).json({msg: "Password necessária"})
    }
    else if (dubPassword != password){
        return res.status(422).json({msg: "Passwords não condizem"})
    }
    else if (!nome){
        //generate random name
    }

    const userExists = await User.findOne({username: username})

    if (userExists){
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
        res.status(200).json(req.body)
    } catch (err) {
        res.status(500).json({msg: err})
    }
})


app.post('/auth/login', async(req, res) => {
    const {username, password} = req.body

    if(!username){
        return res.status(422).json({msg: "Username necessário"})
    }
    else if(!password){
        return res.status(422).json({msg: "Password necessária"})
    }

    const auth = await Auth.findOne({username: username})

    if (!auth){
        return res.status(404).json({msg: "Username não encontrado"})
    }

    const checkPassword = await bcrypt.compare(password, auth.password)
    if(!checkPassword){
        return res.status(422).json({msg: "Password inválida"})
    } 

    try{
        const secret = process.env.secret
        const token = jwt.sign({
            id: auth._id,
        }, secret, {
            expiresIn: tokenValidation
        })

        res.status(200).json({
            token
        })

    } catch (err) {
        res.status(500).json({msg: err})
    }
})


app.post('/auth/password', async(req, res) => {
    const {password, newPassword} = req.body

    if(!password){
        return res.status(422).json({msg: "Password necessário"})
    }
    else if(!newPassword){
        return res.status(422).json({msg: "Nova password necessária"})
    }

    const auth = await Auth.findOne({_id: await getIdFromToken(req)})

    if (!auth){
        return res.status(404).json({msg: "Autenticação necessária"})
    }

    const checkPassword = await bcrypt.compare(password, auth.password)
    if(!checkPassword){
        return res.status(422).json({msg: "Password inválida"})
    } 

    try{
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newPassword, salt)

        const updatedUser = await Auth.findOneAndUpdate({username: auth.username}, {password: hash})
        res.status(200).json({updatedUser})

    } catch (err) {
        res.status(500).json({msg: err})
    }
})

app.get('/user/:id', checkToken, async(req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-_id')

    if(!user){
        return res.status(422).json({msg: "Utilizador não encontrado"})
    }

    let dataToLog = {
        Level: 'Info',
        Action: `/user/${id}`,
        Description: user,
        User: await getIdFromToken(req)
    }

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
    amqplib.connect('amqp://localhost', (err, conn) => {
        if (err) throw err;

        conn.createChannel((err, ch1) => {
            if (err) throw err;

            ch1.assertQueue(queue);

            setInterval(() => {
                ch1.sendToQueue(queue, Buffer.from(message));
            }, 1000);
        });
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

