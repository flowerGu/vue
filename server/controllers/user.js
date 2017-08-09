import user from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncBusboy from 'async-busboy';
import path from 'path'
import fs from 'fs'
import os from 'os'
import captcha from 'trek-captcha'
let code;
const register = async function(ctx){
  console.log('denglu',code,)
  const data = ctx.request.body;
  if(data.code!=code){
    ctx.body={
      success:false,
      info:'验证码不正确'
    }
    return false;
  }
  const regRes = await user.addRegister(data.name,bcrypt.hashSync(data.password,1));  
  if(regRes){
    ctx.body={
      success:true,
      info:'注册成功'
    }
  }else{
    ctx.body={
      success:false,
      info:'已有该账号'
    }
  }
}

const getCode = async function(ctx){
  const {token, buffer} = await captcha({size:4,style:-1});
  fs.createWriteStream('resource/code.gif').on('finish', () => {
    code=token
  }).end(buffer)
  ctx.body={
    success:true,
    info:'成功'
  }
}
const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await user.getUserById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}
const postUserAuth = async function (ctx) {
  
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.name)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id,
        // exp:Math.floor(Date.now()/1000)+60*60*2
      }
      const secret = 'minxin' // 指定密钥 这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken, secret,{expiresIn:'2h'}) // 签发token      
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

const upload = async function (ctx) {
  let {files,fields} = await asyncBusboy(ctx.req); //files为上传文件，fields为传递其他数据
  //此数组用于存储图片的url
  var fileNames = [],
      opts = { };
  files.forEach((file,i) => {    
    if (file.filename) {
      var filename = file.filename,
          homeDir = path.resolve(__dirname, '../../resource'),
          target = '',
          newpath = '',
          type = filename.substr(filename.lastIndexOf('.')).toLowerCase(),
          newFileName = new Date().getTime()+type;
      switch (true){
        case ('.jpg.png.gif').indexOf(type)>-1:
          newpath = 'images';
          break;
        case ('.txt').indexOf(type)>-1:
          newpath = "txt";
          break;
        default:
          newpath = "media";
          break;
      }      
      target = path.join(homeDir,newpath);
      //检查目标存放目录是否存在
      if (!fs.existsSync(target)) {
          fs.mkdir(target);
      }
      //生成存储路径，要注意这里的newpath必须是绝对路径，否则Stream报错
      var stream = fs.createWriteStream(path.join(target,newFileName));
      fileNames.push({filename:newFileName,path:newpath});
      //写入文件流
      file.pipe(stream);
    }else if(file.length) {
     opts[file[0]] = file[1];
    }
  })
  if(fileNames.length > 0){
    opts.userPath = 'http://localhost:3101/'+fileNames[0].path +'/'+ fileNames[0].filename;
  }  
  const userInfo = await user.uploadUserImg(fields.name,opts.userPath)
  if (!userInfo) { // 如果查无此用户会返回null
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }else{
    ctx.body = {
      success: true,
      info: '上传成功',
      url:opts.userPath
    }
  }
}



export default {
  register,
  getUserInfo,
  postUserAuth,
  upload,
  getCode
}
