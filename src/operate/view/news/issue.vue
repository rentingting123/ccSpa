<template>
  <div id="issue">
    <h1 style="text-align:center;padding:20px;">新闻发布</h1>
    <div>
      <!--中间内容-->
      <div class="issue_main">
        <div class="issue_title">
          <span style="line-height:38px">动态标题：</span>
          <el-input placeholder="请输入标题" style="width:700px;" v-model="stateData.title"></el-input>
        </div>
        <div class="issue_img">
          <span>封面图：&nbsp;&nbsp;&nbsp;</span>
          <upload
            class="avatar-uploader"
            accept=".jpg, .png, .gif"
            name="attach"
            :showlist="false"
            :onSuccess="handleAvatarSuccess"
          >
            <img v-if="stateData.icon" :src="stateData.icon" class="avatar" />
            <i v-if="!stateData.icon" class="el-icon-plus avatar-uploader-icon"></i>
            <span v-if="!stateData.icon" class="layout">
              200kb以下
              <br />jpg/png/gif格式文件
            </span>
          </upload>
        </div>
        <div class="issue_tag">
          <span>动态分类：</span>
          <el-radio-group class="tags" v-model="stateData.tags">
            <el-radio-button class="tag" v-for="city in typesLists" :disabled="!city.status" :label="city.type" :key="city.type">
                {{city.name}}
            </el-radio-button>
          </el-radio-group>
        </div>

        <div class="issue_tag">
          <p>上传新闻：<small>（只可上传pdf文件，展示内容为上传的pdf内容）</small></p>
          <upload
            class="avatar-uploader"
            width='738px'
            accept=".pdf"
            name="attach"
            :showlist="false"
            :onSuccess="pdfSuccess"
            :beforeUpload="beforeAvatarUpload"
            style="margin:0 auto"
          >
            <div v-if="stateData.pdfInfo" class="pdfupload">
              <FileReview  :url='stateData.pdfInfo' />
              <div class="pdfedit">
                <el-button type="primary" >修改</el-button>
                <el-button type="primary" @click.stop.prevent="delPdf">删除</el-button>
              </div>
            </div>
            <div v-else class="clearfix" style="margin:10px 0 10px 20px;">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <span  class="layout">
                40M以下
                <br /> pdf格式文件
              </span>
            </div>
          </upload>
          
        </div>

        <div>
          <p>动态内容:</p>
          <!--富文本编辑器-->
          <editor class="i-text" :setDate="setStateData" :stateData="stateData.news" />
        </div>

        <div class="issue_tag">
          <span>发布时间：</span>
          <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          <el-tooltip placement="top" content="选择当前时间以前将直接发布，选择未来时间则会在指定时间定时发布">
            <i class="el-icon-question" style="margin-right:5px;"></i>
          </el-tooltip>
        </div>

        <div class="header_right" >
          <el-button type="primary" @click="editState">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import network from "@/operate/api";
import editor from "@@/components/editor/index";
import upload from "@@/components/fileUpload/index";
import FileReview from "@@/components/fileReview";
import moment from "moment";
export default {
  name: "issue",
  data() {
    return {
      time: "", // 定时发布时间
      stateData: {
        newsId: "",
        title: "",
        news: "",
        icon: "",
        publishTime: "",
        tags: ""
      },
      typesLists: [],
      loading: false,
      bannerUrl: 'https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg',

    };
  },
  created() {
    this.getTypesLists();

    this.stateData.newsId = this.$route.query.id;
    if (this.stateData.newsId) {
      this.getList();
    }
  },
  components: {
    editor,
    upload,
    FileReview,
  },
  methods: {
    // 获取列表类型
    async getTypesLists(){
        this.loading = true
        let res = await network.selectPlatformNewsType()
        this.loading = false
        if(res=='error') return;
        this.typesLists = res || []
    },
    setStateData(val) {
      this.$set(this.stateData, "news", val);
    },
    // 发布动态
    async editState() {

      if (!this.stateData.title) return this.$message.warning("请输入动态标题");
      if(!this.stateData.news && !this.stateData.pdfInfo){
        return this.$message.warning("请输入动态内容或上传pdf新闻");
      }
      
      if (!this.stateData.tags) return this.$message.warning("请选择动态分类");

      let newsIcon = this.stateData.icon || this.bannerUrl

      //1是发布  0 定时发布
      let publishStatus = !this.time || moment(this.time)<=moment() ? 1 : 0
      this.stateData.publishTime = this.time ? new Date(this.time).getTime() : new Date().getTime();

      let groupIds = []

      let newdata = {
        id: this.stateData.newsId,
        newsTitle: this.stateData.title,
        publishTime: this.stateData.publishTime + "",
        newsInfo: this.stateData.news,
        platformType: this.stateData.tags, //
        newsIcon: newsIcon,
        competitionId: this.competitionId,
        publishStatus: publishStatus,
        groupIds: groupIds,
        pdfInfo: this.stateData.pdfInfo || '',
      };
      this.loading = true
      let setNews = await network.savePlatformNews({ data: newdata });
      this.loading = false
      if (setNews == "error") return;
      this.$message.success("发布成功");
      this.$router.push('/news');
    },
    handleAvatarSuccess(res) {
      this.stateData.icon = res.location;
    },
    pdfSuccess(res){
      this.$set(this.stateData, 'pdfInfo', null)
      this.$nextTick(()=>{
        this.$set(this.stateData, 'pdfInfo', res.location)
      })
    },
    delPdf(e){
      this.$set(this.stateData, 'pdfInfo', null)
    },
    beforeAvatarUpload(file) {
      const isLt = file.size / 1024 / 1024 < 40;

      if (!isLt) {
          this.$message.error("上传pdf大小不能超过 40M");
      }
      return isLt;
    },

    async getList() {
        let res = await network.getNewsDetails({data: {
            id: this.stateData.newsId,
            platformType: true,
        }});
      if (res == "error") return;
      this.stateData = {
        newsId: res.id,
        title: res.newsTitle,
        news: res.newsInfo,
        icon: res.newsIcon,
        publishTime: res.publishTime,
        tags: res.platformType,
        pdfInfo: res.pdfInfo
      };
      this.time = parseInt(res.publishTime);
    }
  },
  
};
</script>


<style lang="less" scoped>
#issue {
  text-align: start;
  background: #fff;

  .header_fixed {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    background: #fdf6d0;
    position: sticky;
    top: 0px;
    z-index: 2;
    text-align: start;
    .header_content {
      width: 800px;
      margin: auto;
      cursor: pointer;
    }
  }
  .issue_main {
    padding-bottom: 100px;
    width: 800px;
    margin: 100px auto 0;
    text-align: start;
    .issue_title {
      margin-bottom: 30px;
      display: flex;
    }
    .issue_img {
      margin-bottom: 30px;
      display: flex;
    }
    .issue_tag {
      .tags {
        margin: 30px 0;
        .tag {
          margin: 10px;
          .el-radio-button__inner {
            border-radius: 30px !important;
          }
        }
      }
    }
    .header_right {
      margin: 30px 0;
    }
    .avatar-uploader .el-upload {
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      background: #f0f2f4;
      border-radius: 5px;
      float: left;
    }
    .avatar {
      width: 178px;
      height: 120px;
      display: inline-block;
      float: left;
    }
    .layout {
      font-size: 12px;
      color: #9b9b9b;
      text-align: start;
      float: left;
      margin-top: 80px;
      margin-left: 10px;
    }
  }

  /deep/.el-radio{
    display: block;
    margin-top: 17px;
  }
  .pdfupload{
    position: relative;
    margin: 10px 0;
    &:hover{
      .pdfedit{
        display: flex;
      }
    }
    .pdfedit{
      width: 100%;
      height: calc(100% - 50px);
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: flex-start;
      padding-top: 50px;
    }

  }
}
</style>

<style lang="less">
.issue_tag {
  .el-radio-button__inner {
    border-radius: 30px !important;
  }
}
.issue_tag {
  .el-radio-button .el-radio-button__inner {
    border: 1px solid #dcdfe6;
  }
  .el-radio-button.is-checked .el-radio-button__inner {
    border: 1px solid #409eff;
  }
}
.i-text {
  .ql-container.ql-snow {
    background-color: #fff;
    min-height: 300px;
  }
}
</style>
