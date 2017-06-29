// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'
import Header from './components/common/header'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import { Loading } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.component('swiper',Swiper)
Vue.component('Header',Header)
Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import common from './common.js'
export default {
  components: {
    swiper,
    swiperSlide
  }
}
//创建公共方法 localStorage
Vue.prototype.$localStore = new common.LocalStore;
var vues=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  method:{
    rmHTML(){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str=str.replace(/ /ig,'');//去掉 
      return str;
    },
    
  },
  ready(){
    console.log(22222)
  }
});
// var load;
router.beforeEach((to,from,next)=>{
  //全局loading
  // load = vues.$loading({fullscreen:true});
  var showNav = ['/','/my']; 
  //底部导航显示隐藏
  if(showNav.indexOf(to.path)>-1){
      document.getElementsByClassName('home-nav')[0].classList.remove('none');
    }else{
      document.getElementsByClassName('home-nav')[0].classList.add('none');
    }
  //未登录跳登录
  if(to.path=='/my' && !localStorage.getItem('tokenid')){
    next({path:'/login'})
  }else{
    next()
  }
})
router.afterEach((transition)=>{
  document.title = transition.name;
  // load && load.close();
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
