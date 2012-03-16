var Background = function(args){
    
    inherit(this, args);
    
    if(!this.sprite)
        this.sprite = {};
    
    this.sprite.src = "background";
};

var Stone = function(args){
    
    inherit(this, Background);
    inherit(this, args);
    
    this.w = 32;
    this.h = 32;
    this.obstacle = true;
    this.padding = 5;
    
    this.sprite.x = 32;
    this.sprite.y = 0;
};


var Flower = function(args){
    
    inherit(this, Background);
    inherit(this, args);
    
    this.w = 32;
    this.h = 32;
    
    this.sprite.x = 64;
    this.sprite.y = 0;
    
    if(!this.z)
        this.z = 0;
};

var Carpete = function(args){
    
    inherit(this, Background);
    inherit(this, args);
    
    this.sprite.x = 0;
    this.sprite.y = 32;
    this.sprite.w = 32;
    this.sprite.h = 32;
    
};

var Grama = function(args){
    
    inherit(this, Background);
    inherit(this, args);
    
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.sprite.w = 32;
    this.sprite.h = 32;
    
}