<template>
  <div id="app">
    <a-back-top />
    <logo v-if="showTopAndBottom" :hideNav="showTopAndBottom" :path="path"/>
    <router-view v-if="id"/>
    <!-- 底部 -->
    <bottomComponent />
  </div>
</template>

<script>
import logo from './components/logo'
import bottomComponent from './components/bottom'
import network from "@/mnskin/api/index";
import { setItem } from "@/common/common.js";

export default {
  name: "App",
  created(){
    this.init()
  },
  components:{
    logo,
    bottomComponent
  },
  data(){
    return {
      id:"",
      path: '/',
    }
  },
  computed:{
    showTopAndBottom(){
      if(this.$route.path.indexOf('empowerment/detail') >= 0){
        return false
      }
      return  true
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
    }
  },
  watch:{
    $route(to, from){
      let path = to.path;
      if(to.path=='/newsdetail'){
        path = '/newslist'
      }
      this.path = path
    }
  }
};
</script>

<style lang='less'>
#app {
  font-family:'-apple-system','BlinkMacSystemFont','Helvetica Neue','PingFang SC','Microsoft YaHei','Source Han Sans SC','Noto Sans CJK SC','WenQuanYi Micro Hei','sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: hidden;
  background: #ffffff;
}
</style>
