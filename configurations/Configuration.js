'use strict'

exports.Secret = {
    TOKEN : process.env.TOKEN,
    MAX_COMPUTER: process.env.MAX_COMPUTER || 9,
    COMPUTER_PER_ROW: process.env.COMPUTER_PER_ROW || 5 
}