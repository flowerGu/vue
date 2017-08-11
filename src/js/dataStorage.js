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
var cookie = {
  get: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  remove: function (sKey, sPath, sDomain) {
    if (!sKey || !this.has(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  has: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
export default {
    LocalStore,
    SessionStore,
    cookie,
    getId
}

