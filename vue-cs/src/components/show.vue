<template>
    <div class="show">
      <h2>个人主页</h2>

      <!--{{ruleForm.name}} -&#45;&#45; {{ruleForm.interest}}-->
      <div class="wrapper">
        <div class="info">
          <label>{{ruleForm.name}}</label>
          <label class="inte">{{ruleForm.interest}}</label>
          <el-button type="primary"  @click="modify()">修改</el-button>
          <p>假装手机号{{ruleForm.sno}}</p>
        </div>
      </div>
      <div class="bishi">
        <h3>笔试</h3>
        <p>笔试正在安排中</p>
        <el-button type="primary" disabled>敬请期待</el-button>
      </div>
      <div class="mianshi">
        <h3>面试</h3>
        <div style="height: 300px;">
          <el-steps direction="vertical" :active="1">
            <el-step title="一轮面试" description="天道酬勤"></el-step>
            <el-step title="二轮面试" description="日后的你定会感激今日努力的自己"></el-step>
            <el-step title="体验式结果" description="请静待佳音"></el-step>
          </el-steps>
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
            ruleForm:""
          }
      },
      methods:{
          fechId(id){
            console.log(id);
            axios.get('/user/'+id + '.json')
              .then(response=>{
                console.log(response)
                this.ruleForm = response.data
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
    text-align: center ;
  }
  .wrapper{
    padding: 10px;
    border: 1px solid #e2e2e2;
    margin-bottom: 40px;
  }
  .inte{
    padding-left: 10%;
    padding-right: 10%;
  }
  .bishi{
    margin-bottom: 40px;
    padding: 10px;
    border: 1px solid #e2e2e2;
  }
  .mianshi{
    padding: 10px;
    border: 1px solid #e2e2e2;
  }

</style>
