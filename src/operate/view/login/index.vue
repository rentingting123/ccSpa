<template>
  <div>
    <remote-script src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-script>
    <div class="login">
      <div class="login_modal">
        <div class="qrcode_login">
          <!-- 账号登录 -->
          <div class="schoolNum" v-show="logPage=='schoolNum'?true:false">
            <p style="margin:30px 0;font-weight:bold">使用账号密码登录2</p>
            <Form :model="schoolLoginForm" :rules="rule" ref="schoolLoginForm" :label-width="80">
                <FormItem label="帐号" prop="phone">
                    <Input size="large" v-model="schoolLoginForm.phone" placeholder="请输账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="code">
                    <Input size="large" type = "password" @on-enter="schoollogin('schoolLoginForm')" v-model="schoolLoginForm.code" placeholder="请输入密码"></Input>
                </FormItem>
                <Button type="primary" size="large" :loading="logining" @click="schoollogin('schoolLoginForm')" :disabled="!schoolLoginForm.code||!schoolLoginForm.phone">登录</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/operate/api/index";
export default {
  props: ["close"],
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
      let _loction = null
      if(returnCitySN){
        _loction = returnCitySN['cip']+returnCitySN['cname']
        _loction = _loction.replaceAll('.','@')
      }
        this.$refs[name].validate(async (valid) => {
            if(!valid) return;

            this.logining=true
            let result = await network.operateLogin({
                data: {
                username: this.schoolLoginForm.phone,
                password: this.schoolLoginForm.code,
                },
                headers:{
                   location:encodeURI(_loction),
                }
            });
            if (result == "error") return this.logining=false;
            if(!result.white_url || result.white_url.length<1){
              return this.$message.error('无权限，请先开通');
            }
            this.loginJump(result)
        })
    },
    async loginJump(result){
      localStorage.setItem('userInfo', JSON.stringify(result));
      this.$router.push('/home')
    }
  }
};
</script>

<style lang="less">
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

<style lang="less">
.ivu-form .ivu-form-item-label{
    font-size: 16px;
}
</style>
