/**
 * classe responsável por realizar o gameloop e invocar update e draw de cada 
 * item do atributo 'model'
 * 
 * construtor recebe um array que será transformado para um objeto da classe 
 * ElementsCollection e setado no atributo model
 */

var Game = function(elArray, playerId){
    this.playerId = playerId;
        
    var loops = 0, 
        fps = 50,
        skipTicks = 1000 / fps, 
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();
    
    if(!elArray)
        elArray = [];
    
    this.model = new ElementsCollection(elArray);
    
    this.socket = new SocketManager(this.model);
    
    this.update = function(){
        
        this.model.each(function(el){
            if(el.update)
                el.update();
        });
        
        this.socket.changePlayer(this.model.findById(this.playerId));
    };
    
    this.draw = function(){
        CanvasPainter.blackEnd();
        
        this.model.sortRenderOrder().each(function(el){
            if(el.draw)
                el.draw();
            else
                CanvasPainter.sprite(el);
        });
    }
    

    //mecanismo de loop, alguns navegadores retornam um callback de quando é a melhor hora para renderizar
    //usa o callback ou usa um setInterval
    if (window.webkitRequestAnimationFrame) {
        window.onEachFrame = function(cb) {
        var _cb = function() {cb();webkitRequestAnimationFrame(_cb);}
        _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        window.onEachFrame = function(cb) {
        var _cb = function() {cb();mozRequestAnimationFrame(_cb);}
        _cb();
        };
    } else {
        window.onEachFrame = function(cb) {
        setInterval(cb, 1000 / 60);
        }
    }
    
    var _this = this;
    window.onEachFrame(function() {

            loops = 0;

            if ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                _this.update();
                nextGameTick += skipTicks;
                loops++;
            }

            if(loops)
                _this.draw();
    });
    
};