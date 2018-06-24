<template>

  <div class="row mt-5">
    <div class="col-md-4 col-lg-4 mx-auto">
      <div class="card mx-auto">
        <div class="card-body">
          <img class="" src="../assets/logo.png" style="width: 50px; height: 50px ; border-radius: 50%; margin-left: 120px;">
          <form @submit.prevent="onsubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <label for="confirm-password">确认密码</label>
              <input type="password" class="form-control" v-model="confirmPassword">
            </div>
            <button type="submit" class="btn btn-block btn-success">注册</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
    export default {
        name: "Register",
      data(){
          return{
            email:"",
            password:"",
            confirmPassword:""
          }
      },
      methods:{
          onsubmit(){
            if(this.password === this.confirmPassword){
              // console.log("kkk")
              const formData ={
                email:this.email,
                password:this.password,
                confirmPassword:this.confirmPassword
              }
              axios.post('./user.json',formData)
                .then(res=>this.$router.push({name:'loginLink'}))


            }
          }
      }
    }
</script>

<style scoped>

</style>
