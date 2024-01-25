const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let connectedUsers = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  connectedUsers++;
  io.emit('userCount', connectedUsers);

  socket.on('message', param => {
    param.timestamp = new Date().toISOString();
    io.emit('message', param);

    io.emit('scrollToBottom');
  });

  socket.on('disconnect', () => {
    connectedUsers = Math.max(0, connectedUsers - 1);
    io.emit('userCount', connectedUsers);
  });
});

http.listen(port, () => {
  console.log('[WEBSITE] Ready');
});
