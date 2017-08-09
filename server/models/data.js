import db from '../config/db.js' // 引入todolist的表结构
const bannerModel = '../schema/banner.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(bannerModel)

const getBanner = async function () {
  const banners = await Todolist.findAndCountAll({ // 查找全部的banner    
    attributes: ['id', 'banner_url', 'title'] // 只需返回这三个字段的结果即可
  }) 
  return banners // 返回数据
}


export default { 
  getBanner
}
