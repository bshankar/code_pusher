let pusher = new Pusher('dd3d1cb1e89ac32335b4', {
  cluster: 'ap2',
  encrypted: true
})

let codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'javascript',
  // readOnly: true, // non-editable
  lineNumbers: true
})

let pathname = window.location.pathname
let bufferid = 'private' + pathname.replace(/\//g, '-')
let editEvent = 'client-text-edit'

let channel = pusher.subscribe(bufferid)

channel.bind(editEvent, function (data) {
  codeEditor.setValue(data)
})

channel.bind('pusher:subscription_succeeded', function () {
  codeEditor.getInputField().addEventListener('input', changeHandler)
})

channel.bind('pusher:subscription_error', function (e) {
  alert('Failed to collaborate.')
  console.log(e)
})

// on input change
function changeHandler (event) {
  channel.trigger(editEvent, codeEditor.getValue())
}

let peers = ["MUK3SH", "BH4V4NI", "V3NK3Y", "1NDU5"]
let peer_ul = document.getElementById("peer-list")
peers.forEach((item) => {
  var li = document.createElement("li")
  li.appendChild(document.createTextNode(item))
  peer_ul.appendChild(li)
})
