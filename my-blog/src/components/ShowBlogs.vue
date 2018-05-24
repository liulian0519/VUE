<template>
    <div id="show-blogs" v-theme="'wide'">
      <h1>博客总览</h1>
      <div v-for="signal in blogs" class="signal-blog">
        <h2 v-rainbow>{{signal.title}}</h2>
        <article>
          {{signal.body}}
        </article>
      </div>
    </div>
</template>

<script>
    export default {
        name: "show-blogs",
      data(){
          return{
            blogs:[]
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
