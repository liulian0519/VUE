<template>
<form>
  <h3 class="text-muted my-5">添加新的Pizza</h3>
  <div class="form-group row">
    <label class="col-sm-1">品种</label>
    <div class="col-sm-11">
      <input type="text" class="form-control" v-model="newPizza.name">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-1">描述</label>
    <div class="col-sm-11">
      <textarea class="form-control" v-model="newPizza.description" rows="5"></textarea>
    </div>
  </div>
  <p><strong>选项1</strong></p>
  <div class="form-group row">
    <label class="col-sm-1">尺寸</label>
    <div class="col-sm-11">
      <input type="text" class="form-control" v-model="newPizza.size1">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-1">价格</label>
    <div class="col-sm-11">
      <input type="text" class="form-control" v-model="newPizza.price1">
    </div>
  </div>
  <p><strong>选项2</strong></p>
  <div class="form-group row">
    <label class="col-sm-1">尺寸</label>
    <div class="col-sm-11">
      <input type="text" class="form-control" v-model="newPizza.size2">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-1">价格</label>
    <div class="col-sm-11">
      <input type="text" class="form-control" v-model="newPizza.price2">
    </div>
  </div>
  <div class="form-group row mt-5">
    <button type="button" @click="addMenu" class="btn btn-success btn-block">添加</button>
  </div>

</form>
</template>

<script>
    export default {
        name: "NewPizza",
      data(){
          return{
            newPizza:{}
          }
      },
      methods:{
        addMenu(){
          // console.log(this.newPizza)

          let data = {
            name:this.newPizza.name,
            description:this.newPizza.description,
            options:[
              {
                size:this.newPizza.size1,
                price:this.newPizza.price1
              },
              {
                size:this.newPizza.size2,
                price:this.newPizza.price2
              }
            ]
          }
        //  将data传给后台   axios  vue-resource  fetch
          fetch("https://pizza-1ab8b.firebaseio.com/menu.json",{
            method:"POST",
            headers:{
              "Content-type":'application/json'
            },
            body:JSON.stringify(data)       //将数据转化成Json格式
          })
            .then(res=>res.json())
            .then(data=>this.$router.push({name:'menuLink'}))
            .catch(err=>console.log(err))
        }
      }
    }
</script>

<style scoped>

</style>
