<template>
    <div id="add-blog">
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
  import axios from 'axios'
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
            //将自己添加的博客信息写入fire Bases中
            // this.$http.post("https://wd5983071599kadgpv.wilddogio.com/th

              axios.post("/posts.json",this.blog)
                .then((data)=> {
                  this.submited=true
                })


          }
      }
    }
</script>

<style scoped>
  #add-blog{
    box-sizing: border-box;
  }
  #add-blog{
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
  }
  label{
    display:block;
    margin: 20px 0px 10px;
  }
  input [type="text"],textarea,select{
    display: block;
    width: 100%;
    padding: 10px;
  }
  textarea{
    height: 200px;
  }
  #checkboxes label{
    display: inline-block;
    margin-top: 5px;
  }
  #checkboxes input{
    display: inline-block;
    margin-right: 10px;
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
  }
  #preview{
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin: 30px 0;
  }
  h3{
    margin-top: 10px;
  }
</style>
