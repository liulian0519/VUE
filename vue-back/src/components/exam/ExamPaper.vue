<template>
    <div class="exam-paper">
      <app-header></app-header>
      <div class="test">
        <app-left></app-left>
      </div>

      <div class="aper">
        <el-card>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="所选方向"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.directed }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit" circle
                  @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button
                  size="mini"
                  type="success" icon="el-icon-check" circle
                  @click="handleQuery(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-card>



      </div>
    </div>
</template>

<script>
  import leftnav from '../LeftNav'
  import Header from '../Header'
    export default {
      name: "ExamPaper",
      data() {
        return {
          tableData: [{
            directed:'产品'
          }, {
            directed:'运营'
          }, {
            directed:'视觉设计'
          }, {
            directed:'前端'
          },{
            directed:'后端'
          }]
        }
      },
      methods: {
        //像后端发送请求得到试卷
        handleEdit(index, row) {
          console.log(row.directed);
        //  1	基础题
        //   2	前端单选题
        //   3	后端单选题
        //   4	产品单选题
        //   5	运营单选题
        //   6	视觉单选题
        //   7	前端问答题
        //   8	后端问答题
        //   9	产品问答题
        //   10	运营问答题
        //   11	视觉问答题
        //   12	编程题
          this.http({
            method:'post',
            url:'http://api.creatshare.com/answer-api/question/insert',
            data:{
              quType:1,
              quContent:'test',
              quAnswer:'test'
            }
          }).then(res=>{
            console.log(res)
          })
        },
        handleQuery(index, row) {
          console.log(index, row);
        }
      },

      components:{
        'app-header':Header,
        'app-left':leftnav
      }
    }
</script>

<style scoped>
.test{
  width: 20%;
  float: left;
}
.aper{

  /*border: 1px solid blue;*/
  width:45%;
  height: 500px;
  float: right;
  margin-right: 200px;
  margin-top: 40px;

}
</style>
