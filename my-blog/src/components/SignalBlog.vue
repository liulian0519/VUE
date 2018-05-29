<template>
    <div id="signal-blog">
        <h1>{{blog.title}}</h1>
      <h2>{{blog.body}}</h2>
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
          this.$http.get('https://jsonplaceholder.typicode.com/posts/'+this.id)
            .then(function (data) {
              // console.log(data)
              this.blog=data.body
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
