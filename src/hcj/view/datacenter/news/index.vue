<template>
  <div class="news">
    <ul class="main">
      <li class="mainLi"
        v-for="list in lists"
        :key="list.id"
        v-if="list.show"
        :class="{'on':path.indexOf(list.path)>-1}"
      >
        <div  @click="$router.push(list.childs?list.childs[0].path:list.path)">{{list.name}}</div>
        <ul class="sub" v-if="list.childs">
          <li
            v-for="l in list.childs"
            :key="l.id"
            :class="{'onsub':path==l.path}"
            @click="$router.push(l.path)"
          >{{l.name}}</li>
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
          name: "组织机构",
          id: 21,
          show: true,
          path: "/datacenter/news/organization"
        },
        {
          name: "制度文件",
          id: 20,
          show: true,
          path: "/datacenter/news/filesystem",
          childs: [
            {
              name: "章程细则",
              id: 201,
              path: "/datacenter/news/filesystem/29"
            },
            {
              name: "文件通知",
              id: 202,
              path: "/datacenter/news/filesystem/30"
            }
          ]
        },
        {
          name: "赛事动态",
          id: 22,
          show: true,
          path: "/datacenter/news/dynamicevents"
        },
        {
          name: "媒体社评",
          id: 27,
          show: true,
          path: "/datacenter/news/mediaeditorial"
        }
      ],
      path: "/datacenter/news/organization"
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  },
  created() {
    this.path = this.$route.path;
    let arr = getWebInfo();
    if(arr && arr.navsList){
      if(arr.navsList[1].show==false){
        this.$set(this.lists[0],'show', false)
      }
      if(arr.navsList[2].show==false){
        this.$set(this.lists[1],'show', false)
      }
      if(arr.navsList[3].show==false){
        this.$set(this.lists[2],'show', false)
      }
      if(arr.navsList[7].show==false){
        this.$set(this.lists[3],'show', false)
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
  padding: 20px 118px;
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
        background: #BB0294;
        color: #ffffff;
        border-bottom: 0px dashed #e1e1e1;
        height: auto;
      }
    }
    li.on {
      background: #BB0294;
      color: #ffffff;
      border-bottom: 0px dashed #e1e1e1;
      height: auto;
    }
  }
  .newsDetail {
    min-width: 830px;
    height: 100%;
  }
  .sub {
    display: none;
  }
  .on {
    .sub {
      display: block;
      background-color: #d8d8d8;
      color:#000;
    &>li{
        &:hover{
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