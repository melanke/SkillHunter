/**
* realiza as operacoes com sockets, estas operações não são seguras e serão alteradas no futuro
*/
var SocketManager = function(elements){
    
    WEB_SOCKET_SWF_LOCATION = "../lib/WebSocketMain.swf";

    var socket = io.connect(SERVER_URL+'ws/');
  
  /**
  * ao receber uma mensagem via socket altera o player correspondente a mensagem
  */
    socket.on('connect', function () {
        socket.on('message', function (msg) {
            elements.changePlayer(JSON.parse(msg));
        });
    });
  
  /**
  * manda alterar o player de determinado id em outros clients
  */
    var lastPlayerSent = null;
    this.changePlayer = function(player){
        var playerAttrs = JSON.stringify(player);
        
        if(playerAttrs == lastPlayerSent)
            return;
        
        socket.send(playerAttrs);
        lastPlayerSent = playerAttrs;
    };
  
}