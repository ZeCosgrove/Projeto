const mongoose = require('mongoose')
const Logs = require('../LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")

exports.LogRegistInfo = async (req, res) => {
    console.log(req.body)
    const {Level, Action, Description} = req.body

    if (!Level || !Action || !Description) {
        res.json({status: 'Log Regist Info Error', error: 'Level or Type or Action cant be null'})
    }
    
    const response = await Logs.create({
        Level,
        Action,
        Description,
        Date: moment(Date.now()).format("LLL")
    })

    res.json({status: 'New Log Added'})
}


