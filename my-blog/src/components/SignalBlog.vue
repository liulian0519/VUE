<template>
    <div id="signal-blog">
      <h1>{{blog.title}}</h1>
      <h2>{{blog.content}}</h2>
      <p>作者：{{blog.author}}</p>
      <p>分类</p>
      <ul>
        <li v-for="s in blog.solt">{{s}}</li>
      </ul>
      <button @click="DeleteSignalBlog">删除</button>
      <router-link :to="'/edit/' + id">编辑博客</router-link>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "SignalBlog",
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
          axios.delete('/posts/'+this.id + ".json")
            .then(response=>{
              this.$router.push({path:'/'});
              alert("删除成功");
            })
        }
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
button{
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0px;
  padding: 14px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  float: left;
}
a{
  background-color: crimson;
  text-decoration: none;
  display: inline-block;
  color: #fff;
  border: 0px;
  padding: 14px;
  margin: 20px 50px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  /*float:right;*/
}

</style>
