<template>
  <div class="aside-mark" :style="{height:muneheight}">
    <Form
      ref="formValidate"
      :model="formValidate"
      label-position="left"
      :label-width="142"
      style="text-align:left;"
    >
      <Row>
        <Col :span="12" class="mb" v-if="pattern==1">
          <Select v-model="attachId" filterable>
            <Option
              :value="item.attachId"
              v-for="(item,index) of PermPatternData"
              :key="index"
              @click.native="changeAttach(item)"
            >{{item.attachName}}</Option>
          </Select>
        </Col>
        <Col :span="20" :offset="2" class="mb" v-if="pattern==1">
          <p class="info-show" v-if="!remarkInfo" @click="tabShow">
            显示评分说明
            <span>>></span>
          </p>
          <p class="info-show" v-else @click="tabShow">
            隐藏评分说明
            <span>&lt;&lt;</span>
          </p>
        </Col>
        <Col :span="20" :offset="2" class="mb" v-if="pattern!=1">
          <p class="info-show" v-if="!remarkInfo" @click="tabShow">
            显示评分说明
            <span>>></span>
          </p>
          <p class="info-show" v-else @click="tabShow">
            隐藏评分说明
            <span>&lt;&lt;</span>
          </p>
        </Col>
        <Col :span="22" class="mb" style="margin-bottom:30px;" v-if="remarkInfo">
          <p style="font-size: 16px;color: #4A4A4A;margin-bottom:12px;">评分限制</p>
          <i-table border maxHeight="200" :columns="columns1" :data="limits"></i-table>
        </Col>
        <div class v-for="(item,index) of reviewScores" :key="index">
          <Col :span="22">
            <FormItem :label="item.title+'('+item.weight+'%)'">
              <el-slider v-model="item.score"></el-slider>
              <Input
                v-model="item.score"
                style="text-align:center;width:120px;"
                @input="numInput(index,item.score)"
              >
                <span slot="prepend" @click="minusNum(index,item.weight)">
                  <Icon type="ios-remove" />
                </span>
                <span slot="append" @click="addNum(index,item.weight)">
                  <Icon type="ios-add" />
                </span>
              </Input>
            </FormItem>
          </Col>
          <Col :span="22" class="mb">
            <Button
              shape="circle"
              style="padding:5px 15px;margin-right:12px;margin-bottom:10px;"
              :class="{'back':item.score==cell.score}"
              @click="clickOptions(index,cell,item.weight,i)"
              v-for="(cell,i) of item.options"
              :key="index+'-'+i"
            >{{cell.lever}}</Button>
          </Col>
          <Col :span="22" class="mb" v-if="remarkInfo">
            <p
              style="background-color:#F9F9F9;padding:10px 15px;font-size:14px;white-space:pre-line"
              v-html="item.info"
            ></p>
          </Col>
        </div>
        <div class="page-divider page-divider-horizontalMark"></div>
        <Col :span="22">
          <FormItem label="总得分" class="totalNum" prop="school">
            <p style="text-align:right;font-size:16px;">{{totalNum}}</p>
          </FormItem>
        </Col>
        <Col :span="22">
          <div class style="background:#F9F9F9;padding: 10px">
            <Card :bordered="false">
              <p slot="title">点评</p>
              <div class="mb">
                <Select v-model="valueRem" clearable filterable placeholder="请选择预设点评">
                  <Option
                    :value="item.context"
                    v-for="(item,index) of comments"
                    :key="index"
                    @click.native="getremarkValue(item.context)"
                  >{{item.context}}</Option>
                </Select>
              </div>
              <div class="mb">
                <Input
                  v-model="remarkValue"
                  type="textarea"
                  :autosize="{minRows: 5,maxRows: 8}"
                  placeholder="请加载预设点评,也可以手动输入"
                ></Input>
              </div>
            </Card>
          </div>
        </Col>
        <Col :span="22">
          <div class>
            <Button
              type="primary"
              v-if="!showButton"
              @click="handleSubmit"
              style="margin-left: 15px;margin-top:10px;"
              :loading="isUploadloading"
              :disabled="isUpload"
            >保存</Button>
            <Button
              type="dashed"
              v-if="!showButton"
              @click="handleReset"
              style="margin-left: 15px;margin-top:10px;"
              :loading="isUploadloading"
              :disabled="isUpload"
            >重置</Button>
            <!-- 违规按钮 -->
            <violation
              v-if="!showButton"
              :close="getShowButton"
              :reviewScores="reviewScores"
              :remarkValue="remarkValue"
              :disabled="isUpload"
              :attachId="attachId"
              :rowId='rowId'
              :competitionId='competitionId'
              :pattern='pattern'
            />
          </div>
        </Col>
        <Col :span="22" style="text-align:center;font-size:18px;margin-top:15px;">
          <div style="overflow:hidden;">
            <p style="float:left;color:#2E83EA;cursor:pointer;" @click="pagePre">上一页</p>
            <p style="float:right;color:#2E83EA;cursor:pointer;" @click="pageNext">下一页</p>
          </div>
        </Col>
      </Row>
    </Form>
    <div>
      <el-dialog :modal-append-to-body="false" title="评分成功" :visible.sync="dialogVisible">
        <div class="dialogCont">
          <div class="top">
            <div>
              <span>当前作品评分</span>
              <span>{{totalNum}}</span>分
            </div>
            <div>
              <span>需评审作品</span>
              <p>
                共
                <span>{{scoreObj.allReviewNum}}</span>个
              </p>
            </div>
            <div>
              <span>已评</span>
              <p>
                <span>{{scoreObj.reviewedNum}}</span>个
              </p>
            </div>
            <div>
              <span>未评</span>
              <p>
                <span>{{scoreObj.allReviewNum-scoreObj.reviewedNum}}</span>个
              </p>
            </div>
          </div>
          <div class="bottm">
            <i-table height="200" border :columns="columns1" :data="limits"></i-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">确 定</el-button>
          <el-button type="primary" @click="pageNext">下一个</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import violation from "./violation";
export default {
  name: "SideMenu",
  props: ["importData", "importData2", 'patternData','remarkMustFillIn'],
  components: {
    violation,
  },
  inject: ["reload"],
  data() {
    return {
      showButton: false, //是否点击违规，默认未点击
      selIndex: "",
      dialogVisible: false,
      columns1: [
        {
          title: "评分限制",
          key: "rang",
          align: "center",
        },
        {
          title: "最少次数",
          key: "minNum",
          align: "center",
        },
        {
          title: "最多次数",
          key: "maxNum",
          align: "center",
        },
        {
          title: "已评次数",
          key: "num",
          className: "demo-table-info-column",
          align: "center",
        },
      ],
      limits: [],
      reviewNotNum: "",
      scoreObj: {},
      muneheight: "0px",
      formValidate: {},
      attachId: "",
      // 评分
      numValue: 10,
      numValue0: 10,
      numValue1: 10,
      numValue3: 10,
      // 点评
      remarkValue: "",
      pattern: 0, //评审类型
      PermPatternData: [], //允许评审数据
      reviewScores: [], //评分项
      reviewComments: [], //点评模板
      totalNum: 20,
      comments: [], //点评模板
      valueRem: "",
      remarkInfo: true,
      pageNumber: this.$route.query.page, //作品上一个下一个
      totalNumber: this.$route.query.total, //总数
      isList: false, //是否请求list()
      isUpload: false, //是否允许评审
      isUploadloading: false,
      rowId: '',
      competitionId: '',
      groupSort: null, //抽签分组排序
    };
  },
  watch: {
    reviewScores: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newValue, oldValue) {
        // 20200730 保存disabled出问题，暂时隐藏
        // this.isUpload = false
        var _this = this;
        this.totalNum = 0;
        for (let i = 0; i < newValue.length; i++) {
          // 向下取整,保留两位小数 todo：2021529判断分数是不是有小数 如果是小数需要先把小数转化成整数
          // this.totalNum = parseFloat(
          //   this.totalNum + (newValue[i].score * newValue[i].weight) / 100
          // );
          // this.totalNum = Math.floor(this.totalNum * 100) / 100;
          this.totalNum +=(newValue[i].score*newValue[i].weight)
        }
        this.totalNum = (this.totalNum/100).toFixed(2)
        this.selIndex = this.totalNum;

        if (this.reviewComments.length > 0) {
          for (var i = 0; i < this.reviewComments.length; i++) {
            if (
              this.reviewComments[i].minScore < this.totalNum &&
              this.totalNum <= this.reviewComments[i].maxScore
            ) {
              this.comments = this.reviewComments[i].comments;
            }
          }
        } else {
          this.comments = [];
        }
      },
      deep: true,
    },
  },
  created() {
    this.rowId = this.$route.query.rowId
    this.pattern = this.$route.query.pattern
    this.competitionId = this.$route.query.competitionId
    this.groupSort = this.$route.query.groupSort || null

    if(!this.rowId || !this.competitionId || (this.pattern!=0 && this.pattern!=1)){
        this.$message.warning('未找到对应的竞赛或评审规则')
        return this.$router.push('/expert/judge')
    }
    
    this.muneheight = window.innerHeight - 90 + "px";
    window.onresize = function () {
      this.muneheight = window.innerHeight - 90 + "px";
    };
    
    this.getAttachId();

    if (this.$webapi.getlocal("groupId") == -1) {
      this.getIsExpert();
    }
    this.list();
    this.getLimit();
  },
  mounted() {
    this.getShowButton();
  },
  methods: {
    getAttachId(){
      for (var i = 0; i < this.patternData.length; i++) {
        for (var j = 0; j < this.importData.length; j++) {
          if (this.patternData[i].attachId == this.importData[j]) {
            this.PermPatternData.push(this.patternData[i]);
          }
        }
      }
      if (this.PermPatternData.length > 0) {
        this.attachId = this.PermPatternData[0].attachId;
        this.$store.commit("attachIdDetail", this.attachId);
        this.reviewComments = this.PermPatternData[0].reviewComments;
      } else {
        this.attachId = this.patternData[0].attachId;
        this.$store.commit("attachIdDetail", this.attachId);
        this.reviewComments = this.patternData[0].reviewComments;
      }
    },
    // 查询是否违规
    getShowButton() {
      this.$api
        .get("review/expert/selelctReport", {
          poolId: Base64.decode(this.$route.query.id),
        })
        .then((res) => {
          if (res.code == 0) {
            this.showButton = res.data;
          }
        });
    },
    //获取评分限制
    getLimit() {
      var user = JSON.parse(this.$webapi.getlocal("userInfo"));
      var data = {
        rowId: this.rowId,
      };
      this.$api.get("review/review/expert/getScoreLimit", data).then((res) => {
        if (res.data) {
          let arr = [];
          if (res.data.scoreLimit) {
            res.data.scoreLimit.forEach((ele) => {
              arr.push({
                rang: `${ele.minScore}~${ele.maxScore}`,
                minNum: ele.minNum,
                maxNum: ele.maxNum,
                num: ele.num,
              });
            });
          }
          this.scoreObj = res.data;
          this.limits = arr;
        }
      });
    },

    getReview() {
      var user = JSON.parse(this.$webapi.getlocal("userInfo"));
      var data = {
        userId: user.id,
        poolId: Base64.decode(this.$route.query.id),
      };
      if (this.attachId) {
        data.attachId = this.attachId;
      }
      this.$api.post("review/review/expert/get", data).then((reset) => {
        if (reset.code == 0) {
          if (reset.data) {
            this.reviewScores = reset.data.reviewScores;
            this.remarkValue = reset.data.comment;
          }
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    },
    getIsExpert() {
      var data = {
        competitionId: this.competitionId,
        rowId: this.rowId,
      };
      this.$api.get("review/resource/pool/getiSignName", data).then((reset) => {
        if (reset.code == 0) {
          if (reset.data) {
            this.$Message.warning("已上传签名评分表,不能修改分数!");
            this.isUpload = true;
          }
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    },
    // 分数改变
    numInput(e, score) {
      if (score < 0) {
        this.reviewScores[e].score = 0;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      } else if (score > 100) {
        this.reviewScores[e].score = 100;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      }
    },
    addNum(e, score) {
      if (!this.reviewScores[e].score) {
        this.this.reviewScores[e].score = 0;
      }
      var num = Number(this.reviewScores[e].score) + 1;
      if (num <= 100) {
        this.reviewScores[e].score = num;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      } else {
        this.reviewScores[e].score = 100;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      }
    },
    minusNum(e) {
      if (!this.reviewScores[e].score) {
        this.this.reviewScores[e].score = 0;
      }
      var num = Number(this.reviewScores[e].score) - 1;
      if (num >= 0) {
        this.reviewScores[e].score = num;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      } else {
        this.reviewScores[e].score = 0;
        this.$set(this.reviewScores, e, this.reviewScores[e]);
      }
    },
    // 点击ABC
    clickOptions(index, e, num, i) {
      this.selIndex = e.score;
      // this.reviewScores[index].v=e.score*num/100
      this.reviewScores[index].score = e.score;
      this.$set(this.reviewScores, index, this.reviewScores[index]);
    },
    // 获取点评
    getremarkValue(e) {
      this.remarkValue = e;
    },
    // 改变评审附件
    changeAttach(e) {
      this.reviewScores = e.reviewScores;
      this.reviewComments = e.reviewComments;
      this.attachId = e.attachId;
      this.getReview();
      this.$store.commit("attachIdDetail", e.attachId);
    },
    // 保存
    handleSubmit() {
     /* if(this.remarkMustFillIn == 0){
        if(this.remarkValue == ''){
          this.$message.error('请填写评语！')
          return
        }
      }*/
      this.isUploadloading = true;
      
      var data = {
        poolId: Base64.decode(this.$route.query.id),
        total: this.totalNum,
        pattern: this.pattern, //0：按作品 1：按附件
        competitionId: this.competitionId,
        rowId: this.rowId,
        // attachId:this.nameIndex
        reviewScores: this.reviewScores,
        comment: this.remarkValue,
      };
      if (this.attachId) {
        data.attachId = this.attachId;
      }
      
      this.$api.post("review/review/expert/submit", data).then((reset) => {
        this.isUploadloading = false;
        if (reset.code == 0) {
          // this.accessDialog=true;
          this.$Message.success("保存成功!");
          this.dialogVisible = true;
          // 提交后查询是否需要disabled
          this.getIsExpert();
          this.getReview();
          this.getLimit();
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    },
    handleReset() {
      this.isUploadloading = true;
      var data = {
        poolId: Base64.decode(this.$route.query.id),
      };

      this.$api.post("review/review/expert/reset", data).then((reset) => {
        if (reset.code == 0) {
          this.isUploadloading = false;
          // this.accessDialog=true;
          this.$Message.success("重置成功!");
          this.isList = true
          // this.list();
          this.getLimit();
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    },
    // 显示评分
    tabShow() {
      this.remarkInfo = !this.remarkInfo;
    },
    // 请求专家已经评审列表
    list() {
      let data = {
        groupId: this.$webapi.getlocal("groupId"),
        competitionId: this.competitionId,
        rowId: this.rowId,
        pattern: this.pattern,
        pageNum: this.pageNumber,
        pageSize: 1,
      };
      // 状态筛选
      if(this.$route.query.review){
        data.reviewStatus = this.$route.query.review
      }

      if(this.groupSort){
        data.groupSort = this.groupSort
      }
      this.posts(data);
    },
    posts(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        this.isUploadloading = true
        this.$api.post("review/resource/getReviewList", data,{},{pipe:true}).then((reset) => {
          this.isUploadloading = false
          if (reset.code == 0) {
            if (reset.data) {
              this.objArr = reset.data.list;
              if (
                this.$route.query.reviewStatus == 2 ||
                this.$route.query.reviewStatus == 3
              ) {
                this.getReview();
              } else {
                if (this.PermPatternData.length > 0) {
                  this.reviewScores = this.PermPatternData[0].reviewScores;
                } else {
                  this.reviewScores = this.objArr[0].reviewStandardList[0].reviewScores;
                }
              }
              if (this.isList) {
                let query = {
                  id: Base64.encode(this.objArr[0].id),
                  reviewStatus: this.objArr[0].reviewStatus,
                  page: this.pageNumber,
                  total: this.totalNumber,
                  pattern: this.pattern,
                  rowId: this.rowId,
                  competitionId: this.competitionId
                }
                if(this.groupSort){
                  query.groupSort = this.groupSort
                }

                // 状态筛选
                if(this.$route.query.review){
                  query.review = this.$route.query.review
                }

                this.$router.push({
                  path: "/expert/detail",
                  query: query,
                });
                this.reload();
              }
              // }
              this.pageNumber = reset.data.pageNum;
              // this.reload();
              resolve();
            } else {
              this.objArr = [];
            }
          } else {
            _this.pageShow = false;
            _this.$netcode.getApiCode(reset);
          }
        })
      });
    },
    // 下一页
    pageNext() {
      this.dialogVisible = false;
      if (this.pageNumber < this.totalNumber) {
        this.pageNumber++;
        this.isList = true;
        this.list();
      } else {
        return this.$Message.warning("暂无评审内容!");
      }
    },
    // 上一页
    pagePre() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.isList = true;
        this.list();
      } else {
        return this.$Message.warning("暂无评审内容!");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.aside-mark {
  padding: 15px;
  overflow-y: scroll;
  position: fixed;
  top: 90px;
}
.aside-mark::-webkit-scrollbar {
  // display:none
}
.info-show {
  color: #6da6e6;
  line-height: 32px;
  text-align: right;
  font-size: 16px;
  cursor: pointer;
  span {
    letter-spacing: -3px;
  }
}
.dialogCont {
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  .top {
    width: 470px;
    height: 177px;
    background: #f9f9f9;
    padding: 0 36px;
    margin: 0 auto;
    div {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
      &:first-child {
        height: 74px;
        line-height: 74px;
        border-bottom: 1px solid #d7d7d7;
        span {
          &:nth-child(1) {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            color: #4a4a4a;
            letter-spacing: 1px;
            margin-right: 120px;
          }
          &:nth-child(2) {
            font-family: PingFang-SC-Bold;
            font-size: 50px;
            color: #0078e2;
            letter-spacing: 1px;
          }
        }
      }
      &:nth-child(2) {
        margin-top: 10px;
        p {
          display: inline-block;
          text-align: right;
          width: 79%;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #0078e2;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
      &:nth-child(3) {
        margin-top: 10px;
        p {
          display: inline-block;
          text-align: right;
          width: 90%;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #0078e2;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
      &:nth-child(4) {
        margin-top: 10px;
        p {
          display: inline-block;
          text-align: right;
          width: 90%;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #0078e2;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
    }
  }
  .bottm {
    width: 470px;
    height: 200px;
    margin: 0 auto;
    margin-top: 30px;
  }
}
.back {
  background: #0078e2;
  color: #fff;
}
</style>
<style scoped>
.aside-mark >>> .ivu-form-item-label {
  font-size: 18px;
  line-height: 22px;
  float: none;
}
.aside-mark >>> .ivu-input-group-prepend {
  font-size: 17px;
}
.aside-mark >>> .ivu-input-group-append {
  font-size: 17px;
}
.aside-mark >>> .ivu-input {
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.aside-mark >>> .ivu-table td.demo-table-info-column {
  color: #0078e2;
}
.aside-mark >>> .ivu-table-cell {
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
}
.aside-mark >>> .ivu-col-span-12 {
  display: inline-block;
}
.aside-mark >>> .ivu-col-offset-10 {
  margin-left: 0;
}
.aside-mark >>> .ivu-form-item-content {
  margin-left: 0 !important;
  margin-top: 12px;
}
.aside-mark .totalNum >>> .ivu-form-item-content {
  display: inline-block;
  margin-left: 100px !important;
}
.aside-mark >>> .ivu-form-item {
  margin-bottom: 16px;
}
</style>
