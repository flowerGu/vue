<template>
  <div class="index-nav">
    <ul>
      <li class="active">首页</li>
      <li>服饰</li>
      <li>男装</li>
      <li>母婴</li>
      <li>家居</li>
      <li>美食</li>
      <li>电器</li>
      <li>家纺</li>
      <li>美妆</li>
      <li>水果</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        
        msg: 'Welcome to Your Vue.js App',
        com: '子组件'
      }
    },
    methods: {
      getValue() {
        Vue.http.get('../assets/js/banner.json').then(res => {
  
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index-nav {
    position: fixed;
    height: 2rem;
    line-height: 2rem;
    top: 0;
    width: 100%;
    z-index: 10001;
    background: #fff;
    overflow: hidden;
    ul {
      overflow-x: scroll;
      white-space: nowrap;
      padding: 0 .5rem;
      li {
        display: inline-block;
        font-size: .7rem;
        &:not(:first-child) {
          margin-left: .5rem;
        }
        &.active {
          border-bottom: 2px solid #e02e24;
          color: #e02e24;
          height: 1.9rem;
        }
      }
    }
  }
</style>
