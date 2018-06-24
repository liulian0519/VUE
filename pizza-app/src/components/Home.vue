<template>
    <div class="container">
      <div class="row">
        <div id="home" class="col-sm-12 text-center">
          <div class="background">
            <h1>欢迎吃货的到来</h1>
            <h2>这里不仅有你最爱的榴莲pizza哦~</h2>
            <button @click="goMenu()" class="btn btn-success">Let's Order!</button>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Home",
      methods:{
          goMenu(){
            // this.$router.go(-1);    //跳转至上一次浏览的页面
            // this.$router.replace('./menu') //跳转至指定页面
            // this.$router.replace({name:'menuLink'})   //跳转至指定名字的页面
            this.$router.push('/menu') //通过push 跳转 也可以指定名字
          }
      }
    }
</script>

<style scoped>
#home{
  background: url("../assets/pizza.jpg");
  height: 85vh;
  padding: 10%;
}
  h1,h2{
    margin: 6%;
  }
  .background{
    background: #eee;
    opacity: 0.8;
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
