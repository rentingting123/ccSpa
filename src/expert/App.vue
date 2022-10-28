<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: "App",
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  watch:{
    $route(from, to){
      this.$store.commit("tabNameCommon", from.path)
    }
  }
};
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_phluzqb8pg.eot');
  src: url('//at.alicdn.com/t/font_674937_phluzqb8pg.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_phluzqb8pg.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
div.form-awards.ivu-form-item .ivu-form-item-label{
    display: block;
    text-align: left;
    margin-left: 80px;
    font-size: 16px;
}
.card-wrap .ivu-card-body{
    padding: 0px;
}
.coll-bor .ivu-collapse{
    border:none;
}
.poptip-con .ivu-poptip-inner{
    background-color: #585D6B;
    color: #fff;
    opacity: 0.95;
    max-height: 180px;
    overflow-y: scroll;
}
.poptip-con .ivu-poptip-body{
    padding:0px 16px;
}
.poptip-con .ivu-poptip-body-content{
    margin:23px 0px;
}
.ivu-poptip-inner::-webkit-scrollbar {
    display: none;
}
.poptip-con .ivu-poptip-arrow:after{
    border-left-color:#585D6B !important;
    border-right-color:#585D6B !important;
    opacity: 0.95;
}
.btn-loading.ivu-btn-primary{
    display: inline-block;
    position: relative;
    border-color: #D8DADE;
}
/* table */
.ivu-poptip-inner{
    max-height: 240px;
    overflow-y: scroll;
}
/* .btn-wrap .ivu-btn{
    vertical-align: top;
} */
.ivu-btn.ivu-btn-rate{
    color: #fff;
    background-color: #2b85e4;
    border-color: #2b85e4;
}
/* loading */
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
