const { SocketAddress } = require('net');

const httpServer = require('http').createServer();

const port = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('hello, new connection');

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`you joined ${roomName}`);
    // Tell everyone a user joined
    socket.in(roomName).emit('userJoined');
  });

  socket.on('userFinished', (quizData) => {
    // Quiz data should have the score and the room name.
    socket.in(quizData.roomName).emit('userFinished', quizData);
  });

  socket.on('disconnect', (socket) => {
    console.log('Someone disconnected from the socket..');
  });
});

io.listen(port, () => console.log(`Express now departing from port ${port}!`));
