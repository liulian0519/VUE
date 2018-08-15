<template>
    <div class="home">
      <!--这是登录成功之后的页面-->
      <app-header></app-header>
      <app-left></app-left>

      <!--<router-view></router-view>-->
    </div>
</template>
<script>
  import leftnav from './LeftNav'
  import Header from './Header'
  export default {
    data(){
      return{

      }
    },
    components:{

      'app-left':leftnav,
      'app-header':Header
    }

  }
</script>
<style scoped>

.home{

}

</style>
