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
<<<<<<< HEAD
          <input type="text" v-model.trim="ruleForm.username" name="username" placeholder="请输入手机号"autocomplete="off" @blur="checkValueUser"/>
        </div>
        <div class="form_item">
          <label for="password" class="me-ion-a-lock"></label>
          <input type="password" v-if="ruleForm.curType=='password'" v-model.trim="ruleForm.password" name="password" @blur="checkValuePwd" placeholder="请输入密码" @keyup.enter="submitForm"/>
          <input type="text"   v-model="ruleForm.password" name="password" placeholder="请输入密码" @blur="checkValuePwd" @keyup.enter="submitForm" v-else/>
          <span :class="ruleForm.eye?'me-ion-eye':'me-ion-eye-disabled'" @click="modi_type"></span>
        </div>
      </form>
      <button :disabled="!dis" @click="submitForm()">登录</button>
=======
          <input type="text" v-model.trim="ruleForm.username" name="username" placeholder="请输入手机号/邮箱" @blur="checkValueUser" @keyup="count"/>
        </div>
        <div class="form_item">
          <label for="password" class="me-ion-a-lock"></label>
          <input type="password" v-if="ruleForm.curType=='password'" v-model.trim="ruleForm.password" name="password" @blur="checkValuePwd" placeholder="请输入密码" @keyup="count" @keyup.enter="submitForm"/>
          <input type="text"   v-model="ruleForm.password" name="password" placeholder="请输入密码" @blur="checkValuePwd" @keyup="count" @keyup.enter="submitForm" v-else/>
          <span :class="ruleForm.eye?'me-ion-eye':'me-ion-eye-disabled'" @click="modi_type"></span>
        </div>
      </form>
      <button :disabled="dis" @click="submitForm()">登录</button>
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
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
      ruleForm:{
        username:'15726684112',
        password:'',
        eye:false,
        curType:'password'        
<<<<<<< HEAD
      }
    }
  },
  created(){
=======
      },
      dis:true
    }
  },
  created: function () {
    console.log()
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
    window.addEventListener('keyup', this.previous)
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
<<<<<<< HEAD
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
            _.$localStore.set('phone',_.ruleForm.username);
            _.$sessionStore.set('token',res.token);
            var redirect = _.$route.query.redirect;
            _.$router.push({path:redirect?redirect:'/'})//页面跳转
            
          }else{
            _.$toast(res.info);
=======
    },   
    count(){  
      if(this.ruleForm.password!=='' && /^1[3-8]\d{9}$/.test(this.ruleForm.username)){    
         this.dis= false;
      }else{
        this.dis=true;
      }
    },
    submitForm(){
      var _ = this; 
      console.log(_.dis)  
      if(_.dis){
        return false;
      }
      _.$ajax({
        url:'login',
        key:{
          password:hex_md5(this.ruleForm.password),
          logintel:_.ruleForm.username,
        },
        success:function(res){
          if(res.code=='000'){
            _.$localStore.set('phone',_.ruleForm.username);
            _.$localStore.set('tokenid',res.tokenid);
            var redirect = _.$route.query.redirect;
            _.$router.push({path:redirect?redirect:'/'})//页面跳转
          }else{
            _.$toast({'tips':data.msg});
>>>>>>> ef07f91f70069ac4120bb9883331c94888a420a4
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
