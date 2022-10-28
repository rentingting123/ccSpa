<template>
  <div id="app">
    <el-backtop></el-backtop>
    <div class="top">
      <!-- 轮播图 -->
      <banner v-if="!$route.meta.noBanner" />
      <!-- navs -->
      <navs v-if="!$route.meta.noBanner" class="navs"/>
    </div>
    

    <router-view />

    <!-- 底部栏 -->
    <footercomponent />
  </div>
</template>

<script>
import banner from "@/hsj/components/banner";
import navs from "@/hsj/components/navs";
import footercomponent from "@/hsj/components/footer";
export default {
  name: "App",
  components: {
    banner,
    navs,
    footercomponent
  }
};
</script>

<style lang='less'>
#app {
  font-family: "-apple-system", "BlinkMacSystemFont", "Helvetica Neue",
    "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans CJK SC",
    "WenQuanYi Micro Hei", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: hidden;
  min-width: 1280px;
}
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_plnxvblo8fj.eot');
  src: url('//at.alicdn.com/t/font_674937_plnxvblo8fj.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_plnxvblo8fj.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_plnxvblo8fj.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_plnxvblo8fj.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_plnxvblo8fj.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.top{
  position: relative;
  .navs{
    // position: absolute;
    // bottom: 0;
    // left: 50%;
    // transform: translateX(-50%);
  }
}
</style>
