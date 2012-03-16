/**
 * Collection de elementos do jogo, possui operações para busca e ordenação
 */
var ElementsCollection = function(arr){
    
    
    this.elements = arr;
    
    this.each = function(doforeach){
        for(var el in this.elements){
            doforeach(this.elements[el]);
        }
    };
    
    this.getIndexOf = function(filter){
        for(var i = 0; i<this.elements.length; i++){
            if(filter(this.elements[i]))
                return i;
        }
        
        return null;
    };
    
    this.findAll = function(filter){
        var response = [];
        
        this.each(function(el){
            if(filter(el))
                response.push(el);
        });
    
        return new ElementsCollection(response);
        
    };
    
    this.findObstacles = function(){
        return this.findAll(function(el){
            return el.obstacle;
        });
    };
    
    this.find = function(filter){
        for(var el in this.elements){
            if(filter(this.elements[el]))
                return this.elements[el];
        }
        return null;
    };
    
    this.findById = function(id){
        return this.find(function(el){
            return el.id && el.id == id;
        });
    };
    
    this.changePlayer = function(newP){
        var index = this.getIndexOf(function(el){
            return el.id && el.id == newP.id;
        });
        
        if(index)
            this.elements[index] = newP;
        else
            this.elements.push(newP);
    };
    
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