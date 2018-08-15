import Login from './components/Login'
import Home from './components/Home'
import SelectInfo from './components/SelectInfo'

export const routes =[
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/home',component:Home},
  {path:'/selectinfo',name:"info",component:SelectInfo},

  {path:'*',redirect:'/'},

]
