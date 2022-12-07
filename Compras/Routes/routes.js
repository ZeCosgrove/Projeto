const router = require('express').Router()
const compraController = require('../controllers/compraController')

// Compras
router.route('/NovaCompra').post(compraController.NovaCompra)
router.route('/AtualizarCompra').post(compraController.AtualizarCompra)
router.route('/VerCompra').get(compraController.VerCompra)
router.route('/VerCompras').get(compraController.VerCompras)


module.exports = router
