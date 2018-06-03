<template>
    <div class="details container">
      <h1 class="page-header">{{customer.name}}</h1>
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
              console.log(response)
             this.customer = response.data
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
