<template>
<div class="home layout">
    <el-container :style="{minHeight: '100vh'}">
        <el-header>           
            <header-nav />
        </el-header>
        <el-container>
            <el-aside style="width:200px;" ref="side1" hide-trigger>
                <asideleft/>
            </el-aside>
            <el-main style="padding:16px;">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>



<script>
import asideleft from "@/pps/components/aside";
import headerNav from "@/pps/components/header";

import network from '@/pps/api/index'
export default {
  components: {
    asideleft,
    headerNav
  },
  data() {
    return {};
  },
  async created(){
    //   let res = await network.operatecheckLogin();
     // if(res=='error') return this.$router.push('/');
  }
};
</script>


<style lang="less" scoped>
.home{
    text-align: center;
}
.layout ::v-deep .el-container{
    background-color:#f8f8f8;
}
</style>

<style lang="less">
.clearfix {
    zoom: 1;
}

.clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
}

.el-header, .el-footer, .el-aside {
    background-color: #fff;
    
    color: black;   
    // background-color: #515a6e;
}
.el-header{ 
    line-height: 60px;    z-index: 1;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 20%);
    //  position: sticky;
}
.el-main {
    background-color: #f8f8f8;
}
</style>
