<template>
  <div class="index-page">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <img :src="'http://'+item.banner_url" :title="item.title" />
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
      swiper() {
        console.log(this.banners)
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.$ajax({
        url:'/data/banner',
        type:'get',
        key:{},
        success:function(res){
          if(res){
            console.log(res.rows)
            this.banners = this.banners.concat(res.rows)
            console.log(this.banners)
          }
        }
      }).bind(this)
    },
    methods: {
  
    },
    created() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../static/css/index.less';
</style>
