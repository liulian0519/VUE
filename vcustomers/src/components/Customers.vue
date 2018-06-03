<template>
    <div class="customers container">
      <h1 class="page-header">用户管理系统</h1>
      <table class="table table-striped">
        <thead>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </thead>
        <tbody>
        <tr v-for="customer in customers">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Customers",
      data(){
          return {
            customers:[]
          }
      },
      created() {
        axios.get('http://localhost:3000/users')
          .then( (response)=> {
             console.log(response)
              this.customers = response.data
          })
      }
    }
</script>

<style scoped>

</style>
