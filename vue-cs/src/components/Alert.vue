<template>

    <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
    <!--{{message}}-->
    <el-alert :title="message"

      type="error">
    </el-alert>

</template>

<script>
  export default {
    name: "Alert",
    props:['message'],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

</style>
