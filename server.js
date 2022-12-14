const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log('a user connected');
  io.emit("users", io.engine.clientsCount);
  socket.on("disconnect", () => {
    //   console.log('user disconnected');
    io.emit("users", io.engine.clientsCount);
    //   console.log(io.engine.clientsCount)
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log("listening on *:3000");
});
