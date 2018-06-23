import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

//二级路由
import Concat from './components/about/Contact'
import Delivery from './components/about/Delivery'
import OrderingGuide from './components/about/OrderingGuide'
import History from './components/about/History'

//三级路由
import Phone from './components/about/concat/Phone'
import Name from './components/about/concat/Name'

Vue.use(VueRouter)

const routes =[
{path:'/',name:"homeLink",component:Home},
  {path:'/menu',name:"menuLink",component:Menu},
  {path:'/admin',name:"adminLink",component:Admin},
  //children 为二级路由的配置    二级路由下的三级路由
  {path:'/about',name:"aboutLink",redirect:'about/concat',component:About,children:[
      {'path':'/about/concat',name:'ConcatLink',redirect:'/concat/phone',component:Concat,children:[
          {path:'/concat/phone',name:'PhoneLink',component:Phone},
          {path:'/concat/name',name:'NameLink',component:Name},
        ]},
      {'path':'/delivery',name:'DeliveryLink',component:Delivery},
      {'path':'/orderingGuidet',name:'OrderingGuideLink',component:OrderingGuide},
      {'path':'/history',name:'HistoryLink',component:History},
    ]},
  {path:'/login',name:"loginLink",component:Login},
  {path:'/register',name:"registerLink",component:Register},
  {path:'*',redirect:'/'}     //匹配不到时，默认跳转至首页。
]

const router = new VueRouter({
  routes,
  mode:'history'
})



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
