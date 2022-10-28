<template>
  <div id="login">
    <div class="logo">
      <img src="@/expert/assets/login.png" alt />
      <div class="mess">
        <div>
          获取专家身份失败(或未分配作品)&nbsp;&nbsp;
          <el-button size="lager" type="primary" @click="reflash"
            ><Icon type="md-sync" /> 刷新</el-button
          >
          &nbsp;&nbsp;或无权限
        </div>
        <div>
          <el-button size="lager" style="margin-top: 20px" @click="loginOut"
            >切换用户</el-button
          >
        </div>
      </div>
    </div>
    <tabCompetitions
      :importShow="tabShow"
      @exportData="exportTabShow"
      v-if="tabShow"
    ></tabCompetitions>
  </div>
</template>
<script>
import { SSOLogin, logout } from "@/common/common.js";
import tabCompetitions from "../common/tabCompetition.vue";
import { getToken } from "@@/utils/oauth";
import { tologin } from "@@/utils/util";
// import network from "@/api/index";
export default {
  components: {
    tabCompetitions,
  },
  data() {
    let isIe =
      navigator.userAgent.indexOf("MSIE") >= 0 ||
      navigator.appName == "Microsoft Internet Explorer" ||
      !!window.ActiveXObject ||
      "ActiveXObject" in window;
    return {
      isIe: isIe, // 是否是ie浏览器
      tabShow: false,
      isChrome: true,
    };
  },
  async created() {
    // 210531 专家刷新页面时，使用sessionStorage缓存数据，登录时清空
    sessionStorage.clear();

    if (getToken()) {
      this.tabShow = true;
    } else {
      let login = await SSOLogin(true);
      if (login == "error") return;

      //下面这段代码不知道是否还需要 整理时多出来的
      // let user = await network.getUserInfo();
      //  if (user == "error") return
      // this.$webapi.savelocal("isAdmin", user.isAdmin);
      // if (user.groupId) {
      //   if (user.type == 5 || user.type == 6) {
      //     this.$webapi.savelocal("groupId", -1);
      //   } else {
      //     this.$webapi.savelocal("groupId", user.groupId);
      //   }
      // } else {
      //   this.$webapi.savelocal("groupId", -1);
      // }
      this.tabShow = true;
    }
  },
  methods: {
    goLogin() {
      tologin();
    },
    reflash() {
      this.tabShow = true;
      // window.localStorage.clear();
      // window.location.reload();
    },
    async loginOut() {
      if (getToken()) await logout();
      this.goLogin();
    },
    exportTabShow(e) {
      this.tabShow = e.show;
      if (e.data) {
        this.$webapi.savelocal("compId", e.data);
        this.$router.push("/expert/judge");
      } else {
        //localStorage.clear();
      }
    },
  },
};
</script>

<style lang="less">
#login {
  width: 100%;
  height: 100%;
  overflow: auto;
  .logo {
    img {
      display: block;
      margin: 80px auto 10px;
    }
    .mess {
      display: flex;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      > div {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
