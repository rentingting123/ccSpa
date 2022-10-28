<template>
  <div class="header">
    <div class="top">
      <img :src="logo" class="logo" @click="$router.push('/')" />
      <ul>
        <li v-for="list in navs" :key="list.path" @click="todetail(list)" :class="{ on: path == list.path }">
          {{ list.name }}
        </li>
      </ul>
    </div>
    <div class="mess">
      <div>
        <span @click="toDataService">数据服务入口</span>
        <span @click="toCC">主办方入口</span>
        <span @click="tologin">管理员入口</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBaseInfo } from "@/common/common.js";
export default {
  props: ["path"],
  mounted() {
    this.init();
  },
  computed: {
    islogin: {
      get() {
        return this.$store.state.islogin;
      },
      set(val) {
        this.$store.state.islogin = val;
      }
    }
  },
  data() {
    return {
      logo:
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/logo20210512.png",
      navs: [
        {
          name: "首页",
          path: "/",
          id: 1
        },
        {
          name: '竞赛博览会',
          path: '/competitionExpo',
          id: 8
        },
        {
          name: "竞赛赋能",
          path: "/empowerment",
          id: 6
        },
        {
          name: "竞赛排行",
          path: "/competition",
          id: 7
        },
        {
          name: "教发指数",
          path: "/development",
          id: 2
        },
        // {
        //     name: '学生竞赛',
        //     path: '/assessment',
        //     id: 3
        // },
        {
          name: "新闻资讯",
          path: "/newslist",
          id: 4
        }
      ]
    };
  },
  methods: {
    init() {
      let baseInfo = getBaseInfo();
      if (!baseInfo) return;
      // if(baseInfo.logoFile){
      //     this.logo = baseInfo.logoFile
      // }
    },
    todetail(list) {
      if (list.out) {
        window.open(list.path);
      } else {
        this.$router.push(list.path);
      }
      if (this.path == "/") {
        this.$store.state.showads = false;
      }
    },
    toDataService() {
      window.open(
        "https://login.moocollege.com/?service=https%3A%40%40cc.moocollege.com%40%24%40"
      );
    },
    toCC() {
      window.open("http://cc.moocollege.com/");
    },
    tologin() {
      window.open("http://rankadmin.moocollege.com/");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background: #ffffff;
  padding-bottom: 20px;

  .top {
    width: 1280px;
    height: 78px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 485px;
      height: auto;
      cursor: pointer;
      position: relative;
      top: 8px;
    }

    ul {
      padding-right: 14px;

      li {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        line-height: 24px;
        font-size: 18px;
        color: #252223;
        padding: 0 12px;
        margin: 34px 6px 20px;
        cursor: pointer;

        &.on {
          color: #ed1e26;
        }

        &:last-child {
          padding-right: 0;
          margin-right: 0;
        }
      }
    }
  }

  .mess {
    width: 1280px;
    height: 24px;
    margin: 0 auto;
    padding: 0 40px;
    text-align: right;

    >div {
      height: 24px;
      font-size: 18px;
      line-height: 24px;
      color: #869695;
      padding-right: 14px;

      span {
        margin-left: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>
