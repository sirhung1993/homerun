const express = require('express')
const router = express.Router()
const Conf = require('../configurations/Configuration.js')
const TimeDelayInMs = 1000
const RefreshDelayInSecond = 60 
let ComputerStatus = {}

setInterval(() => ComputerStatus = {}, RefreshDelayInSecond * 1000)

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
            ComputerStatus: ComputerStatus,
            MaxComputers: (Conf.Secret.MAX_COMPUTER > 0) ? Conf.Secret.MAX_COMPUTER : 39,
            NumberComputerOnARow: (Conf.Secret.COMPUTER_PER_ROW > 0) ? Conf.Secret.NumberComputerOnARow : 5
        } 
    })
})

module.exports = router