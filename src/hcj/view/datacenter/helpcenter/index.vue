<template>
  <div class="news">
    <ul class="main">
      <li class="mainLi" v-for="list in lists" :key="list.id" v-if="list.show" :class="{'on':path.indexOf(list.path)>-1}">
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
    <div class="newsDetail" >
        <a href="https://competition-web.oss-cn-hangzhou.aliyuncs.com/mooc/hzq/vueskin/hcj/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%982022.pdf" target="_blank">华灿奖常见问题.pdf 下载</a>
        <a href="https://web.moocollege.com/mooc/hzq/vueskin/hcj/%E2%80%9C%E7%AC%AC%E5%85%AB%E5%B1%8A%E4%B8%A4%E5%B2%B8%E6%96%B0%E9%94%90%E8%AE%BE%E8%AE%A1%E7%AB%9E%E8%B5%9B%E2%80%A2%E5%8D%8E%E7%81%BF%E5%A5%96%E2%80%9D%E8%B5%9B%E5%8C%BA%E8%B5%9B%E5%8F%82%E8%B5%9B%E6%8C%87%E5%8D%97.pdf" target="_blank">“第八届两岸新锐设计竞赛•华灿奖”赛区赛参赛指南.pdf</a>
        <!-- <a href="http://web.moocollege.com/mooc/hzq/vueskin/hcj/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%9820210810.pdf" target="_blank">华灿奖常见问题.pdf 下载</a> -->
        <!-- <a href="http://web.moocollege.com/mooc/hzq/vueskin/hcj/%E5%8D%8E%E7%81%BF%E5%A5%96%E6%8A%95%E7%A8%BF%E6%8C%87%E5%8D%9720210810.pdf" target="_blank">华灿奖投稿指南.pdf 下载</a> -->
        <FileReview url="https://competition-web.oss-cn-hangzhou.aliyuncs.com/mooc/hzq/vueskin/hcj/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%982022.pdf" />
        <!-- <FileReview url="http://web.moocollege.com/mooc/hzq/vueskin/hcj/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%9820210810.pdf" /> -->
    </div>
  </div>
</template>

<script>
import FileReview from "@@/components/fileReview";
export default {
  components:{
    FileReview,
  },
  data() {
    return {
        lists: [
            {
            name: "常见问答",
            id: 24,
            show: true,
            path: "/datacenter/helpcenter"
            },
        ],
    };
  },
  methods: {
  },
  created() {
      this.path = this.$route.path;
  },
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
  .newsDetail {
    min-width: 852px;
    height: 100%;
    text-align: center;
    a{
      display: block;
      color: -webkit-link;
    }
  }
  
}
</style>