<template>
  <div id="app">
    <el-backtop></el-backtop>
    <!-- 轮播图 -->
    <banner v-if="id&&!$route.meta.noBanner" />

    <router-view v-if="id" />

    <!-- 底部栏 -->
    <footercomponent v-if="id&&!$route.meta.noFooter" />
  </div>
</template>

<script>
import network from "@/api/index";
import { setItem,SSOLogin } from "@/common/common.js";
import banner from "@/npskin/view/datacenter/banner";
import footercomponent from "@/npskin/view/datacenter/footer";
import {getToken} from '@@/utils/oauth'
import { mapActions,mapState } from "vuex";
export default {
  name: "App",
  components: {
    banner,
    footercomponent
  },
  async created() {
    this.init();
  },
  data() {
    return {
      id: ""
    };
  },
  methods: {
    ...mapActions("skin", ["setDetail"]),
    async init() {
      let enable = await network.checkSkinEnableByUrl();
      if (enable == "error") {
        // this.$message.error("该域名绑定的皮肤非免费皮肤或未续费请联系客服处理！")
      } else {
        setItem("skinInfo", JSON.stringify(enable));
        let res = await network.getschoolskin({
          data: {
            id: enable.competitionId + ""
          }
        });
        if (res == "error") return;
        setItem("webInfo", JSON.stringify(res));
        setItem("groupId", res.id);
        if(!getToken()){
          await SSOLogin()
        }
        this.id = res.id;
        let CId = await this.getCId(res.id);
        if (CId == "error") return;
        await this.setDetail(CId);
        document.getElementsByTagName('title')[0].innerText= res && res.name || this.name
      }
    },
    async getCId(gId) {
      let C = await network.getCIdByGId({ data: { groupId: gId } });
      if (C == "error") return "error";
      setItem("competitionId", C.competitionId);
      return C.competitionId;
    }
  },
    computed:{
    ...mapState('skin',{
      name:state=>state.competitionDetail.name
    })
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
  font-family: "iconfont"; /* project id 674937 */
  src: url("//at.alicdn.com/t/font_674937_wy99l0zogv.eot");
  src: url("//at.alicdn.com/t/font_674937_wy99l0zogv.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_674937_wy99l0zogv.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_674937_wy99l0zogv.woff") format("woff"),
    url("//at.alicdn.com/t/font_674937_wy99l0zogv.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_674937_wy99l0zogv.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
