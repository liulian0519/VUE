<template>
    <div class="nav">
        <router-link class="nav-item" to="/goods">
          <i class="line"></i>
          点餐
        </router-link>
        <router-link class="nav-item" to="/ratings">
          <i class="line"></i>
          评价
        </router-link>
        <router-link class="nav-item"  to="/seller">
          <i class="line"></i>
          商家
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
.nav{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
  .nav-item{
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: #666666;
    text-decoration: none;
    position: relative;
  }
  /*选中的样式*/
  .nav .active{
    color: #ffbb22;
  }
  .nav .active .line{
    width: 20px;
    height: 2px;
    display: inline-block;
    background-color: #ffbb22;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -10px;
  }
</style>
