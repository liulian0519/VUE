<template>
    <div class="shopcart-wrapper">
      <!--底部左侧-->
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highligh':totalCount>0 }">
          <span :class="{'highligh':totalCount>0 }"  class="icon-shopping_cart logo"></span>
          <!--个数-->
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
          <p :class="{'highligh':totalCount>0 }" class="tip">另需{{poin.shipping_fee_tip}}</p>
        </div>
      </div>
      <!--底部右侧-->
      <div :class="{'highligh':totalCount>0 }" class="content-right">
        {{payStr}}
      </div>
    </div>
</template>

<script>
    export default {
        name: "Shopcart",
      props:{
        poin:{
            type:Object,
            default:{}
          },
        //接受传过来的foods
        selectfoods:{
          type:Array,
          default(){
            return [

            ]
          }
        }

      },
      computed:{
      //  计算个数   和 总价钱
        totalCount(){
          let num = 0;
          this.selectfoods.forEach((food)=>{
            num += food.count;
          })

          return num;
        },
        totalPrice(){
          let total = 0;
          this.selectfoods.forEach((food)=>{
            total +=food.min_price * food.count;
          })
          return total;
        },
        payStr(){
          if(this.totalCount>0){
            return '去结算'
          }else{
            return this.poin.min_price_tip
          }
        }
      },

    }
</script>

<style>
  @import "../../common/css/icon.css";

.shopcart-wrapper{
  width: 100%;
  height: 51px;
  background: #514f4f;
  position:fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
}
  .shopcart-wrapper .content-left{
    flex: 1;
  }
  .shopcart-wrapper .content-right{
    flex: 0 0 110px;

    font-size: 15px;
    color: #bab9b9;
    line-height: 51px;
    text-align: center;
    font-weight: bold;
  }
  .shopcart-wrapper .content-left .logo-wrapper{
    width: 50px;
    height: 50px;
    background: #666;
    border-radius: 50%;
    position: relative;
    top: -14px;
    left: 10px;
    text-align: center;
    float: left;
  }
  .shopcart-wrapper .content-left .logo-wrapper .logo{
    font-size: 28px;
    color: #c4c4c4;
    line-height: 50px;
  }
  .shopcart-wrapper .content-left .desc-wrapper{
    float: left;
    margin-left: 13px;
  }
  .shopcart-wrapper .content-left .desc-wrapper .tip{
    font-size: 12px;
    color: #bab9b9b9;
    line-height: 51px;
  }
  .shopcart-wrapper .content-left .logo-wrapper.highligh{
    background: #ffd161;
  }
  .shopcart-wrapper .content-left .logo-wrapper .logo.highligh{
    color: #2d2b2a;
  }
  .shopcart-wrapper .content-left .logo-wrapper .num{
    width: 15px;
    height: 15px;
    line-height: 15px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    font-size: 9px;
    color: #fff;
    background: red;
    position: absolute;
    right: 0;
    top: 0;
  }
  .shopcart-wrapper .content-left .desc-wrapper .tip.highligh{
    line-height: 12px;
  }
  .shopcart-wrapper .content-right.highligh{
    background: #ffd161;
    color: #2d2b2a;
  }
  .shopcart-wrapper .content-left .desc-wrapper .total-price{
    font-size: 18px;
    line-height: 33px;
    color: #fff;
  }

</style>
