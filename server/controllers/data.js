import data from '../models/data.js'
const getBanners = async function (ctx) {
  const type = ctx.params.type // 获取url里传过来的参数里的id
  if(type=='1'){
    const result = await data.getBanner() // 通过await “同步”地返回查询结果
    ctx.body = result
  }else{
    const iconResult = await data.getIcons();//图标
    ctx.body = iconResult
    console.log('rrrrr',iconResult)
  }  
}

export default {
  getBanners  
}
