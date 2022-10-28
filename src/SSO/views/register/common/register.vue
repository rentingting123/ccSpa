<template>
  <div>
    <div class="register_body">
      <div class="register">
        <div class="register_title">
          <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/home/logo1.png" />
        </div>
        <div class="register_content">
          <h3 v-if="type==2">{{$t('SSO.BindPhoneNum')}}</h3>
          <p v-else class="rTab">
            <span
              :class="{'Selection':regPage=='personal'?true:false}"
              @click="toTab('personal')"
            >{{$t('SSO.Personal')}}</span>
            <span>|</span>
            <span
              :class="{'Selection':regPage=='mechanism'?true:false}"
              @click="toTab('mechanism')"
            >{{$t('SSO.Organization')}}</span>
          </p>
          <!-- <h3 >欢迎来到竞赛平台！请填写您的信息</h3> -->
          <!-- 个人注册 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            v-show="regPage==='personal'"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label prop="phone">
               <el-input  v-model.trim="ruleForm.phone" :placeholder="$t('SSO.PhoneNum')" size="medium" class="input-with-select">
                  <el-select filterable  v-model="ruleForm.phonebefore" slot="prepend" placeholder="请选择">
                     <el-option
                        v-for="(item,index) in selectoptions"
                        :key="index"
                        :label=" item.CNName +  '  +' + item.dialCode"
                        :value="item.dialCode"
                      ></el-option>
                  </el-select>
                </el-input>
              <!-- <el-input v-model.trim="ruleForm.phone" :placeholder="$t('SSO.PhoneNum')" size="medium"></el-input> -->
            </el-form-item>
            <el-form-item v-if="type!=2&&type!=3" label prop="password">
              <el-input v-model.trim="ruleForm.password" type="password"  :placeholder="$t('SSO.PassP')" size="medium"></el-input>
            </el-form-item>
            <el-form-item label prop="registerCode" class="code">
              <el-input
                v-model.trim="ruleForm.registerCode"
                style="height:40px;"
                :placeholder="$t('SSO.ImgCode')"
                size="medium"
              ></el-input>
              <a @click="changePic1">
                <img ref="imgYzm1" src="nodeapi/code/get?for=registerCode" height="40" />
              </a>
            </el-form-item>
            <el-form-item label prop="code" class="code">
              <el-input v-model.trim="ruleForm.code" :placeholder="$t('SSO.MsnC')" size="medium"></el-input>
              <el-button type="primary" @click="sendSms" v-if="seconds==0">{{$t('SSO.GetMsn')}}</el-button>
              <span class="wait_auth_code" v-else>{{$t('SSO.ReGetMsn')}}({{seconds}})</span>
              <!-- <countdown :time="60 * 1000" @end="handleCountdownEnd" v-else>
                                <template slot-scope="props">
                                    <span class="countDown">{{$t('SSO.ReGetMsn')}}({{ props.totalSeconds }}s)</span>
                                </template>
              </countdown>-->
            </el-form-item>
            <el-form-item label prop="name">
              <el-input v-model.trim="ruleForm.name" :placeholder="$t('SSO.RealName')" size="medium"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" style="float:left;">{{$t('SSO.Readed')}}</el-checkbox>
            <Disclaimer style="float:left;margin-top:-10px" />
            <el-button type="primary" v-if="type==2" class="tijiao" @click="submitFormPhone">{{$t('SSO.Bind')}}</el-button>
            <!-- <el-button type="primary" v-else-if="type==3" class="tijiao" @click="bindSchoolAdmin">{{$t('SSO.Bind')}}</el-button> -->
            <el-button type="primary" v-else class="tijiao" @click="submit('ruleForm')">{{$t('SSO.Submit')}}</el-button>
          </el-form>

          <!-- 机构注册 -->
          <el-form
            :model="mechanism"
            :rules="rules"
            ref="mechanism"
            v-show="regPage==='mechanism'"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label prop="phone" v-if="mechanismType!=='学校'">
              <!-- <el-input v-model.trim="mechanism.phone" :placeholder="$t('SSO.PhoneNum')" size="medium"></el-input> -->
              <el-input  v-model.trim="mechanism.phone" :placeholder="$t('SSO.PhoneNum')" size="medium" class="input-with-select">
                  <el-select filterable  v-model="mechanism.phonebefore" slot="prepend" placeholder="请选择">
                     <el-option
                        v-for="(item,index) in selectoptions"
                        :key="index"
                        :label=" item.CNName +  '  +' + item.dialCode"
                        :value="item.dialCode"
                      ></el-option>
                  </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label prop="password" v-if="mechanismType!=='学校'">
              <el-input v-model.trim="mechanism.password" type="password" :placeholder="$t('SSO.PassP')" size="medium"></el-input>
            </el-form-item>
            <el-form-item label prop="registerCode" class="code" v-if="mechanismType!=='学校'">
              <el-input v-model.trim="mechanism.registerCode" :placeholder="$t('SSO.ImgCode')" size="medium"></el-input>
              <a @click="changePic">
                <img ref="imgYzm" src="nodeapi/code/get?for=registerCode" height="40" />
              </a>
            </el-form-item>
            <el-form-item label prop="code" class="code" v-if="mechanismType!=='学校'">
              <el-input v-model.trim="mechanism.code" :placeholder="$t('SSO.MsnC')" size="medium"></el-input>
              <el-button type="primary" @click="sendSms" v-if="seconds==0">{{$t('SSO.GetMsn')}}</el-button>
              <span class="wait_auth_code" v-else>{{$t('SSO.ReGetMsn')}}({{seconds}})</span>
              <!-- <countdown :time="60 * 1000" @end="handleCountdownEnd" v-else>
                                <template slot-scope="props">
                                    <span class="countDown">{{$t('SSO.ReGetMsn')}}({{ props.totalSeconds }}s)</span>
                                </template>
              </countdown>-->
            </el-form-item>

            <el-form-item label prop="mechanismName" v-if="mechanismType!=='学校'">
              <el-input v-model.trim="mechanism.mechanismName" :placeholder="$t('SSO.ORGName')" size="medium"></el-input>
            </el-form-item>
            <el-form-item label size="medium" prop="region">
              <el-select
                v-model="mechanism.region"
                :placeholder="$t('SSO.ORGType')"
                size="medium"
                style="width:400px;"
                @change="changType"
              >
                <el-option :label="$t('SSO.Type1')" value="竞赛主办方"></el-option>
                <el-option :label="$t('SSO.Type2')" value="政府单位"></el-option>
                <el-option :label="$t('SSO.Type3')" value="企业"></el-option>
                <el-option :label="$t('SSO.Type4')" value="学校"></el-option>
              </el-select>
            </el-form-item>

            <div class="Agreement" v-if="mechanismType!=='学校'">
              <div class="step1">
                <p>
                  <span>1</span> {{$t('SSO.Agreement')}}
                </p>
                <a
                  href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/摩课云竞赛平台使用协议-单方盖章生效协议5.31.docx"
                  class="tag_content_txt"
                  style="color: #4a90e2;"
                >
                  <i class="iconfont" style="font-size: 12px;margin-right: 5px">&#xe610;</i>
                  {{$t('SSO.DocName')}}
                </a>
                <!-- <a href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/摩课云竞赛平台使用协议-单方盖章生效协议5.31.docx" v-if="mechanismType==='政府单位'" class="tag_content_txt" style="color: #4a90e2;">
                                    <i class="iconfont" style="font-size: 12px;margin-right: 5px" >&#xe610;</i>
                                   摩课云竞赛平台使用协议模板.doc（点我下载）
                                </a>
                                <a href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/摩课云竞赛平台使用协议-单方盖章生效协议5.31.docx" v-if="mechanismType==='企业'" class="tag_content_txt" style="color: #4a90e2;">
                                    <i class="iconfont" style="font-size: 12px;margin-right: 5px" >&#xe610;</i>
                                   摩课云竞赛平台使用协议模板.doc（点我下载）
                </a>-->
              </div>
              <div class="step2">
                <p>
                  <span>2</span> {{$t('SSO.UploadDoc')}}
                </p>

                <upload
                  class="avatar-uploader"
                  accept=".jpg, .png"
                  :showlist="true"
                  :drag="true"
                  :onSuccess="upSuccess1"
                  :onRemove="upRemove1"
                  :fileList="infoUrlList1"
                  :config="config"
                  :limit="10"
                  listType="picture"
                >
                  <div class="avatar">
                    <i class="iconfont" style="font-size:48px;color:#1D86FF;">&#xe614;</i>
                    <p>{{$t('SSO.FileUpload')}}</p>
                  </div>
                </upload>
              </div>
              <div class="step2" v-if="mechanismType==='企业'">
                <p>
                  <span>3</span>{{$t('SSO.OrgLicense')}}
                </p>

                <upload
                  class="avatar-uploader"
                  accept=".jpg, .png"
                  :showlist="true"
                  :drag="true"
                  :onSuccess="upSuccess2"
                  :onRemove="upRemove2"
                  :fileList="infoUrlList2"
                  :config="config"
                  :limit="10"
                  listType="picture"
                >
                  <div class="avatar">
                    <i class="iconfont" style="font-size:48px;color:#1D86FF;">&#xe614;</i>
                    <p>{{$t('SSO.FileUpload')}}</p>
                  </div>
                </upload>
              </div>
              <div class="step2" v-if="mechanismType=='竞赛主办方'?false:mechanismType=='企业'?false:true">
                <p>
                  <span>3</span>{{$t('SSO.ComUnit')}}
                </p>

                <upload
                  class="avatar-uploader"
                  accept=".jpg, .png"
                  :showlist="true"
                  :drag="true"
                  :onSuccess="upSuccess2"
                  :onRemove="upRemove2"
                  :fileList="infoUrlList2"
                  :config="config"
                  :limit="10"
                  listType="picture"
                >
                  <div class="avatar">
                    <i class="iconfont" style="font-size:48px;color:#1D86FF;">&#xe614;</i>
                    <p>{{$t('SSO.FileUpload')}}</p>
                  </div>
                </upload>
              </div>
            </div>
            <!-- 学校注册 -->
            <div id="Agreement1" v-else>
              <a
                href="http://zhsq.moocollege.com/"
                target="_blank"
                style="text-decoration: underline; color: rgb(45, 140, 240);"
              >{{$t('SSO.SchoolAdmin')}}</a>

              <h3>{{$t('SSO.SchoolT')}}</h3>
              <p>{{$t('footer.customerTel')}}：0571-81902943</p>
              <p>{{$t('footer.customerMobile')}}：17357146574</p>
              <p>{{$t('footer.serviceTime')}}：08:30-20:00（{{$t('footer.serviceDay')}}）</p>
            </div>
            <el-checkbox v-model="checked" v-if="mechanismType!=='学校'" style="float:left;">{{$t('SSO.Readed')}}</el-checkbox>
            <Disclaimer v-if="mechanismType!=='学校'" style="float:left;margin-top:-10px;" />
            <!-- <el-button type="primary" v-if="type==2" class="tijiao" @click="submitFormPhone">绑 定</el-button> -->
            <el-button
              type="primary"
              class="tijiao"
              v-if="mechanismType!=='学校'"
              @click="submit('mechanism')"
            >{{$t('SSO.Submit')}}</el-button>
            <div id="Agreement1" v-if="mechanismType!=='学校'">
              <h3>{{$t('SSO.SchoolT')}}</h3>
              <p>{{$t('footer.customerTel')}}：0571-81902943</p>
              <p>{{$t('footer.customerMobile')}}：17357146574</p>
              <p>{{$t('footer.serviceTime')}}：08:30-20:00（{{$t('footer.serviceDay')}}）</p>
            </div>
            <!-- <el-button type="primary"  class="tijiao" @click="submit('mechanism')" v-if="mechanismType!=='学校'">{{$t('SSO.Submit')}}</el-button> -->
          </el-form>
        </div>
        <div class="notice" v-if="!isChrome">
          <div class="mess mess1"></div>
          <div class="mess mess2"></div>
          <span>
            <i class="iconfont">&#xe656;</i>&nbsp;&nbsp;&nbsp;{{$t('SSO.Chrome')}}
          </span>
          <p>{{$t('SSO.OtherChrome')}}</p>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="500px" center>
        <h3>~</h3>
        <p>{{$t('SSO.SchoolT')}}</p>
        <p>{{$t('footer.customerTel')}}：0571-81902943</p>
        <p>{{$t('footer.customerMobile')}}：17357146574</p>
        <p>{{$t('footer.serviceTime')}}：08:30-20:00（{{$t('footer.serviceDay')}}）</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toHome">{{$t('SSO.define')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import network from "@@/api/jxapi";
import Disclaimer from "./disclaimer";
import mock from '@/SSO/mock/country'
import upload from "@@/components/fileUpload/index";

export default {
  props: {
    type:{
      default:'1',
    }
  },
  components: {
    Disclaimer,
    upload
  },
  data() {
    return {
      selectoptions:'',
      centerDialogVisible: false,
      regPage: "personal",
      isSend: false,
      isChrome: true,
      seconds: 0,
      ruleForm: {
        name: "",
        code: "",
        phone: "",
        password: "",
        phonebefore:86
      },
      mechanism: {
        name: "",
        code: "",
        phone: "",
        password: "",
        region: "竞赛主办方",
        phonebefore:86
      },
      rules: {
        phone: [
          { required: true, message: this.$t('SSO.PhoneNum'), trigger: "blur" },
          // { min: 11, max: 11, message: "手机号码格式错误", trigger: "blur" }
        ],
        password: [
          {required: true, message: this.$t('SSO.PassP'), trigger: "change" },
          {pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d$@$!%*#?&]{8,}$/,message:'至少8位字符，同时必须包含字母、数字和特殊字符（!@#$%&*）',trigger:'change'},
        ],
        registerCode: [
          { required: true, message: this.$t('SSO.ImgCode'), trigger: "blur" },
          { min: 4, max: 4, message: "图形验证码为四位字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入手机验证码", trigger: "change" },
          { min: 6, max: 6, message: "验证码错误", trigger: "blur" }
        ],
        name: [
          { required: true, message: this.$t('SSO.RealName'), trigger: "blur" },
          { min: 1, max: 10, message: this.$t('SSO.RealName'), trigger: "blur" }
        ],
        mechanismName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" },
          { min: 1, message: "机构名称不能为空", trigger: "blur" }
        ],
        region: [
          { required: true, message: this.$t('SSO.ORGType'), trigger: "blur" },
          { min: 1, message: this.$t('SSO.ORGType'), trigger: "blur" }
        ]
      },
      checked: false,
      infoUrlList1: [],
      infoUrlList2: [],

      config: {
        fileType: 2
      },
      mechanismType: "竞赛主办方" // 机构类型 2 企业 3 竞赛主办方 4 学校 7 政府
    };
  },
  methods: {
    //跳转到首页
    toHome() {
      this.centerDialogVisible = false;
      this.$router.push("/");
    },
    // 切换个人/机构
    toTab(type) {
      this.regPage = type;
      this.changePic();
      this.changePic1();
      this.seconds = 0;
    },
    changType(value) {
      this.mechanismType = value;
      this.infoUrlList1 = [];
      this.infoUrlList2 = [];
    },
    upSuccess1(res, file, fileList) {
      this.infoUrlList1.push({
        name: file.name,
        url: res.location
      });
    },
    upSuccess2(res, file, fileList) {
      this.infoUrlList2.push({
        name: file.name,
        url: res.location
      });
    },
    upRemove1(res, file, fileList) {
      this.infoUrlList1 = fileList;
    },
    upRemove2(res, file, fileList) {
      this.infoUrlList2 = fileList;
    },
    changePic1() {
      this.$refs.imgYzm1.src =
        "nodeapi/code/get?for=registerCode&q=" + Math.random();
    },
    changePic() {
      this.$refs.imgYzm.src =
        "nodeapi/code/get?for=registerCode&q=" + Math.random();
    },
    async sendSms() {
      if (this.regPage === "mechanism") {
        var phone = this.mechanism.phone;
        var registerCode = this.mechanism.registerCode;
           var phonebefore = this.mechanism.phonebefore
        // const { phone, registerCode,phonebefore} = this.mechanism
      } else {
        var phone = this.ruleForm.phone;
        var registerCode = this.ruleForm.registerCode;
        var phonebefore = this.ruleForm.phonebefore
        // const { phone, registerCode,phonebefore} = this.ruleForm
      }
      if (!phone) {
        return this.$message.warning("请输入手机号码或邮箱");
      }
      if (!registerCode) {
        return this.$message.warning(this.$t('SSO.ImgCode'));
      }
      // var emailCheck = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      // var phoneCheck = new RegExp("^1[3,4,5,6,7,8,9][0-9]{9}$")

      // if(!emailCheck.test(phone) && !phoneCheck.test(phone)){
      // // if (phone.length !== 11) {
      //   return this.$message.warning("请输入正确的手机号码或邮箱");
      // }
      if (this.type == 1) {
        let registerCheck = await network.registerCheck({
          data: { mobile: phone },
          headers: {
            Authorization: "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5"
          }
        });
        if (registerCheck == "error") return;
      }

      let sendSmsCode = await network.sendSmsCodenode({
        data: {
          dialingCode:phonebefore,
          mobile: phone,
          domain: location.hostname,
          code: registerCode
        },
        headers: {
          deviceId: 0,
          Authorization: "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5"
          //'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (sendSmsCode == "error") return;
      this.$message.success("获取验证码成功");
      this.seconds = 119;
      let secTimer = setInterval(() => {
        this.seconds--;
        if (this.seconds == 0) {
          clearInterval(secTimer);
        }
      }, 1000);
    },
    async submit(form) {
      this.$refs[form].validate(async valid => {
        if (!valid) return;
        if (!this.checked) return this.$message.warning("请阅读并接受免责声明");
        if (this.regPage === "personal") {
          const form = new FormData();
          form.append("smsCode", this.ruleForm.code);
          form.append("mobile", this.ruleForm.phone);
          form.append("nickName", this.ruleForm.name);
          form.append("password", this.ruleForm.password);
          form.append("dialingCode", this.ruleForm.phonebefore);
        
          let res = await network.register({
            data: form,
            headers: {
              deviceId: 0,
              Authorization: "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5"
              //'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          if (res == "error") return;

          this.$message.success("注册成功");
          this.$router.push("/login");
        } else {
          const form = new FormData();
          if (this.infoUrlList1.length == 0) {
            this.$message.info("请先上传签字协议");
            return;
          }
          if (this.mechanismType != "竞赛主办方") {
            if (this.infoUrlList2.length == 0) {
              this.$message.info("请先上传证明材料");
              return;
            }
          }

          let type =
            this.mechanismType === "竞赛主办方"
              ? "3"
              : this.mechanismType === "政府单位"
              ? "7"
              : this.mechanismType === "企业"
              ? "2"
              : "4";

          form.append("smsCode", this.mechanism.code);
          form.append("mobile", this.mechanism.phone);
          form.append("groupName", this.mechanism.mechanismName);
          form.append("password", this.mechanism.password);
          form.append("dialingCode", this.mechanism.phonebefore);
          form.append("contractUrl", this.infoUrlList1[0].url);
          if (this.mechanismType != "竞赛主办方") {
            form.append("licenseUrl", this.infoUrlList2[0].url);
          }

          form.append("type", type);

          let res = await network.groupRegister({
            data: form,
            headers: {
              deviceId: 0,
              Authorization: "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5"
              //'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          if (res == "error") return;
          this.$message.success("注册成功");
          this.centerDialogVisible = true;
        }
      });
    },
    submitFormPhone(formName) {
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
    handleCountdownEnd(data) {
      this.isSend = false;
    }
  },
  created() {
    this.selectoptions = mock.coun
    this.regPage = this.$route.query.type || "personal";
    let isChrome = window.navigator.userAgent.indexOf("Chrome");
    if (isChrome == -1) {
      this.isChrome = false;
    } else {
      this.isChrome = true;
    }
  }
};
</script>


<style lang="less" scoped>
::v-deep   .el-select .el-input {
    width: 130px;
  }
.register_body {
  width: 100%;
  // height: 650px;
  padding: 50px 0;
}
.register {
  width: 600px;
  // height: 580px;
  margin: auto;
  background: #ffffff;
  border-radius: 10px;
  .register_title {
    width: 510px;
    height: 104px;
    line-height: 104px;
    border-bottom: 1px solid #dedede;
    margin: auto;
    img {
      width: 210px;
      height: 62px;
      margin-top: 21px;
    }
  }
  .register_content {
    width: 400px;
    margin: auto;
    padding-bottom: 50px;
    h3 {
      margin: 30px 0;
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
    .tijiao {
      width: 100%;
      margin-top: 10px;
      height: 42px;
      font-size: 16px;
    }
    /deep/ .el-form-item {
      // margin-bottom: 25px;
    }
  }
}

/deep/ .footer {
  margin-top: 0;
}
.rTab {
  height: 86px;
  line-height: 86px;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #4a4a4a;
  letter-spacing: 0;
  span {
    cursor: pointer;
  }
  span:nth-child(2) {
    padding: 0 36px;
  }
}
.Selection {
  font-family: PingFang-SC-Bold;
  font-size: 30px;
  color: #4a4a4a;
  letter-spacing: 0;
}
.notice {
  position: relative;
  width: 600px;
  height: 90px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 31px;
  .mess {
    position: absolute;
    top: -20px;
    width: 10px;
    height: 43px;
    background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/home/Line.png) no-repeat;
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
#Agreement1 {
  text-align: left;
  h3 {
    margin-bottom: 10px;
  }
}
.Agreement {
  text-align: left;
  margin-bottom: 20px;
  p {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #4a4a4a;
    letter-spacing: 0;
  }
  .step1 {
    p {
      margin-bottom: 15px;
      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #1d86ff;
        line-height: 22px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .step2 {
    margin-top: 40px;
    p {
      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #1d86ff;
        line-height: 22px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .avatar {
    margin-top: 50px;
  }
}
</style>

