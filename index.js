const cors = require("cors");
const app = require("express")();

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("hello, new connection");

  socket.on("disconnect", (socket) => {
    console.log("Someone disconnected from the socket..");
  });
});

server.listen(port, () =>
  console.log(`Express now departing from port ${port}!`)
);
