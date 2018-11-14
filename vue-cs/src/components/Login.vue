<template>

    <div class="login1">
      <!--<Alert v-if="alert" :message="alert"></Alert>-->
      <el-alert
        v-show="alert"
        :title="alert"
        type="error"
        @close="failmessage()"
        show-icon>
      </el-alert>
      <div class="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="regform">
        <div class="text1">
          <p>欢迎登陆</p>
          <p>CreatShare纳新系统</p>
        </div>
        <el-form-item prop="phone">
          <label>手机号</label>
          <el-input v-model.number="loginForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="valid">
          <label style="display: block;" >图形码</label>
          <el-input placeholder="请输入图形验证码" v-model="loginForm.valid" style="width: 190px;"></el-input>
          <img :src="src" @click="AccesImg">
          <!--<p >看不清</p>-->
        </el-form-item>
        <el-form-item prop="vavid">
          <label>验证码</label>
          <el-input placeholder="请输入短信验证码" v-model="loginForm.code" class="a"></el-input>
          <span  v-show="sendAuthCode" class="auth_text" @click="getAuthCode('loginForm')">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue"> {{auth_time}}</span> s后重新发送</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="btn" @click="check('loginForm')">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
  import Alert from './Alert'
import jwt from 'jwt-decode';
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
      };
      return{
        loginForm:{
          phone:"",
          //图形验证码
          valid:"",
          //手机验证码
          code:""
        },
        mes:"fgjidfjgidjfg",
        src:'',
        alert:'',
        ms1:'请输入正确的图片验证码',
        ms2:'请输入正确的短信验证码',
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
      failmessage(){
        if(this.alert == '请输入正确的图片验证码'){
          this.loginForm.valid = ''
        }
        if(this.alert == '请输入正确的短信验证码'){
          this.loginForm.code = ''
        }
        // console.log(title)

        this.alert = ''
      },
      //向后台发送手机号码 和 图形验证码，并设置倒计时
      getAuthCode:function (formname) {
          this.$refs[formname].validate((valid)=>{
            if(valid){
              //向后台接口发送手机号码和图片验证码
              console.log(this.loginForm.phone)
              console.log(this.loginForm.valid)
              let postData = this.$qs.stringify({
                phone: this.loginForm.phone,
                valid: this.loginForm.valid
              });
              this.http({
                method: "post",
                url: 'http://119.3.24.222:8080/nx/VerifyServlet',
                data:postData,
              }).then(res=>{
                console.log(res);
                console.log(res.data.msg)
                if(res.data.msg == true){
                  this.sendAuthCode = false;
                  //设置倒计时秒
                  this.auth_time = 60;
                  var auth_timetimer = setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time<=0){
                      this.sendAuthCode = true;
                      clearInterval(auth_timetimer);
                    }
                  }, 1000);
                }else{
                  this.alert = this.ms1
                }
                })
            }
            else{
              console.log("err1");
              return false;
            }
          })

      },
      //向后台发送手机号码和短信验证码 判断是否登陆成功
      check:function(formname){
        this.$refs[formname].validate((valid)=>{
          if(valid && this.loginForm.code!=" "){
            let testdata = this.$qs.stringify({
              phone: this.loginForm.phone,
              code: this.loginForm.code
            });
            this.http({
              method:"post",
              url:"http://119.3.24.222:8080/nx/LoginServlet",
              data:testdata
            }).then(res=> {

              console.log(res.data.msg)
              if(res.data.msg== 0){
                this.alert = this.ms2
              }
              //登陆成功之后要做的事情
                console.log(res);

                //存储token到ls
                const {token} = res.data;
                window.localStorage.setItem('token',token);

                // 解析token
                const decoded = jwt(token);
                // console.log(decoded);

                //分发action
              this.$store.dispatch("setIsAuthenticated",!this.IsEmpty(decoded))
                //首次登陆
                if(res.data.msg == 1){
                    // console.log("首次登录") 跳转至填写信息界面
                  this.$router.push({path: `/edit`})

                }
                //并非首次登陆
                if(res.data.msg == 2){
                  console.log("并非shouci登录")
                //  跳转至个人信息页面
                  this.$router.push({path: `/edit/${res.data.phone}`})
                  // this.$router.push({path: `/show`})

               }

            }).catch(function(err){
               console.log(err);
              // this.alert = this.ms2
            })
          }
          // else{
          //   console.log("err")
          //   this.al rt = "请输入有效的验证码 "
          //   // this.$router.push({path:'/',query:{alert:"登录失败"}})
          //   return false
          // }

         })
      },


      AccesImg(){
        //获取图片验证码
        this.http({
          method:'get',
          url:'http://119.3.24.222:8080/nx/VerifyCodeServlet',
          responseType: 'arraybuffer'
        }).then(res=>{
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        }).then(data=>{
          this.src=data
        })
      },
      IsEmpty(value){
        return(
          value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0 ) || (typeof value === 'string' && value.trim().length === 0)
        )


      },
    },
    //刚一进来 就向后端发送请求获取图形验证码
    created(){
      this.AccesImg();
    },
    mounted(){

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
  .valid img{
    width: 25%;
    height: 90%;
  }
  .login{
    display: flex;
    height: 100%;
  }
.regform{
  flex: 1;
  margin: 61px 9% 0px 9%;
  width: 100%;
  position: relative;
}
.text{
  height: 90px;
  margin-bottom: 45px;
}
.regform p{
    font-family: PingFang SC;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #ffffff;
}
.regform label{
    width: 42px;
    height: 20px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;

}
.auth_text{
  position: absolute;
  right: 5%;
  margin-top: -40px;
  line-height:40px ;
  color: #676c70;

}
.btn{
 align-items: center;
  border-color: #4adea3;
  background-color: #4adea3;
  width: 130px;
  margin: 40px 25% 0 25%;
  height: 40px;
  border-radius: 25px;
  text-align: center;
}
 /*错误的边框颜色*/
 .el-form-item.is-error >>> .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input >>> input.invalid:focus{
   border-color: red !important;
  }
  /*错误的提示颜色*/
  .el-form-item.is-error >>> .el-form-item__error{
    color: red !important;
   }
  /*正确的边框颜色*/
  .el-form-item.is-success >>> .el-input__inner{
  border-color: #dcdfe6 !important;
  }



.el-message-box{
    width: 100px;
    background-color: red;
  }

  /*.regform {*/
    /*margin: 20px auto;*/
    /*width: 310px;*/
    /*background: #fff;*/
    /*box-shadow: 0 0 10px #B4BCCC;*/
    /*padding: 30px 30px 0 30px;*/
    /*border-radius: 25px;*/
  /*}*/
  /*.auth_text{*/

  /*}*/
  /*.auth_input{*/
    /*width:140px;*/
    /*height:38px;*/
    /*margin-bottom:20px;*/
    /*border:1px solid #DCDFE6;*/
    /*!* color:red; *!*/
    /*padding-left:10px;*/
    /*border-radius: 8%;*/
  /*}*/
  /*.regform[data-v-92def6b0]{*/
    /*width:370px;*/
    /*min-height: 440px;*/
  /*}*/
  /*.login-text{*/
    /*text-align: center;*/
    /*margin-bottom:20px;*/
  /*}*/
</style>
