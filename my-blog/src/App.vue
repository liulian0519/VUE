<template>
  <div id="app">
    <!--<add-blog></add-blog>-->
    <!--<show-blogs></show-blogs>-->
    <BlogHeader></BlogHeader>
    <router-view></router-view>
  </div>
</template>

<script>

import AddBlog from "./components/Add-blog";
import ShowBlogs from  "./components/ShowBlogs"
import BlogHeader from  "./components/BlogHeader"

export default {
  name: 'App',
  components: {
    BlogHeader,
    AddBlog,
    ShowBlogs

  }
}
</script>

<style>

</style>
