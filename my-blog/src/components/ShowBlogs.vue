<template>
    <div id="show-blogs" v-theme:column="'wide'">
      <h1>博客总览</h1>
      <input type="text" placeholder="搜索" v-model="search">
      <div v-for="signal in filteredBlogs" class="signal-blog">
        <router-link :to="'/blog/' + signal.id"><h2 v-rainbow>{{signal.title | to-upcase}}</h2></router-link>
        <article>
          {{signal.body | shorter}}
        </article>
      </div>
    </div>
</template>

<script>
    export default {
        name: "show-blogs",
      data(){
          return{
            blogs:[],
            search:""
          }
      },
      created(){
        this.$http.get('https://jsonplaceholder.typicode.com/posts')
          .then(function (data) {
             console.log(data)
            // console.log(data.body.splice(0,10))
            this.blogs = data.body.splice(0,10);
            console.log(this.blogs)
          })
      },
      //与用户搜索相匹配
      computed:{
          filteredBlogs:function () {
            return this.blogs.filter((blog)=>{
              return blog.title.match(this.search)
            })
          }
      },
      //局部自定义过滤器
      filters:{
          //这两种都行，如果还有别的过滤器就写在这个里边
          // "to-upcase":function (value) {
          //   return value.toUpperCase();
          // }
        toUpcase(value) {
          return value.toUpperCase();
        }

      },
      // 局部自定义指令
      // directives:{
      //     'rainbow':{
      //       bind(el,binding,vnode){
      //
      //       }
      //     }
      // }
    }
</script>

<style scoped>
#show-blogs{
  max-width: 800px;
  margin: 0 auto;
}
.signal-blog{
  padding: 20px;
  box-sizing: border-box;
  margin: 20px 0;
  background: #ccc;
  border: 1px dotted #aaa ;
}
  #show-blogs a{
    text-decoration: none;
    color: #444;
  }
  input[type='text']{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }


</style>
