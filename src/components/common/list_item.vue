<template>
    <li class="mana-over-li delay" data-jump="id">
		<a alt="跳转详情页" href="" :class="{bloom:!tabStatus}">
		<div class="mana-over-t clearfix">
			<p>{{wholeTitle}}</p>
            <p v-if="canbuy">剩余可投:{{surplus | decimal}}万元</p>
		</div>
		<div class="mana-buy-over">
			<ol class="mana-over-ol clearfix">
				<li>
					<p class="mana-over-red">
                        <span class="mana-over-num1">
                            <label v-if="!tabStatus">{{strMin}}-</label>{{strInterestrate | replaceChinese}}</span><span class="mana-over-num2">%</span></p>
					<p>预期年化收益</p>
				</li>
				<li>
					<p class="mana-over-black"><span class="mana-over-num1">{{strPhases | replaceChinese}}</span></p>
					<p v-if="tabStatus=='nong'">合约期限(天)</p>
                    <p v-else-if="tabStatus=='door'">封闭期(天)</p>
                    <p v-else>转让金额(元)</p>
				</li>
				<li class="clearfix">
                    <p class="canbuy" v-if="canbuy">购买</p>
					<p class="mana-over-btn" v-else></p>
				</li>
			</ol>
		</div>
        <p><span>剩余天数天</span><span>封闭期天</span></p>
		</a>
	</li>
</template>

<script>
    export default{
        props:{
            wholeTitle:String,
            strInterestrate:[String, Number],
            strPhases:[String,Number],
            id:String,
            tabStatus:String,
            canbuy:Boolean,
            surplus:Number,
            strMin:[String,Number]
        },
       
        filters:{
            replaceChinese(value){
                if(typeof value!='number' && value.match(/^[0-9]+\.?[0-9]*/)){
                    return value.match(/^[0-9]+\.?[0-9]*/)[0] 
                }else{
                    return value
                }               
            },
            decimal(value){
                return typeof value=='number' && value/10000
            }
        }
    }
</script>

<style lang="less">
    .mana-over-li{
        margin-bottom:.5rem;
        background:#fff;
        >a{
            display:block;
            width:100%;
            color:#878787;
            text-decoration: none;
            &.bloom{
                color:#333;
                .mana-over-red{
                    color:#f84d4d;
                }
                .mana-over-ol{
                    .mana-over-black{
                        color:#333!important;
                    }
                }
            }
        }
        .mana-over-t, .mana-buy-over, .mana-over {
            width: 100%;
            padding: 0 4%;
            background: #fff;
        }
        .mana-over-t p{
            text-align:left;
            font-size:.8rem;
            line-height: 2.3rem;
            &:nth-of-type(1){
                float:left;
            }
            &:nth-of-type(2){
                font-size:.6rem;
                float:right;
            }
        }
        .mana-over-ol .mana-over-red {
            color: #fa8b8b;
        }
        .mana-buy-over>.mana-over-ol li {
            float: left;
            width: 33.3333%;
            height:3rem;
            text-align: left;
            padding-bottom: 0.4rem;
            p:nth-of-type(2){
                font-size:.6rem;
            }
            &:nth-of-type(2){
                p{
                    text-align:center;
                }
            }
        }
        .mana-over-ol .mana-over-black {
            color: #7a7a7a;
        }
        .mana-over-ol>li p {
            color: #b3b3b3;
            &.canbuy{
                width:2rem;
                height: 1rem;
                text-align: center;
                line-height: 1rem;
                background: #f84d4d;
                color: #fff;
                border-radius: 0.093333rem;
                float:right;
                margin-right:1rem;
                margin-top: .5rem;
                font-size: 0.6rem;
                color:#fff;
            }
        }
        .mana-over-ol>li .mana-over-btn {
            width: 3rem;
            height: 2rem;
            background: url(../../../static/images/end-bg.png) no-repeat right center;
            // background-size: cover;
            margin-left:calc(33% - 3rem);
            // float: right;
        }
        
    }
    .mana-over-num2{
        font-size:.8rem;
    }
    
</style>