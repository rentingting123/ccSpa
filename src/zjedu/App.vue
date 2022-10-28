<template>
  <div id="app">
    <el-backtop ></el-backtop>
    <headers :path="path"/>
    <!-- <img src="http://image.moocollege.com/v2_customer/LHyzVVGszN54eys60UaaIvlrrWTkKWFzeczaVbGtFLW7cPAmRyR5Aa5G46z53Vry_1588212700959.jpg" width="100%" height="350px"> -->
    <router-view class="body"/>
    <!-- 底部 -->
    <footerlast/>
  </div>
</template>

<script>
import headers from './components/header';
import footerlast from './components/footer'

export default {
  name: "App",
  components:{
    headers,
    footerlast,
  },
  data(){
    return {
      id:"",
      path: '/'
    }
  },
  methods:{
    
  },
  watch:{
    $route(to, from){
      this.path = to.path;
    }
  }
};
</script>

<style lang='less'>
#app {
  font-family: 'shs-normal','-apple-system','BlinkMacSystemFont','Helvetica Neue','PingFang SC','Microsoft YaHei','Source Han Sans SC','Noto Sans CJK SC','WenQuanYi Micro Hei','sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: hidden;
}
.body{
  min-height: calc(100vh - 60px - 160px);
}
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_phluzqb8pg.eot');
  src: url('//at.alicdn.com/t/font_674937_phluzqb8pg.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

</style>
