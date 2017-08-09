import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel)

const getTodolistById = async function (id) {
  const todolist = await Todolist.findAndCountAll({ // 查找全部的todolist
    where: {
      user_id: id
    },
    offset: 0,//第几条开始
    limit: 3,//显示几条
    attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
  }) 
  return todolist // 返回数据
}

const createTodolist = async function (data) {// 给某个用户创建一条todolist
  await Todolist.create({
    user_id: data.id,// 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status
  })
  return true
}

const removeTodolist = async function (id, user_id) {
  await Todolist.destroy({
    where: {
      id,
      user_id
    }
  })
  return true
}

const updateTodolist = async function (id, user_id, status) {
  await Todolist.update(
    {
      status
    },
    {
      where: {
        id,
        user_id
      }
    }
  )
  return true
}

export default {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
