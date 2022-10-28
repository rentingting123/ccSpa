<template>
  <div class="ContestDynamic">
    <div class="container" id='demo' ref='demo'>
      <div class="titleContent">
        <h3>{{$t('skin.competitionNews')}}</h3>
        <p>COMPETITION NEWS</p>
      </div>
      <div class="newsWrapper" id="demo2">
        <div
          v-for="n in news"
          :key="n.id"
          class="mainWrapper"
          @click="$router.push({path:'/newsDetail',query:{id:n.id,type:'show'}})"
        >
          <img class="img_auto" :src="n.newsIcon" alt>
          <div class="main">
            <div class="module">
              <h3>{{n.newsTitle}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="shadowBox">
        <img class="img_auto" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/shadowBox.png" alt>
      </div>
      <div class="MoreLink">
        <a target="_blank" class="LinkOther" @click="$router.push('/news')">{{$t('skin.moreNews')}}</a>
      </div>
    </div>
    <img :src="imgdemo" width="600" v-if="imgdemo" alt="">
  </div>
</template>

<script>
import network from '@@/api/jxapi/index'
export default {
  data(){
    return{
      news:[],
      type:'',
      page:1,
      pageSize:3,
      imgdemo:''
    }
  },
  computed:{
    id(){
      return this.$store.state.skin.id
    }
  },
  async created(){
    let params={
        competitionId:this.id,
        type:this.type,
        pageNum:this.page,
        pageSize:this.pageSize
    }
    let newslist = await network.getNewsList({data:params})
    if(newslist=='error') return;
    this.news = newslist.pageData;
  } 
}
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
        width: 375px;
        height: 284px;
        margin-top: 20px;
        padding: 0 10px;
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
            min-height: 70px;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0)
            );

            h3 {
              font-size: 14px;
              text-align: center;
              color: #fff;
              padding: 0 12px;
              font-weight: normal;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 20px;
              margin-bottom: 10px;
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

    .MoreLink {
      text-align: center;
      
      a {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #fff !important;
        background: #111 !important;
        font-size: 14px;
        text-align: center;
        margin: 10px auto;
        border: 1px solid #111111;
        transition: all ease 0.3s;
      }
    }
  }
}
</style>


