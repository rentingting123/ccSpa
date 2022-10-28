<template>
  <div id="app">
    <router-view class="mainbody"/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "App",
  data(){
    return {
      index: 'homepage',
    }
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
html,body{
  font-family: 'PingFang SC', 'Source Han Sans', 'Microsoft Yahei', 'Heiti SC';
}
.inlineText{
      white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
    overflow: hidden;
}
a {
  text-decoration: none;
  color: #000;
  font-family: PingFang-SC-Regular;
}

ol,
ul {
  list-style: none;
}
/*文字溢出隐藏用省略号代替*/
.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cha-pagination {
  height: 6.25rem;
  position: relative;
  margin: 3.125rem auto 0;
}
.cha-pagination .cha-page {
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline;
}
/*图标库*/
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.eot');
  src: url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_wcfl4q4n3h.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/*图标颜色*/
.iconfont-down {
  color: #4199ff;
}
.iconfont-add {
  color: #4a4a4a;
}
/*上传图标*/
.icon-up {
  color: #1d86ff;
  font-size: 40px;
  display: inline-block;
  margin: 21px 0;
}
.clearfix:after{
    visibility:hidden;
    display:block;
    font-size:0;
    content: " ";
    clear:both;
    height:0;
    }
.clearfix{
    *zoom:1;
}


#app {
  width: 100%;
  min-width: 60em;
  text-align: center;
  color: #4a4a4a;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  /* padding-top: 4rem; 
  padding-bottom: 2rem; */
  /* margin-top: 60px; */
  background: linear-gradient(to bottom, #e4e6e8 0%, #f4f6f9 5%, #f8fafc 100%);
}
.mainbody{
  min-height: 100vh;
}
/*  竞赛报名表选中行背景色 */
.cellClass {
   background-color: #ecf5ff !important;
}
</style>
