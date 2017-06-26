<template>
  <div class="hello">
    <img src="../assets/images/a.png"/>
    <h1>请登入您的账户</h1>
    <div class="login_wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" >
          <el-form-item prop="username" label=" ">
            <el-input placeholder="请输入手机号"  v-model="ruleForm.username" ></el-input>
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            <span class="me-ion-eye" @click="modi_type()"></span>
          </el-form-item>
        </p>
      </el-form>
      <el-button type="default" @click="submitForm('ruleForm')">登录</el-button>
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
        password:''
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
  methods:{
    modi_type(e){
      // var type = document.getElementById('pwd');
      // if(type.getAttribute('type') == 'password'){
      //   type.setAttribute('type','text');
      // }else{
      //   type.setAttribute('type','password');
      // }
    },
    submitForm(formName){
      const self=this;
      self.$refs[formName].validate((valid)=>{
        if(valid){
          self.$message.success('提交成功！');
          this.$router.push({path:'/'});//页面跳转
        }else{
          self.$refs[formName].resetFields();//重置操作
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
 @import '../assets/css/login.less';
</style>
