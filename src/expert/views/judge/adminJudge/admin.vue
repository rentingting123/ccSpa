<template>
  <div class="rule">
    <div class="page-component-bd">
      <!--查询条件-->
      <div class="tableListSearch">
        <chooseId
          :rowId="rowId"
          :cId="competitionId"
          :rowIdChange="rowIdChange"
          :cIdChange="itemChange"
        />
        <Input
          search
          v-model="searchValue"
          placeholder="作品编号/作品名称/学校/团队名/参赛者"
          @on-search="searchChange"
          style="margin-left:15px"
        />
      </div>
      <!--操作按钮-->
      <div class="tableListOperator">
        <Button type="default" @click="statisticsClick">评审统计</Button>
        <Button type="default" @click="checkRecord(2)">作品评审记录</Button>
        <Button type="default" @click="checkRecord(1)">专家评审记录</Button>
        <Button type="primary" @click="expertList" :loading="loadShow"
          >导出全部</Button
        >
      </div>
    </div>
    <div class="tableListForm">
      <p class="calculation">分数计算</p>
      <RadioGroup
        v-model="countType"
        class="calculationRadio"
        @on-change="changeCountType"
      >
        <Radio :label="1">
          <span>原始值</span>
        </Radio>
        <Radio :label="0">
          <span>去掉最高分和最低分的均值</span>
        </Radio>
        <Radio :label="2">
          <span>去掉最低分</span>
        </Radio>
        <Radio :label="3">
          <Tooltip :content="countTypeContent" max-width="300">
            <span>离散算法 </span> <Icon type="ios-alert" />
          </Tooltip>
        </Radio>
        <Radio :label="4">
          <Tooltip
            content="每位专家需分配相同数量的作品并全部评审完毕。系统根据作品在分组内各专家的名次权重得到排名系数，系数越小排名越靠前"
            max-width="300"
          >
            <span>排名加权 </span> <Icon type="ios-alert" />
          </Tooltip>
        </Radio>
      </RadioGroup>
      <Button
        v-if="datas && datas.scoreStatus == 1"
        type="primary"
        style="vertical-align: top; margin: 7px 0 0 10px;"
        @click="getPattern(null)"
        >
        刷新
      </Button>
      <updateScoreRule
        :datas="datas"
        v-else
        :disabled='isDone'
        :countType="countType"
        :close="changeCountType"
      />
    </div>
    <div style="margin-top:15px;" v-loading="spinShow">
      <Table border :columns="columnsdata" :data="objArr" ref="selection">
        <!-- 作品编号 -->
        <template slot="id" slot-scope="{ row }">
          <div @click="toexpertDetail(row)">
            <a>{{ row.id }}</a>
          </div>
        </template>
        <!-- 作品名称 -->
        <template slot="name" slot-scope="{ row }">
          <div @click="toexpertDetail(row)">
            <a>{{ row.title }}</a>
          </div>
        </template>
        <!-- 赛题 -->
        <template slot="topicName" slot-scope="{ row }">
          {{ row.topicName || "-" }}
        </template>
        <!-- 作品组名 -->
        <template slot="poolGroupName" slot-scope="{ row, index }">
          <div v-if="row.poolGroupName">
            {{ row.poolGroupName }}
            <span v-if="!row.poolSortEdit">({{ row.poolSort || 0 }})</span>
            <Icon
              v-if="!row.poolSortEdit"
              type="ios-create-outline"
              @click="editPoolSort(index, true)"
            />
            <Input
              v-if="row.poolSortEdit"
              v-model="objArr[index].poolSort"
              on-enter="editPoolSort(index,false)"
              @on-blur="editPoolSort(index, false)"
            />
          </div>
          <div v-else>
            暂未分组
          </div>
        </template>
        <!-- 历史评审 -->
        <template slot="history" slot-scope="{ row }">
          <reviewHistory :importData="row"></reviewHistory>
        </template>
        <!-- 总得分 -->
        <template slot="score" slot-scope="{ row }">
          <div v-if="datas && datas.scoreStatus == 1">计算中</div>
          <poptipComponent
            v-else
            :importData="row"
            :rowId="rowId"
            :pattern="pattern"
            :competitionId="competitionId"
          ></poptipComponent>
        </template>
        <!-- 评审状态 -->
        <template slot="reviewStatus" slot-scope="{ row }">
          <div v-if="row.illegalStatus == 1">
            已违规<br/>
            <span @click="unweigui(row)" style="color:#2d8cf0;cursor: pointer;">撤销违规</span>
            </div>
          <div v-else-if="row.reviewStatus == 2">已评审</div>
          <div v-else-if="row.reviewStatus == 0" style="color:red;">未分配</div>
          <div v-else>已分配</div>
        </template>
        <!-- 评审详情 -->
        <template slot="reviewDetail" slot-scope="{ row }">
          <expertDetail :importData="row" :rowId="rowId" :pattern="pattern" />
        </template>
      </Table>
      <paging
        :pageData="pageData"
        @pageComponentDate="pageComponentDate"
        v-if="pageShow"
      ></paging>
    </div>
  </div>
</template>
<script>
import paging from "@/expert/components/pub/page";
import provices from "@/expert/until/province.js";
import poptipComponent from "./common/poptipComponent";
import reviewHistory from "./common/reviewHistory";
import expertDetail from "./common/expertDetail";
import updateScoreRule from "./common/updateScoreRule";
import treeTable from "./common/treeTable";
import chooseId from "@/expert/components/chooseId";
let Base64 = require("js-base64").Base64;
export default {
  components: {
    paging,
    poptipComponent,
    reviewHistory,
    expertDetail,
    updateScoreRule,
    treeTable,
    chooseId
  },
  data() {
    return {
      countType: 0,
      datas: {},
      loadShow: false,
      pageShow: false, //分页是否显示
      // 查询条件
      formValidate: {
        groupName: "",
        status: "",
        rowId: "",
        province: "",
        poolGroupName: "",
        topicName: ""
      },
      // 分页
      pageData: {
        //分页数
        arrPageSize: [10,30, 50, 80],
        //分页大小
        pagesize: 10,
        //总分页数
        pageCount: 1,
        //当前页面
        pageCurrent: 1,
        //总数
        totalCount: 50
      },
      columnsdata: [],
      objArr: [],
      groupId: this.$webapi.getlocal("groupId"),
      illegalStatus:undefined,
      isDone: false, //是否已经发布
      spinShow: false, //加载中
      searchValue: "", //搜索内容
      type: "", //状态
      provinceList: [], //省份筛选
      filterTeam: [], //作品组名筛选
      rowidData: [],
      rowId: "",
      competitionId: "",
      pattern: "",
      topicList: [] //赛题赛选
    };
  },
  created() {

    // if (this.$route.query.province) {
    //   this.formValidate.province = this.$route.query.province;
    // }
    // if (this.$route.query.poolGroupName) {
    //   this.formValidate.poolGroupName = this.$route.query.poolGroupName;
    // }
    if(this.$route.query.pageNum) this.pageData.pageCurrent=this.$route.query.pageNum
    // if(this.$route.query.q) this.searchValue=this.$route.query.q
    if(this.$route.query.illegalStatus == 1){
         this.type = 10
         this.illegalStatus = 1
        }else if (this.$route.query.type){
          this.type = parseInt(this.$route.query.type);
        }
    const { competitionId, rowId, q } = this.$route.query
    console.log(this.$route.query,competitionId,rowId)
    this.competitionId = competitionId || '';
    this.rowId = rowId || '';
    this.searchValue = q || '';
   
    this.provinceList = provices.provinces();
    Object.assign(this.formValidate,this.$route.query)
  },
  computed: {
    countTypeContent() {
      let num = (this.datas && this.datas.deviation) || 0.05;
      return (
        "为了算法的公平，需要所有专家评审完分配的作品。最终计算总分误差绝对值小于" +
        num
      );
    }
  },
  methods: {
    unweigui(row){
      const h = this.$createElement;
            this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', '是否确定撤销作品 ' ),
            h('span', { style: 'font-weight:800;color:#000000;' },  row.title ),
            h('span', '的违规评审状态？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
           type: 'warning'
        }).then(() => {
          this.$api
        .put(`review/resource/delPoolReportInfoList/${row.id}`, {
          poolId:row.id
        })
        .then(res => {
             if(res =='error') {
               return this.$message.error('撤销失败')
               }else{
                 this.$message.success('撤销成功')
                  this.$router.go(0)
               }
           })
        }).catch(() => {});

      
    },
    getPattern(countType) {
      this.$api.get("review/review/rule/get", {
          rowId: this.rowId,
          competitionId: this.competitionId
        }).then(res => {
          this.$store.commit("patternDataCommon", res.data);

          this.pattern = res && res.data && res.data.pattern;
          // 分数计算切换
          if (countType == 0 || countType) {
            this.countType = countType;
          } else {
            this.countType = (res.data && res.data.countType) || 0;
          }
          this.datas = res.data;
          if (res.data) {
            if (res.data.isDone) {
              this.isDone = true;
              this.$Message.warning("已晋级到下一赛段,不能操作有关内容!");
            } else {
              this.isDone = false;
            }
          } else {
            this.$Message.warning("暂无数据");
            this.objArr = [];
            this.pageShow = false;
          }
          this.getFilterTeam();
          this.selectTopicNames();
          this.list();
        });
    },
    toexpertDetail(row) {
      this.$router.push({
        path: "/expert/detail",
        query: {
          id: Base64.encode(row.id),
          reviewStatus: row.reviewStatus,
          groupId: Base64.encode(row.groupId),
          competitionId: this.competitionId,
          rowId: this.rowId,
          pattern: this.pattern
        }
      });
    },
    // 作品组名列表
    getFilterTeam() {
      this.$api
        .get("review/resource/selectGroupNames", {
          rowId: this.rowId
        })
        .then(res => {
          if (res.code == 0) {
            let arr = [];
            for (let i in res.data) {
              arr.push({
                label: res.data[i] + "",
                value: res.data[i] + ""
              });
            }
            this.filterTeam = arr;
          } else {
            this.filterTeam = [];
            this.$netcode.getApiCode(res);
          }
        });
    },
    // 赛题列表
    selectTopicNames() {
      this.$api
        .get("review/resource/selectTopicNames", {
          rowId: this.rowId
        })
        .then(res => {
          if (res.code == 0) {
            let arr = [];
            for (let i in res.data) {
              arr.push({
                label: res.data[i] + "",
                value: res.data[i] + ""
              });
            }
            this.topicList = arr;
          } else {
            this.topicList = [];
            this.$netcode.getApiCode(res);
          }
        });
    },
    // 分数计算
    changeCountType(val) {
      this.$api
        .get("review/resource/updateScore", {
          rowId: this.rowId,
          countType: val
        })
        .then(res => {
          if (res.code == 0) {
            this.pageData.pageCurrent = 1;
            this.getPattern(val);
          } else {
            this.$netcode.getApiCode(res);
          }
        });
    },
    editPoolSort(i, flag) {
      this.$set(this.objArr[i], "poolSortEdit", flag);
      if (!flag) {
        this.$api
          .get("/review/resource/exchangePoolSort", {
            poolId: this.objArr[i].id,
            sort: this.objArr[i].poolSort
          })
          .then(res => {
            if (res.code == 0) {
              this.$Message.success("修改成功");
            } else {
              this.$netcode.getApiCode(res);
            }
          });
      }
    },
    async list() {
      this.spinShow = true;
      if(this.type == 10){
        this.type = ""
        this.illegalStatus = 1
      }
       else {
        this.illegalStatus = undefined
      }
      if(!this.formValidate.topicName){
        this.formValidate.topicName = undefined
      }
      let data = {
        groupId: this.groupId,
        pattern: this.pattern,
        competitionId: this.competitionId,
        rowId: this.rowId,
        pageNum: this.pageData.pageCurrent,
        pageSize: this.pageData.pagesize,
        countType:this.countType,
        q:this.searchValue,
        province:this.formValidate.province,
        poolGroupName:this.formValidate.poolGroupName,
        topicName:this.formValidate.topicName,
        type:this.type,
        illegalStatus:this.illegalStatus
      };
       this.$router.push({path:'/expert/judge',query:{...data}});
       this.posts(data);
    },
    posts(data) {
      this.objArr = [];
      this.$api.post("review/resource/getReviewList", data,{},{pipe:true}).then(reset => {
        if (reset.code == 0) {
          if (reset.data) {
            this.objArr = reset.data.list;
            this.pageData.pageCount = reset.data.pages; //总页数
            this.pageData.totalCount = reset.data.total; //总条数
            this.pageData.pageCurrent = reset.data.pageNum; //当前页
            this.pageData.pagesize = reset.data.pageSize;
            var arr1 = this.coldata();
            this.columnsdata = arr1;
            this.spinShow = false;
            this.pageShow = true;
            
          } else {
            this.spinShow = false;
            this.pageShow = false;
          }
        } else {
          this.spinShow = false;
          this.pageShow = false;
          this.$netcode.getApiCode(reset);
        }
      });
    },
    // 搜索
    searchChange() {
      this.pageData.pageCurrent = 1;
      this.list();
    },
    rowIdChange(e) {
      this.rowId = e.rowId;
      // this.formValidate.province = "";
      this.formValidate.poolGroupName = "";
      this.searchValue = "";
      // this.type = "";
      this.getPattern();
    },
    // 赛项
    itemChange(e) {
      this.rowId = e.rowId;
      this.competitionId = e.id;
      // this.formValidate.province = "";
      this.formValidate.poolGroupName = "";
      // this.searchValue = "";
      // this.type = "";
      this.getPattern();
    },
    // 参赛状态
    stateChange(item, e) {
      var data = {
        id: item.id
      };
      this.$Modal.confirm({
        title: "禁用确认",
        content: "禁用后需要重新审核才能恢复到评审列表！",
        onOk: () => {
          this.$api
            .get("/review/resource/updateResourcePoolStatus", data)
            .then(reset => {
              if (reset.code == 0) {
                this.list();
              } else {
                this.$netcode.getApiCode(reset);
              }
            });
        },
        onCancel:()=>{
           
        }

      });
    },
    pageComponentDate(e) {
      this.pageData.pageCurrent = e.pageCurrent;
      this.pageData.pagesize = e.pagesize;
      this.list();
    },
    // 导出全部作品
    expertList() {
      this.loadShow = true;
      var data = {
        competitionId: this.competitionId,
        rowId: this.rowId
      };
      this.$api
        .exportPost("/review/review/export/getAllReviewList", data)
        .then(res => {
          this.loadShow = false;
        });
    },
    // 查看分配记录
    checkRecord(flag) {
      var data = {
        groupId: this.groupId,
        pattern: this.pattern, // 0：作品 1：附件
        competitionId: this.competitionId,
        rowId: this.rowId,
        pageNum: 1,
        pageSize: 1
      };
      this.$api.post("review/resource/getDistributionInfo", data).then(res => {
        if (res.code == 0) {
          if (res.data.list && res.data.list.length > 0) {
            if (flag == 1) {
              this.$router.push(
                "/expert/record?rowId=" +
                  this.rowId +
                  "&competitionId=" +
                  this.competitionId
              );
            } else if (flag == 2) {
              this.$router.push(
                "/expert/worksRecord?rowId=" +
                  this.rowId +
                  "&competitionId=" +
                  this.competitionId
              );
            }
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
    // 评审统计
    statisticsClick() {
      this.$router.push(
        "/expert/statistics?rowId=" +
          this.rowId +
          "&competitionId=" +
          this.competitionId
      );
    },
    // 表头数据
    coldata() {
      var _this = this;
      
      return [
        {
          title:'序号',
          type:'index',
          minWidth: 50,
          indexMethod:(params,index)=>(parseInt(_this.pageData.pagesize)*parseInt(_this.pageData.pageCurrent-1)+index+1),
        },
        {
          title: "作品编号",
          align: "center",
          minWidth: 50,
          slot: "id"
        },
        {
          title: "备注",
          align: "center",
          minWidth: 50,
          key: "remark"
        },
        {
          title: "作品名称",
          align: "center",
          minWidth: 70,
          slot: "name"
        },
        {
          title: "赛题",
          align: "center",
          minWidth: 90,
          slot: "topicName",
          filters: this.topicList,
          filterMultiple: false,
          filteredValue: [_this.formValidate.topicName],
          filterRemote(value) {
            _this.formValidate.topicName = value[0];
            _this.pageData.pageCurrent = 1;
            _this.list();
          }
        },
        {
          title: "作品组名",
          align: "center",
          minWidth: 90,
          slot: "poolGroupName",
          className: "poolGroupName-wrap",
          filters: this.filterTeam,
          filterMultiple: false,
          filteredValue: [_this.formValidate.poolGroupName],
          filterRemote(value) {
            _this.formValidate.poolGroupName = value[0];
            _this.pageData.pageCurrent = 1;
            _this.list();
          }
        },
        {
          title: "历史评审",
          align: "center",
          minWidth: 90,
          slot: "history"
        },
        {
          title: "省份",
          minWidth: 80,
          align: "center",
          key: "province",
          className: "province-wrap",
          filters: this.provinceList,
          filterMultiple: false,
          filteredValue: [_this.formValidate.province],
          filterRemote(value) {
            _this.formValidate.province = value[0];
            _this.pageData.pageCurrent = 1;
            _this.list();
          }
        },
        {
          title: "学校",
          minWidth: 100,
          align: "center",
          key: "school"
        },
        {
          title: "关键字",
          align: "center",
          minWidth: 70,
          key: "tags",
          render:(h,params)=>{return h('span',params.row.tags&&params.row.tags.map(item=>item.tagname).join(','))}
        },
        {
          title: "分组序号",
          align: "center",
          minWidth: 70,
          key: "groupId"
        },
        {
          title: "团队名/参赛者",
          align: "center",
          minWidth: 70,
          key: "groupName"
        },
        {
          title: "得分详情",
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(treeTable, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "总得分",
          align: "center",
          minWidth: 80,
          slot: "score"
        },
        {
          title: "评审状态",
          align: "center",
          minWidth: 90,
          slot: "reviewStatus",
          filters: [
            {
              label: "已分配",
              value: 1
            },
            {
              label: "未分配",
              value: 0
            },
            {
              label: "已评审",
              value: 2
            },
            {
              label: "已违规",
              value: 10
            }
          ],
          filteredValue: [_this.type],
          filterMultiple: false,
          filterRemote(value, row) {
            _this.type = value[0];
            _this.pageData.pageCurrent = 1;
            _this.list();
          }
        },
        {
          title: "评审详情",
          align: "center",
          minWidth: 70,
          slot: "reviewDetail"
        },
        {
          title: "参赛状态",
          align: "center",
          width: 70,
          key: "status",
          // 改不动，不敢改 2020-08-25
          render: (h, params) => {
            var str = "启用中";
            var switch1 = true;
            var accreditShow = "inline-block";
            if (this.groupId != -1) {
              if (params.row.status == 2) {
                str = "禁用中";
                switch1 = false;
              } else if (params.row.status == 1) {
                str = "启用中";
                switch1 = true;
              } else if (params.row.status == 3) {
                accreditShow = "none";
                str = "已晋级";
              } else if (params.row.status == 4) {
                accreditShow = "none";
                str = "已淘汰";
              } else if (params.row.status == 5) {
                accreditShow = "none";
                str = "已违规";
              }
            } else {
              accreditShow = "none";
              if (params.row.status == 2) {
                str = "禁用中";
              } else {
                str = "启用中";
              }
            }
            return h("div", [
              // 20210618 一直没有用过且总是误操作，暂时隐藏
              // h("i-button", {
              //   props: {
              //     type: 'error',
              //     size: "small"
              //   },
              
              //   style: {
              //     display: accreditShow,
              //     marginRight: "5px"
              //   },
              //   on: {
              //     "click": e => {
              //       this.stateChange(params.row);
              //       //switch1 = true
              //     }
              //   },
              // }, '禁用'),
              h("span", str)
            ]);
          }
        }
      ];
    }
  }
};
</script>
<style lang="less" scoped>
.rule {
  /deep/.ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
  }

  .page-component-bd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .tableListSearch {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
    }
    .tableListOperator {
      margin-bottom: 10px;
    }
  }

  .tableListForm {
    .calculation {
      display: inline-block;
      vertical-align: top;
      width: 80px;
      height: 36px;
      background: rgba(0, 170, 145, 1);
      border-radius: 0px 0px 14px 0px;
      font-size: 14px;
      line-height: 36px;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      margin: 5px 40px 20px 0;
    }
    .calculationRadio {
      line-height: 36px;
      margin: 5px 0 20px;
      .ivu-radio-wrapper {
        font-size: 14px;
        margin-right: 20px;
      }
    }

    /deep/.ivu-tooltip-inner-with-width {
      width: 300px;
    }
  }
}
</style>
