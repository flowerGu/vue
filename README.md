# vue-cli+koa+mysql

> 搭建一个全栈项目，实现前后台分离
> model变化时，viewModel会自动更新，viewModel变化时，view也会变化，所以MVVM又被称为model-view-binder模式
> 项目正常启动需要安装全局全局安装http-server
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```md
* computed 计算属性（处理数据） 每当监听对应data中的数据发生变化时，都会重新求取计算属性，并触发更新相关dom
* slot相当于占位符，除了向子组件中传递数据，还可以传递dom元素，子组件结构:<slot name="head"></slot><slot></slot> 父组件结构:<h1 slot="head">i'm head</h1>。当子组件中的slot未定义name时(匿名slot)，则可以传递任一dom元素，若没有匿名slot,则会把将传递过来的dom元素删除
* ref为指定的元素或组件设置对应值，如果子组件中有设置方法，并且不会在事件中调用，可以通过this.$refs.swiper.todo()来调用
```
### koa(解决跨域问题)
```md
1. 基于koa的第三方插件(kcors)
2.// 跨域设置
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
})
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### vuex
> commit 处理状态
> mutation 定义状态
> state 公共数据
> actions 定义方法(dispatch 调用此方法)
