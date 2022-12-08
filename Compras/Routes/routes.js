const router = require('express').Router()
const jwt = require('jsonwebtoken')
const compraController = require('../Controllers/compraController')
const produtoPorCompraController = require('../Controllers/produtoPorCompraController')

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

// Compras
router.post('/NovaCompra', checkToken, compraController.NovaCompra)
router.post('/AtualizarCompra', checkToken, compraController.AtualizarCompra)
router.get('/VerCompra', checkToken, compraController.VerCompra)
router.get('/VerCompras', checkToken, compraController.VerCompras)

//Produto Por Compra
router.post('/AdicionarProduto', checkToken, produtoPorCompraController.AdicionarProduto)
router.post('/RemoverProduto', checkToken, produtoPorCompraController.RemoverProduto)

module.exports = router
