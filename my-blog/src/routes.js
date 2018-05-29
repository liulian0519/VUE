import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/Add-blog'
import SignalBlog from './components/SignalBlog'
export default [
  {path:'/',component:ShowBlogs},
  {path:'/add',component:AddBlog},
  {path:'/blog/:id',component:SignalBlog},      //localhost：8080/blog/1
]
