<template>
  <div class="login">
    <div class="login_modal">
      <div class="qrcode_login">
        <div class="login_head">
          <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/home/logo3.png" alt />
          <!--<i class="iconfont icon-guanbi" @click="hideBgVisible()"></i>-->
        </div>
        <div class="changTab" v-show="logPage!=='RetrieveForm'">
          <span
            :class="{'Selection':logPage=='qrcodeLogin'?true:false}"
            @click="logPage='qrcodeLogin'"
          >扫码登录</span>
          <span
            :class="{'Selection':logPage=='schoolNum'?true:false}"
            @click="logPage='schoolNum'"
          >帐户登录</span>
          <span
            :class="{'Selection':logPage=='phoneLogin'?true:false}"
            @click="logPage='phoneLogin'"
          >短信登录</span>
        </div>

        <!-- 扫码登录 -->
        <div class="login_code" v-show="logPage=='qrcodeLogin'?true:false">
          <p id="login_container">
            <!-- <img  src="" alt="">-->
          </p>
          <p>
            <span>请使用微信扫描二维码登录</span>
          </p>
          <p>
            <span @click="toRegister">立即注册</span>
          </p>
        </div>
        <!-- end 扫码登录 -->
        <!-- 手机号登录 -->
        <div class="login_phone" v-show="logPage=='phoneLogin'?true:false">
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用手机号登录</p> -->
          <el-form :model="phoneLoginForm" ref="phoneLoginForm">
            <el-form-item
              prop="phone"
              :rules="[
                        { required: true, message: '请输入注册手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
                    ]"
            >
              <el-input placeholder="请输入注册手机号" v-model="phoneLoginForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                        { required: true, message: '请输入手机验证码' },
                        {  min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
                    ]"
            >
              <el-input style="width:13.2rem" placeholder="收到的手机验证码" v-model="phoneLoginForm.code"></el-input>
              <el-button
                class="get_auth_code"
                type="primary"
                v-if="seconds==0?true:false"
                :disabled="!phoneLoginForm.phone"
                @click="getAuthCode(0,'phone')"
              >获取验证码</el-button>
              <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;font-size:0.8rem"
                @click="tologin()"
                :disabled="!phoneLoginForm.code||!phoneLoginForm.phone"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <div class="phoneBootom">
            <p>
              <span @click="toRegister">立即注册</span>
              <span @click="logPage='RetrieveForm'">找回密码</span>
            </p>
          </div>
          <!-- <img
            
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-wx.png"
            title="二维码登录"
            class="change_login_mode"
            @click="logPage='qrcodeLogin'"
          >
          <img
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-pw.png"
            title="账号密码登录"
            class="change_login_modeTwo"
            @click="logPage='schoolNum'"
          >-->
        </div>
        <!-- end 手机号登录 -->
        <!-- 账号登录 -->
        <div class="login_phone" v-show="logPage=='schoolNum'?true:false">
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用账号密码登录</p> -->
          <el-form :model="schoolLoginForm" ref="schoolLoginForm">
            <el-form-item
              prop="phone"
              :rules="[
                        { required: true, message: '请输入帐号', trigger: 'blur' },
                    ]"
            >
              <el-input
                placeholder="请输入帐号"
                @keyup.enter.native="schoollogin"
                v-model="schoolLoginForm.phone"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                        { required: true, message: '请输入密码' },
                    ]"
            >
              <el-input
                placeholder="请输入密码"
                type="password"
                @keyup.enter.native="schoollogin"
                v-model="schoolLoginForm.code"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;font-size:0.8rem"
                @click="schoollogin"
                :disabled="!schoolLoginForm.code||!schoolLoginForm.phone"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <!-- <img
           
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-wx.png"
            title="二维码登录"
            class="change_login_mode"
            @click="logPage='qrcodeLogin'"
          >
          <img
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-phone2.png"
            title="手机号登录"
            class="change_login_modeTwo"
            @click="logPage='phoneLogin'"
          >-->
          <div class="phoneBootom">
            <p>
              <span @click="toRegister">立即注册</span>
              <span @click="logPage='RetrieveForm'">找回密码</span>
            </p>
          </div>
        </div>
        <!-- end 账号登录 -->
        <!-- 找回密码 -->
        <div class="login_phone" v-show="logPage=='RetrieveForm'?true:false">
          <h3 class="reTitle">找回密码</h3>
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用手机号登录</p> -->
          <el-form :model="RetrieveForm" :rules="rules" ref="RetrieveForm">
            <el-form-item prop="phone">
              <el-input placeholder="请输入注册手机号" v-model="RetrieveForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input placeholder="请输入新密码" v-model="RetrieveForm.passWord" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input
                placeholder="确认密码"
                v-model="RetrieveForm.confirmPassword"
                auto-complete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="code"
              :rules="[
                        { required: true, message: '请输入手机验证码' },
                        {  min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
                    ]"
            >
              <el-input style="width:13.2rem" placeholder="收到的手机验证码" v-model="RetrieveForm.code"></el-input>
              <el-button
                class="get_auth_code"
                type="primary"
                v-if="seconds==0?true:false"
                :disabled="!RetrieveForm.phone||!RetrieveForm.passWord"
                @click="getAuthCode(0,'password')"
              >获取验证码</el-button>
              <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;font-size:0.8rem"
                @click="resetPassword()"
                :disabled="!RetrieveForm.code||!RetrieveForm.phone||!RetrieveForm.passWord"
              >重置密码</el-button>
            </el-form-item>
          </el-form>

          <!-- <img
            
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-wx.png"
            title="二维码登录"
            class="change_login_mode"
            @click="logPage='qrcodeLogin'"
          >
          <img
            src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/login/btm-pw.png"
            title="账号密码登录"
            class="change_login_modeTwo"
            @click="logPage='schoolNum'"
          >-->
        </div>
        <!-- end 找回密码 -->

        <div class="notice" v-if="!isChrome">
          <div class="mess mess1"></div>
          <div class="mess mess2"></div>
          <span>
            <i class="iconfont">&#xe656;</i>&nbsp;&nbsp;&nbsp;为了更好的用户体验，建议使用Chrome浏览器
          </span>
          <p>IE10及以上、Edge12及以上、Firefox21及以上、Chrome23及以上、Safari6.1及以上、Opera15及以上、360浏览器、UC浏览器等请使用极速模式</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setUserInfo } from "@@/utils/commons";
import util from "@@/utils/util";
import network from "@@/api/jxapi";
export default {
  props: ["current", "nav"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.RetrieveForm.passWord !== "") {
          this.$refs.RetrieveForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var confirmPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RetrieveForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      uuidCode: "", //uuid唯一的状态码
      loginShow: false, // 是否显示登录注册窗口
      bgVisibleShow: false, // 是否显示背景遮罩层
      logPage: "qrcodeLogin", // 登录方式
      seconds: 0, // 获取验证码倒计时
      phoneLoginForm: {
        phone: "",
        code: ""
      }, // 手机号登录表单
      schoolLoginForm: {
        phone: "",
        code: ""
      }, // 账号密码登录表单
      logined: "", // 是否已登录
      messageNum: 0, // 消息条数
      isChrome: true,
      RetrieveForm: {
        phone: "",
        code: "",
        passWord: "",
        confirmPassword: ""
      }, // 手机号登录表单
      rules: {
        passWord: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: confirmPassword2, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入注册手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号格式错误", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    this.logined = localStorage.getItem("login") || "";
    this.uuidCode = this.uuid();
    if (this.logined) {
      if (localStorage.getItem("userInfo")) {
        this.$store.state.islogin = true;
        return this.$router.back(-1);
      }
      this._getNum();

      //获取个人信息
      // this._usercenterUser()
    }
    let code = this.$route.query.code;
    if (code) {
      const form = new FormData();
      form.append("code", code);
      form.append("providerId", "weixin");
      let data = await network.wechatLogin({
        data: form,
        headers: {
          deviceId: 0
        }
      });

      if (data == "error") return this.$router.push(`/register`);
      this.setInfo(data);

      setToken( data.access_token);
      this.logined = true;
      this.loginShow = false;
      this.bgVisibleShow = false;
      this.loginJump();
    }
    var isChrome = window.navigator.userAgent.indexOf("Chrome");
    if (isChrome == -1) {
      this.isChrome = false;
    } else {
      this.isChrome = true;
    }
  },
  async mounted() {
    if (!localStorage.getItem("login")) {
      //获取微信的登录二维码
      this.WxLogin();
    }
  },
  methods: {
    //找回密码
    async resetPassword() {
      let formData = new FormData();
      formData.append("mobile", this.RetrieveForm.phone);
      formData.append("smsCode", this.RetrieveForm.code);
      formData.append("password", this.RetrieveForm.passWord);
      let data = await network.resetPassword({
        data: formData,
        headers: {
          deviceId: this.uuidCode + this.RetrieveForm.phone
        }
      });
      let that = this;
      if (data !== "error") {
        this.$message.success("密码重置成功");
        that.logPage = "schoolNum";
        // setTimeout(() =>{

        // },3000)
      }
    },
    //跳转到注册页面
    toRegister() {
      let url = "/register";
      this.$router.push(url);
    },
    /**
     * @author hsq
     * @date 2018/10/24
     * @Description: 掉用该方法可以调出登录弹出框
     */
    hideBgVisible() {
      this.WxLogin();
      this.loginShow = false;
      this.bgVisibleShow = false;
    },
    // 登录
    async tologin() {
      let data = await network.authenticationMobile({
        data: {
          mobile: this.phoneLoginForm.phone,
          smsCode: this.phoneLoginForm.code
        },
        headers: {
          deviceId: this.uuidCode + this.phoneLoginForm.phone
        }
      });
      if (data == "error") return;

      setToken( data.access_token);
      this.logined = true;
      this.loginShow = false;
      this.bgVisibleShow = false;
      this.loginJump();
      //调用下个人信息
      // this._usercenterUser()
    },
    async loginJump() {
      await setUserInfo.call(this);
      this.$store.state.islogin = true;
      var url = decodeURIComponent(util.getParameterByName("url")) || "/";
      var doJump;
      if (/^http(s?):\/\//.test(url)) {
        // 绝对路径
        doJump = url => (window.location.href = url);
      } else {
        // 相对路径
        url = url.replace(/^http(s?):\/\/.*?(?=\/)/, "");
        // 从注册页面跳转过来时，跳转到竞赛首页
        if (url == "/register") url = "/";
        doJump = url => this.$router.push(url);
      }
      setTimeout(() => {
        doJump.call(this, url);
      }, 100);
    },
    //账号密码
    async schoollogin() {
      if (
        this.schoolLoginForm.phone.length < 1 ||
        this.schoolLoginForm.code.length < 1
      ) {
        return;
      }

      let result = await network.authenticationForm({
        data: {
          username: this.schoolLoginForm.phone,
          password: this.schoolLoginForm.code
        },
        headers: {
          deviceId: this.uuidCode + this.schoolLoginForm.phone
        }
      });
      if (result == "error") return;

      setToken( result.access_token);

      this.logined = true;
      this.loginShow = false;
      this.bgVisibleShow = false;
      this.loginJump();
    },
    // 获取验证码
    async getAuthCode(status, type) {
      let mobile = "";
      if (type === "phone") {
        mobile = this.phoneLoginForm.phone;
      } else {
        mobile = this.RetrieveForm.phone;
      }
      let result = await network.sendSmsCode({
        data: {
          mobile: mobile,
          domain: location.hostname
        },
        headers: {
          deviceId: this.uuidCode + mobile
        }
      });
      if (result == "error") return;
      this.$message.success("获取验证码成功");
      let _this = this;
      this.seconds = 59;
      let secTimer = setInterval(function() {
        _this.seconds--;
        if (_this.seconds == 0) {
          clearInterval(secTimer);
        }
      }, 1000);
    },
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      let uuid = s.join("");
      return uuid;
    },
    //获取微信的验证码
    WxLogin() {
      let url = location.host;

      console.log(url);
      let obj = new WxLogin({
        id: "login_container", // 需要显示的容器id
        appid: "wx4bb7408219b5465c", //"wx131be88fce505f45", // 公众号appid wx*******  wxf895323a9dbbc75a  wxd99431bbff8305a0
        scope: "snsapi_login", // 网页默认即可
        redirect_uri: `https://p.moocollege.com?data=${url}`,
        //window.location.href.split("code")[0] || window.location.href, // 授权成功后回调的urlwindow.location.href
        state: Math.round(Math.random() * 10), // 可设置为简单的随机数加session用来校验
        style: "black", // 提供"black"、"white"可选。二维码的样式
        href:
          "https://web.moocollege.com/edit/201978/bd6df88960f311e9bb8a00163e040299/l4AK5ArT_1562565458406/css1.css" // 外部css文件url，需要https
      });
    },
    //截取url值
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    /**
     * @author hsq
     * @date 2018/11/6
     * @Description: 这是消息未读
     */
    async _getNum() {
      let result = await network.unRedaNum();
      if (result == "error") return;
      this.messageNum = result;
    }
  }
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
        font-size: 16px;
        color: #9b9b9b;
        span {
          padding: 15px;
          cursor: pointer;
        }
        .Selection {
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
    .notice {
      position: absolute;
      bottom: -110px;
      left: 0;
      width: 100%;
      height: 90px;
      background: rgba(255, 255, 255, 0.2);
      .mess {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 43px;
        background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/home/Line.png) no-repeat;
        background-size: cover;
        background-position: center;
      }
      .mess1 {
        left: 78px;
      }
      .mess2 {
        right: 78px;
      }
      span {
        display: block;
        width: 328px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #ffffff;
        background: #1d86ff;
        border-radius: 6px;
        margin: 12px auto;
      }
      p {
        font-size: 12px;
        color: #ffffff;
        text-align: left;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
  .reTitle {
    font-size: 22px;
    color: #4a4a4a;
    letter-spacing: 0;
    height: 94px;
    line-height: 94px;
    text-align: center;
  }

  .el-button {
    padding: 12px 10px;
  }
}
</style>
