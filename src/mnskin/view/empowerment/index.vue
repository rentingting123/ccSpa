<template>
    <div class="empowerment">
      <!-- <video :src="videoData.url" class="video" ></video> -->
      <img :src="videoBanner" v-if="videoBanner" class="img">
      <video
        v-else
        :src="videoData.url"
        playsinline
        controls
        playauto
        webkit-playsinline="true"
        playsInline="true"
        x5-playsInline="true"
        controlslist="nodownload"
      ></video>

      <div class="videoList">
        <h3 class="dian">{{name}}</h3>
        <ul>
          <li v-for="(item, index) in navList" 
            :key="index"
            @click="selectVideo(index)"
            :class="{'on': index == activeNav}">
            <!-- {{ item.name }} -->
            {{ item.name.length > 4 ? item.name.slice(0, 4) : item.name }}
          </li>
        </ul>
      </div>

      <div class="actives">
        <ul class="types">
          <li :class="{'on': videoType == 1}" @click="setType(1)">宣讲直播回放</li>
          <li :class="{'on': videoType == 2}" @click="setType(2)">往期宣讲</li>
        </ul>
        <ul class="lists" v-if="lists.length > 0">
          <li v-for="(item, index) in lists" :key="item.id" 
            @click="selectComp(index)"
            :class="{'on': activeComp == index}">
            <div>
              <p>{{item.activityTitle}}</p>
              <time>{{item.startTime | times}}~{{item.endTime | times}}</time>
            </div>
            <img :src="item.videoBanner" >
          </li>
        </ul>
        <span v-if="lists.length <= 0">暂无数据</span>
      </div>
      
      <components :lists='lists' />
    </div>
</template>

<script>
// import actives from './common/actives'
import Components from './common/components'
import network from '@/mnskin/api/index'
import moment from 'moment'
export default {
  components:{
    Components
  },
  data() {
      return{
        lists: [],
        videoType: 1,
        activeNav: 0,
        activeComp: 0,
        navList: [],
        videoData: {},
        name: '',
        videoBanner: '',

      }
  },
  created() {
    this.getCompActivityList();
  },
  methods: {
    async getCompActivityList() {
      const params = {
        type: this.videoType,
        pageNum: 1,
        pageSize: 20
      }
      const res = await network.selectCompetitionActivityList({ data: {...params} });
      this.lists = res.list;
      
      res.list && res.list.length && this.setNavList(0);
    },
    // 选择比赛
    selectComp(index) {
      this.activeComp = index;
      this.setNavList(index);
    },
    // 视频标签切换
    selectVideo(index) {
      this.activeNav = index;
      this.videoData = Object.assign({}, this.videoData, this.navList[index])
    },
    
    // 设置 nav
    setNavList(index) {
      this.name = this.lists[index].energizeName
      if (this.lists[index].videoInfo && this.lists[index].videoInfo.length) {
        const str = this.lists[index].videoInfo;
        let navList = JSON.parse(str);
        if(navList && navList.length){
          this.navList = navList
          this.videoBanner = ''
          this.selectVideo(0)
        }else{
          this.navList = []
          this.videoBanner =  this.lists[index].videoBanner
        }
      }else{
        this.videoBanner =  this.lists[index].videoBanner
      }
    },
    // 宣讲类型切换
    setType(type) {
      this.videoType = type;
      this.activeComp = 0;
      this.getCompActivityList();
    }
  },
  filters:{
      times(val){
          if(!val) return;
          return moment(val).format('MM/DD hh:ss')
      }
  }
}
</script>

<style lang='less' scoped>
.empowerment{
  video,.img{
    width: 6.86rem;
    height: 3.86rem;
    background: rgba(0, 0, 0, 1);
    margin: 0.42rem auto 0.2rem;
  }
  .actives{
    background: #ffffff;
    box-shadow: 0 .02rem .06rem rgba(0, 0, 0, 0.16);
    margin-top: 0.24rem;
    .types{
      width: 7.50rem;
      height: .56rem;
      line-height: .56rem;
      background: #252223;
      text-align: left;
      padding-left: 0.12rem;
      li{
        font-size: .28rem;
        color: #FFFFFF;
        display: inline-block;
        vertical-align: top;
        margin-left: 0.24rem;
        &.on{
          color: #ED1E26;
        }
      }
    }
    .lists{
      margin-top: 0.16rem;
      width: 100%;
      height: auto;
      li{
        border-left: .14rem solid #ffffff;
        width: 100%;
        height: auto;
        padding: 0.16rem 0 0.2rem;
        text-align: left;
        >div{
          display: inline-block;
          vertical-align: top;
          width: 4.2rem;
          margin: 0 0.24rem 0 0.34rem;
          
          p{
            width: 100%;
            height: .78rem;
            font-size: .24rem;
            line-height: .39rem;
            color: #252223;
          }
          time{
            width: 100%;
            height: .34rem;
            font-size: .24rem;
            line-height: .34rem;
            color: #D2D2D2;
          }
        }
        img{
          width: 2.20rem;
          height: 1.12rem;
          background: rgba(37, 34, 35, 1);
        }
        &.on{
          border-left: .14rem solid #ED1E26;
          background: rgba(237, 30, 38, 0.05);
          box-shadow: 0 .02rem .06rem rgba(0, 0, 0, 0.16);
          p{
            color: #ED1E26;
          }
        }
      }
    }
    .more{
      width: 100%;
      text-align: center;
      font-size: .24rem;
      line-height: .34rem;
      color: #BBC2C2;
      padding: 0.26rem 0 0.2rem;
    }
  }
  .videoList{
    width: 7.50rem;
    background: #FFFFFF;
    box-shadow: 0 .02rem .06rem rgba(0, 0, 0, 0.16);
    padding: 0.26rem 0.24rem .44rem;
    h3{
      width: 100%;
      font-size: 0.36rem;
      line-height: 0.48rem;
      color: #252223;
      padding: 0 .28rem;
      text-align: left;
    }
    ul{
      margin-top: 0.4rem;
      padding: 0 0.4rem;
      text-align: left;
      li{
        width: auto;
        height: 0.84rem;
        line-height: 0.84rem;
        padding: 0 0.14rem;
        display: inline-block;
        background: #E6EBEB;
        font-size: 0.28rem;
        text-align: center;
        color: #131313;
        margin-right: .15rem;
        margin-bottom: .16rem;
        &.on{
          color: #FFFFFF;
          background: #EB1E26;
        }
      }
    }
  }
}
</style>
