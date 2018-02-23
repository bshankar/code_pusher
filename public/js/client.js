// Enable pusher logging - don't include this in production
Pusher.logToConsole = true

let pusher = new Pusher('dd3d1cb1e89ac32335b4', {
  cluster: 'ap2',
  encrypted: true
})

let codeEditor = document.getElementById('code')

// FIXME get buffer id
let bufferid = 'private-my-channel'
let editEvent = 'client-text-edit'
let channel = pusher.subscribe(bufferid)
channel.bind(editEvent, function (data) {
  codeEditor.value = data
})

channel.bind('pusher:subscription_succeeded', function () {
  codeEditor.addEventListener('input', changeHandler)
})

channel.bind('pusher:subscription_error', function (e) {
  alert('I think you did something bad')
  console.log(e)
})

// on input change
function changeHandler (event) {
  channel.trigger(editEvent, event.target.value)
}
