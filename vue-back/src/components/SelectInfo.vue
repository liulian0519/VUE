<template>
    <div class="select-info">
      <app-header></app-header>
      <app-left></app-left>
      <div class="wrapper">
        <div class="demo-input-suffix">
          <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="select">
          </el-input>
        </div>
      </div>

    </div>
</template>

<script>
  import leftnav from './LeftNav'
  import Header from './Header'
    export default {
        name: "SelectInfo",
      data(){
          return{
            select:""
          }
      },
      components:{
        'app-header':Header,
        'app-left':leftnav
      }
    }
</script>

<style scoped>
.select-info .wrapper{
  width: 40%;
}
</style>
