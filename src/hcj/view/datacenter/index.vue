<template>
  <div class="news">
    <ul class="main">
      <li
        class="mainLi"
        v-for="list in lists"
        :key="list.id"
        v-if="list.show"
        :class="{ 'on': path.indexOf(list.path) > -1 }"
      >
        <div style="margin: 10px 0;" @click="$router.push(list.childs ? list.childs[0].path : list.path)">{{ list.name }}</div>
        <ul class="sub" v-if="list.childs">
          <li
            v-for="l in list.childs"
            :key="l.id"
            :class="{ 'onsub': path == l.path }"
            @click="$router.push(l.path)"
          >{{ l.name }}</li>
        </ul>
      </li>
    </ul>
    <router-view class="newsDetail" />
  </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
  data() {
    return {
      lists: [
        {
          name: "赛事回顾",
          id: 24,
          show: true,
          path: "/datacenter/half/eventreview"
        },
        {
          name: "成果展示",
          id: 20,
          show: true,
          path: "/datacenter/half/filesystem",
          childs: [
            {
              name: "创新成果集",
              id: 32,
              path: "/datacenter/half/filesystem/32"
            },
            {
              name: "竞赛通讯",
              id: 33,
              path: "/datacenter/half/filesystem/33"
            },
            {
              name: "竞赛成果奖",
              id: 34,
              path: "/datacenter/half/filesystem/34"
            }
          ]
        },
        {
          name: "历届作品",
          id: 25,
          show: true,
          path: "/datacenter/half/excellenceworks"
        },
        {
          name: "赛事简讯",
          id: 31,
          show: true,
          path: "/datacenter/half/communication"
        },
         {
          name: "优秀作品集",
          // id: 35,
          show: true,
          path: "/datacenter/half/previousworks"
        },
      ]
    };
  },
  methods: {
    handleOpen() { },
    handleClose() { }
  },
  created() {
    this.path = this.$route.path;
    let arr = getWebInfo();
    if (arr && arr.navsList) {
      if (arr.navsList[4].show == false) {
        this.$set(this.lists[0], 'show', false)
      }
      if (arr.navsList[5].show == false) {
        this.$set(this.lists[1], 'show', false)
      }
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path || "/datacenter/news/organization";  
    }
  }
};
</script>

<style lang="less" scoped>
.news {
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  padding: 20px 67px 20px 118px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .main {
    .mainLi {
      text-align: center;
      width: 190px;
      height: 41px;
      line-height: 41px;
      font-size: 16px;
      color: #4a4a4a;
      letter-spacing: 1.45px;
      border-bottom: 1px dashed #e1e1e1;
      cursor: pointer;
      &:hover {
        background: #bb0294;
        color: #ffffff;
        border-bottom: 0px dashed #e1e1e1;
        height: auto;
      }
    }
    li.on {
      background: #bb0294;
      color: #ffffff;
      border-bottom: 0px dashed #e1e1e1;
      height: auto;
    }
  }
  .newsDetail {
    min-width: 852px;
    height: 100%;
  }
  .sub {
    display: none;
  }
  .on {
    .sub {
      display: block;
      background-color: #d8d8d8;
      color: #000;
      & > li {
        &:hover {
          color: #000000;
        }
      }
      .onsub {
        color: #000000;
      }
    }
  }
}
</style>