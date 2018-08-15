// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import {routes} from "./routes";
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)
//配置路由信息
const router = new VueRouter({
  routes,
  mode:'history'
})

//配置axios的原型
Vue.prototype.http = axios
//配置axios的默认地址
axios.defaults.baseURL = "https://vue-back-94726.firebaseio.com/"

//使用ElementUI
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
