const router = require('express').Router()
const loggerController = require('../controllers/loggerController')

router.route('/AddLogInfo').post(loggerController.LogRegistInfo)

module.exports = router