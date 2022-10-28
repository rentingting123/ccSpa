<template>
  <div class="organization">
    <h2>
      <p v-if="activeName==29" class="on">章程细则</p>
      <p v-if="activeName==32" class="on">创新成果集</p>
      <p v-if="activeName==33" class="on">竞赛通讯</p>
      <p v-if="activeName==34" class="on">竞赛成果奖</p>
      <p v-if="activeName==30" class="on">文件通知</p>
    </h2>
    <newslist :lists="lists" />

    <div style="text-align:center;margin:20px 0;">
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="getnews"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import network from "@/api";
import newslist from "./common";
export default {
  components: {
    newslist
  },
  data() {
    return {
      activeName: this.$route.params.id,
      lists: [],
      page: 1,
      total: 0,
      pageSize: 10
    };
  },
  created() {
    this.page = 1;
    this.getnews();
  },
  methods: {
    async getnews() {
      let res = await network.npgetNewsList({
        data: {
          pageNum: this.page,
          pageSize: this.pageSize,
          type: this.activeName,
          groupId: localStorage.getItem("groupId")
        }
      });
      if (res == "error") return;
      this.total = res.total;
      this.lists = (res && res.pageData) || [];
    },
    activechange(val) {
      this.activeName = val;
      this.getnews();
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.activechange(to.params.id);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.organization {
  h2 {
    p {
      cursor: pointer;
      border: none;
      margin-right: 10px;
    }
    p.on {
      border-bottom: 3px solid #BB0294;
    }
  }
}
</style>