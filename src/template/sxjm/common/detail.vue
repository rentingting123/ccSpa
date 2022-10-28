<template>
  <div class="skin3entry">
    <div class="li" :style="`background-image:url(${bg1})`">
      <div @click="isLogin">
        <h1>报名入口</h1>
        <h2>查看详情></h2>
        <p class="line" />
      </div>
    </div>
    <div class="li li2" :style="`background-image:url(${bg2})`">
      <div @click="$router.push('/details/entryGuide')">
        <h1>参赛指南</h1>
        <h2>查看详情></h2>
        <p class="line" />
      </div>
    </div>
    <div class="li" :style="`background:rgba(227,230,235,1)`">
      <div @click="toExpert">
        <h1>评审入口</h1>
        <h2>查看详情></h2>
        <p class="line" />
      </div>
      <expert />
    </div>
    <div
      class="li li2"
      @click="$router.push({ path: '/sxjmcode' })"
      :style="`background-image:url(${bg4})`"
    >
      <img class="codeurl" v-if="codeurl" :src="codeurl" alt="" />
    </div>

    <div class="li" :style="`background-image:url(${bg5})`">
      <div @click="isLogin(4)">
        <h1>发票申请</h1>
        <h2>填写信息></h2>
        <p class="line" />
      </div>
    </div>

    <div class="li li2" :style="`background-image:url(${bg6})`">
      <inspector :open ="inspectorOpen" :close="()=>(inspectorOpen=false)" :form1="form" :user="user">
        <div @click="isLogin(10)">
          <h1>巡视员信息登记</h1>
          <h2>填写信息></h2>
          <p class="line" />
        </div>
      </inspector>
    </div>

    <invoice
      :form1="form"
      :close="()=>(invoiceOpen = false)"
      v-if="invoiceOpen"
      :user="user"
    />

    <el-dialog
      title="请先登陆"
      v-if="login"
      :visible.sync="login"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="700px"
    >
      <Login :close="close" />
    </el-dialog>

    <el-dialog
      class="persubmit"
      :visible.sync="message"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="800px"
    >
      <h1 class="">全国数学建模大赛浙江赛区学校报名信息提交</h1>
      <el-form class="form" ref="form" :model="form" label-width="120px">
        <el-form-item
          label="学校代码"
          prop="schoolCode"
          :rules="{
            required: true,
            message: '学校代码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.schoolCode"></el-input>
        </el-form-item>
        <el-form-item
          label="学校名称"
          prop="schoolName"
          :rules="{
            required: true,
            message: '学校名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.schoolName" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="本科队伍数"
          prop="undergraduateTeams"
          :rules="{
            required: true,
            message: '本科队伍数不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.undergraduateTeams"></el-input>
        </el-form-item>
        <el-form-item
          label="专科队伍数"
          prop="specialistTeams"
          :rules="{
            required: true,
            message: '专科队伍数不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.specialistTeams"></el-input>
        </el-form-item>
        <el-form-item
          label="负责人姓名"
          prop="chargeName"
          :rules="{
            required: true,
            message: '负责人姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.chargeName"></el-input>
        </el-form-item>
        <el-form-item
          label="负责人手机"
          prop="chargeTel"
          :rules="{
            required: true,
            message: '负责人手机不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.chargeTel"></el-input>
        </el-form-item>
        <!-- <el-form-item label="负责人电话" prop="chargePhone" :rules="{required: false, message: '负责人电话不能为空', trigger: 'blur'}">
                        <el-input v-model="form.chargePhone"></el-input>
                    </el-form-item> -->
        <el-form-item
          label="负责人邮箱"
          prop="chargeEmail"
          :rules="{
            required: true,
            message: '负责人邮箱不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.chargeEmail"></el-input>
        </el-form-item>
        <el-form-item
          label="负责人所在部门"
          prop="chargePart"
          :rules="{
            required: true,
            message: '负责人所在部门不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.chargePart"></el-input>
        </el-form-item>
        <el-form-item
          label="联系人姓名"
          prop="personName"
          :rules="{
            required: true,
            message: '联系人姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.personName"></el-input>
        </el-form-item>
        <el-form-item
          label="联系人手机"
          prop="personTel"
          :rules="{
            required: true,
            message: '联系人手机不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.personTel"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系人电话" prop="personPhone" :rules="{required: false, message: '联系人电话不能为空', trigger: 'blur'}">
                        <el-input v-model="form.personPhone"></el-input>
                    </el-form-item> -->
        <el-form-item
          label="联系人邮箱"
          prop="personEmail"
          :rules="{
            required: true,
            message: '联系人邮箱不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.personEmail"></el-input>
        </el-form-item>
        <el-form-item
          label="联系人所在部门"
          prop="personPart"
          :rules="{
            required: true,
            message: '负责人所在部门不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.personPart"></el-input>
        </el-form-item>
        <el-form-item
          label="学校地址"
          prop="schoolAddress"
          :rules="{
            required: true,
            message: '学校地址不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.schoolAddress"></el-input>
        </el-form-item>
        <el-form-item
          label="学校邮编"
          prop="schoolZipcode"
          :rules="{
            required: true,
            message: '学校邮编不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.schoolZipcode"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loadingPre" @click="outLogin()"
          >退出登录</el-button
        >
        <el-button
          type="primary"
          :loading="loadingPre"
          @click="download('form')"
          >前往下载</el-button
        >
        <el-button type="primary" :loading="loadingPre" @click="message = false"
          >取 消</el-button
        >
        <el-button type="primary" :loading="loadingPre" @click="submit('form')">
          确 认</el-button
        >
      </div>
    </el-dialog>

    <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      <edit v-if="loading" :editOk="init" :skin="skin"></edit>
    </div>
  </div>
</template>

<script>
import Login from "./login";
import edit from "./edit";
import invoice from "./invoice";
import inspector from "./inspector";
import network from "@/api/index";
import utils from "@@/utils/util";
import expert from "./expert";
import { getToken, removeToken } from "@@/utils/oauth";
export default {
  data() {
    return {
      login: false,
      inspectorOpen:false,
      message: false,
      skin: "",
      bg1: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg1.png",
      bg2: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png",
      bg3: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg3.png",
      bg4: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg4.png",
      bg5: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg5.jpg",
      bg6: "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png",
      codeurl: "",
      loading: true,
      form: {},
      user: {},
      loadingPre: false,
      invoiceOpen: false,
    };
  },
  components: {
    Login,
    edit,
    invoice,
    expert,
    inspector,
  },
  methods: {
    async isLogin(type) {
      let login = getToken();
      if (!login) {
        this.login = true;
      } else {
        this.user =
          localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"));
        let _school = "";
        if (type) {
          _school = await network.getSchoolApply({
            data: {
              type: type,
              userId: this.user.id,
            },
          });
          if (_school == "error") return;
        }
        if (!_school) {
          _school = await network.getSchoolApply({
            data: {
              type: 1,
              userId: this.user.id,
            },
          });
          if (_school == "error") return;
        }
        //this.$set(school,"schoolName",this.user.school);
        if (!_school) {
          if (!localStorage.getItem("defaultUserId")) {
            this.outLogin();
            return (this.login = true);
          }
          _school = await network.getSchoolApply({
            data: {
              type: 2,
              userId: localStorage.getItem("defaultUserId"),
            },
          });
          if (_school == "error") return;
        }
        _school = _school ? _school : {};
        _school.schoolName = _school.schoolName
          ? _school.schoolName
          : this.user.school;
        this.form = _school;
        if (type == 4) this.invoiceOpen = true;
        else if(type==10) this.inspectorOpen = true
        else this.message = true;
      }
    },

    close() {
      this.login = false;
      this.user =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"));
      this.form.schoolName = this.user.school;
      this.message = true;
      this.isLogin();
    },
    toExpert() {
      location.href = "http://cc.moocollege.com/expert/login";
    },
    async init() {
      this.loading = false;
      this.codeurl = "";
      this.bg1 =
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg1.png";
      this.bg2 =
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png";
      this.bg3 =
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg3.png";
      this.bg4 =
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg4.png";
      this.bg5 =
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg5.jpg";
      let html = await network.skinGet({ data: { type: 10 } });
      this.loading = true;
      if ((html == "error") | !html) return this.createCode();
      html = html.html;
      if (html.signup) this.bg1 = html.signup;
      if (html.guide) this.bg2 = html.guide;
      if (html.works) this.bg3 = html.works;
      if (html.manual) this.bg4 = html.manual;
      if (html.invoice) this.bg5 = html.invoice;
      this.skin = html;
      if (html.tableData && !html.manual) this.createCode();
    },
    createCode() {
      let url = "http://" + location.host + "/sxjmcode";
      utils.getQRcode(url, { width: 1024, height: 1024 }).then((url) => {
        this.codeurl = url;
      });
    },
    submit(name) {
      this.$refs[name].validate(async (valid) => {
        if (!valid) return;
        this.loadingPre = true;
        let res = await network.setSchoolApply({
          data: {
            //competitionId:this.competitionId,
            type: 1,
            userId: this.user.id,
            html: this.form,
          },
        });
        this.loadingPre = false;
        if (res == "error") return;
        this.message = false;
      });
    },
    download(name) {
      this.$refs[name].validate(async (valid) => {
        if (!valid) return;
        this.loadingPre = true;
        let res = await network.setSchoolApply({
          data: {
            //competitionId:this.competitionId,
            type: 1,
            userId: this.user.id,
            html: this.form,
          },
        });
        this.loadingPre = false;
        if (res == "error") return;
        this.$router.push("/pdf");
      });
    },
    outLogin() {
      removeToken();
      localStorage.removeItem("defaultUserId");
      localStorage.removeItem("userInfo");
      this.message = false;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.skin3entry {
  // position: relative;
  margin-top: 48px;
  .edit {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
  }
}

.li {
  width: 278px;
  height: 187px;
  margin: 0 4px 4px 0;
  float: left;
  cursor: pointer;
  div {
    margin: 35px 0 0 30px;
    cursor: pointer;
    h1 {
      font-size: 22px;
      color: #4a4a4a;
      font-weight: bold;
    }
    h2 {
      font-size: 14px;
      color: #4a4a4a;
      font-weight: 150;
      margin: 8px 0;
    }
    .line {
      width: 45px;
      height: 5px;
      background: #0078e2;
    }
  }
}
.li2 {
  margin-right: 0;
}
.codeurl {
  width: 94px;
  height: 94px;
  margin: 69px 0 0 32px;
}
.persubmit {
  h1 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
  }
  .form {
    width: 80%;
    margin: 0 auto;
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
