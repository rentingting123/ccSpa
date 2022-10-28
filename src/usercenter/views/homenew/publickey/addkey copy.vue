<template>
  <div>
    <Button type="primary" @click="show=true" style="margin-right:6px;">添加公钥</Button>
    <Modal v-model="show" :mask-closable="false" width="550">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>添加公钥</span>
      </p>
      <div style="text-align:center;margin-top:30px;">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="120"
          style="text-align:center;"
        >
          <FormItem label="您绑定的手机" prop="loginPhonenumber">
              <p style="text-align:left;font-size:18px;border:1px solid #dcdee2;border-radius:4px;text-indent:10px">{{formValidate.loginPhonenumber}}</p>
          </FormItem>
          <FormItem label="验证码" prop="code" >
              <div style="display:flex;justify-content: space-between;">
                <Input v-model="formValidate.code" style="width:80%;" placeholder="收到的手机验证码"></Input>
                <Button v-if="seconds==0?true:false" @click="getAuthCode(0,'phone')">获取验证码</Button>
                <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
              </div>
          </FormItem>

          <FormItem class="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <Button type="error" @click="show=false" style="margin-left: 8px">取消</Button>
          </FormItem>
          <!-- :target-keys="targetKeys" -->
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      formValidate: {},
      ruleValidate: {
        idcardName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ]
      },
      seconds: 0,
    };
  },
  created(){
    let user = this.$webapi.getlocal('userInfo') && JSON.parse(this.$webapi.getlocal('userInfo'))
    this.formValidate.loginPhonenumber = user.contactPhone
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        let data = {
          ...this.formValidate,
          groupId: this.$webapi.getlocal("groupId"),
          targetType: this.$webapi.getselfType()
        };
        this.$api.post("/usercenter/user/insertUser", data)
          .then(res => {
            if (res.code == 0) {
              this.$Message.success("添加成功");
              this.show = false;
            } else {
              this.$netcode.getApiCode(res);
            }
          })
          .catch(error => {
            this.$Message.error(error);
          });
      });
    },
    // 获取验证码
    async getAuthCode() {
    //   let mobile = this.formValidate.loginPhonenumber
    //   let result = await network.sendSmsCode({
    //     data: {
    //       mobile: mobile,
    //       domain: location.hostname
    //     },
    //     headers: {
    //       deviceId: this.uuidCode + mobile
    //     }
    //   });
    //   if (result == "error") return;
    //   this.$message.success("获取验证码成功");
      let _this = this;
      this.seconds = 59;
      let secTimer = setInterval(function() {
        _this.seconds--;
        if (_this.seconds == 0) {
          clearInterval(secTimer);
        }
      }, 1000);
    }
  }
};
</script>

<style>
.footer {
  transform: translateX(-32px);
  margin-top: 30px;
}
</style>
