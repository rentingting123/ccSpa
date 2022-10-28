<template>
  <div>
    <navs :lists="lists" />

    <router-view class="view" />
  </div>
</template>

<script>
import navs from "@/npskin/view/datacenter/navs";
import { getWebInfo } from '@/common/common.js'
export default {
  components: {
    navs
  },
  created(){
    let info = getWebInfo();
    this.lists = info && info.navsList || this.listss
    this.$set(this.lists[6],'name','系列赛')
  },
  data() {
    return {
      lists: [],
      listss: [
        {
          name: "首页",
          id: 0,
          show: true,
          path: "/home"
        },
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
          name: "赛事回顾",
          id: 24,
          show: true,
          path: "/datacenter/half/eventreview"
        },
        // {
        //   name: "历届作品",
        //   id: 25,
        //   path: "/datacenter/eventreview"
        // },
        {
          name: "成果展示",
          id: 321,
          path: "/datacenter/previousworks",
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
          name: "系列赛",
          id: 6,
          show: true,
          path: "/datacenter/divisionseries"
        },
        {
          name: "媒体社评",
          id: 27,
          show: true,
          path: "/datacenter/news/mediaeditorial"
        },
        {
          name: "指导培训",
          id: 8,
          show: true,
          path: "/datacenter/trainingsession"
        },
        {
          name: "我要投稿",
          id: 9,
          show: true,
          path: "/datacenter/contribute",
             childs: [
            {
              name: "心路历程",
              id: 90,
              path: "/datacenter/contribute/0"
            },
            {
              name: "科教协同",
              id: 91,
              path: "/datacenter/contribute/1"
            },
            {
              name: "研究论文",
              id: 92,
              path: "/datacenter/contribute/2"
            },
            {
              name: "总结交流",
              id: 93,
              path: "/datacenter/contribute/3"
            },
            {
              name: "媒体社评",
              id: 94,
              path: "/datacenter/contribute/4"
            },
            {
              name: "赛事简讯",
              id: 95,
              path: "/datacenter/contribute/5"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.view {
  min-height: calc(100vh - 300px - 38px - 37px);
}
</style>