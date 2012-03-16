/**
 * representa o jogador, as interações do usuário com seu próprio personagem são
 * descritas em update e a resposta do jogo alterando o desenho do player é 
 * descrita no draw
 */

var Player = function(args){
    
    for(var p in args) this[p] = args[p];
    
    this.acceleration = 0;
    this.speed = 0;
    this.maxSpeed = 6;
    this.w = 32;
    this.h = 32;
    this.padding = 4; //quantos pixels serão ignorados ao colidir com outro objeto
    
    this.sprites = {
        stand: {
            down: {
                src: "player",
                x: 32,
                y: 0
            },
            left: {
                src: "player",
                x: 32,
                y: 32
            },
            right: {
                src: "player",
                x: 32,
                y: 64
            },
            up: {
                src: "player",
                x: 32,
                y: 96
            }
        },
        walk: {
            down: {
                src: "player",
                x: 0,
                y: 0,
                numberOfFrames: 3
            },
            left: {
                src: "player",
                x: 0,
                y: 32,
                numberOfFrames: 3
            },
            right: {
                src: "player",
                x: 0,
                y: 64,
                numberOfFrames: 3
            },
            up: {
                src: "player",
                x: 0,
                y: 96,
                numberOfFrames: 3
            }
        }
    };
            
    CanvasPainter.screen.center = { 
        x: this.x,
        y: this.y
    }
    
    this.update = function(){
            
        if (Key.isDown(Key.UP) || Key.isDown(Key.DOWN) || Key.isDown(Key.LEFT) || Key.isDown(Key.RIGHT)){
            
            this.accelerate({
                up: Key.isDown(Key.UP),
                down: Key.isDown(Key.DOWN),
                left: Key.isDown(Key.LEFT),
                right: Key.isDown(Key.RIGHT),
                acceleration: 0.04
            });
            
        }else{
            this.accelerate({
                acceleration: -0.2
            });
        }
    
        if(this.speed){ //se estiver em movimento
            var _this = this;
            
            game.model.findObstacles().each(function(el){ //para cada obstaculo do model de game
                if(_this.collidesWith(el)) //se player colidir com este obstaculo
                    _this.stepBack(); //irá dar um passo para traz e parar
            });
            
            CanvasPainter.screen.center = { 
                x: this.x,
                y: this.y
            }
        
        }
        
        var action;
        var direction;
    
        
        if(!this.speed)
            action = "stand";
        else
            action = "walk"
        
        
        if(this.left)
            direction = "left";
        else if(this.right)
            direction = "right";
        else if(this.up)
            direction = "up";
        else
            direction = "down";
        
        
        this.sprite = this.sprites[action][direction];
        
    };
    
    /**
     * realiza uma aceleração no objeto; up, down, left e right sao booleanos e 
     * indicam pra quais direções mover caso todos forem false, null, undefined 
     * ou 0 mantém a direção anterior
     */
    this.accelerate = function(op){
        
        if(!op.acceleration)
            return;
        
        if(op.up || op.down || op.left || op.right){
            this.up = op.up;
            this.down = op.down;
            this.left = op.left;
            this.right = op.right;
        }

        this.acceleration = op.acceleration;

        this.speed += this.acceleration;
        
        this.speed = Math.max(this.speed, 0);
        this.speed = Math.min(this.speed, this.maxSpeed);
        
        if(this.up)
            this.y -= this.speed;
        if(this.down)
            this.y += this.speed;
        if(this.left)
            this.x -= this.speed;
        if(this.right)
            this.x += this.speed;
        
    };
    
    /**
     * verifica se colide com outro objeto mas desconsidera a area mais em volta
     * determinada pelo atributo padding
     */
    this.collidesWith = function(other){
        
        return this.x    + this.w - this.padding > other.x                 + other.padding
            && this.x            + this.padding < other.x     + other.w   - other.padding
            && this.y    + this.h - this.padding > other.y                 + other.padding
            && this.y            + this.padding < other.y     + other.h   - other.padding;
        
    };
    
    /**
     * dá um passo para traz e para, é usado para parar um objeto quando 
     * descobrimos que ele não pode andar naquela direção
     */
    this.stepBack = function(){
        if(this.up)
            this.y += this.speed;
        if(this.down)
            this.y -= this.speed;
        if(this.left)
            this.x += this.speed;
        if(this.right)
            this.x -= this.speed;
        
        this.speed = 0;
    };
    
};