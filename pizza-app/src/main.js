import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from "./routes";

Vue.use(VueRouter)


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
  render: h => h(App)
})
