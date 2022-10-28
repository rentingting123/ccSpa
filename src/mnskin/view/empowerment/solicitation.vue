<template>
  <div class="solicitation">
    <div class="main">
      <div style="text-align: left; margin: 10px; margin-bottom: 20px; color: red">
        竞赛征集涉及多项材料上传，请在电脑端完成征集流程
      </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
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
  margin: 0 auto;

  .content {
    display: flex;
    justify-content: center;

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
