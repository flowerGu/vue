<template>
    <div class="productDetail">
        {{$route.query.id}}222
    </div>
</template>
<script>
    export default{
        mounted(){
            console.log(this.$route.query.id)
            this.$toast('233')
        }
    }
</script>
<style lang="less" scoped>
</style>