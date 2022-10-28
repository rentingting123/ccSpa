<template>
  <div>
    <div class="login">
      <div class="login_modal">
        <div class="qrcode_login">
          <!-- end 扫码登录 -->
          <!-- 手机号登录 -->
          <div class="login_phone" v-show="logPage=='phoneLogin'?true:false">
            <p style="margin:30px 0;font-weight:bold">使用手机号登录</p>
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
                <el-input
                  style="width:262px"
                  placeholder="收到的手机验证码"
                  v-model="phoneLoginForm.code"
                ></el-input>
                <el-button
                  class="get_auth_code"
                  type="primary"
                  v-if="seconds==0?true:false"
                  @click="getAuthCode(0)"
                >获取验证码</el-button>
                <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                   :loading="logining"
                  style="width:100%;font-size:16px"
                  @click="tologin()"
                  :disabled="!phoneLoginForm.code||!phoneLoginForm.phone"
                >登录</el-button>
              </el-form-item>
            </el-form>
            <!-- <img
              src="https://web.moocollege.com/mooc/hzq/vueskin/assets/login/btm-wx.png"
              title="二维码登录"
              class="change_login_mode"
              @click="logPage='qrcodeLogin'"
            >-->
            <img
              src="https://web.moocollege.com/mooc/hzq/vueskin/assets/login/btm-pw.png"
              title="账号密码登录"
              class="change_login_modeTwo"
              @click="logPage='schoolNum'"
            >
          </div>
          <!-- end 手机号登录 -->
          <!-- 账号登录 -->
          <div class="login_phone" v-show="logPage=='schoolNum'?true:false">
            <p style="margin:30px 0;font-weight:bold">使用账号密码登录</p>
            <el-form :model="schoolLoginForm" ref="schoolLoginForm">
              <el-form-item
                prop="phone"
                :rules="[
                          { required: true, message: '请输账号', trigger: 'blur' },
                      ]"
              >
                <el-input
                  placeholder="请输账号"
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
                  :loading="logining"
                  style="width:100%;font-size:16px"
                  @click="schoollogin"
                  :disabled="!schoolLoginForm.code||!schoolLoginForm.phone"
                >登录</el-button>
              </el-form-item>
            </el-form>
            <img
              src="https://web.moocollege.com/mooc/hzq/vueskin/assets/login/btm-phone2.png"
              title="手机号登录"
              class="change_login_modeTwo"
              @click="logPage='phoneLogin'"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/api/index";
import {setToken,removeToken} from '@@/utils/oauth'
export default {
  props: ["close"],
  data() {
    return {
      logining:false,
      mName: "",
      headImg: "",
      uuidCode: "", //uuid唯一的状态码
      loginShow: false, // 是否显示登录注册窗口
      bgVisibleShow: false, // 是否显示背景遮罩层
      logPage: "schoolNum", // 登录方式
      seconds: 0, // 获取验证码倒计时
      phoneLoginForm: {
        phone: "",
        code: ""
      }, // 手机号登录表单
      schoolLoginForm: {
        phone: "",
        code: ""
      }, // 账号密码登录表单
      messageNum: 0, // 消息条数
      showUserInfo: false, // 是否显示用户信息
      jurisdiction: "", //判断是否有权限设置
      loading: false //是否显示loading
    };
  },
  created() {
    this.uuidCode = this.uuid();
  },
  methods: {
    // 手机登录
    async tologin() {
      this.logining=true
      if (
        this.phoneLoginForm.phone.length < 1 ||
        this.phoneLoginForm.code.length < 1
      ) {
        return;
      }

      let result = await network.tellogin({
        data: {
          mobile: this.phoneLoginForm.phone,
          smsCode: this.phoneLoginForm.code
        },
        headers: {
          deviceId: this.uuidCode + this.phoneLoginForm.phone
        }
      });
      
      if (result == "error") return this.logining = false;
      this.loginJump(result)
    },
    //账号密码
    async schoollogin() {
      
       this.logining=true
      if (
        this.schoolLoginForm.phone.length < 1 ||
        this.schoolLoginForm.code.length < 1
      ) {
        return;
      }
      let result = await network.login({
        data: {
          username: this.schoolLoginForm.phone,
          password: this.schoolLoginForm.code
        },
        headers: {
          deviceId: this.uuidCode + this.schoolLoginForm.phone
        }
      });
      if (result == "error") return this.logining=false;
       this.loginJump(result)
    },
    // 获取验证码
    async getAuthCode(status) {
      let phone = status
        ? this.phoneRegisterForm.phone
        : this.phoneLoginForm.phone;
      if (!phone) {
        this.$message.warning("请输入手机号码");
        return;
      }
      if (phone.length !== 11) {
        this.$message.warning("请输入正确的手机号码");
        return;
      }

      let sendSms = await network.sendSmsCode({
        data: { mobile: phone,domain:location.hostname },
        headers: {
          deviceId: this.uuidCode + phone
        }
      });
      if (sendSms == "error") return;
      this.$message({
        message: "获取验证码成功",
        type: "success"
      });
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
    async loginJump(result){
      setToken(result.access_token)
      // setToken( result.access_token);
      localStorage.setItem("defaultUserId", this.schoolLoginForm.phone);

      let user = await network.getUserInfo();
      this.logining=false
      if (user == "error") return ;
      if(user.type!=8){
        removeToken()
        // localStorage.removeItem("login");
        return this.$message.warning("您不是报名管理员");
      } 
      localStorage.setItem("userInfo", JSON.stringify(user));
      return this.close()

    }
  }
};
</script>

<style lang="less">
.choose {
  width: 100%;
  height: 40px;
  line-height: 40px;
  li {
    width: calc(50% - 2px);
    float: left;
    text-align: center;
    border: 1px solid #ccc;
  }
  li.on {
    background: #0078e2;
    border: 1px solid #0078e2;
    color: #ffffff;
  }
}
.qrcode_login {
  position: relative;
  margin: 20px auto;
  width: 500px;
  height: 375px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;

  .login_head {
    position: relative;

    img {
        max-width: 210px;
        max-height: 62px;
        margin-top: 21px;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }

  // 二维码登录
  .login_code {
    margin: 20px;
    text-align: center;
    font-size: 20px;

    p {
      img {
        width: 230px;
        height: 230px;
      }
    }
  }

  // 手机号登录
  .login_phone {
    margin: 20px;
    text-align: center;
    font-size: 20px;
    padding: 0 50px;

    form {
      padding-top: 10px;

      .el-form-item {
        margin-bottom: 26px;

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
          width: 112px;
          margin-left: 20px;
          border-radius: 5px;
          font-size: 16px;
        }

        .wait_auth_code {
          background: #dedede;
        }
      }
    }
  }

  //学生账号登录
  .schoolNum {
    margin: 20px;
    text-align: center;
    font-size: 20px;
    padding: 0 50px;

    form {
      padding-top: 10px;

      .el-form-item {
        margin-bottom: 26px;

        > div {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .get_auth_code,
        .wait_auth_code {
          width: 112px;
          margin-left: 20px;
          border-radius: 5px;
          font-size: 16px;
        }

        .wait_auth_code {
          background: #dedede;
        }
      }
    }
  }

  // 手机号注册
  .register_phone {
    margin: 20px;
    text-align: center;
    font-size: 20px;
    padding: 0 50px;

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
          width: 112px;
          margin-left: 20px;
          border-radius: 5px;
          font-size: 16px;
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
    border-radius: 0 0 6px 0;
  }

  img.change_login_modeTwo {
    position: absolute;
    left: 0;
    bottom: 0;
    cursor: pointer;
    border-radius: 0 0 6px 0;
  }
}
.login {
  width: 100%;
  text-align: center;
  font-size: 16px;
  position: relative;
  padding: 20px 0;
  z-index: 2;
  // background-image: linear-gradient(-180deg, #29dfb2 0%, #019fff 100%);
  position: relative;

  // 登录，注册

  .el-button {
    padding: 12px 10px;
  }
}
</style>
