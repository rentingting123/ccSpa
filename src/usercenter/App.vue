<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getGroupId, selectGroup } from "@@/utils/commons";
import { mapState } from "vuex";
import { getToken } from "@@/utils/oauth";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authority: (store) => store.system.authorityManagement,
    }),
  },
  methods: {},
  async mounted() {
    if (this.$webapi.getCookie("userInfo")) {
      let user = JSON.parse(this.$webapi.getCookie("userInfo"));
      this.$webapi.savelocal("isAdmin", user.isAdmin);
      this.$webapi.savelocal("groupId", user.groupId);
      this.$webapi.savelocal("userInfo", this.$webapi.getCookie("userInfo"));
    }
    if (!getToken()) {
    //   console.log('登录token',getToken())
       location.href = location.origin + "#";
    }
    this.$webapi.clearCookie();
    if (!getGroupId() && getToken()) await selectGroup();
    // 开发时隐藏 start
    // await this.$store.dispatch("getAuthority");
    // if (!this.authority.managerPermission) {
    //   location.href = location.origin;
    // }
    // 开发时隐藏 end
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
td.ivu-table-expanded-cell {
  padding: 10px 15px;
  background: #fff;
}
/*头部th*/
.expand-row .ivu-table-header th {
  color: #4d4b50;
  font-weight: bold;
  background-color: #eff8ff;
  border: none;
}
.bg-form.ivu-form-item {
  margin: 10px 0px;
}
div.ivu-transfer-list {
  width: 260px;
}
</style>
