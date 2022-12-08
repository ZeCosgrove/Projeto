const router = require('express').Router()
const promocaoController = require('../Controllers/promocaoController')

// Promocao
router.route('/CriarPromocao').post(promocaoController.CriarPromocao)
router.route('/AtualizarPreco').post(promocaoController.EditarPreco)
router.route('/AtualizarData').post(promocaoController.EditarData)
router.route('/VerPromocao').get(promocaoController.VerPromocao)
router.route('/VerPromocoes').get(promocaoController.VerPromocoes)
router.route('/RemoverPromocao').post(promocaoController.RemoverPromocao)
//TODO: validar promocao


module.exports = router
