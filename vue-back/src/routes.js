import Login from './components/Login'
import Home from './components/Home'
import SelectInfo from './components/SelectInfo'
import ExamProcess from './components/exam/ExamProcess'
import ExamPaper from './components/exam/ExamPaper'
import ExamResult from './components/exam/ExamResult'
import ViewProcess from './components/view/ViewProcess'
import ViewResult from './components/view/ViewResult'

export const routes =[
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/home',component:Home},
  {path:'/selectinfo',name:"info",component:SelectInfo},
  {path:'/examprocess',name:'ep',component:ExamProcess},
  {path:'/exampaper',name:'ep',component:ExamPaper},
  {path:'/examresult',name:'ep',component:ExamResult},
  {path:'/viewprocess',name:'ep',component:ViewProcess},
  {path:'/viewresult',name:'ep',component:ViewResult},

  {path:'*',redirect:'/'},

]
