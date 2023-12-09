const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let userCount = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.on('join', param => {
    userCount++
    io.emit('userCount', userCount)
  })
  socket.on('message', param => {
    io.emit('message', param)
  })
  socket.on('disconnect', param => {
    userCount--
    io.emit('userCount', userCount)
  })
})

http.listen(port, () => {
  console.log('[WEBSITE] Ready');
});
