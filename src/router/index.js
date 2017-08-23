import Vue from 'vue';
import Router from 'vue-router';

// import Index from '@/components/Index';
// import Login from '@/components/Login';


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: resolve =>require(['@/components/pages/Index.vue'],resolve),
      name:'首页',
    },
    {
      path:'/login',
      component:resolve =>require(['@/components/pages/Login.vue'],resolve),
      name:'登录',
    },
    {
      path:'/register',
      component:resolve=>require(['@/components/pages/Register.vue'],resolve),
      name:'注册'
    },
    {
      path:'/my',
      component:resolve=>require(['@/components/pages/My.vue'],resolve),
      name:'我的'
    },
    {
      path:'/product',
      component:resolve=>require(['@/components/pages/Product.vue'],resolve),
      name:'产品'
    },
    {
      path:'/productDetail',
      component:resolve=>require(['../components/pages/ProductDetail.vue'],resolve),
      name:'产品详情'
    },
    {//重定向
      path: '/a', 
      redirect: '/' 
    }
  ]
})

