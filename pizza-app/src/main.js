import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from "./routes";
import axios from 'axios'
import {store} from './store/store'
Vue.use(VueRouter)
//配置axios默认路径
axios.defaults.baseURL = 'https://pizza-1ab8b.firebaseio.com/'
//配置axios的原型
Vue.prototype.http = axios


const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior(to,from,savedPosition){

  }
})
//全局守卫
// router.beforeEach((to,from,next)=>{
//   if(to.path=='/login' || to.path=='/register'){
//     next();
//   }else{
//     alert("请先登录");
//     next('/login')
//   }
// })

//后置钩子
// router.afterEach((to,from)=>{
//   alert("afterEach")
// })

//路由独享守卫




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
