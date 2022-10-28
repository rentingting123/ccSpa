<template>
  <div>
    <remote-script src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-script>
    <div class="login">
      <div class="login_modal">
        <div class="qrcode_login">
          <div class="left">
          <div class="left_cont">
              <div style="margin-bottom: 25px;">
              <img src="./logo.png" alt="">
            </div>
            <div>
              <div style="font-size: 33px;color: #fff;font-weight:800">个推管理系统</div>
              <div style="font-size: 24px;color: #fff;">Vod Management System</div>
            </div>
          </div>
          </div>
          <!-- 账号登录 -->
          <div class="schoolNum" v-show="logPage=='schoolNum'?true:false">
            <p style="margin: 30px 0px;
    font-weight: bold;
    color: #9a9999;
    text-align-last: left;
    font-size: 18px;">用户登录 / USER LOGIN</p>
            <el-Form :model="schoolLoginForm" :rules="rule" ref="schoolLoginForm" label-width="80">
                <el-form-item  label="" prop="phone">
                    <el-Input   prefix-icon="el-icon-mobile-phone" size="large" v-model="schoolLoginForm.phone" placeholder="请输入用户名称"></el-Input>
                </el-form-item >
                <el-form-item  label="" prop="code">
                    <el-Input  prefix-icon="el-icon-lock" size="large" type = "password" @on-enter="schoollogin('schoolLoginForm')" v-model="schoolLoginForm.code" placeholder="请输入登录密码"></el-Input>
                </el-form-item >
                <el-Button type="primary" size="large" :loading="logining" @click="schoollogin('schoolLoginForm')" :disabled="!schoolLoginForm.code||!schoolLoginForm.phone">登录</el-Button>
            </el-Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/pps/api/index";
export default {
  data() {
    return {
      logining:false,
      logPage: "schoolNum", // 登录方式
      schoolLoginForm: {
        phone: "",
        code: ""
      }, // 账号密码登录表单
      rule:{
        phone: [
            { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false //是否显示loading
    };
  },
  methods: {
    //账号密码
    async schoollogin(name) {
        this.$refs[name].validate(async (valid) => {
            if(!valid) return;

            this.logining=true
            let result = await network.login({
                data: {
                username: this.schoolLoginForm.phone,
                password: this.schoolLoginForm.code,
                }
            });
            if (result == "error") return this.logining=false;
             this.logining=false
             this.$message('登录成功！')
             this.$router.push('/pps')
        })
    },
  }
};
</script>

<style lang="less">

.qrcode_login {
  position: absolute;
  margin: 20px auto;
  width: 830px;
  height: 420px;
  background: #fff;
  top: 35%;
  left: 50%;
  transform: translate(-50%,-50%);
  // border: 1px solid #ccc;
  // border-radius: 6px;
  .left{
    float: left;
    width: 50%;
    height: 100%;
    background-color: #0073fb;
    .left_cont{
          position: absolute;
    top: 47%;
    left: 26%;
    transform: translate(-50%, -50%);
    }
  }
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

  //学生账号登录
  .schoolNum {
    // margin: 20px;
    text-align: center;
    font-size: 20px;
    // padding: 0 50px;
    float: right;
    width: 37%;
        position: absolute;
    top: 15%;
    right: 6%;

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
}
.login {
  width: 100%;
  text-align: center;
  font-size: 16px;
  position: relative;
  // padding: 20px 0;
  z-index: 2;
  height: 100vh;
  // background:#015cf2;
  // background:  no-repeat;
  //  background-size:100%;
   background: #015cf2 url(./bg.png) no-repeat fixed center top ;
  position: relative;

  // 登录，注册

  .el-button {
        padding: 12px 10px;
    width: 100%;
    background: #015cf2;
  }
}
</style>

<style lang="less">
.ivu-form .ivu-form-item-label{
    font-size: 16px;
}
</style>
