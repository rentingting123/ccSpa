<template>
  <div class="compdetail">
      <div class="top-logo">
        <img src="https://web.moocollege.com/mooc/moocollege/toplogo.png" />
      </div>
      <div class="vv-wrapper">
        <div class="video-wrapper">
          <div class="video" v-if="navList.length > 0">
            <video
              :src="videoSrc"
              playsinline
              playauto
              controls
              webkit-playsinline="true"
              playsInline="true"
              x5-playsInline="true"
              controlslist="nodownload"
              :poster="videoData.videoBanner">
            </video>
          </div>
          
        </div>
      </div>

      <div class="content">
        <div class="name">{{detailData.competitionName}}</div>
        <div class="nav">
          <span v-for="(item, index) in navList" @click="changeVideo(index)" :class="{'active': videoIndex == index}">
            {{item.name.length > 4 ? item.name.slice(0, 4) : item.name}}
          </span>
        </div>
        
        <div class="bg bg1">
            <card title="举办单位" >
              <p>
                <span class="mess1">主办单位</span>
                <span class="mess">{{detailData.sponsor}}</span>
              </p>
              <p>
                <span class="mess1">指导单位</span>
                <span class="mess"></span>
              </p>
              <p>
                <span class="mess1">承办单位</span>
                <span class="mess">{{detailData.undertake}}</span>
              </p>
            </card>
        </div>

        <div class="bg bg2">
            <card title="竞赛介绍" >
              <p class="mess">{{detailData.competitionInfo}}</p>
            </card>
        </div>
        
        <div class="bg bg3">
          <card title="竞赛影响力">
            <p class="mess">{{detailData.influence}}</p>
          </card>
        </div>
        
        <div class="bg bg4">
          <card title="竞赛赛程">
            <span class="mess">{{detailData.schedule}}</span>
          </card>
        </div>
        
        <div class="bg bg5">
          <card title="信息类资料">
            <div class="msg wrap mess">
              <div>
                <span class="subtitle">竞赛网站</span>
                <span>{{detailData.competitionUrl || "/"}}</span>
              </div>
    
              <div>
                <span class="subtitle">秘书处单位</span>
                <span>{{detailData.secretary || '/'}}</span>
              </div>
    
              <div>
                <span class="subtitle">秘书处地址</span>
                <span>{{detailData.secretaryAddress || '/'}}</span>
              </div>
    
              <div>
                <span class="subtitle">秘书处电话</span>
                <span>{{detailData.secretaryPhone || '/'}}</span>
              </div>
    
              <div>
                <span class="subtitle">邮箱</span>
                <span>{{detailData.email || '/'}}</span>
              </div>
    
            </div>
          </card>
        </div>

        <div class="bg6">
          <div v-for="(item, index) in photoInfo" class="photo">
            <img :src="item.url + '!wx-banner'" @click="clickImg(item)" />
          </div>
        </div>

        <!-- <div class="logo">
          <img src="https://web.moocollege.com/mooc/moocollege/logo.png"/>
        </div> -->

      </div>

  </div>
</template>

<script>
import network from '@/mnskin/api/index';
import card from './card'

export default {
  components: { card },
  data() {
    return {
      competitionId: '',
      detailData: {},
      navList: [],
      videoIndex: 0,
      videoSrc: '',
      photoInfo: [],
      videoData: {},
    }
  },
  created() {
    this.competitionId = this.$route.params.id;
    if(!this.competitionId) return;

    this.getVideoData();
    this.getDetailData();

    // console.log(this.videoSrc)
    // console.log(detailData);
    // console.log(JSON.parse(videoData[0].videoInfo))
  },
  mounted() {
  },
  methods: {
    clickImg(item) {
      window.open(item.url)
    },
    initVideo() {
      let video = document.querySelector('video');
      if (!video) return;
      enableInlineVideo(video);
      video.addEventListener('touchstart', function () {
        video.play();
      });
    },

    async getVideoData() {
      let videoData = await network.selectCompetitionActivity({data: {competitionId: this.competitionId, flag: true}})
      this.videoData = (videoData && videoData[0]) || {};
      this.navList = JSON.parse(this.videoData.videoInfo || '[]');
      this.videoSrc = (this.navList && this.navList[this.videoIndex].url) || '';

      // this.initVideo();
    },

    async getDetailData() {
      let detailData = await network.selectCompetitionEnergize({data: {competitionId: this.competitionId}})
      this.detailData = detailData || {};

      this.photoInfo = JSON.parse(this.detailData.photoInfo || "[]");
    },

    changeVideo(index) {
      this.videoSrc = this.navList[index].url;
      this.videoIndex = index;
    }
  }
}
</script>

<style lang="less" scoped>
.compdetail {
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: left;
  font-size: .32rem;
  line-height: .52rem;
  color: #4a4a4a;
  position: relative;
  
  .top-logo {
    padding: .2rem .4rem;
    img {
      width: 5.6rem;
    }
  }
  .vv-wrapper {
    padding: 0 .32rem;
  }
  .video-wrapper {
    position: relative;
    .banner {
      position: absolute;
      bottom: 0.24rem;
      width: 100%;
      background: #ed1e26;
      opacity: 0.8;
      color: white;
      padding: .12rem 0;
    }
    
    .banner-title {
      font-size: .28rem;
      font-family: PingFangSC-Medium;
      line-height: .4rem;
      text-align: center;
    }
    
    .banner-bottom {
      text-align: center;
      font-size: .1rem;
      font-family: PingFangSC-Medium;
      line-height: .2rem;
      .banner-left {
        margin-right: .4rem;
      }
    }
  }
  
  .bg{
      position: relative;
      padding: 0 .3rem;
      font-size: .28rem;
      .mess{
          line-height: .42rem;
          color: #000000;
          letter-spacing: 0.01rem;
      }
      .mess1 {
        color: #000;
        font-weight: 800;
        margin-right: .4rem;
      }
  }
  .bg1::before{
      content: '';
      width: 1.26rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg1.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.6rem;
      z-index: 0;
  }
  .bg1::after, .bg2::after, .bg3::after, .bg5::after {
    content: '';
    width: 1.3rem;
    height: .64rem;
    position: absolute;
    background: url('https://web.moocollege.com/mooc/moocollege/bg2.png') no-repeat;
    background-size: cover;
    right: 0;
    bottom: -0.22rem;
  }
  .bg2::before{
      content: '';
      width: 1.36rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg1.png') no-repeat;
      position: absolute;
      left: 0;
      top: -0.56rem;
      z-index: 0;
  }
  .bg3::before {
      content: '';
      width: 1.68rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg6.png') no-repeat;
      position: absolute;
      right: 0;
      top: -0.16rem;
      z-index: 0;
  }
  
  .bg4::before {
      content: '';
      width: 1.68rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg4.png') no-repeat;
      position: absolute;
      left: 0;
      top: -0.64rem;
      z-index: 0;
  }
  
  .bg6 {
    position: relative;
  }
  
  .bg6::before {
      content: '';
      width: 1.68rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg1.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.28rem;
      z-index: -1;
  }
  
  .bg6::after {
      content: '';
      width: 1.68rem;
      height: 1.90rem;
      background: url('https://web.moocollege.com/mooc/moocollege/bg1.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      bottom: -1.12rem;
      z-index: -1;
  }
  

  /* .IIV::-webkit-media-controls-play-button,
  .IIV::-webkit-media-controls-start-playback-button {
      opacity: 0;
      pointer-events: none;
      width: 5px;
  } */

  .video {
    font-size: 0;
    /* padding: 0 0.32rem; */
  }

  video {
    width: 100%;
  }
  .photo {
    position: relative;
    margin-bottom: .1rem;
    padding: 0 .32rem;
    .intro {
      position: absolute;
      bottom: 0;
      font-size: .32rem;
      color: white;
      padding: 0 .13rem;
      width: 100%;
      background: rgba(0, 0, 0, .6);
    }
  }
  .nav {
    text-align: left;
    padding: .17rem 0;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .36rem;
    font-family: PingFangSC-Regular;
    .active {
      border-radius: .02rem;
      color: white;
      background-color: #EB1E26;
    }
    span {
      border-radius: .02rem;
      padding: .20rem 0;
      margin-right: .17rem;
      margin-bottom: .17rem;
      position: relative;
      font-size: .28rem;
      width: 22.3%;
      white-space: nowrap;
      text-align: center;
      background-color: #e6ebeb;

      &:last-child {
        margin-right: 0;
      }
    }
  }

    .logo {
      text-align: center;
      margin-top: .4rem;
      background-color: #606767;
      height: 2.64rem;
      position: relative;
      img {
        width: 3.22rem;
        height: .85rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .bottom {
      width: 1.96rem;
      height:.84rem;

      &.left {
        margin-left: -0.17rem;
      }
      &.right {
        position: absolute;
        right: 0;
      }
    }

    .name {
      text-align: left;
      font-weight: 500;
      font-size: .36rem;
      font-family: PingFangSC-SemiboldN;
      color: #252525;
      position: relative;
      line-height: .48rem;
      /* padding: .17rem 1.96rem 0 .17rem; */
    }
    
    .nav, .name {
      padding-left: .6rem;
      padding-right: .6rem;
    }
    .wrap {
      padding: .14rem 0 .3rem 0;
    }
    .title {
      background-image: linear-gradient(to right, #00A0E9, #EF6A67);
      position: relative;
      line-height: .7rem;
      color: white;
      padding: 0 .13rem;
      font-weight: 500;
      font-size: .38rem;
      border-radius: 0 0 .04rem 0;

      /* &:after {
        content: '';
        width: 0;
        height: 0;
        border: .04rem solid white;
        border-color: transparent white white transparent;
        position: absolute;
        bottom: 0;
        right: 0;
      } */
    }
    .subtitle {
      color: #000;
      font-weight: 800;
      line-height: .45rem;
      margin-right: .2rem;
    }
    .msg {
      .subtitle {
        width: 1.8rem;
        display: inline-block;
      }
    }
    img {
      width: 100%;
    }
}
</style>
