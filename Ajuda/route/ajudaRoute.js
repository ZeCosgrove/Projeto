const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { GetAllAjudas, GetOneAjuda, WriteAjuda } = require('../controller/ajudaController');

router.get('/ajudas', checkToken, GetAllAjudas);
router.get('/ajuda/:id', checkToken, GetOneAjuda);
router.post('/pedido', checkToken, WriteAjuda);
router.post('/resposta', checkToken, isAdminOrStaff, WriteAjuda);

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

function isAdminOrStaff(req, res, next) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const tokenData = jwt.verify(token[1], process.env.SECRET);

    if(tokenData.role == 3 || tokenData.role == 2)
        next()
    else
        res.status(403).json()
}

module.exports = router;