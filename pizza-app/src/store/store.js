import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
  //  用来存储数据
    menuItems:{},
    currentUser:null,
    isLogin:false
  },
  getters:{
  //  获取属性的状态
    getMenuItems:state=>state.menuItems,
    currentUser:state=>state.currentUser,
    isLogin:state=>state.isLogin
  },
  mutations:{
  //  改变属性状态
    setMenuItems(state,data){
      state.menuItems = data
    },
  //  将匹配到的对象在menuitems中删除
    removeMenuItem(state,data){
      state.menuItems.forEach((item,index)=>{
        if(item == data){
          state.menuItems.splice(index,1)
        }
      })
    },
    //将新东西添加到menuitem中
    pushToMenuItem(state,data){
      state.menuItems.push(data)
    },
    //
    userStatus(state,user){
      if(user){
        state.currentUser = user
        state.isLogin = true
      }else{
        state.currentUser = null
        state.isLogin = false
      }
    }
  },
  actions:{
  //  应用mutations
    setUser({commit},user){
      commit("userStatus",user)
    }
  }
})
