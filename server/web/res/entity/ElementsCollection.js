/**
 * Collection de elementos do jogo, possui operações para busca e ordenação
 */
var ElementsCollection = function(arr){
    
    
    this.elements = arr;
    
    /**
    * executa uma funcao a cada item do array
    */
    this.each = function(doforeach){
        for(var el in this.elements){
            doforeach(this.elements[el]);
        }
    };
    
    /**
    * passe como parametro, uma funcao que devido a um elemento como parametro retorna verdadeiro caso for este elemento que quer obter
    */
    this.getIndexOf = function(filter){
        for(var i = 0; i<this.elements.length; i++){
            if(filter(this.elements[i]))
                return i;
        }
        
        return null;
    };
    
    /**
    * retorna todos os elementos apartir de um filtro que retorna verdadeiro se o elemento for correto, parecido com getIndexOf
    */
    this.findAll = function(filter){
        var response = [];
        
        this.each(function(el){
            if(filter(el))
                response.push(el);
        });
    
        return new ElementsCollection(response);
        
    };
    
    /**
    * retorna todos os elementos com atributo obstacle
    */
    this.findObstacles = function(){
        return this.findAll(function(el){
            return el.obstacle;
        });
    };
    
    /**
    * retorna o elemento do getElementById
    */
    this.find = function(filter){
        var elIndex = this.getIndexOf(filter);
        if(elIndex)
            return this.elements[elIndex];
        else
            return null;
    };
    
    this.findById = function(id){
        return this.find(function(el){
            return el.id && el.id == id;
        });
    };
    
    /**
    * substitui o elemento com mesmo id ou coloca um novo elemento
    */
    this.changePlayer = function(newP){
        var index = this.getIndexOf(function(el){
            return el.id && el.id == newP.id; //pega o index do elemento que tem o id igual o id do newP
        });
        
        if(index)
            this.elements[index] = newP;
        else
            this.elements.push(newP);
    };
    
    /**
    * ordena os elementos de acordo com a funcao passada como parametro que deve receber 2 parametros, se o retorno for negativo o parametro da esquerda deve ir primeiro
    */
    this.sort = function(sorter){
        return new ElementsCollection(this.elements.sort(sorter));
    };
    
    this.sortRenderOrder = function(){
        return this.sort(function(a,b){
            if(a.z == b.z)
                return (a.y < b.y) ? -1 : 1;
            else
                return (a.z < b.z) ? -1 : 1;
        });
    };
        
}