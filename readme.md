# Websockets with Socket.io.

## Installation & Usage.

### Client

- `npm install socket.io-client`
- Import it into your react file.

```Javascript
import { io } from 'socket.io-client';
// this is where out socket is deployed.
const socket = io('https://pursuit-of-trivia.herokuapp.com/');
```

Listening for an event from the socket.

```javascript
  useEffect(() => {
    socket.on('name of event', ('Args') => {
      // log the data that was sent from the socket to the terminal.
      console.log(args);
    });
  }, []);
```

## Events

### Emitted from the client.

| name           | expected arguments | argument type                    |
| -------------- | ------------------ | -------------------------------- |
| 'joinRoom'     | roomName           | string                           |
| 'userFinished' | quizData           | Object {roomName: '', score: ''} |

### Emitted from the server.

| name           | returns  | Purpose                                           |
| -------------- | -------- | ------------------------------------------------- |
| 'joinRoom'     | N/A      | tell all members of a room someone new has joined |
| 'userFinished' | quizData | sends the quiz data object to all users.          |
