var SocketManager = function(elements){
    
    WEB_SOCKET_SWF_LOCATION = "../lib/WebSocketMain.swf";

    var socket = io.connect(SERVER_URL+'ws/');
  
    socket.on('connect', function () {
        socket.on('message', function (msg) {
            elements.changePlayer(JSON.parse(msg));
        });
    });
  
    var lastPlayerSent = null;
    this.changePlayer = function(player){
        var playerAttrs = JSON.stringify(player);
        
        if(playerAttrs == lastPlayerSent)
            return;
        
        socket.send(playerAttrs);
        lastPlayerSent = playerAttrs;
    };
  
}