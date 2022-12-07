const router = require('express').Router()
const produtoController = require('../Controllers/produtoController')
const stockController = require('../Controllers/stockController')

// Produtos
router.route('/CriarProduto').post(produtoController.CriarProduto)
router.route('/EditarNome').post(produtoController.EditarNomeProduto)
router.route('/EditarPreco').post(produtoController.EditarPrecoProduto)
router.route('/RemoverProduto').post(produtoController.RemoverProduto)

// Stock
router.route('/AdicionarStock').post(stockController.AdicionarStock)
router.route('/EditarStocke').post(stockController.EditarStock)



module.exports = router
