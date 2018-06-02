import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/Add-blog'
import SignalBlog from './components/SignalBlog'
import EditBlog from './components/EditBlog'
export default [
  {path:'/',component:ShowBlogs},
  {path:'/add',component:AddBlog},
  {path:'/blog/:id',component:SignalBlog},      //localhost：8080/blog/1
  {path:'/edit/:id',component:EditBlog},
]
