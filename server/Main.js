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

app.get('/player/', function(req, res) {
  playerServ.getPlayer(req.query, function(result){
    res.send(result);
  });
});

app.get('/player/environment/', function(req, res) {
  playerServ.getPlayerEnvironment(req.query, function(result){
    res.send(result);
  });
});

app.post('/player/register/', function(req, res) {
  playerServ.register(req.body, function(result){
    res.send(result);
  });
});

io.of('/ws/').on('connection', function (socket) {
  // console.log("connection");

  // socket.on('connect', function () {
  //   console.log("connect");
  // });

  socket.on('message', function (msg) {
  	socket.broadcast.send(msg);
  });
});