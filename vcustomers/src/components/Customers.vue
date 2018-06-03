<template>
    <div class="customers container">
      <Alert v-if="alert" :message="alert"></Alert>
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
          <td><router-link class="btn btn-default" :to="'/customer/'+customer.id">详情</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import Alert from './Alert'
  import axios from 'axios'
    export default {
        name: "Customers",
      data(){
          return {
            customers:[],
            alert:""
          }
      },
      components:{
        Alert
      },
      methods:{
        fetchCustomers(){
          axios.get('http://localhost:3000/users')
            .then( (response)=> {
              // console.log(response)
              this.customers = response.data
            })
        }
     },
      created() {
          if(this.$route.query.alert){
            this.alert = this.$route.query.alert
          }
          this.fetchCustomers();
      },
      updated(){
        this.fetchCustomers();

      }
    }
</script>

<style scoped>

</style>
