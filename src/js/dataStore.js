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
        return localStorage.getItem(key);
    },
    remove:function(key){
        return localStorage.removeItem(key);
    },
    clear:function(){
        return localStorage.clear();
    }
}
function SessionStore(key,value){
    this.key = key;
    this.value = value;
}
SessionStore.prototype = {
    constructor : SessionStore,
    set(key,value){
        sessionStorage.setItem(key,typeof value ==='object'?Json.stringify(value):value);
    },
    get(key){
        return sessionStorage.getItem(key);
    },
    remove(key){
        return sessionStorage.removeItem(key);
    },
    clear(){
        return sessionStorage.clear();
    }
}
function getId(selector){
    return document.getElementById(selector);
}

export default {
    LocalStore,
    SessionStore,
    getId
}

