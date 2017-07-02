<template>
  <div id="app">
    <ul class="home-nav">
      <li><router-link to='/'><i class="me-ion-o-home"></i>首页</router-link></li>
      <li><router-link to='/product'><i class="me-ion-a-playstore"></i>产品</router-link></li>
      <li><router-link to='/my'><i class="me-ion-person"></i>我的</router-link></li>
    </ul>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data(){
      return {
        active:'0'
      }
    },
    ready(){
      console.log(333)
    }
  }
</script>
<style lang="less" type="text/css">
  @import '../static/css/base.less';
  #app {
    font-family: "黑体",PINGFANG-REGULAR, Arial, Helvetica, "苹方常规", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .bounce-enter-active {
    -webkit-animation:fadeInRightBig 1.5s .2s ease both;
    -moz-animation:fadeInRightBig 1.5s .2s ease both;}
    @-webkit-keyframes fadeInRightBig{
    0%{opacity:0;
    -webkit-transform:translateX(2000px)}
    100%{opacity:1;
    -webkit-transform:translateX(0)}
    }
    @-moz-keyframes fadeInRightBig{
    0%{opacity:0;
    -moz-transform:translateX(2000px)}
    100%{opacity:1;
    -moz-transform:translateX(0)}
  }
  .bounce-leave-active {
    -webkit-animation:fadeOutLeftBig .5s .2s ease both;
    -moz-animation:fadeOutLeftBig .5s .2s ease both;}
    @-webkit-keyframes fadeOutLeftBig{
    0%{opacity:1;
    -webkit-transform:translateX(0)}
    100%{opacity:0;
    -webkit-transform:translateX(-2000px)}
    }
    @-moz-keyframes fadeOutLeftBig{
    0%{opacity:1;
    -moz-transform:translateX(0)}
    100%{opacity:0;
    -moz-transform:translateX(-2000px)}
    
  }
  .home-nav {
    font-size: .7rem;
    li {
      a {
        color: #777;
        text-decoration: none;
      }
      i {
        padding-top: .2rem;
        font-size: 1rem;
        display: block;
        margin-bottom: -3px;
      }
      &.active {
        a {
          color: #df2127;
        }
      }
    }
  }
</style>
