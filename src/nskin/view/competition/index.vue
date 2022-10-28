<template>
  <div class="competition">
    <div class="top">
      <!-- <div class="types">
                <p>分类：</p>
                <el-radio-group v-model="tags" size="small" @change="chooseType">
                    <el-radio-button :label="item.value" v-for="item in tagss" :key="item.value">{{item.label}}</el-radio-button>
                </el-radio-group>
            </div> -->
      <div class="types">
        <p>时间：</p>
        <el-radio-group v-model="date" size="small" @change="chooseTime">
          <el-radio-button :label="item.value" v-for="item in dates" :key="item.value">
            <el-date-picker
              v-if="item.value == 4"
              @focus="datefocus"
              @change="choosemotch"
              value-format="yyyy-MM"
              v-model="monthvalue"
              type="month"
              class="monthvalue"
            ></el-date-picker>
            <span :class="{ monthspan: item.value == 4 }">{{ item.label }}</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="types">
        <p>状态：</p>
        <el-radio-group v-model="status" size="small" @change="chooseStatus">
          <el-radio-button
            :label="item.value"
            v-for="item in statuss"
            :key="item.value"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </div>

    <div class="search">
      <ul class="type">
        <li :class="{ on: sort == 0 }" @click="choosehot(0)">
          综合排序
          <p class="line"></p>
        </li>
        <li :class="{ on: sort == 1 }" @click="choosehot(1)">
          最新发布
          <p class="line"></p>
        </li>
        <li :class="{ on: sort == 2 }" @click="choosehot(2)">
          热门点击
          <p class="line"></p>
        </li>
      </ul>

      <el-input
        class="searchname"
        @keyup.enter.native="init"
        placeholder="搜索竞赛"
        v-model="search"
      >
        <el-button
          slot="append"
          @click.native="init"
          icon="el-icon-arrow-right"
        ></el-button>
      </el-input>
    </div>
    <div class="main">
      <detail v-if="lists.length > 0" :lists="lists" />
      <el-pagination
        background
        class="pages"
        layout="prev, pager, next"
        @current-change="init"
        :current-page.sync="page"
        :page-size="size"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import detail from "./detail";
import network from "@/api/index";
import moment from "moment";
export default {
  components: {
    detail,
  },
  data() {
    return {
      sort: 0,
      tagss: [
        {
          label: "全部",
          value: null,
        },
        {
          label: "纳入排行榜竞赛",
          value: 2,
        },
        {
          label: "申请排行榜竞赛",
          value: 1,
        },
      ],
      tags: null,
      dates: [
        {
          label: "全部",
          value: "0",
        },
        {
          label: "今天",
          value: "1",
        },
        {
          label: "一周内",
          value: "2",
        },
        {
          label: "一月内",
          value: "3",
        },
        {
          label: "",
          value: "4",
        },
      ],
      date: "0",
      statuss: [
        {
          label: "全部",
          value: "3",
        },
        {
          label: "报名中",
          value: "2",
        },
        {
          label: "进行中",
          value: "1",
        },
        {
          label: "已结束",
          value: "0",
        },
      ],
      status: "3",
      lists: [],
      likes: [],
      times: [],
      monthvalue: "",
      page: 1,
      size: 12,
      total: 0,
      search: "",
    };
  },
  created() {
    this.tags = this.$route.query.tags ? this.$route.query.tags : null;
    this.init();
  },
  methods: {
    goApplay() {},
    async init() {
      let res = await network.getCompetitionByRequirement({
        data: {
          page: this.page,
          size: this.size,
          isRanking: this.tags,
          date: JSON.stringify(this.times),
          status: this.status,
          name: this.search,
          provinceId: localStorage.getItem("competitionId"),
          sort: this.sort,
        },
      });
      if (res == "error") return;
      this.lists = res.competitionList;
      this.total = res.total;
    },
    choosehot(index) {
      this.page = 1;
      this.sort = index;
      this.init();
    },
    chooseType(val) {
      this.page = 1;
      this.init();
    },
    chooseTime(val) {
      let start = "",
        end = "";
      this.times = [];
      if (val == 1) {
        start = moment().format("YYYY-MM-DD");
        end = moment().format("YYYY-MM-DD");
        this.times.push(start);
        this.times.push(end);
      } else if (val == 2) {
        start = moment().day(-6).format("YYYY-MM-DD");
        end = moment().format("YYYY-MM-DD");
        this.times.push(start);
        this.times.push(end);
      } else if (val == 3) {
        start = moment().day(-29).format("YYYY-MM-DD");
        end = moment().format("YYYY-MM-DD");
        this.times.push(start);
        this.times.push(end);
      } else if (val == 4) {
        return;
        this.times = [];
      } else {
        this.times = [];
      }
      this.page = 1;
      this.init();
    },
    datefocus() {
      this.date = 4;
    },
    choosemotch(val) {
      if (!val) return;
      this.times = [];
      let month = moment(val).endOf("month").format("YYYY-MM-DD");
      this.times.push(val + "-01");
      this.times.push(month);
      this.init();
    },
    chooseStatus(val) {
      this.page = 1;
      this.init();
    },
  },
  watch: {
    $route() {
      this.tags = this.$route.query.tags ? this.$route.query.tags : null;
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.competition {
  background: #f2f2f2;
  padding-top: 27px;
  text-align: left;
  padding-bottom: 50px;
}
.top {
  width: 1200px;
  height: 146px;
  background: #ffffff;
  border-radius: 5px;
  padding: 25px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .types {
    p {
      display: inline-block;
      width: 100px;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .types:nth-child(1) {
    margin-top: 0px;
  }
}
.search {
  width: 1200px;
  margin: 46px auto 0;
  text-align: left;
  .type {
    width: auto;
    height: 50px;
    background: #252223;
    display: inline-block;
    vertical-align: top;
    margin-right: 34px;
    li {
      display: inline-block;
      vertical-align: top;
      width: 165px;
      height: 50px;
      line-height: 50px;
      font-size: 19px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      &.on {
        background: #ed1e26;
      }
    }
  }
  .searchname {
    width: 250px;
    margin-top: 4px;
  }
  /deep/.el-input-group__append {
    background: #252223;
    color: #fff;
    border: 1px solid #252223;
  }
  /deep/.el-input-group--append .el-input__inner,
  .el-input-group__prepend {
    border-color: #252223;
  }
}
.main {
  width: 1200px;
  margin: 0 auto;
  background: rgba(242, 247, 247, 0.3);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 38px 24px;
}
.monthvalue {
  width: 120px !important;
  height: 20px;
  overflow: hidden;
}
.monthspan {
  position: relative;
  top: -6px;
}
.pages {
  margin-top: 30px;
  white-space: normal !important;
  text-align: center;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ed1e26;
}
</style>

<style lang="less">
.competition {
  .monthvalue {
    .el-input__inner {
      height: 20px;
      width: 120px;
      padding-right: 0;
    }
    .el-input__icon {
      line-height: 20px !important;
    }
  }
  .el-picker-panel__content {
    margin: 0 !important;
  }
  .el-month-table td.today .cell {
    color: #606266;
    font-weight: 150;
  }
  .el-radio-button {
    margin-right: 20px;
  }
  .el-radio-button__inner {
    border: 1px solid #dcdfe6 !important;
    border: none !important;
    border-radius: 0 !important;
  }
  .el-radio-button--small .el-radio-button__inner {
    font-size: 14px !important;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: #ed1e26;
    box-shadow: -1px 0 0 0 #ed1e26;
  }
}
</style>
