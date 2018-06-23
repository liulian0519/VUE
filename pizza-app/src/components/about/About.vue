<template>
  <div>
    <div class="row mb-5">
      <div class="col-4">
        <!--二级导航-->
        <div class="list-group mb-5">
          <router-link tag="li" class="nav-link" :to="{name:'HistoryLink'}">
            <a class="list-group-item">历史订单</a>
          </router-link>
          <router-link tag="li" class="nav-link" :to="{name:'OrderingGuideLink'}">
            <a class="list-group-item">点餐文档</a>
          </router-link>  <router-link tag="li" class="nav-link" :to="{name:'ConcatLink'}">
          <a class="list-group-item">联系我们</a>
        </router-link>  <router-link tag="li" class="nav-link" :to="{name:'DeliveryLink'}">
          <a class="list-group-item">快递信息</a>
        </router-link>
        </div>
      </div>
      <div class="col-8 mt-2">
        <!--二级导航的详情-->
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
