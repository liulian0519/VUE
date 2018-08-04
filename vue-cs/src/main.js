// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from "./components/Login"
import Edit from "./components/Edit"
import Show from './components/show'
import Modify from './components/Modify'

Vue.config.productionTip = false
Vue.use(VueRouter)

//设置路由
const routes = [
  {path:"/",redirect:'/login'},
  {path:"/login",component:Login},
  {path:"/edit",component:Edit},
  {path:"/edit/:id",component:Show},
  {path:'/modify/:id',component:Modify}
]

const router = new VueRouter({
  mode:'history',
  routes
})



//配置axios默认路径
axios.defaults.baseURL = "https://vue-cs.firebaseio.com/"
//配置axios的原型
Vue.prototype.http = axios
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
