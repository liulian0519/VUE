<template>
    <div class="show">
      <h2>个人主页</h2>

      <!--{{ruleForm.name}} -&#45;&#45; {{ruleForm.interest}}-->
      <div class="wrapper">
        <div class="info">
          <span class="name">{{ruleForm.name}}</span>
          <span class="mod"  @click="modify()">修改</span>
          <p>{{ruleForm.sno}}</p>
          <span class="interest">{{ruleForm.interest}}</span>
          <img src="../assets/creat.png">
        </div>
      </div>
      <div class="penwrapper">
        <h3>笔试</h3>
        <div class="pen">
          <p>笔试尚未开始</p>
        </div>
      </div>

      <div class="mianshi">
        <h3>面试</h3>
        <div class="mianWrapper">
          <div  style="height: 130px;">
            <el-steps direction="vertical" :active="1">
              <el-step title="一轮面试" :description=result></el-step>
              <el-step title="二轮面试" description="未开始"></el-step>
            </el-steps>
          </div>
        </div>


      </div>

    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "show",
      data(){
          return{
            ruleForm:"",
            result:'未开始'
          }
      },
      methods:{
          fechId(id){
            console.log(id);
            axios.get('/user/'+id + '.json')
              .then(response=>{
                console.log(response)
                this.ruleForm = response.data
                var te = this.ruleForm.sno;
                var one = te.toString().substring(0,3)
                var two = te.toString().substring(3,7)
                var three = te.toString().substring(7,11)
                var phone = one + '-' + two + '-'+three
                this.ruleForm.sno = phone
                // console.log();

              })

          },
          modify(){
            //携带id 跳转至修改信息页面

            this.$router.replace('/modify/' + this.$route.params.id)
          }

      },
      created(){
           // console.log(this.$route.params.id);
          this.fechId(this.$route.params.id);
          // test();
      }
    }
</script>

<style scoped>

  h2{
    height: 25px;
    font-family: PingFang SC;
    font-size: 18px;
    padding-top: 15px;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
  }
  .wrapper{
    padding: 13px;
    /*border: 1px solid #e2e2e2;*/
    margin-bottom: 40px;
  }
  .info{
    border: 1px solid #e2e2e2;
    height: 128px;
    background-color: #fff;
    box-shadow: 0px 8px 32px 0px rgba(0,0,0,0.16);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .info .name{
    float: left;
    padding-left: 17px;
    padding-top: 13px;
    font-size: 24px;
    height: 33px;
    line-height: 33px;
    color: #2c2d2e;
    font-family: PingFang SC;
  }
  .info .mod{
    float:right;
    padding-right:17px ;
    padding-top: 23px;
    font-family: PingFang SC;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: #6f7774;
    opacity: 0.78;
  }
  .info p{
    clear: both;
    padding-top:20px;
    padding-left: 17px;
    height: 25px;
    font-size: 18px;
    line-height: 25px;
    color: #333333;
  }
  .info .interest{
    display: inline-block;
    padding-left: 17px;
    margin-top:10px;
    color: #333333;
  }
  .info img{
    float: right;
    padding-top: 28px;
  }
  .penwrapper{
    padding: 13px;
  }
  .penwrapper h3{
    margin-top: -10px;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }
  .pen{
    height: 128px;
    margin-bottom: 40px;
    padding: 17px;
    border: 1px solid #fff;
    background-color: #ffff;
    box-shadow: 0px 8px 16px 0px
    rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
  .pen p{
    font-size: 16px;
    line-height: 22px;
    color: #777777;
  }
  .mianshi{
    padding: 10px;
    margin-top: -15px;
    height: 191px;
    /*border: 1px solid #e2e2e2;*/
  }
  .mianshi h3{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .mianWrapper{
    height: 191px;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px 0px
    rgba(0, 0, 0, 0.16);
    padding: 13px;
    border-radius: 4px;
  }
  .mianshi >>> .el-step__head.is-finish{
    color: #b7b7b7;
    border-color: #b7b7b7b7;
  }
  .mianshi >>>.el-step__head.is-process{
    color: #b7b7b7;
    border-color: #b7b7b7b7;
  }


  .mianshi >>> .el-step__title.is-finish {
    color: #777777;
    font-size: 16px;
    line-height: 22px;
  }
  .mianshi >>> .el-step__description.is-finish{
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #9c9c9c;
    padding-top: 10px;
  }

  .mianshi >>> .el-step__title.is-process{
    color: #777777;
    font-size: 16px;
    line-height: 22px;
  }
  .mianshi >>> .el-step__description.is-process{
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #9c9c9c;
    padding-top: 10px;
  }

</style>
