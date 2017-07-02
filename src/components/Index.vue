<template>
  <div class="index-page">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in banners" :key="item">
        <img :src="item.pic_url" :title="item.title"/>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div class="home-head">
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {        
        banners:[],
        swiperOption: {
          autoplay: 3000,
          direction : 'horizontal',
          grabCursor : true,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :false,
          mousewheelControl : false,
          observeParents:false,
          onTransitionStart(swiper){
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // this.swiper.slideTo(3, 1000, false)
      this.$http.get('../static/js/json/banner.json?'+Math.random()).then(res => {
        var data = res.body;
        for(var i=0;i<data.banner_urls.length;i++){
          this.banners.push(data.banner_urls[i])
        }
      })
    },
    methods: {
      
    },
    created(){
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
 @import '../../static/css/index.less';
</style>
