import Vue from 'vue'
import App from './App'
import router from './router'
// import vueResource from 'vue-resource'
// import ElementUI from 'element-ui'
import header from '@/components/common/header'
import List_item from '@/components/common/list_item'
import 'element-ui/lib/theme-default/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import dataStore from '@/js/dataStore'
import filters from '@/js/filters'
import {Toast,Loading,Dialog} from '@/js/plugin'
import {$ajax} from '@/js/config'
Vue.component('Header',header)
Vue.component('ListItem',List_item)
Vue.config.productionTip = false
Vue.use(Toast)
console.log(Toast)
Vue.use(Loading)
Vue.use(Dialog)
Object.keys(filters).forEach(v=>{
  Vue.filter(v,filters[v]);
})
Vue.prototype.$localStore = new dataStore.LocalStore;//创建公共方法 localStorage
Vue.prototype.$sessionStore = new dataStore.SessionStore;
Vue.prototype.cookie = dataStore.cookie
// Vue.prototype.$url = requestUrl;//请求地址
Vue.prototype.$ajax = $ajax;
var vues=new Vue({
  mode: 'history',
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data(){
    return {
      
    }
  },
  methods:{
    rmHTML(){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str=str.replace(/ /ig,'');//去掉 
      return str;
    },
    scrollTop(){
      return Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    },
    documentHeight(){//文档高度
      return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    },
    windowHeight(){//可视区高度
      return (document.compatMode == "CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;
    }
  }
});
// console.log(vues.$loading({tips:'dd'}))
// Vue.http.interceptors.push((request, next)=> {
//     request.method = 'post';
//     vues.$loading({tips:'拼命加载中'})
//     request.headers.set('X-CSRF-TOKEN', 'TOKEN');
//     request.headers.set('Authorization', 'Bearer TOKEN');
//     // continue to next interceptor
//     next((response)=>{
//         vues.$loading({type:'close'})
//         return response;
//     });
// });
//路由跳转判断
router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});
var load;
router.beforeEach((to,from,next)=>{
  //全局loading
  var showNav = ['/','/my','/product']; 
  console.log(to.meta,'=====================')
  vues.$loading({tips:'拼命加载中'})
  load=true;
  //未登录跳登录
  if(to.path=='/my' && !Vue.prototype.cookie.get('token')){
    next({path:'/login'})
  }else{
    next()
  }
})
router.afterEach((transition)=>{
  document.title = transition.name;
  load && vues.$loading({type:'close'});
  if(transition.path=='/my' && !Vue.prototype.cookie.get('token')){
    router.push('/login')
  }
  //底部导航显示隐藏
  var showNav = ['/','/my','/product']; 
  if(showNav.indexOf(transition.path)>-1){
      document.getElementsByClassName('home-nav')[0].classList.remove('none');
  }else{
    document.getElementsByClassName('home-nav')[0].classList.add('none');
  }
  //导航添加高亮
  const nav = document.getElementsByClassName('home-nav')[0];
  nav.childNodes.forEach(function(v,i){
    if(v.nodeType==1){
        v.classList && v.classList.remove('active');
        var href=v.querySelector('a').getAttribute('href').replace(/#/g,'');
        if(href == transition.path){
          v.classList.add('active');
        }
    }
  })
})
