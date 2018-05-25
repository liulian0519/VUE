<template>
    <div id="show-blogs" v-theme:column="'wide'">
      <h1>博客总览</h1>
      <input type="text" placeholder="搜索" v-model="search">
      <div v-for="signal in filteredBlogs" class="signal-blog">
        <h2 v-rainbow>{{signal.title | to-upcase}}</h2>
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
            // console.log(data)
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
      }
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
}

</style>
