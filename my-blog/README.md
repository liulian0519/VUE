# my-blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
#### my-blog总结
> 实现功能：个人博客页展示以及搜索，添加博客，修改博客，删除博客
> 组件：Add-blog:添加博客
    
```
 axios.post("/posts.json",this.blog)
                .then((data)=> {
                  this.submited=true
                })
```
> 组件：signalBlog：单个博客，相当于详情页面
通过id进入详情展示页面，内置删除和编辑两个按钮
```
  data(){
          return{
            id:this.$route.params.id,
            blog:{}       //该id对应的博客
          }
      },
      created(){
          axios.get('/posts/'+this.id + '.json')
            .then(function (data) {
              return data.data
            })
            .then((data)=> {
               console.log(data);
              this.blog = data
            })
      },
      methods:{
        DeleteSignalBlog(){
          axios.delete('/posts/'+this.id + ".json")  //删除模块
            .then(response=>{
              this.$router.push({path:'/'});
              alert("删除成功");
            })
        }
      }
```

> 组件：EditBlog :编辑博客
注意传参（点击进入详情页，拿到id 对这个进行修改）
```
 methods:{
      fetchData(){
        axios.get('/posts/'+this.id + ".json")
          .then(response=>{
            console.log(response.data)
            // console.log(response.body);g
             this.blog = response.data
          })
      },
      post:function () {
        //将自己bianji的博客信息写入fire Bases中
        // _this =this
        axios.put('/posts/'+this.id + ".json",this.blog)
          .then( (data)=> {
           this.submited = true
            // console.log(data);
            // this.submited=true
          })
      }
```
> 搜索模块
```
   <input type="text" placeholder="搜索" v-model="search">
   
     //与用户搜索相匹配
      computed:{
          filteredBlogs:function () {
            return this.blogs.filter((blog)=>{
              //匹配search和 title 是否一致
              return blog.title.match(this.search)
            })
          }
      },
      
       <!--之前遍历的是 blog     现在应该遍历computed 里边的那个filterBlogs-->
      
    <div v-for="signal in filteredBlogs" class="signal-blog">
        <router-link :to="'/blog/'+signal.id">{{signal.title}}</router-link>    //前边是跳转id
        <article>
          {{signal.contentr}}
        </article>
      </div>
```
> 路由
```
export default [
  {path:'/',component:ShowBlogs},
  {path:'/add',component:AddBlog},
  {path:'/blog/:id',component:SignalBlog},      //localhost：8080/blog/1
  {path:'/edit/:id',component:EditBlog},
]

```

---
2018/6