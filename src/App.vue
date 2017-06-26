<template>
  <div id="app">
    <ul class="home-nav">
      <li class="active"><a href="javascript:;"><i class="me-ion-o-home"></i>首页</a></li>
      <li><a href="javascript:;"><i class="me-ion-a-playstore"></i>新品</a></li>
      <li><a href="javascript:;"><i class="me-ion-o-world"></i>海淘</a></li>
      <li><a href="javascript:;"><i class="me-ion-o-search-strong"></i>搜索</a></li>
      <li><a href="javascript:;"><i class="me-ion-person"></i>个人中心</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less" type="text/css">
  @import './assets/css/base.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
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
