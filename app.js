const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const uuidv4 = require('uuid/v4')

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

app.get('/generate', function (req, res) {
  let bufferid = uuidv4().slice(0, 8)
  res.redirect('/buffer/' + bufferid)
})

app.post('/pusher/auth', function (req, res) {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const uid = uuidv4()
  const presenceData = {
    user_id: 'user-' + uid.slice(0, 8),
    user_info: {
      name: uid
    }
  }
  const auth = pusher.authenticate(socketId, channel, presenceData)
  res.send(auth)
})

app.all('*', function (req, res) {
  res.redirect('/')
})

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT)
})
