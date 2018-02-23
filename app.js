const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Pusher = require('pusher')

const PORT = process.env.PORT || 8080
const APP_ID = process.env.APP_ID
const APP_KEY = process.env.APP_KEY
const APP_SECRET = process.env.APP_SECRET
const APP_CLUSTER = process.env.APP_CLUSTER

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var pusher = new Pusher({
  appId: APP_ID,
  key: APP_KEY,
  secret: APP_SECRET,
  cluster: APP_CLUSTER,
  encrypted: true
})

app.get('/buffer/:bufferid', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/pusher/auth', function (req, res) {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const auth = pusher.authenticate(socketId, channel)
  res.send(auth)
})

app.get('/', function (req, res) {
  res.send('Get back to work')
})

app.all('*', function (req, res) {
  res.redirect('/')
})

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT)
})
