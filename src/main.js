// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

var vues=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  method:{
    removeHTMLTag(){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str=str.replace(/ /ig,'');//去掉 
      return str;
    }
  }
})