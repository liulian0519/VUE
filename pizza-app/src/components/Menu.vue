<template>
<div class="row">
  <!--菜单-->
  <div class="col-sm-12 col-md-8">
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
  <!--购物车-->
  <div class="col-sm-12 col-md-4">
    <div v-if="basckets.length>0">
      <table class="table">
        <thead class="thead-default">
        <tr>
          <th>数量</th>
          <th>品种</th>
          <th>价格</th>
        </tr>
        </thead>
        <tbody v-for="item in basckets">
        <tr>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="decrease(item)">-</button>
            <span>{{item.quality}}</span>
            <button class="btn btn-sm btn-outline-danger" @click="increase(item)">+</button>
          </td>
          <td>{{item.name}}{{item.size}}</td>
          <td>{{item.price * item.quality}}</td>
        </tr>
        </tbody>
      </table>
      <p>总价：{{total}}</p>
      <button class="btn btn-success btn-block">提交</button>
    </div>
    <div v-else>
      {{basketText}}
    </div>
  </div>


</div>
</template>

<script>
    export default {
        name: "Menu",
      data(){
          return{
            basckets:[],
            basketText:"购物车中没有任何东西",
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
      computed:{
        //  计算总价
        total(){
          let totalPrice =0
          for(let index in this.basckets){
            let item = this.basckets[index];
            totalPrice += item.quality * item.price
          }
          return totalPrice
        }
      },
      methods:{
        goToBasket(item,option){
          let basket={
            name:item.name,
            size:option.size,
            price:option.price,
            quality:1
          }
          if(this.basckets.length>0){
          //  过滤
            let result = this.basckets.filter((basket)=>{
              return (basket.name == item.name && basket.price == option.price)
            });
            if(result!=null && result.length>0){
              result[0].quality++
            }else{
              this.basckets.push(basket);
            }
          }else{
            this.basckets.push(basket);
          }


        },
        //如果数量小于1，则删除此项
        removeBacket(item){
          console.log(this.basckets.indexOf(item))
          this.basckets.splice(this.basckets.indexOf(item),1)
        },
        decrease(item){
          item.quality--;
          if(item.quality<=0){
            this.removeBacket(item);
          }
        },
        //数量++
        increase(item){
          item.quality++
        }

      }
    }
</script>

<style scoped>

</style>
