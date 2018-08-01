const express = require('express')
const router = express.Router()
const Conf = require('../configurations/Configuration.js')
const DelayCheckInSecond = 15
const RefreshDelayInSecond = 3600
const MaxTimeDelayInSecond =  10
let ComputerStatus = {}
let UpdateLog = {}

setInterval(() => {
    Object.keys(UpdateLog).map((key) => {
        let outdatedTime = Date.now() - UpdateLog[key]
        if (outdatedTime > MaxTimeDelayInSecond * 1000) {
            ComputerStatus[key] = 0 
        }
    })
}, DelayCheckInSecond * 1000)
setInterval(() => ComputerStatus = {}, RefreshDelayInSecond * 1000)

router.post('/updatestatus', (req, res, next) => {
    let computerName = req.body.computerName
    let isAvailable = req.body.isAvailable
    let token = req.body.token
    if (token === Conf.Secret.TOKEN && computerName && isAvailable !== null) {
        ComputerStatus[computerName] = isAvailable
        UpdateLog[computerName] = Date.now()
        // console.log("Update log : " + UpdateLog[computerName])
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
            MaxComputers: Conf.Secret.MAX_COMPUTER,
            NumberComputerOnARow: Conf.Secret.COMPUTER_PER_ROW
        } 
    })
})

module.exports = router