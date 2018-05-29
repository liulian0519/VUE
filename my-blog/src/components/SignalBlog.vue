<template>
    <div id="signal-blog">
      <h1>{{blog.title}}</h1>
      <h2>{{blog.content}}</h2>
      <p>作者：{{blog.author}}</p>
      <p>分类</p>
      <ul>
        <li v-for="s in blog.solt">{{s}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "SignalBlog",
      data(){
          return{
            id:this.$route.params.id,
            blog:{}       //该id对应的博客
          }
      },
      created(){
          this.$http.get('https://vue-domo.firebaseio.com/posts/'+this.id + ".json")
            .then(function (data) {
              // console.log(data)
             // this.blog=data.body
              return data.json()
            })
            .then(function (data) {
              // console.log(data);
              this.blog = data
            })
      }
    }
</script>

<style scoped>
#signal-blog{
  max-width: 960px;
  padding: 20px;
  margin: 0 auto;
  background: #eee;
  border: 1px dotted #aaa;
}

</style>
