var Main = function(){

    var _this = this;

    var playerServ = new PlayerServices();

    this.init = function(){
        this.startSession();
    };   

    this.startSession = function(){
        this.session = new Session(function(sess){
            if(!sess.sessionid)
                _this.redirectToIndex();

            _this.startGame();
        });
    };

    this.redirectToIndex = function(){
        window.location.href= "index.html";
    };

    this.getGameElements = function(callback){
        playerServ.getPlayerEnvironment(this.session.username, function(elements, playerId){
            callback(elements, playerId);
        });
    };

    this.startGame = function(){
        this.getGameElements(function(elements, playerId){
            _this.game = new Game(elements, playerId);
        });
    };

    this.init();

};

var main = new Main();