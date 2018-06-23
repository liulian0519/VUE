<template>
<div class="card text-dark bg-light mb-3">
  <div class="card-header">联系我们</div>
  <div class="card-body">
    <h4 class="card-title">联系我们</h4>
    <p class="card-text">1223345563</p>

    <!--三级导航-->
    <router-link :to="{name:'PhoneLink'}">联系电话</router-link>
    <router-link :to="{name:'NameLink'}">联系人</router-link>

    <!--三级导航详情页-->
    <router-view></router-view>
  </div>
</div>
</template>

<script>
    export default {
        name: "Contact"
    }
</script>

<style scoped>

</style>
