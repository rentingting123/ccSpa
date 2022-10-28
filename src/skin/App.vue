<template>
  <div id="app">
    <router-view v-if="id&&ticket"/>
  </div>
</template>

<script>
import network from "@/api/index";
import { setItem } from "@/common/common.js";
import {mapActions} from 'vuex'
import { setUserInfo } from '@@/utils/commons'
import jxapi from "@@/api/jxapi"
import { getParameterByName } from '@@/utils/util'
import {setToken} from "@@/utils/oauth"
export default {
  name: "App",
  async created(){
    await this.init()
    this.islogin()
  },
  data(){
    return {
      id:"",
      ticket:false,
    }
  },
  methods:{
    ...mapActions('skin',['setDetail']),
    async init(){
        let enable = await network.checkSkinEnableByUrl()
        if(enable == 'error'){
          // this.$message.error("该域名绑定的皮肤非免费皮肤或未续费请联系客服处理！")
        }else{
          this.$store.commit('skin/setSkin',enable)
          //upload获取cId储存方便管理
          setItem('competitionId',enable.competitionId)
          await  this.setDetail(enable.competitionId)
          document.getElementsByTagName('title')[0].innerText=enable.name
          //团队报名使用了baseInfo 暂时没有可替代
          setItem('baseInfo',JSON.stringify(this.$store.state.skin.competitionDetail))
          //判断url中的token是否为有效token
          if(this.$route.query.token){
            let adminRole = await network.checkAdmin({data:{
            token:this.$route.query.token
          }})
          if(adminRole == 'error') return 
          this.$store.commit('skin/openAdmin',adminRole)
          }
          this.id = enable.competitionId
        } 
    },
    async islogin() {

  
      let ticket = getParameterByName('ticket')
      if(!ticket) return  this.ticket=true;
      let res = await jxapi.getTokenbyticket({data:{
      ticket: ticket
      }});
      //替换掉ticket
      let newQuery = JSON.parse(JSON.stringify(this.$route.query)) // 深拷贝
      delete newQuery.ticket
      this.$router.replace({ query: newQuery })
       //
      if(res=='error') return this.ticket=true; 
      setToken(res.access_token)
      await setUserInfo.call(this);

      this.$store.state.islogin = true
      this.ticket=true
    },
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
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
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_9gfran1eh6i.eot');
  src: url('//at.alicdn.com/t/font_674937_9gfran1eh6i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_9gfran1eh6i.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_9gfran1eh6i.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_9gfran1eh6i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_9gfran1eh6i.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>

