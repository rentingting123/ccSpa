<template>
  <div>
    <ul class="videoList">
      <li
        class="videoItem"
        v-for="item in datas"
        :key="item.id"
        :class="{ on: item.id == id }"
        @click="choose(item)"
      >
        <img class="img" v-if="item.id == id" src="@/nskin/assets/img/tabsIcon5.png" />
        <div class="activityTitle">{{ item.activityTitle }}</div>
        <div class="line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["datas", "page", "close", "changePage", "id", "nextPage"],
  data() {
    let this_ = this;
    return {
      swiperOptions: {
        loop: false,
        direction: "vertical",
        preventClicks: false, //用于防止触摸时触发链接跳转
        slideToClickedSlide: true,
        slidesPerView: 6,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        on: {
          click: function (e) {
            if (e.clickedIndex == 0 || e.clickedIndex) {
              this_.choose(this_.datas[e.clickedIndex]);
            }
          },
        },
      },
    };
  },
  methods: {
    prev() {
      if (this.page <= 1) return;
      this.changePage && this.changePage(this.page - 1);
    },
    next() {
      if (this.nextPage == 0) return;
      this.changePage && this.changePage(this.page + 1);
    },
    choose(item) {
      this.close && this.close(item);
    },
  },
  filters: {
    times(val) {
      if (!val) return;
      return moment(val).format("YYYY/MM/DD HH:mm");
    },
  },
};
</script>

<style lang="less" scoped>
.videoList {
  width: 400px;
  height: 454px;
  overflow: hidden;
  background: #fff;

  .videoItem {
    width: 352px;
    height: 67px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    position: relative;
    .img {
      position: absolute;
      left: 20px;
    }
    .activityTitle {
      font-size: 22px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      line-height: 24px;
      margin-left: 6px;
      text-align: left;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  .line {
    width: 10px;
    height: 67px;
    background: #ffe4e5;
    float: right;
    margin-left: 16px;
  }
  .on {
    .activityTitle {
      color: #d60d16;
    }
    .line {
      background: #e62129;
      border-radius: 18px;
    }
  }
}
</style>
