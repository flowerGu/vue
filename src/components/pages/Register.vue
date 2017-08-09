<template>
  <div class="login" style="padding-top: 2rem;">
    <img src="../../../static/images/a.png"/>
    <h1>注册</h1>
    <div class="login_wrap">
      <form ref="form">
        <!--<form-item 
          ref="input"
          v-for="item in formData" 
          :key="item" 
          :showEye="item.showEye" 
          :type.sync="item.type" 
          :name="item.name" 
          :vModel="item.vModel"
          :itemCls="item.cls" 
          @blur="checkValue($event,item)"  
          @keyup="count()"        
          :placeh="item.placeholder">
        </form-item>-->
        <div class="form_item">
          <label for="username" class="me-ion-a-phone-portrait"></label>
          <input type="text" v-model.trim="ruleForm.username" name="username" placeholder="请输入手机号" autocomplete="off" @blur="checkValueUser"/>
        </div>
        <div class="form_item">
          <label for="password" class="me-ion-a-lock"></label>
          <input type="text" v-model="ruleForm.password" name="password" placeholder="请输入密码" @blur="checkValuePwd"/>
        </div>
        <div class="form_item">
          <label for="password" class="me-ion-pin"></label>
          <input type="text" name="re_password" placeholder="请确认密码"/>
        </div>
      </form>
      <button @click="submitForm" :disabled="!dis">注册</button>
      <img :src="imgsrc" alt="" @click="getCode">
    </div>
  </div>
</template>

<script>
// import FormItem from '../common/form_item';
export default {
  // components:{FormItem},
  data () {
    return {
        ruleForm:{
            username:'',
            password:''
        },
        imgsrc:''
    }
  },
  created(){
    window.addEventListener('keyup', this.previous);
    this.getCode()
  },  
  computed:{
    dis(){  
      if(this.ruleForm.password!=='' && /^1[3-8]\d{9}$/.test(this.ruleForm.username)){    
         return true;
      }else{
        return false;
      }
    }
  },
  methods:{
    checkValueUser(){      
      if(!/^1[3-8]\d{9}$/.test(this.ruleForm.username)){
        this.$toast('手机号格式不正确');
      }
    },
    checkValuePwd(){
      if(this.ruleForm.password==''){
        this.$toast('密码不能为空');
      }  
    },
    submitForm(){
      var _ = this; 
      if(!_.dis){
        return false;
      }
      _.$ajax({
        url:'/auth/register',
        key:{
          password:this.ruleForm.password,
          name:_.ruleForm.username,
        },
        success:function(res){          
          if(res.success){  
            _.$toast('注册成功，正要跳转登录页面');
            _.$nextTick(function(){
              _.$router.push({path:'/login'})//页面跳转
            },2000)      
          }else{
            _.$toast(res.info);
          }
        }
      })
    },
    getCode(){
      this.$ajax({
        type:'get',
        url:'/auth/getCode',
        success:(res)=>{
          console.log(res)
          this.imgsrc = 'http://localhost:3101/code.gif?' + Math.random()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
 @import '../../../static/css/login.less';
</style>
