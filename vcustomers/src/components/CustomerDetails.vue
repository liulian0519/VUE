<template>
    <div class="details container">
      <router-link class="btn btn-default" to="/">返回</router-link>
      <h1 class="page-header">
        {{customer.name}}
        <span class="pull-right">
          <router-link class="btn btn-primary" :to="'/edit/'+customer.id">编辑</router-link>
          <button class="btn btn-danger" @click="DeleteCustomer(customer.id)">删除</button>
        </span>
      </h1>
      <ul class="list-group">
        <li class="list-group-item"><span class="glyphicon glyphicon-th">{{customer.phone}}</span></li>
        <li class="list-group-item"><span class="glyphicon glyphicon-bookmark">{{customer.email}}</span></li>
      </ul>

      <ul class="list-group">
        <li class="list-group-item"><span class="glyphicon glyphicon-adjust">{{customer.age}}</span></li>
        <li class="list-group-item"><span class="glyphicon glyphicon-book">{{customer.education}}</span></li>
        <li class="list-group-item"><span class="glyphicon glyphicon-move">{{customer.profile}}</span></li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "CustomerDetails",
      data(){
          return{
            customer:''
          }
      },
      methods:{
        fetchCustomers(id){
          axios.get('http://localhost:3000/users/'+id)
            .then( (response)=> {
              // console.log(response)
             this.customer = response.data
            })
        },
        DeleteCustomer(id){
          axios.delete('http://localhost:3000/users/'+id)
            .then((response)=>{
              this.$router.push({path:'/',query:{alert:"用户信息删除成功!"}});
              // this.$router.push({path:'/'})
            })
        }
      },
      created(){
          this.fetchCustomers(this.$route.params.id)
      }
    }
</script>

<style scoped>

</style>
