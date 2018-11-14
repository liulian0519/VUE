<template>
    <div class="leftnav">
      <el-row class="tac">
        <el-col :span="3">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :default-openeds="['1','1-2','1-3']"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>菜单栏</span>
              </template>
              <el-menu-item-group>
                <!--<template slot="title">分组一</template>-->
                <el-menu-item index="/selectinfo">查看信息</el-menu-item>
                <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
              </el-menu-item-group>
              <el-submenu index="1-2">
                <template slot="title">更新笔试状态</template>
                <el-menu-item index="/examprocess">更新笔试进程</el-menu-item>
                <el-menu-item index="/exampaper">更新试题</el-menu-item>
                <el-menu-item index="/examresult">更新笔试结果</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">更新面试状态</template>
                <el-menu-item index="/viewprocess">更新面试进程</el-menu-item>
                <el-menu-item index="viewresult">更新面试结果</el-menu-item>
              </el-submenu>
            </el-submenu>

          </el-menu>
        </el-col>

      </el-row>
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    </div>
</template>




<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
/*.leftnav >> .elrow{*/
  /*width: 600px;*/
/*}*/
</style>
