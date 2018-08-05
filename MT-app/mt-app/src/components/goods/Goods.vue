<template>
<div class="goods">
  <!--分类列表-->
  <div class="menu-wrapper" ref="menuScroll">
    <ul>
      <!--专场-->
      <!--
      {'current':currentIndex === 0}
      如果拿到的下标值为0，就给专场栏加特殊样式
      {'current':currentIndex === index+1}
      拿到的下标值继续累加，给不同栏加特殊样式
      -->
      <li class="menu-item" :class="{'current':currentIndex === 0}" @click="selectMenu(0)">
        <p class="text">
          <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
          {{container.tag_name}}
        </p>
      </li>
      <!--其余的列表-->
      <li class="menu-item" :class="{'current':currentIndex === index+1}" v-for="(item,index) in goods" :key="index" @click="selectMenu(index+1)">
        <p class="text">
          <img class="icon" :src="item.icon" v-if="item.icon">
          {{item.name}}
        </p>
        <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
      </li>
    </ul>
  </div>

  <!--商品列表-->
  <div class="foods-wrapper" ref="foodScroll">
    <ul>
      <!--专场-->
      <li class="container-list food-list-hook ">
        <div v-for="item in container.operation_source_list">
          <img :src="item.pic_url">
        </div>
      </li>
      <!--具体分类-->
      <li v-for="item in goods" class="food-list food-list-hook">
        <h3 class="title">{{item.name}}</h3>
        <!--具体的商品列表-->
        <ul>
          <li v-for="food in item.spus" class="food-item">
            <div class="icon" :style="head_bg(food.picture)"></div>
            <div class="content">
              <h3 class="name">{{food.name}}</h3>
              <p class="desc" v-if="food.description">{{food.description}}</p>
              <div class="extra">
                <span class="saled">{{food.month_saled_content}}</span>
                <span class="praise">{{food.praise_content}}</span>
              </div>
              <img class="product" :src="food.product_label_picture">
              <p class="price">
                <span class="text">${{food.min_price}}</span>
                <span class="unit">/{{food.unit}}</span>
              </p>
            </div>
            <!--加减组件-->
            <div class="cartcontrol-wrapper">
              <app-cart-control :food="food" ></app-cart-control>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <!--购物车-->
  <app-shopcart :poin="poiInfo" :selectfoods="selectfoods"></app-shopcart>

</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Shopcart from '../shopcart/Shopcart'
  import CartControl from '../cartcontrol/CartControl'

    export default {
        name: "Good",
      data(){
          return{
            container:{},
            goods:[],
            poiInfo:{},
            //元素高度的数组
            listHeigth:[],
            menuScroll:{},
            foodScroll:{},
            //存放滚动的值
            scrollY:0
          }
      },
      components:{
          "app-shopcart":Shopcart,
        "app-cart-control":CartControl
      },
      computed:{
        currentIndex(){
          for(let i = 0;i<this.listHeigth.length;i++){
            //获取商品区间范围
            let height1 = this.listHeigth[i];
            let height2 = this.listHeigth[i+1];
            //如果滚动到这个区间，就把下标值返回，用与html里边的样式中
            if(!height2 ||(this.scrollY>=height1 && this.scrollY<height2)){
              // console.log(i)
              return i;
            }
          }
          return 0;
        },
        //监听foods有没有变化,如果有变化，传递给购物车
        selectfoods(){
          let foods = [];
          this.goods.forEach((myfoods)=>{
            myfoods.spus.forEach((food)=>{
              if(food.count>0){
                // console.log(food.count)
                foods.push(food)
              }
            })
          })
           // console.log(foods.length)
          return foods;
        }
      },
      methods:{
        head_bg(Imgname){
          return "background-image:url(" +Imgname + ")"
        },

        initScroll(){
          this.menuScroll = new BScroll(this.$refs.menuScroll);
         this.foodScroll =  new BScroll(this.$refs.foodScroll,{
           probeType:3,
           click:true
         });

        // 给foodScroll添加滚动监听事件
          this.foodScroll.on("scroll",(pos)=>{
            //得到的滚动值有正有负还有小数，进行整改
            this.scrollY = Math.abs(Math.round(pos.y))
           // console.log(this.scrollY);
          })

        },
        calculateHeight(){
          //获取元素
          let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
          // console.log(foodlist);
          let height = 0;
          this.listHeigth.push(height)
          for(let i=0;i<foodlist.length;i++){
            let item = foodlist[i];
            //拿到每一个元素的可视高度并进行累加
            height+=item.clientHeight
            this.listHeigth.push(height);
          }
          // console.log(this.listHeigth);
        },
        selectMenu(index){
         // console.log(index);

          //获取到元素
          let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
          let element = foodlist[index];
          console.log(element)
          //滚动到指定位置
          this.foodScroll.scrollToElement(element,250)
        },
        calculateCount(spus){
          let count = 0;
          spus.forEach((food)=>{
            if(food.count>0){
              count += food.count
            }
          })
          return count;
        }
      },
      created(){
          fetch('/api/goods')
            .then(res=>{
              console.log(res);
              return res.json()
            })
            .then(response=>{
              // console.log(response);
              if(response.code == 0){
                this.container = response.data.container_operation_source;
                this.goods = response.data.food_spu_tags;
                this.poiInfo = response.data.poi_info;
                //DOM已经更新才会执行
                this.$nextTick(()=>{
                  //执行滚动方法
                  this.initScroll();
                  //  设置滚动时侧边栏也有所反应，四个步骤
                  //  1.计算分类的区间高度
                  this.calculateHeight();
                  //  2.监听滚动的位置
                        // 108行 this.foodScroll.on   better scroll 自定义事件

                  //  3.根据滚动的位置确认下标与左侧对应
                       // 通过computed 中 currentIndex 得到下标
                  //  4.通过下标实现点击左侧，滚动右侧
                })

              }
            })
      }
    }
</script>

<style scoped>
.goods{
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
  .goods .menu-wrapper{
    flex:0 0 85px;
    background: #f4f4f4;
  }
.goods .foods-wrapper{
  flex: 1;
  /*background: blue;*/
}
/*Menu item */
.goods .menu-wrapper .menu-item{
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}
  .goods .menu-wrapper .menu-item .text{
    font-size: 13px;
    color: #333;
    line-height:17px;
    vertical-align:middle;
    /*只展示两行，多出来的部分用...代替 */
    -webkit-line-clamp:2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
.goods .menu-wrapper .menu-item .text .icon{
    width:15px ;
    height: 15px;
    vertical-align: middle;
  }
  /*专场样式*/
.goods .foods-wrapper .container-list{
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;
}
  .goods .foods-wrapper .container-list img{
    width: 100%;
    margin-bottom: 11px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  /*具体分类商品布局*/
  .goods .foods-wrapper .food-list{
    pdding:11px;
  }
  .goods .foods-wrapper .food-list .title{
    height: 13px;
    font-size: 13px;
    background: url(img/btn_yellow_highlighted@2x.png) no-repeat left center;
    -webkit-background-size: 2px 10px;
    background-size: 2px 10px;
    padding-left: 7px;
    margin-bottom: 12px;
  }
  .goods .foods-wrapper .food-list .food-item{
    display: flex;
    margin-bottom: 25px;
    position: relative;
  }
.goods .foods-wrapper .food-list .food-item .icon{
  flex: 0 0 63px;
  background-position:center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content{
  flex: 1;
}
  /*具体内容样式*/
.goods .foods-wrapper .food-list .food-item .content .name{
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}
.goods .foods-wrapper .food-list .food-item .content .desc{
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;
  /* 超出1行显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .foods-wrapper .food-list .food-item .content .extra{
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled{
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product{
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price{
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text{
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit{
  font-size: 12px;
  color: #BFBFBF;
}
  /*当前选中状态样式*/
  .goods .menu-wrapper .menu-item.current{
    background:#fff;
    font-weight: bold;
    margin-top: -1px;
  }
.goods .menu-wrapper .menu-item:first-child.current{
  margin-top: 1px;
}
  /*加减号样式*/
.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom:0;
}
  /*number 样式*/

  .goods .menu-wrapper .menu-item .num{
    position: absolute;
    right: 5px;
    top: 5px;
    width: 13px;
    height: 13px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    color: #fff;
    background: red;
    text-align: center;
    font-size: 7px;
    line-height: 13px;
  }

</style>
