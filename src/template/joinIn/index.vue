<template>
  <div class="ContestSigUp PaddingSpacing">
    <div class="container ql-snow" >
      <qlEditor :data='html' />
      <div class="MoreLink">
        <a class="LinkOther" @click="$router.push('/rulesDetail/'+id)">{{$t('skin.rulesDetail')}}</a>
        <a class="LinkOther" @click="join">{{$t('skin.join')}}</a>
      </div>
    </div>
    <div v-if="$store.state.skin.adminRole" class = 'adminEdit'>
      <edit :type=1 :html="html" :editOk="getRegister"></edit>
    </div>
  </div>
</template>

<script>
import jxapi from "@/api/index"
import edit from "@/template/htmlEdit/edit.vue"
import { tologin } from '@@/utils/util' 
import { getUserInfo } from '@@/utils/commons.js'
import network from "@@/api/jxapi/index";
import qlEditor from '@@/components/editor/show'
import { getToken,removeToken } from "@@/utils/oauth"
export default {
  props: {
    rules:Array
  },
  components: {
    edit,
    qlEditor,
  },
  computed:{
    id(){
      let cd=this.$store.state.skin.competitionDetail
      return cd.childCompetitionsId?cd.childCompetitionsId.childs[0].id:cd.id
    }
  },
  created(){
    this.getRegister();
  },
  data() {
    return {
      oneApply: false,
      groupApply: false,
      html:'',
    };
  },


  methods: {
    async getRegister(){
      let html = await jxapi.getRegister({data:{type:1}})
          if(html == 'error')return
          this.html = html
    },
    async join() {
      // 清空缓存的userInfo
      if(!getToken() && localStorage.getItem("userInfo")){
        localStorage.removeItem("userInfo");
      }

       if (!getToken()){
         tologin();
       } 
       else{
         let user = getUserInfo();
         if(user.isteacher||user.type){
            
            return  this.$alert('管理员或老师请到竞赛平台完成操作','',{
              confirmButtonText: '前往摩课云平台',
              callback: async action => {
                  if(action=='confirm'){
                    location.href='https://cc.moocollege.com/#/details?id='+localStorage.getItem('competitionId') + '&autoLogin=true';
                  }else{
                    let res = await network.setLoginOut();
                    if (res == "error") return;
                    //登录信息
                    removeToken()
                    //用户组织id
                    // localStorage.removeItem("groupId");
                    //用户信息
                    localStorage.removeItem("userInfo");
                    this.$router.push("/");
                  }
              }
            })
          }else{
           this.$router.push("/apply");
         }
       }
    },
    close(type) {
      return () => {
        this[type] = false;
      };
    }
  }
};
</script>

<style lang="less">
.adminEdit{
  position: absolute;
  right: 0;
  top:0;
  color:#fff;
  z-index: 999;
  background-color: red;
}
.PaddingSpacing {
  position: relative;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 0;

    .titleContent {
      width: 100%;
      text-align: center;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
      }
    }

    .SigUpIntro {
      .BasicsFont {
        font-size: 14px;
        color: #111;
        line-height: 32px;
      }
      .enrollmentTips {
        width: 84%;
        margin: 0 auto 20px;
      }

      .enrollmentTipsEn {
        width: 84%;
        margin: 0 auto 20px;
      }

      .enrollmentTipsEn.ENtips1 {
        margin-top: 40px;
      }
    }

    .MoreLink {
      width: 100%;
      text-align: center;
      margin-top: 10px;

      a.LinkOther {
        display: inline-block;
        vertical-align: middle;
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #fff !important;
        background: #111 !important;
        font-size: 14px;
        text-align: center;
        margin: 10px auto;
        border: 1px solid #111111;
        transition: all ease 0.3s;
        cursor: pointer;
      }
    }
    .MoreLink a.LinkOther + a.LinkOther {
      margin-left: 46px;
    }
  }
}
</style>