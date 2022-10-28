
<template>
<div>
    <Header class="header">
        <HeaderComponent></HeaderComponent>
    </Header>
    <div id="shezhi" class="shezhi">
      <div class="toRet">
        <span @click="toRet">返回</span>
      </div>
    <div
      class="user_msg"
      :class="{'user_msg_div':!!msg_edit_show,'noBottomBorder':!msg_edit_show&&!phone_edit_show}"
    >
      <p
        class="msg_title"
        @click="msg_edit_show=!msg_edit_show;phone_edit_show=false;account_edit_show=false"
        :class="{'msg_edit_show':msg_edit_show?true:false}"
      >
        <span class="name">个人信息</span>
        <span class="cnt" v-if="!msg_edit_show">{{ mName }}</span>
        <span class="cnt" style="color:#CB3A4C" v-else>请完善个人信息</span>
        <span class="edit">
          <em>修改</em>
          <i class="el-icon-arrow-down" v-if="!msg_edit_show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>

      <user v-show="msg_edit_show" :msg_edit_show="msg_edit_show"></user>
    </div>
    <div class="phone" :class="{'phone_div':phone_edit_show?true:false}">
      <p
        class="phone_title"
        @click="phone_edit_show=!phone_edit_show;msg_edit_show=false;account_edit_show=false"
        :class="{'phone_edit_show':phone_edit_show?true:false}"
      >
        <span class="name">手机号</span>
        <span class="cnt">{{ contactPhone }}</span>
        <!-- <span class="cnt">{{ phoneBindForm.mobile }}</span> -->
        <span class="edit">
          <em>修改</em>
          <i class="el-icon-arrow-down" v-if="!phone_edit_show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <!-- 手机号绑定 -->
      <div class="change_phone" v-if="phone_edit_show">
        <el-form :model="phoneBindForm" ref="phoneBindForm">
          <el-form-item
            prop="mobile"
            label="修改手机号"
            label-width="6rem"
            :rules="[
                            { required: true, message: '请输入新手机号', trigger: 'blur' },
                            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
                        ]"
          >
            <el-input placeholder="请输入手机号绑定" v-model="phoneBindForm.mobile" style="width:14.4rem"></el-input>
          </el-form-item>
          <el-form-item
            prop="smsCode"
            label="手机验证码"
            label-width="6rem"
            :rules="[
                            { required: true, message: '请输入验证码', trigger: 'blur' },
                            {  min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
                        ]"
          >
            <el-input
              style="width:7.75rem;margin-right:1rem"
              placeholder="收到的验证码"
              v-model="phoneBindForm.smsCode"
            ></el-input>
            <el-button
              class="get_auth_code"
              type="primary"
              v-if="seconds==0?true:false"
              @click="getAuthCode()"
            >获取验证码</el-button>
            <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:6rem;font-size:0.8rem;margin-left:6rem;"
              @click="submitFormPhone('phoneBindForm')"
            >绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- end 手机号绑定 -->
    </div>
    <div  class="phone" :class="{'phone_div':pwd_edit_show?true:false}">
      <p class="phone_title" @click="pwd_edit_show=!pwd_edit_show;msg_edit_show=false;account_edit_show=false;phone_edit_show=false" :class="{'phone_edit_show':pwd_edit_show?true:false}">
        <span class="name">密码修改</span>
        <span class="edit">
          <em>修改</em>
          <i class="el-icon-arrow-down" v-if="!pwd_edit_show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <!-- 密码修改 -->
      <div class="change_phone" v-if="pwd_edit_show">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item  label="旧密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- end 密码修改 -->
    </div>
    <div
    
      class="account"
      :class="{'account_div':account_edit_show?true:false,'noTopBorder':!account_edit_show&&!phone_edit_show}"
    >
      <p
        class="account_title"
        @click="account_edit_show=!account_edit_show;phone_edit_show=false;msg_edit_show=false"
        :class="{'account_edit_show':account_edit_show?true:false}"
      >
        <span class="name">账户绑定</span>
        <span class="cnt" v-if="isWechat">已绑定</span>
        <span class="cnt" v-else>请完善账户信息</span>
        <span class="edit">
          <em>修改</em>
          <i class="el-icon-arrow-down" v-if="!account_edit_show"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </span>
      </p>
      <div class="bind_account" v-if="account_edit_show">
        <el-form :model="bnankBindForm" ref="bnankBindForm">
          <el-form-item
            prop="idcardNumber"
            label="身份证号"
            label-width="5rem"
            :rules="[
                                { required: true, message: '请输入身份证号' },
                            ]"
          >
            <el-input placeholder="请输入身份证号" v-model="bnankBindForm.idcardNumber"></el-input>
          </el-form-item>
          <el-form-item
            prop="bankAddress"
            label="开户行"
            label-width="5rem"
            :rules="[
                                { required: true, message: '请输入开户行' },
                            ]"
          >
            <el-input placeholder="请输入开户行" v-model="bnankBindForm.bankAddress"></el-input>
          </el-form-item>
          <el-form-item
                prop="bankNumber"
                label="银行账号"
                label-width="5rem"
                :rules="[
                                    { required: true, message: '请输入银行账号' },
                                ]"
              >
              <el-input placeholder="请输入银行账号" v-model="bnankBindForm.bankNumber"></el-input>
          </el-form-item>
          <el-form-item>
        <el-button
              type="primary"
              style="width:6rem;font-size:0.8rem;margin-left:5rem"
              @click="bankSubm('bnankBindForm')"
            >保存</el-button>
          </el-form-item>
        </el-form>
        <!-- <i class="iconfont icon-weixin"></i>
        <p v-if="isWechat">已绑定</p>
        <p v-else class="wx_binding" @click="wxBinding">立即绑定</p> -->
      </div>
      <!-- end 绑定社交账号 -->
    </div>
    <!-- 绑定社交账号登录注册弹窗 -->
    <!-- <div class="logins" v-show="wechatActive">
      <div class="login_modals">
        <div class="qrcode_logins">
          <div class="login_heads">
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nav/logo1.png">
            <i class="iconfont icon-guanbi" @click="wechatActive=false"></i>
          </div> -->
          <!-- 扫码登录 -->
          <!-- <div class="login_codes">
            <p id="login_containers"></p>
          </div>
        </div>
      </div>
      <div v-show="wechatActive" class="bg" @click="wechatActive=false"></div>
    </div> -->
  </div>
</div>
  
</template>

<script>
// import network from "@@/api/jxapi/index";
// import { getHashParam, getUserInfo } from "@@/utils/commons";
import network from "../../../api/index";
// import { getUserInfo } from "../../api/index";
import user from "./user/user";
import HeaderComponent from "../common/header.vue"

export default {
  name: "shezhi",
  data() {
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('旧密码不能为空'));
      }else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      uuidCode: "", //uuid唯一的状态码
      phoneBindForm: { mobile: "", smsCode: "" }, // 手机号绑定表单
      bnankBindForm:{
        idcardNumber:'',
        bankAddress:'',
        bankNumber:''
      },

      seconds: 0, // 获取验证码倒计时
      msg_edit_show: false, // 个人信息修改
      pwd_edit_show:false, // 密码修改

      phone_edit_show: false, // 手机号修改
      account_edit_show: true, // 绑定账号修改
      mName: "", //个人信息处的姓名
      contactPhone: "", //手机号码
      isWechat: 0, //是否绑定过微信
      wechatActive: false, //绑定微信的弹出框
      loading: false,
      userMessage:{},
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
      }
    };
  },
  async created() {
    this.uuidCode = this.uuid(); //这是获取手机验证码时请求头的机器随机标识码
    //获取个人信息
    this.getlocalUserInfo();

    // const code = getHashParam("code");
    // if (code) {
    //   let wechat = await network.bindingWechat({code:code});
    //   if(wechat=='error') return;
    //   this.$message.success("微信绑定成功");
    //   this.getUserInfo();
    // }
  },

  methods: {
    //修改密码提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return false;
        let result = await network.changePwd({data:{newPassword:this.ruleForm.pass,oldPassword:this.ruleForm.pwd}});
        if(result=="error") return;
        this.$message.success("密码修改成功")
        
      });
    },
    //修改密码重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getlocalUserInfo() {
      let result = JSON.parse(this.$webapi.getlocal("userInfo")) ;
      if(!result){
        this.$api.get('/usercenter/user').then(result => {
          if (result == "error") return;
          result=result.data
        })
      }
      this.setUser(result);
      
    },
    
    setUser(result) {
      this.userMessage=result
      this.mName = result.idcardName;
      this.contactPhone = result.contactPhone;
      this.isWechat = result.isWechat;
      this.bnankBindForm.idcardNumber=result.idcardNumber;
      this.bnankBindForm.bankAddress=result.bankAddress;
        this.bnankBindForm.bankNumber=result.bankNumber;
    },
    /**
     *
     * @Description: 绑定微信
     */
    wxBinding() {
      window.location.href =
        "https://open.weixin.qq.com/connect/qrconnect?appid=wxf895323a9dbbc75a&redirect_uri=http%3A%2F%2Fcc.moocollege.com%2F%23%2Fprofile&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
    },

    /**
     *
     * @Description: 绑定手机号码修改
     */
    submitFormPhone(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const phone = await network.modifyMobile({data:{...this.phoneBindForm, email: false},headers:{deviceId:this.uuidCode}})
          
          if(phone=='error') return;
          this.userMessage.contactPhone=this.phoneBindForm.mobile

          this.$api.post('/usercenter/user',this.userMessage).then(reset => {
            if (reset == "error") return //this.$message.error("修改失败");
            this.$api.get('/usercenter/user').then(res => {
              if (res == "error")
                return this.$message("设置成功，获取用户信息失败！");
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$message.success("修改成功");
              this.contactPhone = this.phoneBindForm.mobile;
              this.phoneBindForm.mobile = "";
              this.phoneBindForm.smsCode = "";
            })
          })
          
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取验证码
    async getAuthCode() {
      
      const sms =await network.sms(
        {
          data:{mobile: this.phoneBindForm.mobile},
          headers:{deviceId:this.uuidCode}
        })
      if(sms=='error') return;

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
    // 银行个人信息提交
    bankSubm(formName) {
      let user = this.$webapi.getlocal("userInfo");
      if(!user || user.type==3 || user.type==4){
        return this.$message('您暂不支持修改！！')
      }

      this.$refs[formName].validate(async (valid, obj) => {
        if (valid) {
          this.userMessage.idcardNumber=this.bnankBindForm.idcardNumber
          this.userMessage.bankAddress=this.bnankBindForm.bankAddress
          this.userMessage.bankNumber=this.bnankBindForm.bankNumber
          this.$api.post('/usercenter/updateUserBankInfo',this.userMessage).then(reset => {
            if (reset == "error") return //this.$message.error("修改失败");
            this.$api.get('/usercenter/user').then(res => {
              if (res == "error")
                return this.$message("设置成功，获取用户信息失败！");
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$message.success("个人信息保存成功");
            })
          })
          // const list = await network.setUserInfo({ data: this.userMessage });
          // if (list == "error") return //this.$message.error("修改失败");
          // let user = await network.getUserInfo();
          // console.log(user)
          // if (user == "error")
          //   return this.$message("设置成功，获取用户信息失败！");
          // localStorage.setItem("userInfo", JSON.stringify(user));
          // this.$message.success("个人信息保存成功");
        } else {
          for (var o in obj) {
            return this.$message.error(obj[o][0].message);
          }
          return false;
        }
      });
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
    toRet(){
      this.$router.push("/expert/judge")
    }
  },
  mounted() {
    // this.msg_edit_show = !!this.$route.query.msg_edit_show;
  },
  components: {
    user,
    HeaderComponent,
  }
};
</script>


<style lang="less" scoped>
.shezhi {
    width: 776px;
    margin: 0 auto;
    font-size: 16px;
    color: #4a4a4a;
    margin-top: 41px;
  // 个人信息
  .user_msg {
    border: 1px solid #dedede;
    padding: 0 25px;
  }
  // 手机号
  .phone {
    border: 1px solid #dedede;
    padding: 0 25px;
    .change_phone {
      border-top: 1px solid #dedede;
      // margin-top:0.7rem;
      padding: 1rem;
      padding-top: 1.5rem;
      font-size: 0.8rem;
      label {
        text-align: left;
        font-size: 0.8rem;
        color: #787d81;
        span {
          font-size: 0.8rem;
        }
      }
      input {
        font-size: 0.8rem;
      }
    }
  }
  // 帐号绑定
  .account {
    border: 1px solid #dedede;
    padding: 0 25px;
    .bind_account {
      border-top: 1px solid #dedede;
      // margin-top:0.7rem;
      padding: 50px;
      padding-bottom: 1rem;
      padding-top: 1.5rem;
      font-size: 0.8rem;
      text-align: center;
      i {
        font-size: 3rem;
      }
      p {
        border: 1px solid #1d86ff;
        border-radius: 4.9rem;
        font-size: 0.8rem;
        color: #1d86ff;
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        margin: 0 auto;
        margin-top: 1rem;
      }
      .wx_binding {
        cursor: pointer;
      }
    }
  }
  > div > p {
    position: relative;
    .name {
      display: inline-block;
      width: 6rem;
      text-align: left;
    }
    .edit {
      position: absolute;
      right: 1rem;
      cursor: pointer;
      em {
        margin-right: 1rem;
        color: #9b9b9b;
      }
      &:hover {
        em {
          color: #1d86ff;
        }
      }
    }
  }
  // 个人信息展开
  .user_msg_div {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  // 修改手机号展开
  .phone_div {
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
  // 绑定账号展开
  .account_div {
    border-radius: 0.5rem;
    margin-top: 1rem;
  }
  .noBottomBorder {
    border-bottom: 0;
  }
  .noTopBorder {
    border-top: 0;
  }
  .msg_title,
  .phone_title,
  .account_title {
    cursor: pointer;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .login_modals {
    .qrcode_logins {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 30rem;
      height: 27.5rem;
      margin-left: -15rem;
      margin-top: -13.75rem;
      background: #fff;
      z-index: 1041;
      box-shadow: 0.1rem 0.2rem 0.3rem #000;
      border-radius: 0.3rem;
      padding: 1rem 1.5rem;
      .login_heads {
        position: relative;
        i {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      // 二维码登录
      .login_codes {
        margin: 1rem;
        text-align: center;
        border-top: 1px solid #dedede;
        font-size: 1rem;
        p {
          img {
            width: 11.5rem;
            height: 11.5rem;
          }
        }
      }
    }
  }
}
em {
  font-style: normal;
}
/deep/ .el-form-item__label {
  color: #787d81;
}
.header{
  height: 90px;
  line-height: 90px;
  background-color: #252C36;
}
.toRet{
  width: 100%;
  height: 38px;
  line-height: 38px;
  background: #fdf6d0;
  border-radius: 3px;
  span{
    margin-left: 25px;
    cursor: pointer;
  }
}
</style>
