const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { GetMapa, AddToMapa, ChangeInMapa, DeleteInMapa } = require('../controller/mapaController');

router.get('/', checkToken, GetMapa);
router.post('/add', checkToken, isAdmin, AddToMapa);
router.put('/change/:id', checkToken, isAdmin, ChangeInMapa);
router.delete('/remove/:id', checkToken, isAdmin, DeleteInMapa);

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

function isAdmin(req, res, next) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);

    if(tokenData.role == 3)
        next()
    else
        res.status(403).json()
}

module.exports = router;