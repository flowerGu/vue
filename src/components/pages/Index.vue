<template>
  <div class="index-page">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in banners" :key="item">
<<<<<<< HEAD
        <img :src="item.banner_url" :title="item.title" />
=======
        <img :src="item.pic_url" :title="item.title" />
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
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
<<<<<<< HEAD
      swiper() {
        console.log(this.banners)
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      var _=this;      
      _.$ajax({
        url:'/data/banner',
        type:'get',
        key:{},
        success:function(res){
          if(res){
            console.log(res.rows)
            _.banners = _.banners.concat(res.rows)
            console.log(_.banners)
          }
=======
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
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
        }
      })
    },
    methods: {
  
    },
    created() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<<<<<<< HEAD
<style lang="less" scoped>
=======
<style lang="less" scope>
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
  @import '../../../static/css/index.less';
</style>
