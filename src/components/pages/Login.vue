<template>
  <div class="hello">
    <img src="../../../static/images/a.png"/>
    <h1>请登入您的账户</h1>
    <div class="login_wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" >
          <el-form-item prop="username" label=" " :show-message="ruleForm.showMessage">
            <el-input placeholder="请输入手机号"  v-model="ruleForm.username" @keyup.native="checkValue('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item prop="password" label=" " :show-message="ruleForm.showMessage">
            <el-input :type="ruleForm.type" placeholder="请输入密码" v-model="ruleForm.password" @keyup.native="checkValue('ruleForm')" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            <span :class="{'me-ion-eye':!ruleForm.eye,'me-ion-eye-disabled':ruleForm.eye}" @click="modi_type()"></span>
          </el-form-item>
        </p>
      </el-form>
      <el-button type="default" @click="submitForm('ruleForm')" :disabled="ruleForm.dis">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var checkUserName = (rule,value,callback)=>{//校验用户名
      if(!value){
         callback(new Error('请输入用户名'));
      }else if(!/^1[3-8]\d{9}$/.test(value)){
         callback(new Error('用户名格式不正确'));
      }else{
        callback();
      }
    };
    var checkPassWord = (rule,value,callback)=>{
      if(!value){
        callback(new Error('请输入密码'));
      }else{
        callback();
      }
    }
    return {
      ruleForm:{
        username:'',
        password:'',
        dis:true,
        showMessage:false,
        type:'password',
        eye:true
      },
      rules:{
        username:[
          {validator:checkUserName,trigger:'blur'},
        ],
        password:[
          {validator:checkPassWord,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  created: function () {
    window.addEventListener('keyup', this.previous)
  },
  methods:{
    modi_type(e){
      this.ruleForm.eye=!this.ruleForm.eye;
      this.ruleForm.type=this.ruleForm.type=='password'?'text':'password';
    },
    checkValue(forms){
      this.$refs[forms].validate((valid)=>{
        if(valid){
          this.ruleForm.dis=false;
        }else{
          this.ruleForm.dis=true;
        }
      })
    },
    submitForm(formName){
      const self=this;
      this.ruleForm.showMessage=true;
      self.$refs[formName].validate((valid)=>{
        if(valid){
          self.$message({
            message:'登录成功',
            type:'success',
            onClose:function(){
              self.$localStore.set('phone',self.ruleForm.username);
              self.$localStore.set('tokenid',self.ruleForm.password);
              self.$router.push({path:'/'})//页面跳转
            }
          });
        }else{
          // self.$refs[formName].resetFields();//重置操作
        }
      })
    }
  }
}
</script>
<style lang="less">
 @import '../../../static/css/login.less';
</style>
