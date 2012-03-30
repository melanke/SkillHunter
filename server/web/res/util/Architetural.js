
/**
* verifica se o objeto é function
*/
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
}

/**
* realiza o comportamento de herança, o primeiro parametro herda os atributos e metodos do segundo parametro, caso o segundo parametro for uma funcao ira herdar do objeto gerado por essa funcao
*/
function inherit(obj, parent){
    if(!obj || !parent)
        return;
    
    if(isFunction(parent))
        parent = new parent();
    
    for(var p in parent) obj[p] = parent[p];
}