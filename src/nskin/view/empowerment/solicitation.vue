<template>
  <div class="solicitation">
    <div class="main">
      <breadcrumb
        title1="竞赛赋能"
        title2="竞赛征集"
        path="/empowerment"
        style="padding-top: 17px"
      />
      <div class="content">
        <div class="left">
          <div class="title1">操作步骤说明</div>
          <div class="title2">1. 填写申请信息</div>
          <p class="text1">
            本页面即申请信息页面，请按要求填写竞赛基本信息，并上传相关签字盖章的使用协议、项目申报书、各年度报名及获奖数据表格。
          </p>
          <div class="title2">2. 审核竞赛信息并开通账号</div>
          <p class="text1 mb">
            申请信息提交成功后，将在3个工作日内审核并向竞赛主办方开通帐号。
          </p>
          <p class="text1">账号登录请点击【主办方入口】</p>
          <img src="@/nskin/assets/img/img1.png" alt="" />
          <div class="title2">3. 填写竞赛信息并导入竞赛数据</div>
          <p class="text1 mb">账号登录成功，请点击【竞赛管理】-【竞赛列表】创建竞赛；</p>
          <p class="text1">再点击【数据服务】-【数据管理】填写竞赛信息并导入竞赛数据</p>

          <div class="title2">参考文档</div>
          <a
            href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/%E5%85%B3%E4%BA%8E%E5%BE%81%E9%9B%86%E9%AB%98%E6%A0%A1%E5%AD%A6%E7%A7%91%E7%AB%9E%E8%B5%9B%E5%92%8C%E6%95%99%E5%B8%88%E6%95%99%E5%AD%A6%E7%AB%9E%E8%B5%9B%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%80%9A%E7%9F%A50929.PDF"
            target="_blank"
            class="link"
            >关于征集高校大学生竞赛和教师教学竞赛项目的通知（点击下载）</a
          >
        </div>
        <div class="middle">
          <div class="title1">填写申请信息</div>
          <div class="register_content">
            <el-form
              :model="formData"
              :rules="rules"
              ref="formData"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item label=" " prop="groupName">
                <el-input
                  v-model="formData.groupName"
                  placeholder="请输入竞赛名称"
                  size="medium"
                >
                </el-input>
              </el-form-item>
              <el-form-item label=" " prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入联系手机号码"
                  size="medium"
                >
                </el-input>
              </el-form-item>
              <el-form-item label=" " prop="code">
                <div class="code">
                  <el-input
                    v-model="formData.code"
                    placeholder="请输入收到的短信验证码"
                    size="medium"
                    @blur="checkMobileFun"
                  >
                  </el-input>
                  <div @click="sendSms" v-if="seconds == 0" class="codeBtn">
                    获取验证码
                  </div>
                  <span v-else class="codeBtnTime">{{ seconds }}S</span>
                </div>
              </el-form-item>
              <el-form-item label=" " prop="email">
                <el-input v-model="formData.email" placeholder="请输入邮箱" size="medium">
                </el-input>
              </el-form-item>
              <div class="agreement">
                <div>
                  <p :class="disabled ? 'titleD' : 'title'">摩课云竞赛服务平台使用协议</p>
                  <a v-if="disabled" class="linkD">
                    摩课云竞赛服务平台使用协议模板.doc（点击下载）
                  </a>
                  <a
                    v-else
                    :href="'https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/摩课云竞赛平台使用协议-单方盖章生效协议5.31.docx'"
                    class="link"
                  >
                    摩课云竞赛服务平台使用协议模板.doc（点击下载）
                  </a>
                  <upload
                    :disabled="disabled"
                    width="600px"
                    accept=".jpg, .png,.pdf"
                    :showlist="true"
                    :onSuccess="upSuccess1"
                    :onRemove="upRemove1"
                    :fileList="formData.contractUrlList"
                    :config="config"
                    :limit="10"
                    listType="text"
                  >
                    <div class="uploadBox">
                      <el-button :disabled="disabled" size="small"
                        ><i class="el-icon-upload2"></i>上传签字盖章协议</el-button
                      >
                      <div :class="disabled ? 'tipsD' : 'tips'">
                        支持png、jpg、pdf格式
                      </div>
                    </div>
                  </upload>
                </div>
                <div class="step2">
                  <p :class="disabled ? 'titleD' : 'title'">竞赛项目申报书</p>
                  <a v-if="disabled" class="linkD"> 竞赛项目申报书(点击下载) </a>
                  <a
                    v-else
                    href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/%E7%AB%9E%E8%B5%9B%E9%A1%B9%E7%9B%AE%E7%94%B3%E6%8A%A5%E4%B9%A6.docx"
                    target="_blank"
                    class="link"
                  >
                    竞赛项目申报书(点击下载)
                  </a>
                  <upload
                    :disabled="disabled"
                    accept=".jpg, .png,.pdf,.doc,.docx"
                    :showlist="true"
                    width="600px"
                    :onSuccess="upSuccess2"
                    :onRemove="upRemove2"
                    :fileList="formData.declareUrlList"
                    :limit="10"
                    listType="text"
                  >
                    <div class="uploadBox">
                      <el-button :disabled="disabled" size="small"
                        ><i class="el-icon-upload2"></i>上传<b>盖章扫描件</b>及<b
                          >申报书文档</b
                        >
                      </el-button>
                      <div :class="disabled ? 'tipsD' : 'tips'">
                        支持png、jpg、pdf、doc、docx格式
                      </div>
                    </div>
                  </upload>
                </div>
                <div class="step2">
                  <p :class="disabled ? 'titleD' : 'title'">获奖文件</p>
                  <!-- <a v-if="disabled" class="linkD"> 竞赛报名数据模板(点击下载) </a> -->
                  <!-- <a v-else
										href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/%E7%AB%9E%E8%B5%9B%E6%8A%A5%E5%90%8D%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF.xlsx"
										target="_blank" class="link">
										竞赛报名数据模板(点击下载)
									</a>
									<a v-if="disabled" class="linkD"> 竞赛获奖数据模板(点击下载) </a>
									<a v-else
										href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/%E7%AB%9E%E8%B5%9B%E8%8E%B7%E5%A5%96%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF.xlsx"
										target="_blank" class="link">
										竞赛获奖数据模板(点击下载)
									</a> -->
                  <upload
                    :disabled="disabled"
                    :showlist="true"
                    width="600px"
                    :onSuccess="upSuccess3"
                    :onRemove="upRemove3"
                    :fileList="formData.licenseUrlList"
                    :config="config"
                    :limit="10"
                  >
                    <div class="uploadBox">
                      <el-button :disabled="disabled" size="small"
                        ><i class="el-icon-upload2"></i
                        >上传数据文件，可传多个（以竞赛名+年份命名文件）</el-button
                      >
                    </div>
                    <div :class="disabled ? 'tipsD1' : 'tips1'">
                      支持pdf、word、.xls、xlsx格式
                    </div>
                  </upload>
                </div>
              </div>
              <div class="readBox">
                <el-checkbox v-model="checked">我已认真阅读并接受</el-checkbox>
                <Disclaimer style="margin-top: -10px" />
              </div>
              <div class="tijiao" @click="submit('formData')">确定提交</div>
              <div class="contact">
                <el-popover placement="top-start" title="" width="172" trigger="hover">
                  <div class="codeBox">
                    <h3 class="title">申请过程中如有疑问请扫码联系我们</h3>
                    <img src="@/nskin/assets/img/qrcode.png" width="148px" />
                  </div>
                  <img slot="reference" src="@/nskin/assets/img/question.png" alt="" />
                </el-popover>
              </div>
            </el-form>
          </div>
        </div>
        <div class="right">
          <img src="@/nskin/assets/img/process.png" style="width: 100%" alt="" />
        </div>
      </div>
    </div>
    <el-dialog :visible="dialogVisible" width="600px" :show-close="false">
      <div class="dialog">
        <img src="@/nskin/assets/img/ok.png" width="70px" />
        <div class="textOk1">成功提交申请！</div>
        <div class="textOk2">我们将在3个工作日内与您确认审核结果</div>
        <div class="okBtn" @click="resultOk()">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from "@/nskin/components/breadcrumb";
import Disclaimer from "@/nskin/view/assessment/common/disclaimer";
import upload from "@@/components/fileUpload/index";
import network from "@/api/index";
export default {
  components: {
    breadcrumb,
    Disclaimer,
    upload,
  },
  data() {
    return {
      disabled: true, // 是否禁用
      dialogVisible: false,
      isSend: false,
      seconds: 0,
      formData: {
        groupName: "",
        mobile: "",
        email: "",
        code: "",
        contractUrlList: [], // 摩课云竞赛服务平台使用协议
        licenseUrlList: [], //  各年度报名及获奖数据
        declareUrlList: [], // 竞赛项目申报书
      },
      rules: {
        groupName: [{ required: true, message: "请输入竞赛名称", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码格式错误", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { min: 1, message: "邮箱不能为空", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入手机验证码", trigger: "onChange" }],
      },
      checked: false,
      config: {
        fileType: 2,
      },
    };
  },
  mounted() {},
  created() {},
  methods: {
    upSuccess1(res, file, fileList) {
      this.formData.contractUrlList.push({
        name: file.name,
        info: res.location,
      });
      this.logInsertFun(file.name, res.location);
    },
    upSuccess2(res, file, fileList) {
      this.formData.declareUrlList.push({
        name: file.name,
        info: res.location,
      });
      this.logInsertFun(file.name, res.location);
    },
    upSuccess3(res, file, fileList) {
      this.formData.licenseUrlList.push({
        name: file.name,
        info: res.location,
      });
      this.logInsertFun(file.name, res.location);
    },
    upRemove1(res, file, fileList) {
      this.formData.contractUrlList = fileList;
      this.logDeleteFun(res.info);
    },
    upRemove2(res, file, fileList) {
      this.formData.declareUrlList = fileList;
      this.logDeleteFun(res.info);
    },
    upRemove3(res, file, fileList) {
      this.formData.licenseUrlList = fileList;
      this.logDeleteFun(res.info);
    },
    async logInsertFun(fileName, fileOssUrl) {
      let res = await network.logInsert({
        data: {
          mobile: this.formData.mobile,
          fileName,
          fileOssUrl,
        },
      });
      if (res == "error") return;
    },
    async logDeleteFun(fileOssUrl) {
      let res = await network.logDelete({
        data: {
          fileOssUrl,
        },
      });
      if (res == "error") return;
    },
    async checkMobileFun() {
      var mobile = this.formData.mobile;
      if (!mobile) {
        this.$message.warning("请输入手机号码");
        return;
      }
      if (mobile.length !== 11) {
        this.$message.warning("请输入正确的手机号码");
        return;
      }
      if (this.formData.code) {
        let checkMobile = await network.checkMobile({
          data: {
            mobile: mobile,
            code: this.formData.code,
          },
        });
        if (checkMobile == "error") return;
        if (checkMobile) {
          this.formData.key = checkMobile;
          this.disabled = false;
        } else {
          this.formData.key = "";
          this.disabled = true;
        }
      }
    },
    async sendSms() {
      var mobile = this.formData.mobile;
      if (!mobile) {
        this.$message.warning("请输入手机号码");
        return;
      }
      if (mobile.length !== 11) {
        this.$message.warning("请输入正确的手机号码");
        return;
      }
      let registerCheck = await network.checkApply({ data: { mobile: mobile } });
      if (registerCheck == "error") return;

      let sendSmsCode = await network.codeSms({
        data: {
          mobile: mobile,
        },
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
      this.$refs[form].validate(async (valid) => {
        if (!valid) return;
        const form = new FormData();
        if (this.formData.contractUrlList.length == 0) {
          this.$message.info("请先上传签字协议");
          return;
        }
        if (this.formData.declareUrlList.length == 0) {
          this.$message.info("请先上传申报书");
          return;
        }
        if (this.formData.licenseUrlList.length == 0) {
          this.$message.info("请先上传或获奖数据");
          return;
        }
        if (!this.checked) return this.$message.warning("请阅读并接受免责声明");
        let obj = {
          ...this.formData,
          type: 3,
        };
        let res = await network.capacityApplyNew({
          data: obj,
          headers: {
            deviceId: 0,
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
        if (res == "error") return;
        this.dialogVisible = true;
      });
    },
    resultOk() {
      this.dialogVisible = false;
      this.$router.push("/empowerment");
      // this.$refs['formData'].resetFields();
      // this.formData.contractUrlList = []// 摩课云竞赛服务平台使用协议
      // this.formData.licenseUrlList = []// 各年度报名及获奖数据
      // this.formData.declareUrlList = []// 竞赛项目申报书
    },
  },
};
</script>

<style lang="less" scoped>
.solicitation {
  background: rgba(155, 155, 155, 0.05);
  padding-top: 26px;
  padding-bottom: 35px;
  min-height: calc(100vh - 332px);
}

.main {
  width: 1200px;
  margin: 0 auto;

  .content {
    display: flex;
    justify-content: space-between;

    .title1 {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #333333;
      line-height: 27px;
    }

    .left {
      width: 307px;
      height: 700px;
      background: #ffffff;
      text-align: left;
      padding: 16px;
      box-sizing: border-box;

      .title2 {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #d60d16;
        line-height: 24px;
        margin-top: 26px;
      }

      .text1 {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
      }

      .link {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #0091ff;
        line-height: 24px;
      }

      .mb {
        margin-bottom: 26px;
      }
    }

    .middle {
      width: 532px;
      background: #ffffff;
      padding: 16px;
      box-sizing: border-box;
      text-align: left;
      position: relative;
    }
    .right {
      width: 329px;
      background: #ffffff;
      padding: 16px;
      box-sizing: border-box;
      text-align: left;
      position: relative;
    }
  }
}

.code {
  display: flex;
  align-items: center;
  width: 475px;
}

.contact {
  position: absolute;
  right: 48px;
  bottom: 48px;
}

.codeBox {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    width: 126px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 20px;
    text-align: center;
    margin: 13px auto 0;
  }
}

.codeBtn {
  width: 120px;
  background: #ffffff;
  border: 1px solid #dedede;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #d60d16;
  margin-left: 16px;
  line-height: 36px;
  letter-spacing: 1px;
  text-align: center;
  cursor: pointer;
}

.codeBtnTime {
  width: 120px;
  background: #ffffff;
  border: 1px solid #dedede;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #999999;
  margin-left: 16px;
  line-height: 36px;
  letter-spacing: 1px;
  text-align: center;
  cursor: pointer;
}

.tag_content_txt {
  color: #0091ff;
}

.register_content {
  margin-top: 24px;
}

.demo-ruleForm .el-input {
  width: 475px;
}

#contact {
  text-align: left;

  h3 {
    margin-bottom: 10px;
  }
}

.agreement {
  text-align: left;

  .title {
    margin-top: 48px;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    line-height: 27px;
  }

  .titleD {
    margin-top: 48px;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #999999;
    line-height: 27px;
  }

  .link {
    display: inline-block;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #0091ff;
    line-height: 21px;
    margin-bottom: 15px;
    margin-right: 24px;
  }

  .linkD {
    display: inline-block;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #999999;
    line-height: 21px;
    margin-bottom: 15px;
    margin-right: 24px;
  }
}
.tips1 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  text-align: left;
  margin-top: 8px;
}

.tipsD1 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
  text-align: left;
  margin-top: 8px;
}

.uploadBox {
  display: flex;
  align-items: center;

  .tips {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    margin-left: 16px;
  }

  .tipsD {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
    margin-left: 16px;
  }
}

.readBox {
  text-align: center;
  margin-top: 46px;
}

.tijiao {
  width: 180px;
  height: 36px;
  line-height: 36px;
  background: #d60d16;
  font-size: 14px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
  margin: 16px auto 71px;
  text-align: center;
  cursor: pointer;
}

.dialog {
  .textOk1 {
    height: 23px;
    font-size: 23px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #333333;
    line-height: 35px;
    margin-top: 24px;
  }

  .textOk2 {
    height: 18px;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #333333;
    line-height: 27px;
    margin-top: 24px;
  }

  .okBtn {
    width: 180px;
    height: 36px;
    background: #d60d16;
    font-size: 14px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #ffffff;
    line-height: 36px;
    letter-spacing: 1px;
    text-align: center;
    margin: 24px auto 60px;
    cursor: pointer;
  }
}
</style>
<style>
.demo-ruleForm .el-input .el-input__inner {
  border-radius: 0;
}
</style>
