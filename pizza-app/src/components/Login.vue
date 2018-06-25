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

            <button type="submit" class="btn btn-block btn-success">登陆</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "Login",
    data(){
      return{
        email:"",
        password:""
      }
    },
    methods:{
      onsubmit(){
       axios.get('/user.json')
         .then(res=>{
           // console.log(res)
            const data= res.data;
            const user =[];
            for(let key in data){
              const use = data[key];
              // console.log(use)
              user.push(use);
            }
            // console.log(user);
         //  实现过滤
          let result = user.filter((user)=>{
             return user.email === this.email&& user.password === this.password
           })
           // console.log(result)
         //  判断
           if(result != null && result.length>0){
             this.$router.push({name:'homeLink'})
           }else{
              alert("账号或密码错误");
           }
         })
      }
    }
  }
</script>

<style scoped>

</style>
