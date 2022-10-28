<template>
  <div class="home">
    <div class="netSuiteProject">
      <div class="banner">
        <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/banner_img03.png" class="banner_img">
        <div class="banner_main">
          <div class="zhan"></div>
          <div class="banner_title">
            <h2>大赛动态</h2>
            <h3>Competition news</h3>
          </div>
        </div>
      </div>
      <div class="content">
        <newDetails :stateData="stateData"/>
      </div>
    </div>
  </div>
</template>

<script>
import newDetails from '@@/views/issue/detail'
import network from '@@/api/jxapi/index'
export default {
  data() {
    return {
      news: {},
      stateData:{}
    };
  },
  components: {
    newDetails
  },
  async created() {
   let id = this.$route.query.id;
   let newsDetail = await network.getNewsDetail({data:{id:id}});
    if(newsDetail=='error') return;
    this.stateData = {
        newsId: newsDetail.id,
        title: newsDetail.newsTitle,
        news: newsDetail.newsInfo,
        icon: newsDetail.newsIcon,
        publishTime: newsDetail.publishTime,
        tags: newsDetail.newsType.split(',')
    }
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
      min-height: 900px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 1px;
      margin: 0 auto;
    }
  }
}
</style>
