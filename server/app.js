var app = require('http').createServer();
var io = require('socket.io').listen(app);
app.listen(3333);

// app.post('/login/', function(req, res) {
//     console.log("pediu login");
// });

io.of('/ws/').on('connection', function (socket) {
  socket.on('message', function (msg) {
  	socket.broadcast.send(msg);
  });
});