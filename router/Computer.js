const express = require('express')
const router = express.Router()
const Conf = require('../configurations/Configuration.js')
const TimeDelayInMs = 1000
const DayInMs = 300000 
let ComputerStatus = {}

setInterval(() => ComputerStatus = {}, DayInMs)

router.post('/updatestatus', (req, res, next) => {
    let computerName = req.body.computerName
    let isAvailable = req.body.isAvailable
    let token = req.body.token
    if (token === Conf.Secret.TOKEN && computerName && isAvailable !== null) {
        ComputerStatus[computerName] = isAvailable
        res.status(200).json({
            OK : {
                msg: "Data send suscessfully!" 
            }
        })
    } else {
        res.end()
    }
})

router.get('/getstatus', (req, res, next) => {
    res.status(200).json({
        OK : {
            ComputerStatus: ComputerStatus
        } 
    })
})

module.exports = router