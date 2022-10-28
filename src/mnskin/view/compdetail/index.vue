<template>
  <div class="compdetail">
      <div class="video" v-if="navList.length > 0">
        <video
          :src="videoSrc"
          playsinline
          controls
          playauto
          webkit-playsinline="true"
          playsInline="true"
          x5-playsInline="true"
          :poster="videoData.videoBanner">
        </video>
      </div>

      <div class="content">
        <div class="name">{{detailData.competitionName}}</div>
        <div class="nav">
          <span v-for="(item, index) in navList" @click="changeVideo(index)" :class="{'active': videoIndex == index}">
            {{item.name.length > 4 ? item.name.slice(0, 4) : item.name}}
          </span>
        </div>
        <div class="title">举办单位</div>
        <div class="wrap">
          <div>
            <span class="subtitle">主办单位</span>
            <span>{{detailData.sponsor}}</span>
          </div>
          <div>
            <span class="subtitle">指导单位</span>
            <span></span>
          </div>
          <div>
            <span class="subtitle">承办单位</span>
            <span>{{detailData.undertake}}</span>
          </div>
        </div>

        <div class="title">竞赛简介</div>
        <div class="wrap">{{detailData.competitionInfo}}</div>

        <div class="title">竞赛影响力</div>
        <div class="wrap">{{detailData.influence}}</div>

        <div class="title">竞赛赛程</div>
        <div class="wrap">{{detailData.schedule}}</div>

        <div class="title">信息类资料</div>
        <div class="msg wrap">
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

        <div v-for="(item, index) in photoInfo" class="photo">
          <img :src="item.url + '!wx-banner'" @click="clickImg(item)" />
          <div class="intro" >{{item.name}}</div>
        </div>

        <div class="logo">
          <img src="https://web.moocollege.com/mooc/compDetail/%E4%BD%8D%E5%9B%BE.png"/>
        </div>

        <img class="bottom left" src="https://web.moocollege.com/mooc/compDetail/%E5%B7%A6%E4%B8%8B.png" />
        <img class="bottom right" src="https://web.moocollege.com/mooc/compDetail/%E5%8F%B3%E4%B8%8B.png"/>
      </div>

  </div>
</template>

<script>
import network from '@/mnskin/api/index';

export default {
  components: {},
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
    this.competitionId = this.$route.query.competitionId;
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

  /* .IIV::-webkit-media-controls-play-button,
  .IIV::-webkit-media-controls-start-playback-button {
      opacity: 0;
      pointer-events: none;
      width: 5px;
  } */

  .video {
    font-size: 0;
  }

  video {
    width: 100%;
  }
  .photo {
    position: relative;
    margin-bottom: .1rem;
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
    .active {
      border: .01rem solid #d0021b;
      border-radius: .02rem;
      color: #d0021b;
      &:before {
        content: '';
        position: absolute;
        top: -0.22rem;
        left: 0;
        width: .94rem;
        height: .28rem;
        background-size: cover;
        background-image: url('https://web.moocollege.com/mooc/compDetail/%E7%BC%96%E7%BB%84%209.png');
      }
    }
    span {
      border: .01rem solid #888;
      border-radius: .02rem;
      padding: .20rem .24rem;
      margin-right: .17rem;
      margin-bottom: .17rem;
      position: relative;
      font-size: .28rem;
      width: 22.6%;
      white-space: nowrap;
      text-align: center;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .content {
    text-align: left;
    padding: .17rem .17rem 0 .17rem;
    font-size: .32rem;
    line-height: .52rem;
    color: #4a4a4a;
    background-image: url('https://web.moocollege.com/mooc/compDetail/%E8%83%8C%E6%99%AF.png');
    background-size: cover;
    position: relative;

    .logo {
      text-align: center;
      margin-top: .4rem;
      img {
        width: 3.22rem;
        height: .85rem;
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

    &:before {
        content: '';
        background-image: url('https://web.moocollege.com/mooc/compDetail/%E7%BC%96%E7%BB%84%202.png');
        background-size: cover;
        position: absolute;
        right: 0;
        top: 0;
        width: 1.96rem;
        height: .84rem;
      }

    .name {
      text-align: left;
      font-weight: 500;
      font-size: .44rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      color: #252525;
      position: relative;
      line-height: .56rem;
      padding: .17rem 1.96rem 0 .17rem;
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
      color: #059FE7;
      font-weight: 500;
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
}
</style>
