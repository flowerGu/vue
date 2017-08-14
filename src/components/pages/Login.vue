<template>
  <div class="login" style="padding-top: 2rem;">
    <img src="../../../static/images/a.png"/>
    <h1>请登入您的账户</h1>
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
          <input type="text" v-model.trim="ruleForm.username" name="username" placeholder="请输入手机号"autocomplete="off" @blur="checkValueUser"/>
        </div>
        <div class="form_item">
          <label for="password" class="me-ion-a-lock"></label>
          <input type="password" v-if="ruleForm.curType=='password'" v-model.trim="ruleForm.password" name="password" @blur="checkValuePwd" placeholder="请输入密码" @keyup.enter="submitForm"/>
          <input type="text"   v-model="ruleForm.password" name="password" placeholder="请输入密码" @blur="checkValuePwd" @keyup.enter="submitForm" v-else/>
          <span :class="ruleForm.eye?'me-ion-eye':'me-ion-eye-disabled'" @click="modi_type"></span>
        </div>
        <div class="form_item">
          <label for="" :class="[!checked?'me-ion-o-circle-outline':'me-ion-o-checkmark', 'remember']"></label>
          <input type="checkbox" v-model="checked" value="">
          <p>记住我</p>
        </div>        
      </form>
      <button :disabled="!dis" @click="submitForm">登录</button>
    </div> 
  </div>
</template>

<script>
// import FormItem from '../common/form_item';
export default {
  // components:{FormItem},
  data () {
    return {
      formData:[
        {
          type:'text',
          cls:'me-ion-a-phone-portrait',
          placeholder:'请输入手机号/邮箱',
          name:'username',
          vModel:'',
          showEye:false,
          eye_status:false,
          reg:/^1[3-8]\d{9}$/
        },
        {
          type:'password',
          cls:'me-ion-a-lock',
          placeholder:'请输入密码',
          name:'password',
          vModel:'',
          showEye:true,
          eye_status:false,
          reg:'required'         
        },
      ],
      a:0,
      checked:false,
      ruleForm:{
        username:'',
        password:'',
        eye:false,
        curType:'password'        
      }
    }
  },
  created(){
    window.addEventListener('keyup', this.previous)
    var phone = this.$localStore.get('phone')
    if(phone){
      this.checked=true;
      this.ruleForm.username = phone
    }
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
    modi_type(){
        this.ruleForm.curType = this.ruleForm.curType=='text'?'password':'text';
        this.ruleForm.eye=!this.ruleForm.eye;
    },
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
        url:'/auth/login',
        key:{
          password:this.ruleForm.password,
          name:_.ruleForm.username,
        },
        success:function(res){          
          if(res.success){
            _.cookie.set('phone',_.ruleForm.username);
            _.cookie.set('token',res.token);
            if(_.checked){
              _.$localStore.set('phone',_.ruleForm.username)
            }else{
              _.$localStore.get('phone') && _.$localStore.remove('phone');
            }
            var redirect = _.$route.query.redirect;
            _.$router.push({path:redirect?redirect:'/'})//页面跳转            
          }else{
            _.$toast(res.info);
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
 @import '../../../static/css/login.less';
</style>
