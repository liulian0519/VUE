<template>
    <div class="login">
      <Alert v-if="alert" :message="alert"></Alert>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="regform">
        <h3>系统登陆</h3>
        <el-form-item prop="phone">
          <el-input v-model.number="loginForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="vavid">
          <el-input placeholder="请输入验证码"></el-input>
          <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode('loginForm')">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue"> {{auth_time}}</span> s后重新发送</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="check('loginForm')">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  import Alert from './Alert'
  export default {
    data(){

      let telCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('手机号码不能为空'))
        } else if (!Number.isInteger(value)) {
          return callback(new Error('请输入有效的手机号码'))
        } else if (value.toString().length !== 11) {
          return callback(new Error('请输入有效的手机号码'))
        } else {
          callback()
        }
      }


      return{
        loginForm:{
          phone:"",
          vavid:""

        },
        alert:'',
        sendAuthCode:true, /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
        auth_time:0 ,  /*倒计时*/
        rules:{
          phone: [
            {
              required: true,
              validator: telCheck,
              trigger: 'blur'
             }
           ]
        }
      }
    },
    methods:{
      //向后台发送手机号码，并设置倒计时
      getAuthCode:function (formname) {
          this.$refs[formname].validate((valid)=>{
            if(valid){
              //向后台接口发送验证码
              axios.post('/posts.json',this.loginForm.phone)
                .then(data=>{
                  console.log("成功")
                })
              this.sendAuthCode = false;
              //设置倒计时秒
              this.auth_time = 30;
              var auth_timetimer = setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            }
            else{
              console.log("err1");
              return false;
            }
          })

      },
      //向后台发送手机号码和验证码 判断是否登陆成功
      check:function(formname){
        this.$refs[formname].validate((valid)=>{
          if(valid && this.loginForm.vavid!=" "){
            this.http({
              method:"post",
              url:"/fasong.json",
              data:{
                phone:this.loginForm.phone,
                valid:this.loginForm.vavid
              }
            }).then(res=> {
              //登陆成功之后要做的事情
              //if(res.code==0){
            //  tiaozhuan
            //}
              if(res.status == 200){
                // this.alert = "登录成功"
                this.$router.push('/edit')
              }else{
                this.alert = "请输入有效的验证码"
              }

              console.log(res);
            }).catch(function(err){
              console.log(err);
            })
          }
          // else{
          //   console.log("err")
          //   this.alert = "请输入有效的验证码 "
          //   // this.$router.push({path:'/',query:{alert:"登录失败"}})
          //   return false
          // }

         })
      }
    },
    components:{
      Alert
    }

  }
//   export default {
//     data () {
//       let confirmpasswordCheck = (rule, value, callback) => {
//         if (value === '') {
//           return callback(new Error('密码是必须的'))
//         } else {
//           return callback()
//         }
//       }
//       let telCheck = (rule, value, callback) => {
//         if (value === '') {
//           return callback(new Error('电话号码是必须的'))
//         } else if (!Number.isInteger(value)) {
//           return callback(new Error('电话号码必须是数字'))
//         } else if (value.toString().length !== 11) {
//           return callback(new Error('电话号码必须是11位数字'))
//         } else {
//           callback()
//         }
//       }
//       return {
//         ReginForm: {
//           password: '',
//           tel: '',
//         },
//         logining: false,
//         sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
//         auth_time: 0, /*倒计时 计数器*/
//         verification:"",//绑定输入验证码框框
//         rule: {
//           password: [
//             {
//               required: true,
//               message: '密码是必须的！',
//               trigger: 'blur'
//             }
//           ],
//           tel: [
//             {
//               required: true,
//               validator: telCheck,
//               trigger: 'blur'
//             }
//           ],
//         }
//       }
//     },
//     methods: {
//       //  验证
//       getAuthCode:function () {
//         const verification =this.ReginForm.tel;
//         const url = " "
//         console.log("url",url);
//         this.$http.get(url).then(function (response) {
//           console.log("请求成功",response)
//         }, function (error) {
//           console.log("请求失败",error);
//         })
//         this.sendAuthCode = false;
//         //设置倒计时秒
//         this.auth_time = 10;
//         var auth_timetimer = setInterval(()=>{
//           this.auth_time--;
//           if(this.auth_time<=0){
//             this.sendAuthCode = true;
//             clearInterval(auth_timetimer);
//           }
//         }, 1000);
//       },
//       // 封装注册发送请求方法
//       thisAjax(){
//         const passwordData=this.ReginForm.password;
//         const phoneData =this.ReginForm.tel;
//         const mCodeData=this.verification;
//         //  手机注册
// //emulateJSON:true设置后post可跨域
//         const url = " 填接口"
//         this.$http.post(url,{填传入的参数},{emulateJSON:true}).then(function (response)
//         {
//           //登录后跳转的页面
//           this.$router.push('/');
//         }, function (error) {
//           alert("请求失败",error);
//         })
//       },
//       // ...
//       submit () {
//         this.$refs.ReginForm.validate(valid => {
//           if (valid) {
//             this.logining = true
//             this. thisAjax();
//             console.log('开始写入后台数据！')
//           } else {
//             console.log('submit err')
//           }
//         })
//       },
//       reset () {
//         this.$refs.ReginForm.resetFields()
//       },
//       tologin () {
// //已经注册过跳转到登入界面
//         this.$router.push('/phoneLogin')
//       }
//     }
//   }
</script>

<style scoped>
  .regform {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 10px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }
  .auth_text{

  }
  .auth_input{
    width:140px;
    height:38px;
    margin-bottom:20px;
    border:1px solid #DCDFE6;
    /* color:red; */
    padding-left:10px;
    border-radius: 8%;
  }
  .regform[data-v-92def6b0]{
    width:370px;
    min-height: 440px;
  }
  .login-text{
    text-align: center;
    margin-bottom:20px;
  }
</style>
