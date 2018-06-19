<template>
  <div class="list">
    <template v-if="count">
      <!--<ul>-->
        <!--<li v-for="item in items">...</li>-->
      <!--</ul>-->
      <mo-paging :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange">
      </mo-paging>
    </template>
  </div>
</template>
<script>
  import MoPaging from './MoPaging'
  import axios from 'axios'
  export default {
    //显示的声明组件
    components : {
      MoPaging
    },
    data () {
      return {
        pageSize : 1 , //每页显示1条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        items : []
      }
    },
    methods : {
      //获取数据
      getList () {
        //模拟
        // let url = `/api/list/?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
        axios.get('http://localhost:3000/users')
          .then((response) => {
            console.log(response.data)
              console.log(response.data.length)
            //子组件监听到count变化会自动更新DOM
            this.count = response.data.length;
            this.items = response.data
          })
      },

      //从page组件传递过来的当前page
      pageChange (page) {
        this.currentPage = page
        this.getList()
      }
    },
    mounted() {
      //请求第一页数据
      this.getList()
    }
  }
</script>
<style scoped>
  .list{
    width: 100px;
    height: 100px;
  }
</style>
