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

  socket.on("join_room", (data) => {
    socket.join(data.roomid);
  });

  socket.on("msg_sent", (data) => {
    console.log(data);
    io.to(data.roomid).emit("msg_recieved", data);
    // socket.emit("msg_recieved", data);
    // socket.broadcast.emit("msg_recieved", data);
  });
});

app.set("view engine", "ejs");

app.get("/chat/:roomid", (req, res) => {
  res.render("index", {
    name: "Suraj",
    id: req.params.roomid,
  });
});

server.listen(PORT, async () => {
  console.log("Server started at port:", PORT);
  await connect();
  console.log("MongoDB connected");
});
