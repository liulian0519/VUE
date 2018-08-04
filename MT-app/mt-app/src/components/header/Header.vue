<template>
    <div class="header">
      <!--{{poInfo.name}}-->
      <!--顶部通栏开始-->
      <div class="top-wrapper">
        <div class="back-wrapper">
          <span class="icon-arrow_lift"></span>
        </div>

        <form class="search-wrapper">
          <span class="search-icon"></span>
          <input class="search-bar" type="text" placeholder="搜索店内商品" />
        </form>

        <div class="more-wrapper">
          <a class="spelling-bt" href="#">拼单</a>
          <div class="more-bt">
            <i class="s-radius"></i>
            <i class="s-radius"></i>
            <i class="s-radius"></i>
          </div>
        </div>
      </div>
      <!--顶部通栏结束-->
      <!--背景内容开始-->
      <div class="bg-wrapper" :style="head_pic_url">
        <!--<img :src="poInfo.head_pic_url">-->
      </div>
      <!--背景内容结束-->
      <!--主题内容开始-->
      <div class="content-wrapper">
        <!--图片-->
        <div class="icon" :style="head_bg"></div>
        <div class="name">
          <h3>{{poInfo.name}}</h3>
        </div>
        <div class="collect">
          <img src="img/star.png">
          <span>收藏</span>
        </div>
      </div>
      <!--主题内容结束-->

      <!--公告内容开始-->
      <div class="bulletin-wrapper">
        <img class="icon" v-if="poInfo.discounts2" :src="poInfo.discounts2[0].icon_url">
        <span class="text" v-if="poInfo.discounts2">{{poInfo.discounts2[0].info}}</span>
        <div class="detail" v-if="poInfo.discounts2" @click="showdetail">
          {{poInfo.discounts2.length}}个活动
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>

      <!--公告内容结束-->

      <!--公告详情开始-->
      <transition name="bulletin-detail">
        <div class="bulletin-detail" v-show="isshow">
          <div class="detail-wrapper">
            <!--相关内容 容器-->
            <div class="main-wrapper" :style="detail_bg">
              <div class="icon" :style="head_bg"></div>
              <h3 class="name">{{poInfo.name}}</h3>
              <!--星级评价-->
              <div class="score">
                <!--传递分数-->
                <app-star :score="poInfo.wm_poi_score"></app-star>
                <span>{{poInfo.wm_poi_score}}</span>
              </div>
              <!--起送 配送-->
              <p class="tip">
                {{poInfo.min_price_tip}}<i> </i> {{poInfo.shipping_fee_tip}}<i> </i> {{poInfo.delivery_time_tip}}
              </p>

              <p class="time">
                配送时间：{{poInfo.delivery_time_tip}}
              </p>

              <div class="discounts" v-if="poInfo.discounts2">
                <p>
                  <img :src="poInfo.discounts2[0].icon_url">
                  <span class="text" v-if="poInfo.discounts2">{{poInfo.discounts2[0].info}}</span>
                </p>
              </div>

            </div>
            <!--关闭那个 容器-->
            <div class="close-wrapper">
              <!--关闭按钮-->
              <span class="icon-close" @click="closeBull"></span>
            </div>
          </div>
        </div>
      </transition>

      <!--公告详情结束-->
    </div>
</template>

<script>
  import Star from '../stat/Star'
    export default {
        name: "Header",
      data(){
          return{
            isshow:false
          }
      },
      //接受传过来的poinfo
      props:{
          poInfo:{
            type:Object,
            default:{}
          }
      },
      computed:{
          head_pic_url(){
            return "background-image:url(" +this. poInfo.head_pic_url + ")"
          },
        head_bg(){
            return "background-image:url(" +this.poInfo.pic_url + ")"
        },
        detail_bg(){
            return "background-image:url(" +this.poInfo.poi_back_pic_url + ")"
        }
      },
      components:{
          "app-star":Star
      },
      methods:{
          //点击展示公告详情
        showdetail(){
          this.isshow = true
        },
        //关闭容器
        closeBull(){
          this.isshow = false
        }
      }
    }
</script>

<style scoped>
@import "../../common/css/icon.css";
  .header{
    height: 130px;
    padding-top: 20px;
  }
  /*顶部通栏样式*/
  .header .top-wrapper{
    position: relative;
  }
  .header .top-wrapper .back-wrapper{
    width: 50px;
    height: 31px;
    position:absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 31px;
  }
  .header .top-wrapper .back-wrapper span{
    display: inline-block;
    color: white;
  }
  .header .top-wrapper .search-wrapper{
    width:100%;
    height: 31px;
    /*background: pink;*/
    padding: 0 104px 0 50px;
    box-sizing: border-box;
  }
.header .top-wrapper .search-wrapper .search-icon {
  width: 28px;
  height: 31px;
  background: url(img/search.png) no-repeat 11px center;
  background-size: 13px 13px;
  position: absolute;
}

.header .top-wrapper .search-wrapper .search-bar {
  width: 100%;
  height: 31px;
  border: 0;
  /* 设置盒子从边框开始计算*/
  box-sizing: border-box;
  background: #cdcdcc;
  border-radius: 25px;
  padding-left: 28px;
  /* 去除选中时蓝色边框*/
  outline: none;
}

.header .top-wrapper .more-wrapper {
  width: 65px;
  height: 24px;
  /* background: orange; */
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px 15px 0 24px;
}

.header .top-wrapper .more-wrapper .spelling-bt {
  width: 30px;
  height: 17px;
  color: white;
  line-height: 17px;
  border: 1px solid white;
  text-align: center;
  float: left;
  text-decoration: none;
  font-size: 10px;
}

.header .top-wrapper .more-wrapper .more-bt {
  float: right;
  width: 20px;
  height: 24px;
  margin-left: 13px;
  margin-top: 6px;
}

.header .top-wrapper .more-wrapper .more-bt .s-radius {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid white;
  display: block;
  float: left;
  margin-right: 1px;
}
  /*背景图片样式*/
  .header .bg-wrapper{
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;

    background-size:100% 135% ;
    background-position: center -12px;
  }
  /*主题内容 样式*/
  .header .content-wrapper{
    padding: 17px 10px 11px;
    height: 50px;
  }
    /*麦当劳图片*/
  .header .content-wrapper .icon{
    width: 50px;
    height: 50px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    float: left;
  }
  .header .content-wrapper .name{
    float: left;
    padding: 18px 0 0 12px;
  }
  .header .content-wrapper .name h3{
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
  .header .content-wrapper .collect{
    width: 25px;
    height: 37px;
    float: right;
    text-align: center;
    padding-top: 6px;
  }
  .header .content-wrapper .collect img{
    width: 20px;
    height: 20px;
  }
  .header .content-wrapper .collect span{
    margin-top: 7px;
    color: #fff;
    font-size: 11px;
  }
  /*公告样式*/
  .header .bulletin-wrapper{
    height: 16px;
    padding: 0 10px;
  }
  .header .bulletin-wrapper .icon{
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
  }
  .header .bulletin-wrapper .text{
    font-size: 11px;
    color: #fff;
    float: left;
    line-height: 16px;
  }
  .header .bulletin-wrapper .detail{
    float: right;
    color: #fff;
    font-size: 11px;
    line-height: 16px;
  }
  .header .bulletin-wrapper .detail span{
    font-size: 16px;
    line-height: 16px;
    float: right;
  }
  /*公告详情*/
 .header .bulletin-detail{
   width: 100%;
   height: 100%;
   position: absolute;
   left: 0;
   right: 0;
   background: rgba(98,98,98,0.8);
   z-index: 999;
 }
.header .bulletin-detail .detail-wrapper {
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  box-sizing: border-box;
}
.header .bulletin-detail .detail-wrapper .main-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  border-radius: 10px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .icon {
  width: 60px;
  height: 60px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
  display: inline-block;
  margin-top: 40px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .name {
  font-size: 15px;
  color: white;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score {
  height: 10px;
  margin-top: 6px;
  text-align: center;
  font-size: 0;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score .star {
  display: inline-block;
  margin-right: 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score span {
  display: inline-block;
  font-size: 10px;
  color: white;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .tip {
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}


.header .bulletin-detail .detail-wrapper .main-wrapper .time {
  font-size: 11px;
  color: #bababc;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts {
  margin-top: 20px;
  padding: 0 20px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p {
  padding-top: 20px;
  border-top: 1px solid #BABABC;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span {
  font-size: 11px;
  line-height: 16px;
  color: white;
}

.header .bulletin-detail .detail-wrapper .close-wrapper {
  padding-top: 20px;
  height: 40px;
  text-align: center;
}

/* 动画效果 */
.bulletin-detail-enter-active,
.bulletin-detail-leave-active {
  transition: 2s all;
}

.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}

.bulletin-detail-enter-to,
.bulletin-detail-leave {
  opacity: 1;
}
</style>
