<template>
    <div class="select-info">
      <app-left></app-left>
    </div>
</template>

<script>
  import leftnav from './LeftNav'
    export default {
        name: "SelectInfo",
      components:{

        'app-left':leftnav
      }
    }
</script>

<style scoped>

</style>
