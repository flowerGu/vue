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
* vuecli中，动态添加组件引入本地静态图片，报404，解决方法：
```js
require('../../statics/images/btn_right.png');
require(`@/images/btn.png`);//此时引用飘号，来解析@字符，此刻的images是在src文件中新增的文件夹
```
```
```md
* computed 计算属性（处理数据） 每当监听对应data中的数据发生变化时，都会重新求取计算属性，并触发更新相关dom
* slot相当于占位符，除了向子组件中传递数据，还可以传递dom元素，子组件结构:<slot name="head"></slot><slot></slot> 父组件结构:<h1 slot="head">i'm head</h1>。当子组件中的slot未定义name时(匿名slot)，则可以传递任一dom元素，若没有匿名slot,则会把将传递过来的dom元素删除
* ref为指定的元素或组件设置对应值，如果子组件中有设置方法，并且不会在事件中调用，可以通过this.$refs.swiper.todo()来调用
* Vue是如何实现数据的双向绑定:   把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，<b>Vue 将遍历此对象所有的属性</b>，并使用 <b>Object.defineProperty 把这些属性全部转为 getter/setter</b>。Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因
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

### 改变model层数组中的值，view层中未发生变化
https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列
```js
/*1.*/this.$data.templatelist[index].status = true;
      this.$data.templatelist = Object.assign({}, this.$data.templatelist);

/*2*/this.$set(this.$data.templatelist[index], 'status', true);
```


### vuex
> commit 处理状态
> mutation 定义状态
> state 存储公共数据
> actions 定义方法(dispatch 调用此方法)
> mapState通过扩展运算符(...mapState)将store.state中的值 映射this上（此...mapState方法直接写在computed对象中）  这个this 很重要，这个映射直接映射到当前Vue的this对象上。
* mysql环境可以用jspstudy工具来搭建，方便简洁易操作，（搭建时先看下sql文件夹中的api操作）
