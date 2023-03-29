import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

let users = [];
const addUser = (userId, socketId) => {
  // console.log({ userId });
  // console.log({ socketId });
  // console.log({ users });
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data.id);
    addUser(data.user, socket.id);
    console.log(users.length);
    console.log(users);
    console.log(`User with ID : ${socket.id} joinedroom ${data.id}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User diconnected", socket.id);
    removeUser(socket.id);
  });
});

app.use(cors());
app.use(express.json());

server.listen(8000, () => {
  console.log("Server running...");
});
