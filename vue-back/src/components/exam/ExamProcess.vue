<template>
    <div class="exam-process">
      <app-header></app-header>
      <app-left></app-left>
    </div>
</template>

<script>
  import leftnav from '../LeftNav'
  import Header from '../Header'
    export default {
        name: "ExamProcess",
      components:{
        'app-header':Header,
        'app-left':leftnav
      }
    }
</script>

<style scoped>

</style>
