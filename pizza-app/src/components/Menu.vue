<template>
<div>
  <div class="col-sm-12">
    <table class="table">
      <thead class="thead-default">
      <tr>
        <th>尺寸</th>
        <th>价格</th>
        <th>加入</th>
      </tr>
      </thead>
      <tbody v-for="item in getMenuItem" :key="item.name">
      <tr>
        <td><strong>{{item.name}}</strong></td>
      </tr>
      <tr v-for="option in item.options" :key="option.size">
        <td>{{option.size}}</td>
        <td>{{option.price}}</td>
        <td><button class="btn-outline-success btn btn-sm" @click="goToBasket(item,option)">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>
  {{basckets}}
</div>
</template>

<script>
    export default {
        name: "Menu",
      data(){
          return{
            basckets:[],
            getMenuItem:{
              1:{
                'name':'榴莲Pizza',
                'description':'这是你的最爱么？反正是我是我的最爱',
                'options':[{
                  'size':9,
                  'price':18
                },{
                  'size':12,
                  'price':48
                }]
              },
              2:{
                'name':'芝士Pizza',
                'description':'芝士杀手，浓浓的芝士丝，食欲瞬间爆棚',
                'options':[{
                  'size':9,
                  'price':28
                },{
                  'size':12,
                  'price':68
                }]
              },
              3:{
                'name':'夏威夷Pizza',
                'description':'众多人的默认选择',
                'options':[{
                  'size':9,
                  'price':36
                },{
                  'size':12,
                  'price':78
                }]
              },
            }
        }
      },
      methods:{
        goToBasket(item,option){
          this.basckets.push({
            name:item.name,
            size:option.size,
            price:option.price,
            quality:1
          })

        }
      }
    }
</script>

<style scoped>

</style>
