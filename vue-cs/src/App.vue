<template>
  <div id="app">
    <router-view></router-view>
    <!--<app-he></app-he>-->
  </div>
</template>

<script>
import Login from './components/Login'
import Hello from "./components/HelloWorld"
import Edit from './components/Edit'

export default {
  name: 'App',
  components: {


    "app-login":Login,
    "app-he":Hello,
    "app-edit":Edit
  }
}
</script>

<style>

</style>
