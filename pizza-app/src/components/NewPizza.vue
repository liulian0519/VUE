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
    <button class="btn btn-success btn-block">添加</button>
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
      }
    }
</script>

<style scoped>

</style>
