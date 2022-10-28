<template>
  <div id="app">
    <el-backtop v-if="showAnalyse"></el-backtop>
    <headersnew v-if="id" :path="path"/>
    <router-view v-if="id"/>
    <!-- 底部 -->
    <footerlast v-if="id"/>
    <!-- 竞赛分析 -->
    <analyse v-if="showAnalyse" />
  </div>
</template>

<script>
import network from "@/api/index";
import { setItem } from "@/common/common.js";
import headersnew from './components/header/new';
import footerlast from '@/nskin/components/footer/last'
import analyse from '@/nskin/components/analyse'

export default {
  name: "App",
  components:{
    headersnew,
    footerlast,
    analyse
  },
  created(){
    this.init()
  },
  data(){
    return {
      id:"",
      showAnalyse:true,
      path: '/'
    }
  },
  methods:{
    async init(){
          let  baseInfo = await network.skinGet({data:{
            type: 17,
            id: '1',
          }})
          if(baseInfo=='error') return;
          setItem('baseInfo',JSON.stringify(baseInfo))
          setItem('competitionId','1')
          this.id = '1'
    },
    topath(path){
      if(path.indexOf('/meetingdetail') != -1){
        this.path = '/train'
      }else if(path.indexOf('/newsdetail') != -1){
        this.path = '/newslist'
      }else if(path.indexOf('/empowerment') != -1){
        this.path = '/empowerment'
      }else if(path.indexOf('/hotmap') != -1){
        this.path = '/competition'
      }
      if(path=='/competitionExpo'){
        this.showAnalyse=false;
      }else{
        this.showAnalyse=true
      }
    }
  },
  watch:{
    $route(to, from){
      this.path = to.path;
      this.topath(to.path);
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
@font-face {
  font-family: 'shs-normal';
  src: url('./assets/font/Normal/Normal.ttf');
}
@font-face {
  font-family: 'iconfont';  /* Project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_cr0gortxyil.woff2?t=1621317527207') format('woff2'),
       url('//at.alicdn.com/t/font_674937_cr0gortxyil.woff?t=1621317527207') format('woff'),
       url('//at.alicdn.com/t/font_674937_cr0gortxyil.ttf?t=1621317527207') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

h1.title{
  font-size: 18px;
  color: #4A4A4A;
  letter-spacing: 1.12px;
  text-align: left;
  font-weight: bold;
  line-height: 44px;
  text-indent: 35px;
  background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/titlebg.png') no-repeat;
  background-size: 16px 18px;
  background-position: 13px 13px;
  border-bottom: 1px solid #E8E8E8;
  
}
h1.title2{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
    .type{
      width: 288px;
      display: flex;
      justify-content: space-between;
      li{
          width: 96px;
          font-size: 18px;
          text-align: center;
          text-indent: 0;
          color: #4A4A4A;
          font-weight: 500;
          cursor: pointer;
          .line{
              width: 50%;
              height: 2px;
              background: #0078E2;;
              margin: 0 auto;
              display: none;            
          }
      }
      li.on{
          font-weight: bold;
          font-size: 18px;
          color: #0078E2;;
          letter-spacing: 1.12px;
          p{
              display: block;
          }
      }
  }
}
h1.title.no{
  border: none;
}
span.more{
    font-size: 14px;
    color: #9B9B9B;
    float: right !important;
    cursor: pointer;
    line-height: 44px;
    position: relative;
    font-weight: 400;
    margin-right: 10px;
}
.type0{
    background: #9B9B9B  !important;
}
.type1{
    background: #0078E2  !important;
}
.type2{
    background: #F5A623 !important;
}
</style>
