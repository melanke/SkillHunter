var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
app.listen(3333);


app.use("/web", express.static(__dirname + '/web'));

app.get('/signin/', function(req, res) {
    console.log("pediu login");
});

io.of('/ws/').on('connection', function (socket) {
  socket.on('message', function (msg) {
  	socket.broadcast.send(msg);
  });
});