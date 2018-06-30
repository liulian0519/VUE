<template>
<div class="row">
  <div class="col-sm-12 col-md-8">
    <!--new pizza-->
    <app-new-pizza></app-new-pizza>
  </div>
  <div class="col-sm-12 col-md-4">
    <!--品种展示-->
    <h3 class="text-muted my-5">菜单</h3>
    <table class="table">
      <thead class="thead-default">
      <tr>
        <th>品种</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody v-for="item in getMenuItems" :key="item.name">
      <tr>
        <td>{{item.name}}</td>
        <td>
          <button @click="deleteItem(item)" class="btn btn-outline-danger btn-sm">&times;</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
  import NewPizza from './NewPizza'
    export default {
    data(){
      return{
        // getMenuItems:[]
      }
    },
    components:{
      'app-new-pizza':NewPizza
    },
    computed:{
      getMenuItems:{
        get(){
          return this.$store.state.menuItems
        },
        set(){

        }
      }
    },
    created(){
      fetch("https://pizza-1ab8b.firebaseio.com/menu.json")
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          // console.log(data);
          let menuArray =[];
          for(let key in data){
            // console.log(key);
            // console.log(data[key])
            data[key].id = key;
            menuArray.push(data[key])
          }
          //数据同步
          // this.getMenuItems = menuArray
          // console.log(this.getMenuItems)
          this.$store.commit('setMenuItems',menuArray)
        })

      },
      methods:{
        deleteItem(item){
          fetch("https://pizza-1ab8b.firebaseio.com/menu/" + item.id +"/.json",{
            method:"DELETE",
            headers:{
              "Content-type":'application/json'
            },
          })
            .then(res=> res.json())
            //跳转删除，实际上需要刷新，所以不能这样，应该用Vuex
            // .then(res=>this.$router.push({name:'menuLink'}))
            .then(res=>this.$store.commit("removeMenuItem",item))
            .catch(err=>console.log(err))
        }
      }

    }
      // data(){
      //     return{
      //       name:"liulian"
      //     }
      // },
      //组件内守卫
      //进入组件之前
      // beforeRouteEnter:(to,from,next)=>{
      //     // alert("hello " + this.name);
      //   next(vm=>{
      //     alert("hello" + vm.name)
      //   })
      // }
      //离开组件之前
      // beforeRouteLeave (to, from, next) {
      //   // 导航离开该组件的对应路由时调用
      //   if(confirm("确定离开么？")==true){
      //     next()
      //   }else{
      //     next(false)
      //   }
      // }



</script>

<style scoped>

</style>
