<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import Hello from "./components/HelloWorld"
import Edit from './components/Edit'
import jwt from 'jwt-decode';
export default {
  name: 'App',
  components: {

    "app-login":Login,
    "app-he":Hello,
    "app-edit":Edit
  },
  created(){
    // if(localStorage.token){
    //   const decoded = jwt(localStorage.token);
    //
    //   // // 获取当前时间
    //   // const currentTime = Date.now()/1000;
    //   // //检测token 是否过期
    //   //过期了
    //   // if(decoded.exp < currentTime)
    //   // {
    //   //   this.$store.dispatch("setIsAuthenticated",false)
    //  // this.$router.push('/login')
    //   // }
    //   //没过期
    //   //else{下边那句}
    //
    //   console.log(decoded)
    //   this.$store.dispatch("setIsAuthenticated",!this.IsEmpty(decoded))
    // }
  },
  methods:{
    IsEmpty(value){
      return(
        value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0 ) || (typeof value === 'string' && value.trim().length === 0)
      )
    },
  }
}
</script>

<style>

</style>
