import Vue from 'vue';
import Router from 'vue-router';

// import Index from '@/components/Index';
// import Login from '@/components/Login';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve =>require(['../components/Index.vue'],resolve),
      name:'首页',
    },
    {
      path:'/login',
      component:resolve =>require(['../components/Login.vue'],resolve),
      name:'登录',
    },
    {
      path:'/my',
      component:resolve=>require(['../components/My.vue'],resolve),
      name:'我的'
    },
    {
      path:'/product',
      component:resolve=>require(['../components/Product.vue'],resolve),
      name:'产品'
    },
    {//重定向
      path: '*', 
      redirect: '/' 
    }
  ]
})

