<template>
  <div class="rule">
    <!-- <div class="page-component-view"> -->
    <div class="page-component-bd">
      <!--查询条件-->
      <div class="tableListForm">
        <Row style="margin-bottom:15px;">
          <Col :span="5">
            <Select :value="competitionId" placeholder="请选择赛项">
              <Option v-for="item in compData" :value="item.id" :key="item.id" @click.native="itemChange(item)" >{{ item.name }}</Option
              >
            </Select>
            
          </Col>
          <Col :span="5" v-if="rowidData.length>1" style="margin-left:15px;">
            <Select :value="rowId" placeholder="请选择赛段" >
                <Option v-for="(item) in rowidData" :value="item.rowId" :key="item.rowId" @click.native="rowIdChanges(item)">{{item.rowName}}</Option>
            </Select>
          </Col>
          <Col :span="4" style="margin-left:15px;">
            <Input
              search
              v-model="searchValue"
              placeholder="作品编号/抽签分组"
              @on-search="searchChange"
            />
          </Col>
        </Row>
      </div>
      <!--操作按钮-->

      <div class="tableListOperator">
        <!-- 专家组长 -->
        <Button
          v-if="specialistType == 11"
          type="default"
          style="margin-left:10px;"
          @click="statisticsClick1"
          >作品评审记录</Button
        >
        <Button
          v-if="specialistType == 11"
          type="default"
          style="margin-left:10px;"
          @click="statisticsClick"
          >评审统计</Button
        >
        <!-- <Button v-if="specialistType==11" type="default" @click="checkRecord" style="margin-left:10px;">
                    查看评审记录
                </Button> -->
        <!-- 评分限制弹窗 -->
        <limit ref="limit" :rowId="rowId" />
        <Button
          type="primary"
          class="red"
          @click="showpdf"
          style="margin-left: 10px"
          v-if="pdfUrl"
          >评审须知</Button
        >
        <uploadComponent
          v-if="competitionId && rowId"
          style="display:inline-block;margin: 0 15px;"
          info="请使用导出评分文件，修改分数后导入"
          importData="review/import/poolScore"
          :datas="datas"
          :disabled="isUpload"
          @exportData="exportResult"
        >
        </uploadComponent>

        <Button type="primary" @click="exportGrade">导出评分</Button>
        <Button
          type="primary"
          style="display:inline-block;margin-left:15px;"
          @click="signUpload"
          >签字评分表上传</Button
        >
      </div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <div class="">
            <Table
              border
              :columns="columnsdata"
              @on-sort-change="onSortChange"
              :data="objArr"
              no-data-text="暂无数据（如评审完毕请筛选已评审作品状态查看)"
              no-filtered-data-text='暂无数据（如评审完毕请筛选已评审作品状态查看)'
            >
              <template slot-scope="{ row }" slot="id">
                <div>
                  <a @click="idshow(row)">{{ row.id }}</a>
                </div>
              </template>

              <template slot-scope="{ row }" slot="name">
                <div>
                  <a v-if="groupId == -1 && competitorShow" @click="idshow(row)"
                    >匿名</a
                  >
                  <a v-else @click="idshow(row)">{{ row.title }}</a>
                </div>
              </template>

              <template slot-scope="{ row }" slot="history">
                <reviewHistory :importData="row" />
              </template>
              <!-- 总得分 -->
              <template slot-scope="{ row, index }" slot="score">
                <div
                  v-if="!row.editScore"
                  class="editScore"
                  @click="!isUpload && editTableShow('editScore', index, true)"
                >
                  <span>{{ row.score }}</span>
                  <!-- 20201210 附件评审时快捷打分有问题，暂时隐藏 -->
                  <i class="iconfont" v-if="!isUpload && pattern != 1">&#xe634;</i
                  >
                </div>
                <div v-else>
                  <Input
                    v-model="row.score"
                    :ref="'input' + index"
                    @on-blur="e => editTable(row, 'editScore', index, false, e)"
                  />
                </div>
              </template>

              <template slot-scope="{ row }" slot="school">
                <span v-if="groupId == -1 && competitorShow">匿名</span>
                <span v-else>{{ row.school }}</span>
              </template>

              <template slot-scope="{ row }" slot="groupName">
                <span v-if="groupId == -1 && competitorShow">匿名</span>
                <span v-else>{{ row.groupName }}</span>
              </template>

              <!-- <template v-if="specialistType==11" slot="reviewDetail" slot-scope="{ row }"> 
                                <expertDetail :importData="row" :rowId='rowId' :pattern='pattern' />
                            </template> -->

              <template slot-scope="{ row }" slot="reviewStatus">
                <div v-if="row.reviewStatus == 0" style="color:red">未评审</div>
                <div v-else-if="row.reviewStatus == 3" style="color:red">
                  未评审完整
                </div>
                <div v-else style="color:#515a6e">已评审</div>
              </template>

              <template slot-scope="{ row }" slot="createTime">
                <span>
                  {{ row.createTime | filterTime }}
                </span>
              </template>

              <template slot-scope="{ row }" slot="status">
                <div>
                  <span v-if="row.status == 2">禁用中</span>
                  <span v-else-if="row.status == 1">启用中</span>
                  <span v-else-if="row.status == 5">已违规</span>
                  <span v-else>启用中</span>
                </div>
                <!-- 20200729 修改时不懂之前的逻辑 -->
                <!-- render: (h, params) => {
                                    var str="启用中"
                                    var switch1=true
                                    var accreditShow="inline-block"
                                    if (this.groupId != -1) {
                                        if(params.row.status==2){
                                            str="禁用中"
                                            switch1=false
                                        }else if(params.row.status==1){
                                            str="启用中"
                                            switch1=true
                                        }else if(params.row.status==5){
                                            str="已违规"
                                            switch1=true
                                        }else{
                                            accreditShow="none"
                                            str="启用中"
                                        }
                                    }else{
                                        accreditShow="none"
                                        if(params.row.status==2){
                                            str="禁用中"
                                        }else if(params.row.status==5){
                                            str="已违规"
                                            switch1=true
                                        }else{
                                            str="启用中"
                                        }
                                    }
                                    return h('div', [
                                        h('span',str)
                                    ]);
                                }, -->
              </template>

              <template slot-scope="{ row }" slot="poolGroupName">
                <span>
                  {{ row.poolGroupName
                  }}<span v-if="row.poolSort">({{ row.poolSort }})</span>
                </span>
              </template>
            </Table>
            <div class="mt20">
              <paging
                :pageData="pageData"
                @pageComponentDate="pageComponentDate"
                v-if="pageShow"
              ></paging>
            </div>
          </div>
        </Col>
        <div v-if="spinShow">
          <Spin fix>
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      </Row>
    </div>
    <uploadFile
      :importShow="uploadShow"
      :rowId="rowId"
      :competitionId="competitionId"
      v-if="uploadShow"
      @exportData="exportUploadData"
    ></uploadFile>
  </div>
</template>
<script>
import paging from "@/expert/components/pub/page";
import uploadFile from "./common/uploadFiles";
import expertDetail from "@/expert/views/judge/adminJudge/common/expertDetail";
import reviewHistory from "@/expert/views/judge/adminJudge/common/reviewHistory";
import uploadComponent from "@/expert/components/pub/upload";
import limit from "./common/limit";
let Base64 = require("js-base64").Base64;
import moment from "moment";
export default {
  components: {
    paging,
    uploadFile,
    reviewHistory,
    expertDetail,
    limit,
    uploadComponent
  },
  data() {
    return { 
      isUpload: false,
      loading: false,

      uploadShow: false,
      pageShow: false, //分页是否显示
      specialistType: 0,
      // 分页
      pageData: {
        //分页数
        arrPageSize: [30, 50, 80],
        //分页大小
        pagesize: 30,
        //总分页数
        pageCount: 1,
        //当前页面
        pageCurrent: 1,
        //总数
        totalCount: 50
      },
      columnsdata: [],
      objArr: [],
      compData: [], //赛项数据
      competitorShow: false, //参赛选手是否匿名 reviewConceal数组中存在0
      raterShow: false, //评分者是否匿名 reviewConceal数组中存在1
      scoreShow: false, //分数是否保密 reviewConceal数组中存在2
      worksShow: false, //该时间段是否公开参赛作品 reviewConceal数组中存在3
      groupId: this.$webapi.getlocal("groupId"),
      statusData: [
        {
          id: 1,
          name: "已评审"
        },
        {
          id: 2,
          name: "未评审"
        }
      ],
      spinShow: false,
      searchValue: "",
      reviewStatus: null,
      scoreObj: [],
      rowId: "",
      competitionId: "",
      pattern: "",
      reviewConceal: "",
      allowHistory: 1, //是否显示历史记录 1是 0否
      pdfUrl: "", // 专家须知
      groupSort: "asc", // 抽签分组排序 //210526 电子商务要求默认升序
      rowidData: [], // 赛段数组
    };
  },
  computed: {
    // 上传时参数
    datas(){
      return {
        competitionId: this.competitionId,
        rowId: this.rowId
      }
    }
  },
  created() {
    if (!this.$webapi.getlocal("compId")) {
      return this.$router.push("/expert/login");
    }

    // 刷新页面sessionStorage中获取数据
    let data = sessionStorage.getItem('expertJudge') && JSON.parse(sessionStorage.getItem('expertJudge')) || null
    if(data){
      if(data.reviewStatus===0 || data.reviewStatus){
        this.reviewStatus = parseInt(data.reviewStatus)
      }
      this.searchValue = data.searchValue 
      this.groupSort = data.groupSort 
      this.competitionId = data.competitionId 
      this.rowId = data.rowId
      this.pattern = data.pattern
    }

    this.getCompChild();
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.setExpertJudge(e))
    this.checkRankMess();
  },
  methods: {
    setExpertJudge(){
      sessionStorage.setItem('expertJudge', JSON.stringify({
        competitionId: this.competitionId,
        rowId: this.rowId,
        pattern: this.pattern,
        reviewStatus: this.reviewStatus,
        groupSort: this.groupSort,
        searchValue: this.searchValue
      }))
    },
    getCompChild() {
      let _this = this;
      let data = {
        competitionId: this.$webapi.getlocal("compId")
      };
      this.$api
        .get("web/competition/childsReviewCompetition", data)
        .then(reset => {
          if (reset.code == 0) {
            this.compData = reset.data || [];
            
            if (this.compData.length > 0) {
              if(this.competitionId){
                let obj = this.compData.filter(res=>res.id == this.competitionId)[0]
                this.itemChange(obj, true);
              }else{
                this.itemChange(this.compData[0], true);
              }
            }
          } else {
            _this.pageShow = false;
            _this.$netcode.getApiCode(reset);
          }
        });
    },
    getPattern() {
      this.$api
        .get("review/review/rule/get", {
          rowId: this.rowId,
          competitionId: this.competitionId
        })
        .then(reset => {
          if (reset.code == 0) {
            this.pattern = reset.data && reset.data.pattern;
            this.reviewConceal = reset.data && reset.data.reviewConceal;
            this.allowHistory = reset.data && reset.data.allowHistory;
            this.pdfUrl = reset.data && reset.data.pdfUrl;
            if (reset.data) {
              if (reset.data.isDone) {
                this.isDone = true;
                this.$Message.warning("结果已经发布,不能操作有关内容!");
              } else {
                this.isDone = false;
              }
            }
            this.pageData.pageCurrent = 1;
            this.isShowInfo();
            this.getIsExpert();
            this.list();
          } else {
            this.$network.getApiCode(reset);
          }
        });
    },
    checkRankMess() {
      let showNoBankMess = this.$webapi.getlocal("showNoBankMess");
      if (showNoBankMess == 1) {
        this.$webapi.savelocal("showNoBankMess", 0);
        this.$Modal.confirm({
          title: "个人信息提示",
          content:
            '<br>请尽快完善信息，<span style="color:red">以免影响</span>您后期的<span style="color:red">费用结算</span<br>',
          okText: "前往完善",
          cancelText: "稍后完善",
          onOk: () => {
            this.$router.push("/expert/user");
          },
          onCancel: () => {}
        });
      }
    },
    // 导入结果
    exportResult(e) {
      if (e) {
        this.isShowInfo();
        this.getIsExpert();
        this.list();
        this.$refs.limit.isShow();
      }
    },
    editTableShow(name, index, flag) {
      this.$set(this.objArr[index], name, flag);
      this.$nextTick(() => {
        this.$refs["input" + index].focus();
      });
    },
    // 设置table总分
    editTable(row, name, index, flag, e) {
      this.$set(this.objArr[index], name, flag);

      let total = e.target.value;
      if (!total) return;
      if (parseFloat(total) > 100 || parseFloat(total) < 0)
        return this.$Message.warning("请输入正确分数");
      if (total == 0) {
        let this_ = this;
        this.$Modal.confirm({
          title: "提示",
          content: "请确认该作品是否打0分",
          onOk: function() {
            this_.submit(row, total, index);
          },
          onCancel: () => {}
        });
      } else {
        this.submit(row, total, index);
      }
    },
    submit(row, total, index) {
      this.$api
        .post("/review/review/expert/fastSubmit", {
          poolId: row.id,
          total: total,
          pattern: this.pattern, // 0：作品 1：附件
          competitionId: this.competitionId, //赛项id
          rowId: this.rowId //赛程id
        })
        .then(res => {
          if (res.code == 0) {
            this.$set(this.objArr[index], "score", total);
            this.$set(this.objArr[index], "reviewStatus", 1);
            this.getLimit();
          }
        });
    },
    //获取评分限制
    getLimit() {
      var data = {
        rowId: this.rowId
      };
      this.$api.get("review/review/expert/getScoreLimit", data).then(res => {
        if (res.data) {
          this.scoreObj = res.data;
          let str1 = "需评审作品 " + res.data.allReviewNum || 0 + "个";
          let str2 = "已评审 " + res.data.reviewedNum || 0 + "个";
          let str3 =
            "未评审 " +
            (res.data.allReviewNum - res.data.reviewedNum || 0) +
            "个";
          this.$Notice.success({
            title: "评分成功",
            // desc: '评分成功评分成功评分成功.',
            render: h => {
              return h("div", [
                h("br", ""),
                h("p", str1),
                h("br", ""),
                h("p", str2),
                h("br", ""),
                h("p", str3)
              ]);
            }
          });
        }
      });
    },
    // 评审统计
    statisticsClick() {
      this.$router.push(
        "/expert/statistics?rowId=" +
          this.rowId +
          "&competitionId=" +
          this.competitionId
      );
    },
    // 作品评审纪录
    statisticsClick1() {
      this.$router.push(
        "/expert/worksrecord?rowId=" +
          this.rowId +
          "&competitionId=" +
          this.competitionId
      );
    },
    checkRecord() {
      var data = {
        groupId: this.$webapi.getlocal("groupId"),
        pattern: this.pattern, // 0：作品 1：附件
        competitionId: this.competitionId, //赛项id
        rowId: this.rowId, //赛程id
        pageNum: 1,
        pageSize: 1
      };
      this.$api.post("review/resource/getDistributionInfo", data).then(res => {
        if (res.code == 0) {
          if (res.data.list && res.data.list.length > 0) {
            this.$router.push(`/expert/record?rowId=${this.rowId}&competitionId=${ this.competitionId}`);
          } else {
            this.$Message.warning({
              content: "未评审，请先评审!，暂无评审记录！",
              duration: 3
            });
          }
        } else {
          this.$netcode.getApiCode(res);
        }
      });
    },
    onSortChange(sort) {
      // 两个排序互斥
      // 总得分排序
      // if (sort.key == "score") {
      //   this.scoreSort = sort.order == "asc" ? 0 : 1;
      //   this.groupSort = null;
      // }
      // 抽签分组排序
      if (sort.key == "poolGroupName") {
        this.groupSort = sort.order;
      }

      this.list();
    },
    idshow(row) {
      let query = {
        id: Base64.encode(row.id),
        reviewStatus: row.reviewStatus,
        total: this.pageData.totalCount,
        rowId: this.rowId,
        competitionId: this.competitionId,
        pattern: this.pattern
      };
      if (this.pageData.pageCurrent == 1) {
        query.page = row._index + 1;
      } else {
        query.page =
          this.pageData.pagesize * (this.pageData.pageCurrent - 1) +
          row._index +
          1;
      }

      if (this.groupSort) {
        query.groupSort = this.groupSort;
      }
      if (this.searchValue) {
        query.searchValue = this.searchValue;
      }
      if (this.reviewStatus===0 || this.reviewStatus) {
        query.review = this.reviewStatus;
      }

      this.$router.push({
        path: "/expert/detail",
        query: query
      });
    },

    list() {
      this.spinShow = true;
      let data = {
        groupId: this.$webapi.getlocal("groupId"),
        competitionId: this.competitionId,
        rowId: this.rowId,
        pattern: this.pattern,
        pageNum: this.pageData.pageCurrent,
        pageSize: this.pageData.pagesize,
        reviewStatus: this.reviewStatus,
        groupSort: this.groupSort // 抽签分组排序
      };

      // 有查询时查询 
      if(this.searchValue) data.q = this.searchValue;


      this.posts(data);
    },
    // 搜索
    searchChange() {
      this.pageData.pageCurrent = 1;
      this.list();
    },
    getIsExpert() {
      var data = {
        competitionId: this.competitionId,
        rowId: this.rowId
      };
      this.$api.get("review/resource/pool/getiSignName", data).then(reset => {
        if (reset.code == 0) {
          if (reset.data) {
            this.isUpload = true;
          }else{
            this.isUpload = false
          }
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    },
    isShowInfo() {
      let reviewConceal = this.reviewConceal;
      if (reviewConceal) {
        if (reviewConceal.indexOf(0) >= 0) {
          this.competitorShow = true;
        } else {
          this.competitorShow = false;
        }
        if (reviewConceal.indexOf(1) >= 0) {
          this.raterShow = true;
        } else {
          this.raterShow = false;
        }
        if (reviewConceal.indexOf(2) >= 0) {
          this.scoreShow = true;
        } else {
          this.scoreShow = false;
        }
        if (reviewConceal.indexOf(3) >= 0) {
          this.worksShow = true;
        } else {
          this.worksShow = false;
        }
      }
    },
    posts(data) {
      var _this = this;
      this.$api.post("review/resource/getReviewList", data,{},{pipe:true}).then(reset => {
        if (reset.code == 0) {
          console.log(reset.data.list,'reset.data.list');
          if (reset.data) {
            this.objArr = reset.data.list;
            _this.pageData.pageCount = reset.data.pages; //总页数
            _this.pageData.totalCount = reset.data.total; //总条数
            _this.pageData.pageCurrent = reset.data.pageNum; //当前页
            _this.pageData.pagesize = reset.data.pageSize;
            var j = 5;
            var arr1 = this.coldata();

            // 抽签分组 start
            let sortShow = true;
            if (
              !this.objArr ||
              !this.objArr[0] ||
              !this.objArr[0].poolGroupName
            ) {
              sortShow = false;
            }
            // 抽签分组 end

            this.objArr.forEach((val, index) => {
              val.reviewStandardList.forEach((self, nums) => {
                if (index == 0) {
                  var obj = {};
                  if (this.pattern == "1") {
                    obj = {
                      align: "center",
                      key: "attachName",
                      renderHeader: (h, params) => {
                        let str = self.attachName + "(" + self.weight + "%)";
                        return h("div", [h("span", str)]);
                      },
                      children: []
                    };
                  } else {
                    obj = {};
                  }
                }
                self.reviewScores.forEach((value, num) => {
                  val["score" + nums + num] = value.score;
                  if (index == 0) {
                    if (this.pattern == "1") {
                      let children = {
                        key: "score",
                        align: "center",
                        minWidth: 200,
                        renderHeader: (h, params) => {
                          let str = value.title + "(" + value.weight + "%)";
                          return h("div", [h("span", str)]);
                        },
                        render: (h, params) => {
                          var valStr = 0;
                          if (params.row["score" + nums + num]) {
                            valStr = params.row["score" + nums + num];
                          }
                          return h("div", [h("span", valStr)]);
                        }
                      };
                      obj.children.push(children);
                    } else {
                      obj = {
                        align: "center",
                        minWidth: 110,
                        key: "score",
                        renderHeader: (h, params) => {
                          var valStr = "";
                          var valStr1 = "";
                          if (value.title.length > 5) {
                            valStr1 =
                              value.title.substring(0, 5) +
                              "...(" +
                              value.weight +
                              "%)";
                          } else {
                            valStr1 = value.title + "(" + value.weight + "%)";
                          }
                          valStr = value.title + "(" + value.weight + "%)";
                          return h("div", [
                            h(
                              "Tooltip",
                              {
                                attrs: {
                                  content: valStr,
                                  placement: "bottom",
                                  "max-width": "100"
                                }
                              },
                              [h("span", valStr1)]
                            )
                          ]);
                        },
                        render: (h, params) => {
                          var str = 0;
                          if (params.row["score" + nums + num]) {
                            str = params.row["score" + nums + num];
                          }
                          return h("div", [h("span", str)]);
                        }
                      };
                      arr1.splice(j, 0, obj);
                      j++;
                    }
                  }
                });
                if (index == 0 && this.pattern == "1") {
                  arr1.splice(j, 0, obj);
                  j++;
                }
              }); //reviewStandardList
            });

            //  console.log(arr1)
            // if(this.specialistType!=11){

            //     arr1.splice(-4,1)
            // }
            // 匿名
            if (this.groupId == -1 && this.competitorShow) {
              arr1.splice(3, 1);
              arr1.splice(-2, 1);
              arr1.splice(-1, 1);
            }
            // 当不为1时，隐藏历史评分
            if (!this.allowHistory) {
              arr1.splice(3, 1);
            }

            // 抽签分组
            if (!sortShow) {
              arr1.splice(2, 1);
            }

            this.columnsdata = arr1;
            this.spinShow = false;
            _this.pageShow = true;
          } else {
            this.columnsdata = this.coldata();
            this.objArr = [];
            this.spinShow = false;
            _this.pageShow = false;
          }
        } else {
          this.spinShow = false;
          _this.pageShow = false;
          _this.$netcode.getApiCode(reset);
        }
      });
    },
    // 导出评审列表
    exportGrade() {
      var data = {
        groupId: this.$webapi.getlocal("groupId"),
        pattern: this.pattern,
        competitionId: this.competitionId,
        rowId: this.rowId
      };
      this.$api.exportPost("/review/review/export/getReviewList", data);
    },
    // 签字上传评分表
    async signUpload(item) {
      let data = {
        pageNum: 1,
        pageSize: 30,
        reviewStatus: 0, //0为未评审 1是已评审
        rowIds: [this.rowId],
        pattern: this.pattern
      };
      this.$api.post("review/resource/getPoolList", data).then(res => {
        if (res.code == 0) {
          if (res.data && res.data.total > 0) {
            return this.$Message.warning("尚有作品未评审，请审核完毕后再上传");
          } else {
            this.uploadShow = true;
          }
        }
      });
    },
    // 上传评分表后的返回值
    exportUploadData(e) {
      this.uploadShow = e.show;
      this.getIsExpert();
    },
    pageComponentDate(e) {
      this.pageData.pageCurrent = e.pageCurrent;
      this.pageData.pagesize = e.pagesize;
      this.list();
    },
    handleSubmit(name) {
      this.pageData.pageCurrent = 1;
      this.list();
    },
    // 切换赛项
   async itemChange(e, flag) {
      this.specialistType = e.specialistType;
      this.competitionId = e.id;
       this.rowId = e.rowId;
      this.$webapi.savelocal("competitionName", e.name);
      this.$store.commit("selComptitionName", e.name);
      await this.getRowId()
      this.getPattern();
      
      this.$nextTick(() => {
        // 首次进入时显示
        flag && this.$refs.limit.isShow();
      });
    },
    getRowId(){
      let data = {
        competitionId: this.competitionId
      }
     return  this.$api.get('web/competition/reviewRowIds',data).then(res =>{
        if(res.code == 0){
          this.rowidData = res.data || []
          this.rowId = res.data[0]?res.data[0].rowId:this.rowId
          
        }else{
            this.$netcode.getApiCode(res)
        }
      })
        
    },
    rowIdChanges(item){
      this.rowId = item.rowId
      this.getPattern();
    },
    // 表头数据
    coldata() {
      let _this = this;
      return [
        {
          type: "index",
          title: "序号",
          width: 60,
          align: "center"
          // fixed: 'left',
        },
        {
          title: "作品编号",
          align: "center",
          minWidth: 80,
          slot: "id"
          // fixed: 'left'
        },
        {
          title: "抽签分组",
          align: "center",
          minWidth: 90,
          slot: "poolGroupName",
          key: "poolGroupName",
          sortable: true
        },
        {
          title: "作品名称",
          align: "center",
          minWidth: 150,
          slot: "name"
          // fixed: 'left',
        },
        //10.6号晚上 数学建模要求零时屏蔽 历史评分。11.23会展要求打开 todo:做成可配置
        {
          title: "历史评审",
          align: "center",
          minWidth: 120,
          // fixed: 'left',
          slot: "history"
        },
        {
          title: "总得分",
          align: "center",
          minWidth: 100,
          slot: "score"
        },
        // {
        //     title: '评审详情',
        //     align: 'center',
        //     minWidth: 70,
        //     slot: 'reviewDetail'
        // },
        {
          title: "作品状态",
          align: "center",
          minWidth: 120,
          slot: "reviewStatus",
          key: "reviewStatus",
          filters: [
            {
              label: "未评审",
              value: 0
            },
            {
              label: "已评审",
              value: 1
            }
          ],
          filteredValue: [_this.reviewStatus],
          filterMultiple: false,
          filterRemote(value, row) {
            _this.reviewStatus = value[0];
            _this.list();
          }
        },

        {
          title: "学校",
          minWidth: 100,
          align: "center",
          slot: "school"
        },
        {
          title: "团队名/参赛者",
          align: "center",
          minWidth: 100,
          slot: "groupName"
        }
      ];
    },
    showpdf() {
      if (!this.pdfUrl) return;
      window.open(this.pdfUrl);
    }
  },
  filters: {
    filterTime(val) {
      let time = moment(val).format("YYYY-MM-DD HH:MM");
      return time;
    }
  },
  destroyed(){
    this.setExpertJudge()
  }
};
</script>
<style lang="less" scoped>
.page-component-bd {
  position: relative;
}
div.page-component-view {
  margin: 0px;
}
.tableListOperator {
  position: absolute;
  top: 0;
  right: 0;
  .red {
    background: red;
  }
}
/deep/.rightshow {
  position: relative;
  display: inline-block;
  letter-spacing: -7px;
  vertical-align: middle;
  margin-left: 3px;
  color: #7b7f88;
  i {
    cursor: pointer;
  }
  .Selection {
    color: red;
  }
}
.rule {
  /deep/th .ivu-table-cell {
    font-size: 14px;
  }
}
/deep/.ivu-table:before {
  background: none;
}
.editScore {
  cursor: pointer;
  i {
    color: #bababa;
    margin-left: 5px;
  }
}
</style>
