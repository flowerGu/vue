import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import {Toast,Loading } from '@/js/plugin'

/*var  requestUrl = (key)=>{
    var urls= {
        'login' :'login.json',
        'saveHeadImage':'saveHeadImage.json',
        'jdsafeauth':'jdsafeauth.json',
        'loginOut':'loginOut.json'
    }
    if(key in urls){
        return 'https://testapp.mejinrong.com:4430/me-front/'+urls[key]
    }else{
        return key;
    }    
}*/
var a = false;
let $ajax = (o)=>{   
    Vue.prototype.$loading({tips:'拼命加载中'})
    /*var opts ={
        version:'3.7.2',
        channel:'h5',
        tokenid:'220CAE94A78B038CACA30645600144B61500435814677'
    };*/
    if(a){
        return false;
    }
    a=true;
    if(typeof o.key=="object" || typeof o.key=='undefined'){        
        var json2String = (jsonData) => {
            var strArr = [];
            for(var k in jsonData) {
                if(typeof jsonData[k] =='object'){//递归解决二级value对象无法识别问题
                    json2String(jsonData[k])
                }else{
                    strArr.push(k + "=" + jsonData[k]);	
                }            
            }
            return strArr.join("&");
        }
        var token = Vue.prototype.cookie.get('token');
        if(token!='null' && token!=null){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        axios({
            method:o.type || 'post',
            url:o.url,
            data:o.key,
            headers: {
                'Content-Type': o.header || 'application/x-www-form-urlencoded'
            },
        }).then((response)=>{
            a = false;
            Vue.prototype.$loading({type:'close'});
            var res = response.data;
            if(res.code=='001'){
                console.log(res,router)
                router.push({path:'/login',query:{redirect:location.hash.replace(/#/,'')}})
            }else{
                o.success && o.success(res);
            }

        }).catch((e)=>{
            a = false;
            if(e.request.status=='401'){//必传token地方，token超时
                token && Vue.prototype.cookie.remove('token');//后台token超时状态下，清除本地token
                router.push({path:'/login',query:{redirect:location.hash.replace(/#/,'')}})
            }else{
                Vue.prototype.$toast(e);
            }
        })
    }
}
axios.defaults.transformRequest = [function (data) {
    // Do whatever you want to transform the data
    let newData = ''
    for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}]
// export {requestUrl}
export {$ajax}
