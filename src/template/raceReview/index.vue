<template>
  <div class="ContestReview PaddingSpacing">
    <div class="container">
      <div class="titleContent">
        <h3>{{$t('skin.raceReview')}}</h3>
        <p>COMPETITION REVIEW</p>
      </div>
       <vue-preview :slides="preView" class="ReviewImg clearFloat" ></vue-preview>
      <!-- <ul class="ReviewImg clearFloat">
        <li v-for="(list,index) in lists" :key="index">
          <img class="img_auto" :src="`${list.url}@!smaill_competitionReview`" alt>
        </li>
      </ul> -->
    </div>
       <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      <reviewEdit :list="lists"></reviewEdit>
    </div>
  </div>
</template>

<script>
import reviewEdit from './edit.vue'
import jxapi from '@/api/index'
export default {
  components:{reviewEdit},
  data() {
    return {
      lists: [],
      preView:[],
    };
  },
  created() {
    this.getReview()
  },
  methods:{
    async getReview(){
      let _list = await jxapi.reviewList()
      if(_list == 'error')return 
      this.lists = _list
      this.preView = _list.map(item=>{
        return {
            src: item.url+'@!preview',
            msrc: item.url+'@!smaill_competitionReview',
            alt: item.name,
            title: item.name,
            w: 1200,
            h: 675
        }
      })
    }
  }
};
</script>

<style lang='less'>
.my-gallery{
  figure{
    display: inline-block;
    margin-bottom: 20px;
    margin-right: 19px;
    &:nth-child(4n){
      margin-right: 0;
    }
  }
}
</style>

<style lang="less" scoped>
.ContestReview {
  /*background: url('../images/ReviewBG.png') center 0 no-repeat;*/
  padding-bottom: 75px;
  position: relative;
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 0;

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
  }

  .ReviewImg {
    li {
      float: left;
      width: 23.8%;
      height: 189px;
      margin-right: 1.6%;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
      position: relative;

      img {
        height: 100%;
        width: 100%;
      }
    }

    li:nth-child(4n) {
      margin-right: 0;
    }

    li:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      transition: all ease 0.4s;
    }

    li:hover:after {
      background: rgba(0, 0, 0, 0);
    }
  }

  .MiddleTitle {
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    padding: 14px 0;
    .Subtitle.SubtitleEn {
      margin: 10px 0 0;
    }
  }

  .PreviousWorks {
    li {
      float: left;
      position: relative;
      width: 20.2%;
      margin-right: 6.4%;
      overflow: hidden;
    }
    li:last-child {
      margin-right: 0;
    }
  }
}
</style>
