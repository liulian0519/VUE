<template>
  <div class="header">
    <!--这是头部导航栏-->
    <el-header>
      <span>CREATSHARE</span>
      <span class="text">后台管理系统</span>
    </el-header>
  </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
.header{
  background-color: #409EFF;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  height: 120px;
}
  .header span{
    display: inline-block;
    font-size: 36px;
    font-style: italic;
    color: #fff;
    font-weight: bold;
    margin-top: 40px;
  }
  .header .text{
    font-size: 30px;
  }


</style>
