function LocalStore(key,value){
    this.key = key;
    this.value=value;
}
LocalStore.prototype={
    // constructor : LocalStore,
    set:function(key,value){
        localStorage.setItem(key,typeof value == 'object'?JSON.stringify(value):value)
    },
    get:function(key){
        return JSON.parse(localStorage.getItem(key));
    },
    remove:function(key){
        return localStorage.removeItem(key);
    },
    clear:function(){
        return localStorage.clear();
    }
}
function getId(selector){
    return document.getElementById(selector);
}

export default {
    LocalStore,
    getId
}

