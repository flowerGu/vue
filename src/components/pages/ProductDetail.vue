<template>
    <div class="productDetail">
        <div class="headerDetail">
333{{$route.query.id}}222
        </div>
        3333333
    
    </div>
</template>
<script>
    export default {
    
        mounted() {
    
            console.log(this.$route.query.id)
    
            this.$toast('233')
    
        }
    
    }
</script>
<style lang="less" scoped>
    .headerDetail{
        width:100%;
        height:3rem;
        background-image:-webkit-linear-gradient(top,#fff,#e6e6e6)
    }
</style>
