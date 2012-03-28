var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var playerServ = require('./process/PlayerServices').createService();
app.listen(3333);

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
	app.use("/web", express.static(__dirname + '/web'));
});

app.post('/signin/', function(req, res) {
	playerServ.signin(req.body, function(result){
		res.send(result);
	});
});

io.of('/ws/').on('connection', function (socket) {
  socket.on('message', function (msg) {
  	socket.broadcast.send(msg);
  });
});