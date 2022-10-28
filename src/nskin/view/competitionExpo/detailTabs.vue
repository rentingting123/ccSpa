<template>
  <div class="detailTabs">
    <div class="tabsList">
      <div
        v-for="item in tabsList"
        @click="tabsChange(item.id)"
        :class="current === item.id ? 'tabsItemCur' : 'tabsItem'"
      >
        <img :src="item.img" alt="" />
        <div :class="current === item.id ? 'namecur' : 'name'">{{ item.name }}</div>
      </div>
    </div>
    <div v-if="current == 1">
      <div>竞赛介绍</div>
    </div>
    <div v-else-if="current == 2"><videoList /></div>
    <div v-else-if="current == 3">
      <div class="noticeList">
        <div v-for="item in noticeList" class="noticeItem">
          <div class="fileName">{{ item.fileName }}</div>
          <div class="gmtCreate">{{ item.gmtCreate }}</div>
        </div>
        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pagechange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            :hide-on-single-page="true"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videoList from "./videoList/index";
import network from "@/api/index";
export default {
  components: {
    videoList,
  },
  data() {
    return {
      current: 1,
      noticeList: [
        {
          fileName: "11",
          gmtCreate: "2022-02-20",
        },
        { fileName: "11", gmtCreate: "2022-02-20" },
      ],
      pageNum: 1,
      pageSize: 7,
      total: 0,
      tabsList: [
        {
          id: 1,
          name: "概况",
          img: require("@/nskin/assets/img/tabsIcon1.png"),
        },
        {
          id: 2,
          name: "宣讲视频",
          img: require("@/nskin/assets/img/tabsIcon2.png"),
        },
        {
          id: 3,
          name: "通知公示",
          img: require("@/nskin/assets/img/tabsIcon3.png"),
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    tabsChange(id) {
      this.current = id;
    },
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
    pagechange() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.detailTabs {
  // width: 1200px;
  margin: 0 auto 60px;
  background: #f9fbff;
}

.tabsList {
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  padding: 30px 0;

  .tabsItem,
  .tabsItemCur {
    // width: 210px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-bottom: 10px;

    img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      margin-right: 10px;
    }

    .name,
    .namecur {
      height: 32px;
      font-size: 22px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      line-height: 32px;
    }

    .namecur {
      color: #e62129;
    }
  }

  .tabsItemCur {
    border-bottom: 2px solid #e62129;
  }
}

.noticeList {
  width: 1200px;
  margin: 20px auto;

  .noticeItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    line-height: 40px;
    cursor: pointer;

    .fileName {
      text-align: left;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .gmtCreate {
      margin: 0 auto;
      width: 200px;
    }
  }

  .noticeItem:hover {
    color: #333333;
  }
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ed1e26;
}
</style>
