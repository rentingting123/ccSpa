<template></template>

<script>
import left from "./left";
import right from "./right";
import network from "@/api";
export default {
  name: "videoList",
  components: {
    left,
    right,
  },
  data() {
    return {
      lists: [],
      obj: {},
      type: 0, //0：全部  1：未结束  2：已结束
      loading: false,
      nextPage: 0,
      page: 1,
      pageSize: 6,
    };
  },
  computed: {
    slogan() {
      if (this.obj && this.obj.slogan) {
        if (this.obj.slogan.indexOf("http") != -1) {
          return this.obj.slogan;
        }
      }
      return "";
    },
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let res = await network.selectCompetitionActivityList({
        data: {
          type: this.type,
          pageNum: this.page,
          pageSize: this.pageSize,
        },
      });
      console.log(res, 8888888888888);
      this.loading = false;
      if (res == "error") return;
      this.lists = (res && res.list) || [];
      this.nextPage = (res && res.nextPage) || 0;
      if (this.lists.length > 0) {
        this.close(this.lists[0]);
      }
    },
    close(item) {
      this.$nextTick(() => {
        this.obj = { ...item };
      });
    },
    changePage(page) {
      this.page = page;
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
.videoList {
  width: 1172px;
  margin: 0 auto;
  height: 457px;
  margin-bottom: 42px;
  background: #f7f7f7;
  font-size: 0;
  .left {
    width: 814px;
    height: 460px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .right {
    width: 352px;
    height: 460px;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
}
</style>
