const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req, res) => {
  res.json("node js deneme");
});

io.on("connection", (socket) => {
  socket.join("anonymous_chat");
  console.log("backend bağlandı");
  socket.on("sendMsg", (msg) => {
    console.log("Message is here", msg);
    // socket.emit("sendMsgServer", { ...msg, type: "otherMsg" });
    io.to("anonymous_chat").emit("sendMsgServer", { ...msg, type: "otherMsg" });
  });
  //...
});

httpServer.listen(3000);
