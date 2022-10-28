<template>
  <div class="msg_edit" >
      <div class="head">
      <el-upload
        :show-file-list="false"
        :before-upload='beforeUpload'
        accept='.jpg, .png, .jpeg'
        :http-request='OssUpload'
        action='/'>
        <div style="width:110px;height:110px;margin:0 auto;" @click="toggleShow">
          <img v-if="userMessage.icon" :src="userMessage.icon" class="head_img"/>
          <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" class="head_img"/>
        </div>
      </el-upload>
    </div>
    <p class="head_px">180x180像素以上</p>
    <el-form :model="userMessage" ref="userMessage">
      <el-form-item
        prop="idcardName"
        label="真实姓名"
        label-width="5rem"
        :rules="[
                            { required: true, message: '请输入真实姓名', trigger: 'blur' },
                            { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                        ]"
      >
        <el-input placeholder="请输入姓名" v-model="userMessage.idcardName"></el-input>
      </el-form-item>

      <el-form-item
        prop="gender"
        label="性别"
        label-width="5rem"
        :rules="[
                            { required: true, message: '性别为必选项', trigger: 'blur' },
                        ]"
      >
        <el-radio-group v-model="userMessage.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item
        prop="school"
        label="学校"
        label-width="5rem"
        :rules="[
                            { required: true, message: '请查找学校', trigger: 'blur' },
                        ]"
      >
        <el-select
          filterable
          v-model="userMessage.school"
          reserve-keyword
          remote
          :remote-method="remoteMethod"
          :loading="loading"
          placeholder="请查找学校"
        >
          <el-option
            v-for="item in schoolList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="academy"
        label="院系"
        label-width="5rem"
        :rules="[
                            { required: true, message: '请输入院系' },
                        ]"
      >
        <el-input placeholder="请输入院系" v-model="userMessage.academy"></el-input>
      </el-form-item>
      <el-form-item
        prop="business"
        label="职称"
        label-width="5rem"
        :rules="[
                            { required: true, message: '请输入职称'},
                        ]"
      >
        <el-input placeholder="请输入职称" v-model="userMessage.business"></el-input>
      </el-form-item>
      
      <el-form-item
        prop="major"
        label="专业"
        label-width="5rem"
        :rules="[
                            { required: true, message: '请输入专业' },
                        ]"
      >
        <el-input placeholder="请输入专业" v-model="userMessage.major"></el-input>
      </el-form-item>
      

      

      <el-form-item
        prop="email"
        label="邮箱"
        label-width="5rem"
        :rules="[       { required: true, message: '请输入邮箱', trigger: 'blur'},
                            { max: 50, message: '邮箱长度不能超过50字符', trigger: 'blur' }
                        ]"
      >
        <el-input placeholder="请输入邮箱" v-model="userMessage.email"></el-input>
      </el-form-item>
      

      <el-form-item>
        <el-button
          type="primary"
          style="width:6rem;font-size:0.8rem;margin-left:5rem"
          @click="submitForm('userMessage')"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "shezhi",
  props: {
    //msg_edit_show: Boolean
  },
  data() {
    return {
      edit:{
        show:true,
        width:180,
        height:180
      },
      heardShow:false,
      needTax: false,
      uuidCode: "", //uuid唯一的状态码
      headers: {
        Authorization: "Bearer " + localStorage.getItem("login")
      },
      schoolList: [],
      gradeList: [],
      headImg: "https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png", // 头像
      userMessage: {
        nickname: "", // 真实姓名
        icon: "https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png", // 头像
        gender: "", // 性别 123
        signature: "", // 签名
        idcardNumber: "", // 身份证号码
        idcardName: "", // 姓名(真实姓名，身份证上的）
        school: "", // 学校
        academy: "", // 院系
        degree: "", // 学历
        major: "", // 专业
        studentId: "", // 学号
        teacherId: "", //教师编号
        grade: "", // 年级
        business: "", // 职务
        read: false,
        taxId: "", //税号,
        taxTitle: "", //发票抬头,
        isteacher: "1"
      }, // 手机号注册表单
      phoneBindForm: { mobile: "", smsCode: "" }, // 手机号绑定表单
      educations: [], // 学历
      seconds: 0, // 获取验证码倒计时
      // msg_edit_show: false, // 个人信息修改

      phone_edit_show: false, // 手机号修改
      account_edit_show: false, // 绑定账号修改
      mName: "", //个人信息处的姓名
      contactPhone: "", //手机号码
      isWechat: 0, //是否绑定过微信
      wechatActive: false, //绑定微信的弹出框
      loading: false
    };
  },
  created() {
    this.setGradeList();
    //获取个人信息
    this.getlocalUserInfo();

  },

  methods: {
        OssUpload(_file){
        let file = _file.file
        OSS.upload(file,(res,ret)=>{
           this.$set(this.userMessage, 'icon', ret.location)
        })
    },
    beforeUpload(file){
      const isLt2M = file.size / 1024  < 30;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 30k!');
      }
      return isLt2M;
    },
    toggleShow() {
      this.heardShow = !this.heardShow;
    },
    iconImg(data){
      this.heardShow = !data.show
      this.userMessage.icon = data.url
    },
    setGradeList() {
      let year = new Date().getFullYear();
      let grade = [];
      for (let i = 0; i < 9; i++) {
        let value = year - i + "年";
        grade.push({
          value: value,
          label: value
        });
      }
      this.gradeList = grade;
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
      this.mName = result.idcardName;
      this.contactPhone = result.contactPhone;
      this.userMessage = result;
      this.userMessage.isteacher = (result.isteacher || "1") + '';
      this.userMessage.icon = result.icon;
      this.isWechat = result.isWechat;
      this.needTax = !!result.taxId;
    },
    async querySchool(param) {
      this.loading = false;
      param.limit = 10;
      // const data = await network.school({ data: param });
      this.$api.get('/web/ranking/school',param).then(reset => {
        
        if (reset == "error") return;
        if (!reset) {
          this.schoolList = [];
          return;
        }
        this.schoolList = reset.data.map(r => {
          return { value: r.schoolcolName, label: r.schoolcolName };
        });
      })
      
    },
    // 上传成功
    handleSuccess(res, file) {
      // console.log("res", res.data);
      // console.log(res.response.data);
      // this.userMessage.icon = res.data;
    },
    // 返回错误
    backError() {
      this.$message.error("上传失败！请检查格式是否正确~");
    },
    submitForm(formName) {
      let user = this.$webapi.getlocal("userInfo");
      if(!user || user.type==3 || user.type==4){
        return this.$message('您暂不支持修改！！')
      }
      
      this.$refs[formName].validate(async (valid, obj) => {
        if (valid) {
          this.userMessage.idcardName = this.userMessage.idcardName.trim()

          if(!this.userMessage.idcardName) return this.$message.error('请输入真实姓名');
          //将学历转化为对应的序号
          if (this.userMessage.isteacher == 1) this.userMessage.studentId = "";
          else this.userMessage.teacherId = "";
          let a = "";
          a = this.statusFormat(this.userMessage.degree);
          this.userMessage.degree = a;
          this.$api.post('/usercenter/user',this.userMessage).then(reset => {
            if (reset == "error") return //this.$message.error("修改失败");
            this.$api.get('/usercenter/user').then(res => {
              if (res == "error")
                return this.$message("设置成功，获取用户信息失败！");
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$message.success("个人信息保存成功");
            })
          })
          // const list = await network.setUserInfo({ data: this.userMessage });
          
        } else {
          for (var o in obj) {
            return this.$message.error(obj[o][0].message);
          }
          return false;
        }
      });
    },
    statusFormat(val) {
      switch (val) {
        case "小学":
          return 1;
        case "初中":
          return 2;
        case "高中":
          return 3;
        case "中职":
          return 4;
        case "高职高专":
          return 5;
        case "本科":
          return 6;
        case "硕士":
          return 7;
        case "博士":
          return 8;
        default:
          return val;
      }
    },
    
    remoteMethod(q) {
      if (q !== "") {
        this.loading = true;
        this.querySchool({ q });
      } else {
        this.schoolList = [];
      }
    }
  },
  mounted() {
    //this.msg_edit_show = !!this.$route.query.msg_edit_show;
  }
};
</script>


<style lang="less" scoped>

 .msg_edit {
      border-top: 1px solid #dedede;
      // margin-top:0.7rem;
      padding: 0 50px;
      font-size: 0.8rem;
      .head {
        text-align: center;
        padding-top: 1rem;
        position: relative;
        > div:nth-child(2) {
          width: 6.9rem;
          height: 6.9rem;
          margin: 0 auto;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          .hide_input {
            width: 6.1rem;
            height: 1.8rem;
            position: absolute;
            z-index: 2;
            left: 50%;
            margin-left: -3.05rem;
            bottom: 0;
            cursor: pointer;
            opacity: 0;
            .el-upload {
              width: 100%;
              height: 100%;
            }
          }
          &:hover {
            .change_head_bg {
              bottom: 0;
              transition: all 0.3s linear;
            }
          }
        }
        .head_img {
          width: 6.9rem;
          height: 6.9rem;
          cursor: pointer;
        }
        .change_head_bg {
          width: 6.1rem;
          height: 1.8rem;
          position: absolute;
          left: 50%;
          margin-left: -3.05rem;
          bottom: -1.8rem;
          cursor: pointer;
        }
      }
      .head_px {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 2rem;
      }
      .change_head {
        text-align: center;
        color: #fff;
        margin-top: -2rem;
      }
      label {
        text-align: right;
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
.shezhi {
  font-size: 16px;
  color: #4a4a4a;
  // 个人信息
  .user_msg {
    border: 1px solid #dedede;
    padding: 0 1rem;
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
</style>
