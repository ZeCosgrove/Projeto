const router = require('express').Router()
const loggerController = require('../controllers/loggerController')

router.route('/AddLog').post(loggerController.LogRegistInfo)

module.exports = router


