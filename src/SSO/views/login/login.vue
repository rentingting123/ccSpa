<template>
  <div class="login">
    <div class="login_modal">
      <div class="qrcode_login">
        <div class="login_head">
          <img
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/home/logo1.png"
            alt
          />
        </div>
        <div class="changTab">
          <span
            :class="{ Selection: logPage == 'qrcodeLogin' ? true : false }"
            @click="logPage = 'qrcodeLogin'"
            >{{ $t("SSO.Scan") }}</span
          >
          <span
            :class="{ Selection: logPage == 'schoolNum' ? true : false }"
            @click="logPage = 'schoolNum'"
            >{{ $t("SSO.Account") }}</span
          >
          <span
            :class="{ Selection: logPage == 'phoneLogin' ? true : false }"
            @click="logPage = 'phoneLogin'"
            >{{ $t("SSO.Msn") }}</span
          >
        </div>

        <!-- 扫码登录 -->
        <div class="login_code" v-show="logPage == 'qrcodeLogin' ? true : false">
          <p id="login_container">
            <!-- <img  src="" alt="">-->
          </p>
          <p>
            <span>{{ $t("SSO.Qrcode") }}</span>
          </p>
          <p>
            <span @click="toRegister">{{ $t("SSO.Register") }}</span>
          </p>
        </div>
        <!-- end 扫码登录 -->
        <!-- 手机号登录 -->
        <div class="login_phone" v-show="logPage == 'phoneLogin' ? true : false">
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用手机号登录</p> -->
          <el-form :model="phoneLoginForm" ref="phoneLoginForm">
            <el-form-item
              prop="phone"
              :rules="[
                { required: true, message: $t('SSO.MsnP'), trigger: 'blur' },
                { min: 11, max: 11, message: $t('SSO.MsnE'), trigger: 'blur' },
              ]"
            >
              <el-input
                :placeholder="$t('SSO.MsnP')"
                v-model.trim="phoneLoginForm.phone"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                { required: true, message: $t('SSO.MsnC') },
                { min: 6, max: 6, message: '验证码错误', trigger: 'blur' },
              ]"
            >
              <el-input
                style="width: 13.2rem"
                :placeholder="$t('SSO.MsnC')"
                v-model.trim="phoneLoginForm.code"
              ></el-input>
              <el-button
                class="get_auth_code"
                type="primary"
                v-if="seconds == 0 ? true : false"
                :disabled="!phoneLoginForm.phone"
                @click="getAuthCode(0, 'phone')"
                >{{ $t("SSO.GetMsn") }}</el-button
              >
              <span class="wait_auth_code" v-else
                >{{ $t("SSO.ReGetMsn") }}({{ seconds }})</span
              >
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%; font-size: 0.8rem"
                :loading="submitLoading"
                @click="tologin()"
                :disabled="!phoneLoginForm.code || !phoneLoginForm.phone"
                >{{ $t("nav.Login") }}</el-button
              >
            </el-form-item>
          </el-form>
          <div class="phoneBootom">
            <p>
              <span @click="toRegister">{{ $t("SSO.Register") }}</span>
              <span @click="$router.push('/retrieve')">{{ $t("SSO.Find") }}</span>
            </p>
          </div>
        </div>
        <!-- end 手机号登录 -->
        <!-- 账号登录 -->
        <div class="login_phone" v-show="logPage == 'schoolNum' ? true : false">
          <el-form :model="schoolLoginForm" ref="schoolLoginForm">
            <el-form-item
              prop="phone"
              :rules="[{ required: true, message: $t('SSO.AccP'), trigger: 'blur' }]"
            >
              <el-input
                :placeholder="$t('SSO.AccP')"
                @keyup.enter.native="schoollogin"
                v-model.trim="schoolLoginForm.phone"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[{ required: true, message: $t('SSO.PassP') }]"
            >
              <el-input
                :placeholder="$t('SSO.PassP')"
                type="password"
                @keyup.enter.native="schoollogin"
                v-model.trim="schoolLoginForm.code"
              ></el-input>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: $t('SSO.ImgCode') }]"
              v-if="needLoginCode"
              label
              prop="loginCode"
              class="code"
            >
              <el-input
                v-model.trim="schoolLoginForm.loginCode"
                style="height: 40px"
                :placeholder="$t('SSO.ImgCode')"
                size="medium"
              ></el-input>
              <a @click="changePic1">
                <img ref="imgYzm1" src="nodeapi/code/get?for=loginCode" height="40" />
              </a>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%; font-size: 0.8rem"
                @click="schoollogin"
                :loading="submitLoading"
                :disabled="
                  !schoolLoginForm.code ||
                  !schoolLoginForm.phone ||
                  (needLoginCode && !schoolLoginForm.loginCode)
                "
                >{{ $t("nav.Login") }}</el-button
              >
            </el-form-item>
          </el-form>
          <div class="phoneBootom">
            <p>
              <span @click="toRegister">{{ $t("SSO.Register") }}</span>
              <span @click="$router.push('/retrieve')">{{ $t("SSO.Find") }}</span>
            </p>
          </div>
        </div>
        <!-- end 账号登录 -->
        <notice v-if="!isChrome" />
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/SSO/lib/util";
import node from "@/SSO/network";
import notice from "./common/notice";
import { Base64 } from "js-base64";
export default {
  components: {
    notice,
  },
  data() {
    return {
      needLoginCode: false,//三级等保要求直接输入验证码
      service: "cc.moocollege.com", //todo:验证请求的service是否在白名单当中。
      logPage: "qrcodeLogin", // 登录方式
      seconds: 0, // 获取验证码倒计时
      submitLoading: false,

      phoneLoginForm: {
        phone: "",
        code: "",
      }, // 手机号登录表单
      schoolLoginForm: {
        phone: "",
        code: "",
      }, // 账号密码登录表单
      logined: "", // 是否已登录
      isChrome: true,
    };
  },
  async created() {
    let code = util.getParameterByName("code"),
      //sa登录参数
        ticket = util.getParameterByName('saTicket')
      // username = util.getParameterByName("username"),
      // schoolCode = util.getParameterByName("schoolCode"),
      // identityType = util.getParameterByName("identityType");
    //sa登录判断
    // if (username && schoolCode && identityType)
    if(ticket)
      return this.loginBysa({ ticket });
    //微信code
    if (code) {
      this.logonByWx(code);
    }
    this.logined = localStorage.getItem("login") || "";
    //有登录信息去验证登录信息是否还有效
    if (this.logined) {
      let ticket = await node.check({ noLog: true });
      if (ticket == "error") return localStorage.setItem("login", "");
      this.$message.info("正在为您自动登录");
      this.loginJump(ticket);
    }

    var isChrome = window.navigator.userAgent.indexOf("Chrome");
    if (isChrome == -1) {
      this.isChrome = false;
    } else {
      this.isChrome = true;
    }
  },
  async mounted() {
    this.WxLogin();
  },

  methods: {
    //更新图形验证吗
    changePic1() {
      this.$refs.imgYzm1
        ? (this.$refs.imgYzm1.src = "nodeapi/code/get?for=loginCode&q=" + Math.random())
        : "";
    },
    //账号密码
    async schoollogin() {
      if (this.schoolLoginForm.phone.length < 1 || this.schoolLoginForm.code.length < 1) {
        return;
      }
      let data = {
        username: this.schoolLoginForm.phone,
        password: Base64.encode(this.schoolLoginForm.code),
      };
      if (this.needLoginCode) data.code = this.schoolLoginForm.loginCode;
      this.submitLoading = true;
      let result = await node.login({ data });
      this.changePic1();
      this.submitLoading = false;
      if (result == "error") return;
      if (result.errorNum) return (this.needLoginCode = true);
      if (result.weak) return  this.$alert('系统检测到您的账户存在安全风险，请立即修改密码提高安全强度', '安全警告', {
          confirmButtonText: this.$t("usercenter.ModifyPassword"),
          callback: action => {
             localStorage.setItem("wexin", result.token);
        //
           this.$router.push('/modify')
          }
        });
      this.loginJump(result);
    },
    //获取微信的验证码
    WxLogin() {
      let url = util.getParameterByName("service") || this.service;
      let obj = new WxLogin({
        id: "login_container", // 需要显示的容器id
        appid: "wx131be88fce505f45", // 公众号appid wx*******  wxf895323a9dbbc75a  wxd99431bbff8305a0
        scope: "snsapi_login", // 网页默认即可
        redirect_uri: `https://cc.moocollege.com?service=${url}`,
        //window.location.href.split("code")[0] || window.location.href, // 授权成功后回调的urlwindow.location.href
        //state: Math.round(Math.random() * 10), // 可设置为简单的随机数加session用来校验
        style: "black", // 提供"black"、"white"可选。二维码的样式
        href:
          "https://web.moocollege.com/edit/201978/bd6df88960f311e9bb8a00163e040299/l4AK5ArT_1562565458406/css1.css", // 外部css文件url，需要https
      });
    },
    async logonByWx(code) {
      let user = await node.wxLogin({ data: { code: code } });
      if (user == "error") return;
      if (user.needPhone) {
        //没有绑定手机需要先去绑定手机，然后处理登录
        localStorage.setItem("wexin", user.token);
        this.toBindMobile();
      } else {
        this.loginJump(user);
      }
    },
    //schoolAdmin的免密登录

    async loginBysa(data) {
      let user = await node.loginByUserName({ data });
      if (user == "error") return;
      if (user.needPhone) {
        //没有绑定手机需要先去绑定手机，然后处理登录
        localStorage.setItem("wexin", user.token);
        localStorage.setItem("bindType",1)
        //标记为登录
         localStorage.setItem("login", true);
        //
        this.toBindMobile();
      } else {
        this.loginJump(user);
      }
    },

    // 短信登录
    async tologin() {
      this.submitLoading = true;
      let data = await node.smsLogin({
        data: {
          mobile: this.phoneLoginForm.phone,
          smsCode: this.phoneLoginForm.code,
        },
      });
      if (data == "error") return;
      this.loginJump(data);
    },

    //统一跳转回请求登录信息的站点
    async loginJump(ticket) {
      // return console.log(ticket);
      localStorage.setItem("login", true);
      this.logined = true;
      var url = decodeURIComponent(util.getParameterByName("service")) || this.service;
      if (!url) return this.$message.error("请求站点丢失");
      url = url.replace("$", "#").replace(/@/g, "/");

      if (url.indexOf("?") > -1) {
        var patt = /ticket=[^\&]+/;
        if (url.match(patt)) url = url.replace(patt, "ticket=" + ticket);
        else url = url + "&ticket=" + ticket;
      } else url = url + "?ticket=" + ticket;
      if (url.indexOf("http") < 0) url = "http://" + url;
      var doJump = (url) => (window.location.href = url);
      this.submitLoading = false;
      setTimeout(() => {
        doJump.call(this, url);
      }, 100);
    },
    //跳转到注册页面
    toRegister() {
      let url = "/register";
      this.$router.push(url);
    },
    //绑定手机号
    toBindMobile() {
      this.$router.push("/bind");
    },

    // 获取验证码
    async getAuthCode(status, type) {
      let mobile = this.phoneLoginForm.phone;

      let result = await node.smsCode({
        data: {
          mobile: mobile,
          domain: util.getParameterByName("service"),
        },
      });
      if (result == "error") return;
      this.$message.success("获取验证码成功");
      let _this = this;
      this.seconds = 59;
      let secTimer = setInterval(function () {
        _this.seconds--;
        if (_this.seconds == 0) {
          clearInterval(secTimer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  z-index: 2;
  background-image: linear-gradient(-180deg, #29dfb2 0%, #019fff 100%);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  // 登录，注册
  .login_modal {
    .qrcode_login {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 30rem;
      min-height: 28rem;
      // height: 30rem;
      margin-left: -15rem;
      margin-top: -13.75rem;
      background: #fff;
      z-index: 1041;
      border: 1px solid #ccc;
      border-radius: 0.3rem;
      padding: 1rem 1.5rem;

      .login_head {
        position: relative;
        img {
          height: 62px;
        }

        i {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      .changTab {
        margin-top: 17px;
        border-top: 1px solid #dedede;
        height: 80px;
        line-height: 100px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #9b9b9b;
        span {
          padding: 15px;
          cursor: pointer;
        }
        .Selection {
          font-family: PingFang-SC-Bold;
          font-size: 22px;
          color: #4a4a4a;
          letter-spacing: 0;
        }
      }

      // 二维码登录
      .login_code {
        // margin: 1rem;
        text-align: center;
        // border-top: 1px solid #dedede;
        font-size: 1rem;

        p:first-child {
          img {
            width: 11.5rem;
            height: 11.5rem;
          }
        }
        p:last-child {
          color: #1d86ff;
          border-top: 1px solid #dedede;
          padding-top: 10px;
          text-align: right;

          position: absolute;
          left: 50%;
          margin-left: -120px;
          width: 240px;
          margin-top: 10px;
          span {
            cursor: pointer;
          }
        }
      }
      #login_container {
        height: 200px;
      }

      // 手机号登录
      .login_phone {
        margin: 1rem;
        text-align: center;
        // border-top: 1px solid #dedede;
        font-size: 1rem;
        padding: 0 2.5rem;

        form {
          padding-top: 0.5rem;

          .el-form-item {
            margin-bottom: 1.3rem;

            > div {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            > div::before {
              display: none;
            }
            > div::after {
              display: none;
            }

            .get_auth_code,
            .wait_auth_code {
              width: 5.6rem;
              margin-left: 1rem;
              border-radius: 5px;
              font-size: 0.8rem;
            }

            .wait_auth_code {
              background: #dedede;
            }
          }
        }
      }

      //学生账号登录
      .schoolNum {
        margin: 1rem;
        text-align: center;
        border-top: 1px solid #dedede;
        font-size: 1rem;
        padding: 0 2.5rem;

        form {
          padding-top: 0.5rem;

          .el-form-item {
            margin-bottom: 1.3rem;

            > div {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            .get_auth_code,
            .wait_auth_code {
              width: 5.6rem;
              margin-left: 1rem;
              border-radius: 5px;
              font-size: 0.8rem;
            }

            .wait_auth_code {
              background: #dedede;
            }
          }
        }
      }
      .phoneBootom {
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #9b9b9b;
          letter-spacing: 0;
          text-align: right;
          span {
            margin-right: 28px;
            cursor: pointer;
          }
        }
      }

      // 手机号注册
      .register_phone {
        margin: 1rem;
        text-align: center;
        border-top: 1px solid #dedede;
        font-size: 1rem;
        padding: 0 2.5rem;

        form {
          .el-form-item {
            > div {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            .get_auth_code,
            .wait_auth_code {
              width: 5.6rem;
              margin-left: 1rem;
              border-radius: 5px;
              font-size: 0.8rem;
            }

            .wait_auth_code {
              background: #dedede;
            }
          }

          .read_file > div {
            justify-content: flex-start;
          }
        }
      }

      // 登录方式切换
      img.change_login_mode {
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
        border-radius: 0 0 0.3rem 0;
      }

      img.change_login_modeTwo {
        position: absolute;
        left: 0;
        bottom: 0;
        cursor: pointer;
        border-radius: 0 0 0.3rem 0;
      }
    }
  }
  .code {
    text-align: start;
    /deep/ .el-input {
      width: 180px;
      float: left;
      margin-right: 5px;
    }
    button {
      margin-left: 3px;
    }
    .countDown {
      margin-left: 15px;
    }
    a {
      width: 100px;
      height: 40px;
      display: inline-block;
    }
  }
  .el-button {
    padding: 12px 10px;
  }
}
</style>
