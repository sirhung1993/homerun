'use strict'
const request = require('request')
const fs = require('fs');
const HomeRunURL = 'https://homeruncyber.herokuapp.com/info/updatestatus'
const ComputerName = process.env.ComputerName
const IsAvailable = true
const TOKEN = '221E7773e14BdC9b1F5a657D1cA56f0C'
const TimeDelayInSecond = 10
const Job = () => {
        const date = new Date()

        const DAY = date.getDate()
        const MONTH = date.getMonth()
        const YEAR = date.getFullYear()
        
        const LOGFILE = `\.\\Log\\Log-${DAY+'-'}${MONTH + '-'}${YEAR + '-'}${ComputerName}.log` 

        request.post({url: HomeRunURL, form: {
            token: TOKEN,
            computerName: ComputerName,
            isAvailable: IsAvailable 
        }}, (err, res, json) => {
            if(err === null) {
                if (res.statusCode == 200){
                    fs.appendFile(LOGFILE, 
                    `At ${date} : Run OK \n`, 
                    (err) => {
                        if(err)
                            fs.appendFileSync(LOGFILE, `At ${Date}: Run failed. Check the connection \n`)
                    })
                }
            }
        })
    }
setInterval( Job,
    TimeDelayInSecond*1000
)