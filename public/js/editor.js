var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript",
    // readOnly: true, // non-editable
    lineNumbers: true
})

let peers = ["MUK3SH", "BH4V4NI", "V3NK3Y", "1NDU5"]
let peer_ul = document.getElementById("peer-list")
peers.forEach((item) => {
    var li = document.createElement("li")
    li.appendChild(document.createTextNode(item))
    peer_ul.appendChild(li)
})