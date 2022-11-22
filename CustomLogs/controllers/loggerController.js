const mongoose = require('mongoose')
const Logs = require('../LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")

exports.LogRegistInfo = async (req, res) => {
    console.log(req.body)
    const {Level, Type, Action} = req.body

    if (!Level || !Type || !Action) {
        res.json({status: 'Log Regist Info Error', error: 'Level or Type or Action cant be null'})
    }
    
    const response = await Logs.create({
        Level,
        Type,
        Action,
        Date: moment(Date.now()).format("LLL")
    })

    console.log('New Log Info Created: ', response)
    res.json({status: 'New Log Info Added to BD'})
}


