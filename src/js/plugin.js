// import Vue from 'vue'
import router from '../router'
var Toast={},
    showToast=false,

    Loading={},
    loadNode=null,
    showLoad=false,
    Dialog = {},
    dialogNode=null;
Toast.install = function(Vue,options){
    Vue.prototype.$toast = (tips,type)=>{
        var type = type || 'bottom';
        if(showToast){
            return; // 如果toast还在，则不再执行
        }
        let Toast = Vue.extend({
            data(){
                return {
                    showToast:showToast,
                }
            },
            template:'<div class="tips type-'+type+'" v-if="showToast">'+tips+'</div>'
        })
        let vm = new Toast();
        let tpl = vm.$mount().$el;//创建实例，挂载到文档后
        document.body.appendChild(tpl);
        vm.showToast = showToast = true;
        setTimeout(function(){
            // document.body.removeChild(tpl);
            vm.showToast=showToast= false;
        },1500)
    }
}
Loading.install = function(Vue,options){
    Vue.prototype.$loading=(o)=>{
        var tips = o.tips || '加载中';
        if(o.type=="close"){
            loadNode.showLoad = showLoad = false;
        }else{
            if(showLoad){
                return;
            }
            let Loading = Vue.extend({
                data(){
                    return {
                        showLoad:showLoad
                    }
                },
                template:'<div v-if="showLoad" class="load-box"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div><div class="load-content">'+tips+'</div></div></div>'
            })
            loadNode = new Loading();
            var tpl = loadNode.$mount().$el;
            document.body.appendChild(tpl);
            loadNode.showLoad = showLoad= true;  
        }
    }
}
Dialog.install = (Vue,options)=>{
    Vue.prototype.$dialog=(o)=>{
        let Dialog = Vue.extend({
            data(){
                return {
                    title:o.title,
                    btn:o.btn,
                    text:o.text,
                    showDialog:false,
                    num:o.btn.length,
                    cls:o.class
                }
            },
            created(){
            },
            template:'<div class="dialog-wrap" v-if="showDialog"><div class="dialog-layer" v-if="showDialog"></div><div class="dialog-box" v-if="showDialog"><div class="dialog-title" v-if="title">{{title}}</div><div class="dialog-content">{{text}}</div><div class="dialog-btn-container"><div class="dialog-btn" v-for="item in btn":key="item" @click="handle(item)" :class="cls" :style="{width:100/num +\'%\' }" >{{item.text}}</div></div></div></div>',
            methods:{
                handle(el){
                    this.showDialog=false;
                    if(el.callback){
                        if(typeof el.callback == 'function'){
                            el.callback()
                        }else if(typeof el.callback == 'string') {
                            router.push({path:el.callback})
                        }
                    }
                }
            }
        })
        dialogNode = new Dialog();
        var tpl = dialogNode.$mount().$el;
        document.body.appendChild(tpl);
        dialogNode.showDialog = true;
    }
}
export {Toast}
export {Loading}
export {Dialog}