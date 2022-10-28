<template>
  <div class="retrieve">
    <div class="login_modal">
      <div class="qrcode_login">
        <div class="login_head">
          <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/home/logo1.png" />
        </div>

        <!-- 找回密码 -->
        <div class="login_phone">
          <h3 class="reTitle">找回密码</h3>
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用手机号登录</p> -->
          <el-form :model="RetrieveForm" :rules="rules" ref="RetrieveForm">
            <el-form-item prop="phone">
              <el-input
                placeholder="请输入注册手机号"
                v-model="RetrieveForm.phone"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input
                placeholder="请输入新密码"
                v-model="RetrieveForm.passWord"
                auto-complete="off"
                 type="password"
              ></el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input
                placeholder="确认密码"
                v-model="RetrieveForm.confirmPassword"
                auto-complete="off"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="code"
              :rules="[
                { required: true, message: '请输入手机验证码' },
                { min: 6, max: 6, message: '验证码错误', trigger: 'blur' },
              ]"
            >
              <el-input
                style="width: 13.2rem"
                placeholder="收到的手机验证码"
                v-model="RetrieveForm.code"
              ></el-input>
              <el-button
                class="get_auth_code"
                type="primary"
                v-if="seconds == 0 ? true : false"
                :disabled="!RetrieveForm.phone || !RetrieveForm.passWord"
                @click="getAuthCode(0, 'password')"
                >获取验证码</el-button
              >
              <span class="wait_auth_code" v-else>重新发送({{ seconds }})</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%; font-size: 0.8rem"
                @click="resetPassword()"
                :disabled="
                  !RetrieveForm.code ||
                  !RetrieveForm.phone ||
                  !RetrieveForm.passWord
                "
                >重置密码</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- end 找回密码 -->
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/SSO/lib/util";
import node from "@/SSO/network";
import { checkPassword } from "@@/utils/util"
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!checkPassword(value)) {
        callback(new Error(this.$t('usercenter.EnterNewPassword')));
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
      seconds: 0, // 获取验证码倒计时
      RetrieveForm: {
        phone: "",
        code: "",
        passWord: "",
        confirmPassword: "",
      }, // 手机号登录表单
      rules: {
        passWord: [{ validator: validatePass, trigger: "change" }],
        confirmPassword: [{ validator: confirmPassword2, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入注册手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号格式错误", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //找回密码
    async resetPassword() {
        let data = {
            mobile: this.RetrieveForm.phone,
            smsCode: this.RetrieveForm.code,
            password: this.RetrieveForm.passWord,
        };
        let result = await node.modifyPass({
            data,
        });
        if (result == "error") return ;
        this.$message.success("密码重置成功");
        this.$router.push('/login')
    },

    // 获取验证码
    async getAuthCode(status, type) {
        let mobile = this.RetrieveForm.phone;
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
    //修改密码
     async  modifyFormPassword() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) return;
        if (!this.checked) return this.$message.warning("请阅读并接受免责声明");
        const form = new FormData();
        form.append("smsCode", this.ruleForm.code);
        form.append("mobile", this.ruleForm.phone);
        form.append("nickName", this.ruleForm.name);
        form.append('type',localStorage.getItem("bindType")||0)

        const phone = await network.weixinModifyMobile({
          data: form,
          headers: {
            deviceId: 0,
            Authorization: `Bearer ${localStorage.getItem("wexin")}`
          }
        });
        if (phone == "error") return;
        this.$message.success("绑定成功");
        localStorage.removeItem("wexin");
        localStorage.removeItem("bindType");
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="less">
.retrieve {
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
            // 头部
            .login_head {
                position: relative;
                img {
                height: 62px;
                }
            }
            // 手机号登录
            .login_phone {
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
