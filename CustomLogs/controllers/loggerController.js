const Logs = require('../LoggerModel/loggerModel')
const moment = require('moment')
moment.locale("en")

exports.LogRegistInfo = async (req, res) => {
    const {Level, Action, Description, User} = req.body

    if (!Level || !Action || !Description || !User) {
        res.json({status: 'Log Regist Info Error', error: 'Level or Type or Action or User cant be null'})
    }
    const LogMoment = Date.now()
    const response = await Logs.create({
        Level,
        Action,
        Description,
        User,
        LogMoment
    })

    res.json({status: response})
}


