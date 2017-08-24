import db from '../config/db.js' // 引入todolist的表结构
const bannerModel = '../schema/banner.js'
const iconModel = '../schema/icon.js'
const TodolistDb = db.Todolist // 引入数据库

const banner = TodolistDb.import(bannerModel)
const icon = TodolistDb.import(iconModel)
const getBanner = async function () {
  const banners = await banner.findAndCountAll({ // 查找全部的banner    
    attributes: ['id', 'banner_url', 'title'] // 只需返回这三个字段的结果即可
  }) 
  return banners // 返回数据
}
const getIcons = async function(){
  const icons = await icon.findAll({
    attributes:['id','icon_url','text']
  })
  return icons;
}

export default { 
  getBanner,
  getIcons
}
