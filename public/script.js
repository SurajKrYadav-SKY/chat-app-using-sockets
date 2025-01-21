var socket = io();

const btn = document.getElementById("btn");
const inputMessage = document.getElementById("newMsg");
const messageList = document.getElementById("msgList");

btn.onclick = function execute() {
  socket.emit("msg_sent", {
    msg: inputMessage.value,
  });
};

socket.on("msg_recieved", (data) => {
  let listMsg = document.createElement("li");
  listMsg.innerText = data.msg;
  messageList.appendChild(listMsg);
});
