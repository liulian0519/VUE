<template>
    <div class="modify">
      <h2>修改信息页面</h2>
      <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input v-model.number="ruleForm.sno"></el-input>
        </el-form-item>
        <el-form-item label="专业班级" prop="class">
          <el-input v-model="ruleForm.class" placeholder="例：软件1803"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model.number="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="所选方向" prop="interest">
          <el-select v-model="ruleForm.interest" placeholder="请选择方向">
            <el-option label="产品" value="产品"></el-option>
            <el-option label="运营" value="运营"></el-option>
            <el-option label="视觉" value="视觉设计"></el-option>
            <el-option label="前端" value="前端"></el-option>
            <el-option label="后端" value="后端"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Modify",
      data(){
          return{
            ruleForm:"",
            labelPosition:'left',
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
        }
      },
      created(){
        this.fechId(this.$route.params.id);
      }
    }
</script>

<style scoped>
h2{
  text-align: center;
}
</style>
