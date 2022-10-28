<template>
  <div>
    <!-- 引导，全屏滚动 -->
    <div
      id="conduct"
      class="conduct"
      v-if="imgShow"
      @mouseover="clearIntervals"
      @mouseleave="animate"
    >
      <i class="el-icon-close" @click="close"></i>
      <img @click="toconduct" src="./img.gif" width="300px" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgShow: true,
      interval: "",
      i: 15,
      j: 20,
      top: 0,
      left: 0,
    };
  },
  created() {
    this.$nextTick(() => {
      this.animate();
    });
  },
  beforeDestroy() {
    this.clearIntervals();
  },
  methods: {
    toconduct() {
        window.open("https://cc.moocollege.com/#/searchCert");
    },
    close() {
      this.imgShow = false;
      this.clearIntervals();
    },
    clearIntervals() {
      clearInterval(this.interval);
    },
    animate() {
      let cwidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      let cheight =
        window.innerHeight ||
        window.screen.height ||
        document.body.clientHeight ||
        document.documentElement.clientHeight;
      let box = document.getElementById("conduct");
      if (!box) return;
      let width = box.clientWidth;
      let height = box.clientHeight;
      this.interval = setInterval(() => {
        let top = box.offsetTop,
          left = box.offsetLeft;

        if (left + width + Math.abs(this.j) > cwidth) {
          this.j = -Math.abs(this.j);
        }
        if (left - Math.abs(this.j) < 0) {
          this.j = Math.abs(this.j);
        }
        if (top + height + Math.abs(this.i) > cheight) {
          this.i = -Math.abs(this.i);
        }
        if (top - Math.abs(this.i) < 0) {
          this.i = Math.abs(this.i);
        }
        box.style.left = left + this.j + "px";
        box.style.top = top + this.i + "px";
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.conduct {
  width: auto;
  height: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  transition: 0.5s all linear;
  i {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20px;
    // background: #ffffff;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
  }
  img {
    cursor: pointer;
  }
}
</style>
