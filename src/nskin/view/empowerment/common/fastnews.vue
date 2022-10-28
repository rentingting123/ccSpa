<template>
  <div class="fastnews" v-if="lists.length > 0">
    <!-- <div>
            <div class="newslogo">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/news.png">
                <p>公告</p>
            </div>
            <ul>
                <li v-for="(list,index) in lists" :key="index" @click="tonewsdetail(list)" >
                    <time>{{list.publishTime | date}}</time>
                    <p class="dian">{{list.newsTitle}}</p>
                </li>
            </ul>
        </div> -->
  </div>
</template>

<script>
import network from "@/api/index";
import moment from "moment";
export default {
  data() {
    return {
      lists: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let param = {
        platformType: 1,
        pageNum: 1,
        pageSize: 999,
        search: "",
      };
      let res = await network.selectPlatformNews({ data: param });
      if (res == "error") return;
      let arr = (res && res.list) || [];
      for (var i = 0; i < arr.length; i += 2) {
        this.lists.push(arr.slice(i, i + 2));
      }
    },
    tonewsdetail(item) {
      let routeUrl = this.$router.resolve({
        path: "/newsdetail",
        query: { id: item.id, platformType: true },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
  filters: {
    date(val) {
      if (!val) return "";
      return moment(parseInt(val)).format("YYYY.MM.DD");
    },
  },
};
</script>

<style lang="less" scoped>
.fastnews {
  width: 1172px;
  background: #ed1e26;
  height: 114px;
  margin: 0 auto 50px;
  text-align: left;
  .newslogo {
    width: 99px;
    display: inline-block;
    vertical-align: top;
    img {
      display: block;
      height: 33px;
      margin: 26px auto 6px;
    }
    p {
      font-size: 20px;
      line-height: 27px;
      color: #ffffff;
      text-align: center;
    }
  }
  ul {
    width: 1068px;
    height: 97px;
    background: #f2f7f7;
    text-align: left;
    padding: 24px 71px 21px;
    float: right;
    li {
      width: 100%;
      font-size: 15px;
      line-height: 20px;
      color: #4a4a4a;
      margin-bottom: 12px;
      &:nth-child(2) {
        margin-bottom: 0;
      }
      p {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        width: 820px;
      }
    }
  }
}
</style>
