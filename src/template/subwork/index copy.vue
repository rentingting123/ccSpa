<template>
  <div class="ContestDynamic">
    <div class="container">
      <div class="titleContent">
        <h3>往届作品展示</h3>
        <p>WORKS SHOW</p>
      </div>
      <div class="newsWrapper">
        <div v-for="n in news" :key="n.id" class="mainWrapper">
          <img v-if="n.bannerUrl" class="img_auto" :src="n.bannerUrl" alt />
          <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/bannerurl.jpg" class="img_auto" />

          <div class="main">
            <div class="module">
              <h3>{{n.title}}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="shadowBox">
        <img class="img_auto" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/shadowBox.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import network from "@@/api/jxapi/index";
import { getUserInfo } from "@@/utils/commons";

export default {
  data() {
    return {
      news: [],
      type: "",
      page: 1,
      pageSize: 3,
      user: {}
    };
  },
  computed: {
    id() {
      return this.$store.state.skin.id;
    }
  },
  async created() {
    this.getList();
  },
  methods: {
    async getList(keyword, sort) {
      this.user = this.$store.state.skin.competitionDetail;

      var obj = {
        pageNum: this.page,
        pageSize: this.pageSize,
        selfGroupId: this.user.authorGroupId,
        competitionId: this.id
      };
      if (keyword && keyword != "") {
        obj["q"] = keyword;
      }
      if (sort && sort != "") {
        obj["sort"] = sort;
      }

      let poolQuery = await network.getPoolQuery({ data: obj });
      if (poolQuery == "error" || !poolQuery) return;
    }
  }
};
</script>

<style lang="less" scoped>
.ContestDynamic {
  width: 100%;

  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .titleContent {
      width: 100%;
      text-align: center;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
      }
    }

    .newsWrapper {
      width: 100%;

      .mainWrapper {
        display: inline-block;
        width: 370px;
        height: 206px;
        margin-top: 20px;
        padding: 0 15px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          float: left;
        }

        .main {
          width: 100%;
          height: 100%;
          position: relative;

          .module {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            background-image: linear-gradient(
              -180deg,
              rgba(0, 0, 0, 0) 0%,
              #000000 100%
            );

            h3 {
              color: #fff;
              font-weight: normal;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 20px;
              margin-bottom: 10px;
              font-size: 16px;
              color: #ffffff;
              text-align: left;
              text-indent: 20px;
            }
          }
        }
      }
    }

    .shadowBox {
      margin-top: 10px;

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>


