<template>
    <div class="add-blog">
      <h2>添加博客</h2>
      <form v-if="!submited">
        <label>博客标题</label>
        <input type="text" v-model="blog.title" />

        <label>博客内容</label>
        <textarea v-model="blog.content"></textarea>

        <div id="checkboxes">
          <label>vue.js</label>
          <input type="checkbox" value="vue.js" v-model="blog.solt"/>
          <label>node.js</label>
          <input type="checkbox" value="node.js" v-model="blog.solt"/>
          <label>q前端</label>
          <input type="checkbox" value="前端" v-model="blog.solt"/>
          <label>后端</label>
          <input type="checkbox" value="后端" v-model="blog.solt"/>
        </div>

        <label>
          <select v-model="blog.author">
            <option v-for="author in authors">{{author}}</option>
          </select>
        </label>
        <button @click.prevent="post">添加博客</button>
      </form>

      <div>
        <h3 v-if="submited">你的博客发布成功</h3>
      </div>
      <!--博客预览-->
      <div id="preview">

        <h3>博客总览</h3>
        <p>博客标题：{{blog.title}}</p>
        <p>博客内容</p>
        <p>{{blog.content}}</p>
        <p>博客分类</p>
        <ul>
          <li v-for="item in blog.solt">{{item}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Add-blog",
      data(){
          return{
            blog:{
              title:"",
              content:"",
              solt:[],
              author:""
            },
            authors:['liulian',"soul","daidong"],
            submited:false
          }
      },
      methods:{
          post:function () {
            this.$http.post("http://jsonplaceholder.typicode.com/posts",{
              title:this.blog.title,
              body:this.blog.content,
              userId:1
            })
              .then(function (data) {
                console.log(data);
                this.submited=true
              })
          }
      }
    }
</script>

<style scoped>

</style>
