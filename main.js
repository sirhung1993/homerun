'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path    = require("path");
const Computer = require('./router/Computer.js') 

app.use(express.static(path.join(__dirname, 'react/build')));
app.use('/js', express.static('./views/js'))
app.use('/css', express.static('./views/css'))
app.use('/html', express.static('./views/html'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'html');
app.use('/info', Computer)

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/react/build/index.html'))
})

app.post('/client', (req, res, next) => {
    res.send("Hello from server")
})

app.listen(app.get('port'), () => {
  console.log('Server is running at this server: ' + app.get('port'))
})

