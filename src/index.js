const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");

const connect = require("./config/db");
const { PORT } = require("./config/serverConfig");
const path = require("path");

const io = socketio(server);

// app.use("/", express.static(__dirname + "public"));
app.use("/", express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("from_client", () => {
    console.log("Event comming from the client");
  });

  setInterval(() => {
    socket.emit("from_server");
  }, 2000);
});

server.listen(PORT, async () => {
  console.log("Server started at port:", PORT);
  await connect();
  console.log("MongoDB connected");
});
