const { SocketAddress } = require("net");
const httpServer = require("http").createServer();

const port = process.env.PORT || 3000;

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("hello, new connection");

  socket.on("joinRoom", (data) => {
    socket.join(data.roomName);
    console.log(`${data.username} joined ${data.roomName}`);
    // Tell everyone a user joined
    socket.in(data.roomName).emit("joinRoom", data);
  });

  socket.on("userFinished", (quizData) => {
    // Quiz data should have the score and the room name.
    socket.in(quizData.roomName).emit("userFinished", quizData);
  });

  //=== Chatroom ===//
  socket.on("newMessage", (message) => {
    socket.to(message.roomName).emit("newMessage", message);
    console.log(message); // world
  });

  socket.on("advanceGame", (data) => {
    socket.to(data.roomName).emit("advanceGame", data);
    console.log("Quiz Advanced");
  });

  socket.on("disconnect", () => {
    console.log("Someone disconnected from the socket..");
  });
});

httpServer.listen(port, () =>
  console.log(`Express now departing from port ${port}!`)
);
