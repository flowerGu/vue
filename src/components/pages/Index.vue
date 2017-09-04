<template>
  <div class="index-page">
    <div class="hd-fixed">
      <img src="../../../static/images/logo.jpg" alt="">
      <div class="search-box">
        <input type="text" placeholder="输入关键字搜索">
        <i class="me-ion-o-search-strong"></i>
      </div>
      <div class="sepa-div">
        <i class="me-ion-navicon-round"></i>
        分类
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in banners" :key="index" style="float:left">
        <img :src="'http://'+item.banner_url" :title="item.title" />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination">
        <span v-for="item,index in banners">index</span>
      </div>
    </swiper>
    <div class="home-head">
      <div class="hotref">
        <img src="../../assets/images/hotref.jpg" alt="">
        <router-link to="/"></router-link>
        <router-link to="/"></router-link>
        <router-link to="/"></router-link>
      </div>
      <div class="hot-wrap flex">
        <span v-for="item,index in icons"><img :src="'http://'+item.icon_url" alt="">{{item.text}}</span>        
      </div>
      <div class="headline">
        <div class="head-fl">
          <router-link :to="'/productDetail?id=nike'"><img src="../../assets/images/nike.png" alt=""></router-link>
          <router-link to="/"><img src="../../assets/images/ultra.png" alt=""></router-link>
        </div>
        <router-link to="/" class="head-fr"><img src="../../assets/images/puma.png" alt=""></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide }  from 'vue-awesome-swiper'
  var _;
  // Vue.use(VueAwesomeSwiper)
  export default {
    components: {  
        swiper,  
        swiperSlide  
    },  
    data() {
      return {
        banners: [],
        icons:[],
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
    updated() {
      //  
    },
    methods: {
      loadImg:(data)=>{
        _.$ajax({
          url:'/data/imgList/'+data,
          type:'get',
          key:{},
          success:function(res){
            if(res){
              if(data==1){
                  _.banners = _.banners.concat(res.rows)
              }else{
                _.icons = _.icons.concat(res);
                console.log(_.icons)
              }
            }
          }
        })
      }
    },
    created() {
      _=this;
      _.loadImg(1)//banner
      _.loadImg(2);//icon  
    },
    mounted(){
        
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../static/css/index.less';
  
</style>
