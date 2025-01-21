var socket = io();

const btn = document.getElementById("btn");
btn.onclick = function execute() {
  socket.emit("from_client");
};

socket.on("from_server", () => {
  const div = document.createElement("div");
  div.innerText = "New evnet from the server.";
  document.body.appendChild(div);
});
