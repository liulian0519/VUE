<template>
    <div class="container">
      <h1>Home</h1>
      <button @click="goMenu()" class="btn btn-success">点餐</button>
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

</style>
