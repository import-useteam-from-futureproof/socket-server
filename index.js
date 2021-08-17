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

  socket.on('create', function (room) {
    // create a room with a dynamic name
    socket.join(room);
    console.log(`you joined ${room}`);
  });

  socket.on('disconnect', (socket) => {
    console.log('Someone disconnected from the socket..');
  });
});

io.listen(port, () => console.log(`Express now departing from port ${port}!`));
