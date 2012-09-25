/**
 * CanvasPainter é uma classe estática que possúi as operações de desenho no 
 * canvas. Carrega e armazena todos os sprites que serão usados no jogo
 */
var CanvasPainter = {};

CanvasPainter.sprites = {
    player: {src: "res/img/player.png"},
    background: {src: "res/img/background.png"}
};

CanvasPainter.screen = {
    w: 640,
    h: 480,
    center: {
        x: 320,
        y: 240
    }
};

CanvasPainter.canvas = document.getElementsByTagName('canvas')[0];

if(CanvasPainter.canvas.getContext)
    CanvasPainter.context = CanvasPainter.canvas.getContext('2d');

for(var i in CanvasPainter.sprites){
    var cursrc = CanvasPainter.sprites[i].src + "";
    CanvasPainter.sprites[i] = new Image();
    CanvasPainter.sprites[i].src = cursrc;
}

CanvasPainter.blackEnd = function(){
    CanvasPainter.context.fillRect(0, 0, CanvasPainter.screen.w, CanvasPainter.screen.h);
};

CanvasPainter.name = function(el){
    CanvasPainter.context.textAlign = "center";
    CanvasPainter.context.textBaseline = "bottom";
    CanvasPainter.context.fillText(el.username, el.x + (el.w/2) + CanvasPainter.getCenterX(), el.y-3 + CanvasPainter.getCenterY());
};

CanvasPainter.getCenterX = function(){
    return (CanvasPainter.screen.w/2) - CanvasPainter.screen.center.x;
};

CanvasPainter.getCenterY = function(){
    return (CanvasPainter.screen.h/2) - CanvasPainter.screen.center.y;
};

/**
 * desenha o elemento de acordo com seus atributos
 * se o elemento tiver o atributo sprite.w e sprite.h fará um pattern
 * caso contrário desenhará uma vez só
 * para ambas as situeções se o elemento tiver o atributo 
 * sprite.numberOfFrames fará uma animação
 */
CanvasPainter.sprite = function(el){
    
    var spriteXOffset = 0,
        spriteYOffset = 0;
    
    if(el.sprite.numberOfFrames){
        
        if(!el.animation)
            el.animation = {};
        
        if(!el.animation.frameIndex)
            el.animation.frameIndex = 0;
        
        if(!el.animation.intervalCont)
            el.animation.intervalCont = 0;
        
        if(el.animation.intervalCont >= 10){
            el.animation.intervalCont = 0;

            el.animation.frameIndex = (el.animation.frameIndex + 1) % el.sprite.numberOfFrames;
        }
        
        el.animation.intervalCont++;
        
        if(el.sprite.orientation=="vertical")
            spriteYOffset = el.animation.frameIndex*el.h;
        else
            spriteXOffset = el.animation.frameIndex*el.w;
    }
    
    
    if(el.sprite.w && el.sprite.h){
        for(var _x = el.x; _x < el.x + el.w; _x += el.sprite.w){
            for(var _y = el.y; _y < el.y + el.h; _y += el.sprite.h){
                
                CanvasPainter.context.drawImage(
                    CanvasPainter.sprites[el.sprite.src], 
                    el.sprite.x+spriteXOffset, 
                    el.sprite.y+spriteYOffset, 
                    el.sprite.w, 
                    el.sprite.h,
                    _x + CanvasPainter.getCenterX(), //desvio do centro da tela que é alterado pelo player
                    _y + CanvasPainter.getCenterY(), //desvio do centro da tela que é alterado pelo player
                    el.sprite.w, 
                    el.sprite.h);
                    
            }
        }
    }else{
        CanvasPainter.context.drawImage(
            CanvasPainter.sprites[el.sprite.src], 
            el.sprite.x+spriteXOffset, 
            el.sprite.y+spriteYOffset, 
            el.w, 
            el.h,
            el.x + CanvasPainter.getCenterX(), 
            el.y + CanvasPainter.getCenterY(), 
            el.w, 
            el.h);
    }
};