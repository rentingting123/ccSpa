<template>
  <div>
    <h2 class="title">
      <p>作品展出</p>
    </h2>
    <ul class="yearslist">
      <li
        v-for="(item, index) in navs"
        :key="item.id"
        :class="index == on ? 'on' : ''"
        @click="on = index"
      >
        {{ item.times }}
        <p></p>
      </li>
      <li @click="toMore">更多</li>
    </ul>
    <ul class="workslist">
      <li v-for="list in lists" :key="list.id">
        <a :href="list.link">
          <img :src="list.img" />
          <div class="mess">
            <h2 class="dian" :title="list.name" v-if="list.name">
              {{ list.name }}
            </h2>
            <p class="dian" :title="list.type" v-if="list.type">
              参赛类别：{{ list.type }}
            </p>
            <p class="dian" :title="list.author" v-if="list.author">
              作者：{{ list.author }}
            </p>
            <p class="dian" :title="list.company" v-if="list.company">
              单位：{{ list.company }}
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import works from "@/hcj/mock/works.js";
export default {
  data() {
    return {
      navs: works,
      on: "0",
    };
  },
  methods: {
    toMore() {
      this.$router.push("/datacenter/half/excellenceworks");
      // this.$router.push('/datacenter/half/previousworks')
    },
  },
  computed: {
    lists() {
      return this.navs[this.on].lists || [];
    },
  },
};
</script>

<style lang="less" scoped>
.yearslist {
  width: 100%;
  height: auto;
  margin: 17px 0 19px;
  display: flex;
  justify-content: center;
  align-content: center;
  li {
    position: relative;
    font-size: 16px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 22px;
    letter-spacing: 1px;
    margin: 0 23px;
    cursor: pointer;
    p {
      display: none;
      width: 0;
      height: 0;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-bottom: 5px solid rgba(159, 5, 33, 1);
      text-align: center;
      position: absolute;
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.on {
      color: #bb0294;
      p {
        display: block;
      }
    }
  }
}
.workslist {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 37px;
  text-align: left;
  li {
    width: 290px;
    height: 231px;
    &:hover {
      .mess {
        h2 {
          color: #bb0294;
        }
      }
    }
    img {
      width: 290px;
      height: 163px;
    }
    .mess {
      width: 100%;
      height: 86px;
      background: rgba(245, 245, 245, 1);
      padding: 5px 8px;
      h2 {
        font-size: 14px;
        font-weight: bold;
        color: rgba(74, 74, 74, 1);
        line-height: 20px;
        letter-spacing: 1px;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: rgba(118, 122, 125, 1);
        line-height: 18px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
