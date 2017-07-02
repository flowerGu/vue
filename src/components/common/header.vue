<template>
  <div class="header" @click="say()">
    {{text}}
    {{num}}
    <button @click="say()"></button>
  </div>
</template>

<script>
  export default {
    props:{
      text:String,
      num:Number
    },
    data() {
      return {
       
      }
    },
    methods: {
      say(){
        this.$emit("emits",this.num)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
  .header{
    color:#ff4c4c;
  }
</style>
