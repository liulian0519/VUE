// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import qs from 'qs'
import axios from './utils/http'
// import axios from 'axios'
import Login from "./components/Login"
import Edit from "./components/Edit"
import Show from './components/show'
import Modify from './components/Modify'
import Test from './components/test'

Vue.config.productionTip = false
Vue.use(VueRouter)

//设置路由
const routes = [
  {path:"/",redirect:'/login'},
  {path:"/login",component:Login},
  {path:"/edit",component:Edit,
    // meta:{
    // requiresAuth:true
    // }
    },
  {path:'/edit/:id',component:Show},
  {path:'/modify/:id',component:Modify},
  // {path:"/show",component:Show},
  // {path:'/modify',component:Modify},

  {path:'*',redirect:'/'},

  // {path:'/test',component:Test}
]

const router = new VueRouter({
  mode:'history',
  routes
})


//配置axios默认路径
// // axios.defaults.baseURL = "https://vue-cs.firebaseio.com/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true
//配置axios的原型

Vue.prototype.http = axios
Vue.prototype.$qs = qs
Vue.use(Element)

// 全局守卫
router.beforeEach((to,from,next)=>{
  const islogin = localStorage.token?true:false;
  if(to.path == "/login" || to.path == "/"){
    next();
  }else{
    islogin?next():next('/login')
  }
})








/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
