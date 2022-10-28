<template>
  <div id="app">
    <!-- 头部 -->
    <headerNav v-if="id"/>
    <router-view v-if="id"/>
    <!-- 底部栏 -->
    <footerNav v-if="id"/>
    <!-- 底部 -->
    <footerlast v-if="id"/>
  </div>
</template>

<script>
import headerNav from './view/header'
import footerNav from './view/footer'
import footerlast from './view/footer/last'

import network from "@/api/index";
import { setItem } from "@/common/common.js";

export default {
  name: "App",
  components:{
    headerNav,
    footerNav,
    footerlast
  },
  created(){
    this.init()
  },
  data(){
    return {
      id:"",
    }
  },
  methods:{
    async init(){
        let enable = await network.checkSkinEnable({data:{domain:location.host.split(".")[0]}})
        if(enable == 'error'){
          // this.$message.error("该域名绑定的皮肤非免费皮肤或未续费请联系客服处理！")
        }else{
          document.getElementsByTagName('title')[0].innerText=enable.name
          let  baseInfo = await network.skinGet({data:{
            type: 17,
            id: enable.competitionId+'',
          }})
          if(baseInfo=='error') return;
          setItem('baseInfo',JSON.stringify(baseInfo))
          setItem('competitionId',enable.competitionId)
          this.id = enable.competitionId
        } 
    }
  }
};
</script>

<style>
#app {
  font-family: "Source Han Sans","PingFang SC","Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.eot');
  src: url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_zc5lc2qjv8k.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
