<template>
  <div class="home">
    <div class="netSuiteProject">
      <div class="banner">
        <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/banner_img03.png" class="banner_img">
        <div class="banner_main">
          <div class="zhan"></div>
          <div class="banner_title">
            <h2>竞赛规程</h2>
            <h3>COMPETITION RULES</h3>
          </div>
        </div>
      </div>

      <div class="content">
        <div v-for="(list,index) in lists" :key="index">
          <h1 v-html="list.name"></h1>
          <p v-html="list.intro"></p>
        </div>
      </div>

      <!--footer-->
      <div class="footer" style="position:relative;">
        <div class="container">
          <div class="footerTextContent">
            <p class="footerFont">中国高校计算机大赛(C4)举办方对比赛持有最终解释权，对于任何侵权行为，我们将保留追究侵权者法律责任的权利。</p>
            <p class="footerFont">
              联系我们:
              <a href="mailto:netcontest@wzu.edu.cn">netcontest@wzu.edu.cn</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/api/index";
export default {
  data() {
    return {
      lists: []
    };
  },
  components: {},
  async created() {
    var id = this.$route.params.id;
    let list = await network.getdetail({ data: { competitionId: id } });
    if (list == "error") return;

    this.lists = list;
  }
};
</script>

<style lang="less" scoped>
.home {
  .netSuiteProject {
    .banner {
      width: 100%;
      position: relative;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .banner_main {
        max-width: 1200px;
        height: 251px;
        margin: 0 auto;

        .zhan {
          width: 100%;
          height: 90px;
        }

        .banner_title {
          h2 {
            font-size: 38px;
            color: #fff;
            font-weight: normal;
          }
          h3 {
            font-size: 18px;
            color: #fff;
            margin-top: 10px;
            font-weight: normal;
          }
        }
      }
    }

    .content {
      width: 1200px;
      min-height: calc(100vh - 251px - 112px - 160px - 60px);
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 30px 60px 30px;
      margin: 80px auto;

      h1 {
        font-size: 36px;
        font-weight: 600;
        margin: 0 auto;
        text-align: center;
        margin: 60px 0 30px 0;
      }
      p {
        text-align: left;
        font-size: 12px;
        line-height: 1.7em;
        color: #999;
        border-bottom: 1px solid #ccc;
        margin: 20px 0 20px;
      }
    }

    .footer {
      width: 100%;
      height: 112px;
      background: #111;
      color: #666;

      .container {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        padding: 0;

        .footerTextContent {
          padding: 20px 0;

          p:last-child {
            margin-bottom: 0;
          }
        }
        .footerFont {
          font-size: 12px;
          color: #666;
          line-height: 34px;
          margin-bottom: 0;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
