var _$_id = parseInt(Math.random() * 100);

//Game com G maiusculo é a classe, game com g minusculo é um singleton, variavel global, instância do Game
var game = new Game([
    
    new Player({
        id: _$_id,
        x: 320,
        y: 240,
        z: 0
    }),

    new Stone({
        x: 480,
        y: 320,
        z: 0
    }),

    new Flower({
        x: 256,
        y: 320,
        z: 0
    }),

    new Grama({
        x: 0,
        y: 0,
        z: -1,
        w: 640,
        h: 480
    }),

    new Carpete({
        x: 224,
        y: 288,
        z: -1,
        w: 272,
        h: 96
    })
    
]);