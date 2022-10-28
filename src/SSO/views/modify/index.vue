<template>
  <div class="retrieve">
    <div class="login_modal">
      <div class="qrcode_login">
        <div class="login_head">
          <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/home/logo1.png" />
        </div>

        <!-- 修改密码 -->
        <div class="login_phone">
          <h3 class="reTitle">修改密码</h3>
          <!-- <p style="margin:1.5rem 0;font-weight:bold">使用手机号登录</p> -->
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
          <el-form-item  prop="pwd">
            <el-input :placeholder="$t('usercenter.OldPassword')" type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input type="password" :placeholder="$t('usercenter.NewPassword')" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="checkPass">
            <el-input :placeholder="$t('usercenter.ConfirmPassword')" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
             style="width: 100%; font-size: 0.8rem"
             :disabled="
                  !ruleForm.pass ||
                  !ruleForm.checkPass ||
                  !ruleForm.pwd
                "
             @click="submitForm('ruleForm')">{{$t('SSO.Submit')}}</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">{{$t('usercenter.Reset')}}</el-button> -->
          </el-form-item>
        </el-form>
        </div>
        <!-- end 修改密码 -->
      </div>
    </div>
  </div>
</template>

<script>
import network from "@@/api/jxapi";
import { checkPassword } from "@@/utils/util"
export default {
     data(){
        var checkPwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t('usercenter.OldPasswordnotNull')));
            }else{
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (!checkPassword(value)) {
                callback(new Error(this.$t('usercenter.EnterNewPassword')));
            } else {
                if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('usercenter.repassword')));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error(this.$t('usercenter.pwdIsDifferent')));
            } else {
                callback();
            }
        };
        return{
            ruleForm: {
                pass: '',
                checkPass: '',
                pwd: ''
            },
            rules: {
                pass: [
                    { required:true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required:true, validator: validatePass2, trigger: 'blur' }
                ],
                pwd: [
                    { required:true, validator: checkPwd, trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return false;
                let result = await network.changePwd({
                  data:{newPassword:this.ruleForm.pass,oldPassword:this.ruleForm.pwd},  
                  headers: {
                   Authorization: `Bearer ${localStorage.getItem("wexin")}`
                 }});
                if(result=="error") return;
                this.$message.success(this.$t('usercenter.savePwdSuccess'))
                this.$router.push('/')
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
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
