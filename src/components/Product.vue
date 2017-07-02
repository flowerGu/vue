<template>
    <div class="product">
        <el-tabs v-model="activeName">
            <el-tab-pane label="翼农计划" name="first">
                <ListItem v-for="item in countrys" :data-jump="item.id"
                :key="item" 
                :wholeTitle="item.wholeTitle"
                :strInterestrate="item.strInterestrate"
                :strPhases="item.strPhases"
                :tabStatus="true"
                :canbuy="item.status==1"></ListItem>
                <p v-if="isShowCountry">没有更多了</p>
            </el-tab-pane>
            <el-tab-pane label="芝麻开花" name="second">
                <ListItem v-for="item in bloom" :data-jump="item.id"
                :key="item" 
                :wholeTitle="item.title"
                :strInterestrate="item.maxRate"
                :strPhases="item.closed_period"
                :tabStatus="false"
                :canbuy="item.productStatus=='pub'"
                :surplus="item.max_amount-parseFloat(item.total_amount)"
                :strMin="item.minRate"></ListItem>
            </el-tab-pane>
            <el-tab-pane label="私人定制" name="third">333</el-tab-pane>
            <el-tab-pane label="转让专区" name="four">444</el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
    export default{
        data(){
            return {
                listItemActive:0,
                activeName:'first',
                countrys:[],
                bloom:[],
                countryPage:1,
                bloomPage:1,
                isShowCountry:false,
                isShowBloom:false
            }
        },
        created(){
            var that = this;
            that.getCountryPlan(that.countryPage);
            that.getBloom(that.bloomPage);
            window.addEventListener('scroll', function(){
                console.log(that.activeName)
                if(that.$root.scrollTop() + that.$root.windowHeight() == (that.$root.documentHeight()/*滚动响应区域高度取50px*/)){
                    console.log('arrive down') ;
                    switch (that.activeName){
                        case "first":
                            that.getCountryPlan(++that.countryPage);
                            break;
                        case "second":
                            that.getBloom (++that.bloomPage);
                            break;
                    }
                }
            }, false)
        },
        methods:{
            //翼龙计划
            getCountryPlan(page){
                var that = this;
                if(page>=4){
                    that.isShowCountry=true;
                    return false;
                }
                that.$http.get('../static/js/json/country.json?random='+Math.random()+'&page='+page).then(res=>{
                    var res = res.body;
                    that.countrys = that.countrys.concat(res.data.data)
                })
            },
            //芝麻开花
            getBloom(page){
                var that = this;
                if(page>=3){
                    that.isShowBloom=true;
                    return false;
                }
                that.$http.get('../static/js/json/bloom.json?random='+Math.random()+'&page='+page).then(res=>{
                    var res = res.body;
                    that.bloom = that.bloom.concat(res.data.result)
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../../static/css/product.less';
</style>