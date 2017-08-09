<template>
    <div class="product">
        <ul class="el-nav">
            <li :class="{'active':activeName==($index+1)}" v-for="(x,$index) in productName" @click="activeName=$index+1">{{x.name}}</li>            
            <p class="active-bar" :style="{'left':25*(activeName-1)+'%'}"></p>
        </ul>
        <div v-show="activeName==1" class="el-content">
            <list-item v-for="item in countrys" :id="item.id" @increment="toggle" 
                :key="item" 
                :wholeTitle="item.wholeTitle"
                :strInterestrate="item.strInterestrate"
                :strPhases="item.strPhases"
                tabStatus="nong"
                :surplus = "item.maxAmount-item.amount"
                :canbuy="item.status==1"></list-item>
                <p v-if="isShowCountry">没有更多了</p>
        </div>
        <div v-show="activeName==2"  class="el-content">
            <list-item v-for="(item,index) in bloom" @increment="toggle(item)" :class="[{'champin':index==0},'num'+(index+1)]"
                :key="item" 
                :data-jump="item.id"
                :wholeTitle="item.title"
                :strInterestrate="item.maxRate"
                :strPhases="item.closed_period"
                tabStatus="door"
                :canbuy="item.productStatus=='pub'"
                :surplus="item.max_amount-parseFloat(item.total_amount)"
                :strMin="item.minRate"></list-item>
        </div>
        <div v-show="activeName==3"  class="el-content">
            <list-item v-for="item in transfer" :key="item" :data-jump="item.productId" @increment="toggle(item)"
                :wholeTitle="item.title"
                :strInterestrate="item.maxRate"
                :strPhases="item.closePeriod"
                tabStatus=""
                :canbuy="item.status=='0'"
                :surplus="parseFloat(item.amount)"
                :strMin="item.minRate"
                :surplusDays="item.surplusDays"></list-item></div>
        <div v-show="activeName==4" class="el-content">444</div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                listItemActive:0,
                activeName:1,
                countrys:[],
                bloom:[],
                transfer:[],
                countryPage:1,
                bloomPage:1,
                transferPage:1,
                isShowCountry:false,
                isShowBloom:false,
                isShowTransfer:false,
                productName:[
                    {name:'翼农计划'},
                    {name:'芝麻开花'},
                    {name:'私人定制'},
                    {name:'转让专区'}
                ]
            }
        },
        created(){
            var _ = this;
            _.getCountryPlan(_.countryPage);
            _.getBloom(_.bloomPage);
            _.getTransfer(_.transferPage);
            window.addEventListener('scroll', function(){
                if(_.$root.scrollTop() + _.$root.windowHeight() == (_.$root.documentHeight()/*滚动响应区域高度取50px*/)){
                    console.log('arrive down') ;
                    switch (_.activeName){
                        case "first":
                            _.getCountryPlan(++_.countryPage);
                            break;
                        case "second":
                            _.getBloom (++_.bloomPage);
                            break;
                    }
                }
            }, false)
        },
        methods:{
            toggle(el,proData) {
                if(el.target.className=="canbuy" && !this.$localStore.get('tokenid')){
                    this.$router.push({path:'/login'})
                }else{
                    this.$router.push({
                        path:'/productDetail',
                        // name:'产品详情',
                        // params:{id:e.id},
                        query: { id:proData.id,platform:this.activeName}
                    })
                }
            },           
            //翼龙计划
            getCountryPlan(page){
                var _ = this;
                if(page>=4){
                    _.isShowCountry=true;
                    return false;
                }
                _.$ajax({
                    url:'../../static/js/json/country.json',
                    key:{random:Math.random(),page:page},
                    type:'get',
                    success:function(res){
                        _.countrys = _.countrys.concat(res.data.data)
                    }
                })
            },
            //芝麻开花
            getBloom(page){
                var _ = this;
                if(page>=4){
                    _.isShowBloom=true;
                    return false;
                }
                _.$ajax({
                    url:'../../static/js/json/bloom.json',
                    key:{random:Math.random(),page:page},
                    type:'get',
                    success:function(res){
                        _.bloom = _.bloom.concat(res.data.result)
                    }
                })
            },
            //转让专区
            getTransfer(page){
                var _ = this;
                if(page>=2){
                    _.isShowTrasfer=true;
                    return false;
                }
                _.$ajax({
                    url:'../../static/js/json/transfer.json',
                    key:{random:Math.random(),page:page},
                    type:'get',
                    success:function(res){
                        _.transfer = _.transfer.concat(res.data.result)
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../static/css/product.less';
</style>
