<template>
  <div class="active" v-if="lists.length>0">
    <h2 class="title" >
      <p>赛事回顾</p>
      <span @click="$router.push('/datacenter/half/eventreview')">more</span>
    </h2>

    <div id="demo7" @mouseover="clearinter" @mouseleave="start">
      <ul id="demo8">
        <li v-for="list in listX" @click="$router.push('/datacenter/newsdetail?id='+list.id)">
          <img :src="list.newsIcon" width="100%" height="100%" />
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import network from "@/api";
export default {
  data() {
    return {
      lists: [],
      listX: [],
      setinter: ""
    };
  },
  async created() {
    let id = localStorage.getItem("groupId");
    let res = await network.npgetNewsList({
      data: {
        groupId: id,
        type: 24,
        pageNum: 1,
        pageSize: 4
      }
    });
    if (res == "error") return;
    this.lists = res.pageData || [];
    this.listX = res.pageData;
    if(this.lists.length>0){
      this.$nextTick(this.start);
    }
    //this.start();
  },
  beforeDestroy() {
    this.clearinter();
  },
  methods: {
    start(rep) {
      // if(this.lists.length<5) return;
      let lengths = document.getElementById("demo8").offsetWidth;
      let showlengths = document.getElementById("demo7").offsetWidth;

      if (lengths < 2 * showlengths && lengths > showlengths)
        this.listX = this.listX.concat(this.lists);
      else if (lengths < showlengths) return;
      if (rep == "rep")
        document.getElementById("demo8").style.left =
          "-" + (lengths / 2 - showlengths) + "px";

      clearInterval(this.setinter);
      this.setinter = setInterval(() => {
        let left = document.getElementById("demo8").offsetLeft;
        if (lengths - showlengths <= Math.abs(left)) {
          this.start("rep");
        } else {
          document.getElementById("demo8").style.left = left - 1 + "px";
        }
      }, 30);
    },
    clearinter() {
      clearInterval(this.setinter);
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  width: 440px;
  overflow: hidden;
  position: relative;
  > div {
    width: 100%;
    height: 106px;
    overflow: hidden;
    position: relative;
    ul {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      overflow: hidden;
      margin-top: 16px;
      text-align: left;
      li {
        display: inline-block;
        vertical-align: top;
        width: 187px;
        height: 106px;
        margin-right: 24px;
        cursor: pointer;
      }
    }
    p {
      width: 55px;
      height: 106px;
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 100%
      );
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>