

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
}


function inherit(obj, parent){
    if(!obj || !parent)
        return;
    
    if(isFunction(parent))
        parent = new parent();
    
    for(var p in parent) obj[p] = parent[p];
}