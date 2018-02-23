const path = require('path')
const express = require('express')
const app = express()

const port = 9000

app.get('/buffer/:bufferid', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/', function (req, res) {
  res.send('Get back to work')
})

app.all('*', function (req, res) {
  res.redirect('/')
})

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
