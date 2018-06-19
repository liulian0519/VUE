<template>
    <div class="customers container">
      <Alert v-if="alert" :message="alert"></Alert>

        <h1 class="page-header">
          用户管理系统
          <span class="pull-right">
            <router-link class="btn btn-primary" to="/add">添加用户</router-link>
          </span>
        </h1>


      <input type="text" class="form-control" placeholder="搜索" v-model="search">
      <br>
      <table class="table table-striped">
        <thead>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </thead>
        <tbody>
        <tr v-for="customer in filtercustomers">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
          <td><router-link class="btn btn-default" :to="'/customer/'+customer.id">详情</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>
  <!--<v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>-->
</template>

<script>
  import Alert from './Alert'
  import axios from 'axios'

    export default {
        name: "Customers",
      data(){
          return {
            customers:[],
            alert:"",
            search:"",

          }
      },
      components:{
        Alert
      },
      methods:{

        fetchCustomers(){
          axios.get('http://localhost:3000/users')
            .then( (response)=> {
              console.log(response)
              this.customers = response.data
            })
        }
     },
      computed:{
        filtercustomers:function () {
          return this.customers.filter((customer)=>{
            //匹配search和 name 是否一致  filter是es6的函数
            return customer.name.match(this.search)
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

      },

    }
</script>

<style scoped>

</style>
