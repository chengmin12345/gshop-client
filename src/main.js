/*
入口js
*/
import Vue from 'vue'
// 按需引入mint-ui里的Button组件
import {Button} from 'mint-ui'
import App from './App.vue'
import store from './store'

// 引入vue-load插件
import VueLazyload from 'vue-lazyload'

// 加载mockServer即可
import './mock/mockServer'

// 引入loading图
import loading from './common/imgs/loading.gif'
// 加载过滤器
import './filters'
// 注册全局组件标签
Vue.component(Button.name,Button)
// 使用vue-load插件
Vue.use(VueLazyload,{  //内部自定义了一个指令v-lazy
  loading
})

// 引入路由器
import  router from './router'
new Vue({
    el:"#app",
    render:h=>h(App),
    // 配置路由器
    router, //使用vue-router
    store  //使用vuex
})