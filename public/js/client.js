let pusher = new Pusher('dd3d1cb1e89ac32335b4', {
  cluster: 'ap2',
  encrypted: true
})

let codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'javascript',
  // readOnly: true, // non-editable
  lineNumbers: true
})

let peer_ul = document.getElementById('peer-list')
let pathname = window.location.pathname
let bufferid = 'presence' + pathname.replace(/\//g, '-')
let editEvent = 'client-text-edit'

let channel = pusher.subscribe(bufferid)

channel.bind(editEvent, function (data) {
  codeEditor.setValue(data)
})

channel.bind('pusher:subscription_succeeded', function (members) {
  codeEditor.getInputField().addEventListener('input', changeHandler)
  members.each(function (member) {
    displayUserList(member.id)
  })
})

channel.bind('pusher:subscription_error', function (e) {
  alert('Failed to collaborate.')
  console.log(e)
})

channel.bind('pusher:member_added', function (member) {
  deleteUserList()
  channel.members.each(function (member) {
    displayUserList(member.id)
  })
})

channel.bind('pusher:member_removed', function (member) {
  deleteUserList()
  channel.members.each(function (member) {
    displayUserList(member.id)
  })
})

// on input change
function changeHandler (event) {
  channel.trigger(editEvent, codeEditor.getValue())
}

window.onbeforeunload = function () {
  pusher.unsubscribe(bufferid)
}

function displayUserList (user) {
  let li = document.createElement('li')
  li.appendChild(document.createTextNode(user))
  peer_ul.appendChild(li)
}

function deleteUserList () {
  peer_ul.innerHTML = ''
}

function handleFileSelect (evt) {
  let files = evt.target.files
  let file = files[0]
  if (file) {
      document.getElementById('file-name').innerHTML = file.name
      let reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = function (evt) {
          codeEditor.setValue(evt.target.result)
      }
      reader.onerror = function (evt) {
          console.error('error reading file')
      }
  }
}
document.getElementById('file-upload').addEventListener('change', handleFileSelect, false)
