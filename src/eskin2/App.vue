<template>
  <div id="app">
    <headers v-if="id && ticket" :path="path"/>
    <router-view v-if="id && ticket"/>
    <!-- 底部栏 -->
    <footerNav v-if="id && ticket"/>
    <!-- 底部 -->
    <footerlast v-if="id && ticket"/>
  </div>
</template>

<script>
import network from "@/api/index";
import { setItem } from "@/common/common.js";
import headers from './view/mainpage/header';
import footerNav from '@/provinceSkin/view/footer'
import footerlast from '@/provinceSkin/view/footer/last'
import { getParameterByName } from '@@/utils/util'
import jxapi from "@@/api/jxapi"
import { setUserInfo } from '@@/utils/commons'

export default {
  name: "App",
  components:{
    headers,
    footerNav,
    footerlast
  },
  async created(){
    await this.init()
    this.islogin()
  },
  data(){
    return {
      id:"",
      ticket: false,
      path: '/'
    }
  },
  methods:{
    async init(){
        let enable = await network.checkSkinEnableByUrl()
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
          setItem('competitionId',enable.provinceId)
          setItem('schoolCode',enable.competitionId)
          this.id = enable.competitionId
        } 
    },
    async islogin() {
      let ticket = getParameterByName('ticket')
      if(!ticket) return  this.ticket=true;
      let res = await jxapi.getTokenbyticket({data:{
      ticket: ticket
      }});
      if(res=='error') return this.ticket=true; 
      setToken( res.access_token);
      await setUserInfo.call(this);
      let url = location.href
      url = url.substring(0, url.indexOf('ticket=')-1)
      location.href = url;
      this.$store.state.islogin = true
      this.ticket=true
    },
    topath(path){
      if(path.indexOf('/meetingdetail') != -1){
        this.path = '/train'
      }else if(path.indexOf('/newsdetail') != -1){
        this.path = '/newslist'
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
  font-family: '-apple-system','BlinkMacSystemFont','Helvetica Neue','PingFang SC','Microsoft YaHei','Source Han Sans SC','Noto Sans CJK SC','WenQuanYi Micro Hei','sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: hidden;
}
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.eot');
  src: url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_kst9v8ihpeh.svg#iconfont') format('svg');
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
</style>
