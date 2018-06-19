<template>
  <div class="edit container">
    <Alert v-if="alert" :message="alert"></Alert>
    <h1 class="page-header">编辑用户</h1>
    <form v-on:submit="editCustomer">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" placeholder="name" v-model="customers.name">
        </div>
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" placeholder="phone" v-model="customers.phone">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" placeholder="email" v-model="customers.email">
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="text" class="form-control" placeholder="age" v-model="customers.age">
        </div>
        <div class="form-group">
          <label>学历</label>
          <input type="text" class="form-control" placeholder="education" v-model="customers.education">
        </div>
        <div class="form-group">
          <label>个人简介</label>
          <textarea class="form-control" rows="10" placeholder="profile" v-model="customers.profile"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">确定</button>
      </div>
    </form>

  </div>
</template>

<script>
  import axios from 'axios'
  import Alert from './Alert'
  export default {
    name: "Add",
    data(){
      return {
        customers:{},
        alert:''
      }
    },
    components:{
      Alert
    },
    methods:{
      fetchCustomer(id){
        axios.get('http://localhost:3000/users/'+id)
          .then(response=>{
            // console.log(response)
            this.customers = response.data
          })
      },
      editCustomer(e) {
        // console.log(123);
        if(!this.customers.name || !this.customers.phone || !this.customers.email){
          this.alert = '请添加对应信息'
        }else{
          let editCustomers = {
            name:this.customers.name,
            phone:this.customers.phone,
            email:this.customers.email,
            age:this.customers.age,
            education:this.customers.education,
            profile:this.customers.profile
          }
          axios.put('http://localhost:3000/users/'+this.$route.params.id,editCustomers)
            .then((response)=>{
              //  console.log(response)
              this.$router.push({path:'/',query:{alert:"用户信息编辑成功"}});
            })
          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created(){
      this.fetchCustomer((this.$route.params.id))
    }

  }
</script>

<style scoped>

</style>
