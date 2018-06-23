<template>
<h1>Admin</h1>
</template>

<script>
    export default {
      data(){
          return{
            name:"liulian"
          }
      },
      //组件内守卫
      //进入组件之前
      // beforeRouteEnter:(to,from,next)=>{
      //     // alert("hello " + this.name);
      //   next(vm=>{
      //     alert("hello" + vm.name)
      //   })
      // }
      //离开组件之前
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        if(confirm("确定离开么？")==true){
          next()
        }else{
          next(false)
        }
      }


    }
</script>

<style scoped>

</style>
