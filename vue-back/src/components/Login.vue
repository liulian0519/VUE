<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="regform">
      <div class="text">
        <p>欢迎登陆</p>
      </div>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email" placeholder="请输入企业邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn"  @click="check('loginForm')">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "login",
    data(){
      return{
        loginForm:{
          email:"",
          pass:""
        },
        rules:{
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          pass:[
            {required:true,message:'请输入正确的密码',trigger:'blur'},
          ]

        }
      }
    },
    methods:{
      check:function (formname) {
        this.$refs[formname].validate((valid)=>{
          if(valid){

          //  前端验证通过  像后端发送请求
            this.http({
              method:"post",
              url:"/user.json",
              data:{
                email:this.loginForm.email,
                pass:this.loginForm.pass
              }
            }).then(res=>{
              console.log(res);
            //  登录成功后进行跳转
              this.$router.push('/home')
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.login{
  /*background-image: url("../assets/back.jpg");*/
  width: 100%;
  height: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .regform{
    border: 1px solid #e2e2e2;
    padding: 10px;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 10px #B4BCCC;

    border-radius: 10px;
  }
  .login .text{
    font-size: 20px;
    text-align: center;
    color: #000;
  }
  .btn{
    width:100%;
    dispaly:flex;
    align-items: center;

  }
</style>
