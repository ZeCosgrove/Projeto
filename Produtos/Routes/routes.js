const router = require('express').Router()
const jwt = require('jsonwebtoken')
const produtoController = require('../Controllers/produtoController')
const stockController = require('../Controllers/stockController')

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({msg: "Token invÃ¡lida"})
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

// Produtos
router.post('/CriarProduto', checkToken, isAdmin, produtoController.CriarProduto)
router.post('/EditarNome', checkToken, isAdmin, produtoController.EditarNomeProduto)
router.post('/EditarPreco', checkToken, isAdmin, produtoController.EditarPrecoProduto)
router.post('/RemoverProduto', checkToken, isAdmin, produtoController.RemoverProduto)
router.get('/LerProduto', produtoController.LerProduto)
router.get('/LerProdutos', produtoController.LerProdutos)
//TODO : Ler produto(s)

// Stock
router.post('/AdicionarStock', checkToken, isAdminOrStaff, stockController.AdicionarStock)
router.post('/EditarStock', checkToken, isAdminOrStaff, stockController.EditarStock)
router.post('/RemoverStock', checkToken, isAdminOrStaff, stockController.RemoverStock)
router.get('/LerStock', checkToken, isAdminOrStaff, stockController.LerStock)



module.exports = router
