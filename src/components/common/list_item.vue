<template>
    <li class="mana-over-li">
		<a alt="跳转详情页" href="javascript:;" :class="{bloom:!tabStatus}" @click.prevent="toDo($event)"  :data-jump="id">
		<div class="mana-over-t clearfix">
			<p>{{wholeTitle}}</p>
            <p v-if="canbuy">剩余可投:{{surplus | decimal}}万元</p>
		</div>
		<div class="mana-buy-over">
			<ol class="mana-over-ol clearfix">
				<li>
					<p class="mana-over-red">
                        <span class="mana-over-num1">
                            <label v-if="tabStatus=='door'">{{strMin}}-</label>{{strInterestrate | replaceChinese}}</span><span class="mana-over-num2">%</span></p>
					<p>预期年化收益</p>
				</li>
				<li>
					<p class="mana-over-black">
                        <span class="mana-over-num1" v-if="tabStatus">{{strPhases | replaceChinese}}</span>
                        <span class="mana-over-num1" v-else>{{surplus | separator}}</span>
                    </p>
					<p v-if="tabStatus=='nong'">合约期限(天)</p>
                    <p v-else-if="tabStatus=='door'">封闭期(天)</p>
                    <p v-else>转让金额(元)</p>
				</li>
				<li class="clearfix">
                    <p class="canbuy" v-if="canbuy" >购买</p>
					<p :class="[{'mana-over-btn': tabStatus,'transfer-over-btn': !tabStatus },'status_p']" v-else></p>
				</li>
			</ol>
		</div>
        <p class="extra clearfix" v-if="tabStatus !='nong' && tabStatus !='door'"><span>剩余天数{{surplusDays}}天</span><span>封闭期{{strPhases}}天</span></p>
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
            strMin:[String,Number],
            surplusDays:String
        },
        methods:{
            toDo: function (e) {
                this.$emit('increment',e,this.$options.propsData)
            }
        }
    }
</script>

<style lang="less">
@import '../../../static/css/base.less';
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
                    width:100%;                    
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
            margin:0;
            height:2.5rem;
            text-align: left;
            p:nth-of-type(2){
                font-size:.6rem;
            }
            &:nth-of-type(2){
                p{
                    text-align:center;
                }
            }
            &:nth-of-type(3){
                text-align:right;
            }
        }
        .mana-over-ol .mana-over-black {
            color: #7a7a7a;
        }
        .mana-over-ol>li p {
            display:inline-block;
            color: #b3b3b3;
            width:100%;
            &.canbuy{
                width:3rem;
                height: 1rem;
                text-align: center;
                line-height: 1rem;
                background: #f84d4d;
                color: #fff;
                border-radius: 0.093333rem;
                margin-top: .5rem;
                font-size: 0.6rem;
                color:#fff;
            }
        }
        .mana-over-ol>li {
            p.status_p{
                width: 3rem;
                height: 2rem;
                &.mana-over-btn{
                    background: url(../../../static/images/end-bg.png) no-repeat right center;
                }
                &.transfer-over-btn{
                    background: url(../../../static/images/end-bg3.png) no-repeat right center;
                }
            }
        }
    }
    .mana-over-num2{
        font-size:.8rem;
    }
    .mana-over-ol{
        width:100%;
        .flex;
    }
    .extra{
        font-size:.6rem;
        padding:0 4%;
        border-top:2px solid #f0f0f0;
        span:nth-of-type(1){
            float:left;
        }
        span:nth-of-type(2){
            float:right;
        }
    }
</style>