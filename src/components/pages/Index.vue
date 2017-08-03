<template>
  <div class="index-page">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in banners" :key="item">
        <img :src="item.pic_url" :title="item.title" />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="home-head">
  
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide }  from 'vue-awesome-swiper'
  // Vue.use(VueAwesomeSwiper)
  export default {
    components: {  
        swiper,  
        swiperSlide  
    },  
    data() {
      return {
        banners: [],
        swiperOption: {
          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: false,
          mousewheelControl: false,
          observeParents: false,
          debugger: true,
          onTransitionStart(swiper) {
          },
        }
      }
    },
    computed: {
      // swiper() {
      //   console.log(this.banner_urls)
      //   return this.$refs.mySwiper.swiper
      // }
    },
    mounted() {
      var _=this;
      
      _.$ajax({
        url:'../../static/js/json/banner.json',
        type:'get',
        key:{'rand':Math.random()},
        success:function(res){
          if(res.code=='000'){
              for (var i = 0; i < res.banner_urls.length; i++) {
                _.banners.push(res.banner_urls[i])
              } 
          } 
        }
      })
    },
    methods: {
  
    },
    created() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
  @import '../../../static/css/index.less';
</style>
