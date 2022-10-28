<template>
  <div class="main">
    <breadcrumb
      title1="竞赛导航"
      title2="竞赛名片"
      path="/competitionExpo"
      style="padding-top: 17px"
    />
    <div class="content">
      <div class="title">
        <div class="name">中国高校计算机大赛-大数据挑战赛</div>
        <div class="tag">
          <el-tag type="danger" class="tag" v-for="(item, index) in tag" :key="index">{{
            item
          }}</el-tag>
        </div>
      </div>
      <div class="info">
        <ul>
          <li>
            <div class="list">
              <span>主办方</span>{{competitionCard.hostUnit}}
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="list"><span>秘书处</span>{{competitionCard.secretariatUnit}}</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="list">
              <span>承办方</span>{{competitionCard.organizerUnit}}</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="list"><span>官网地址</span>{{competitionCard.officialWebsite}}</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="list"><span>竞赛风采</span></div>
            <div class="swiper-con">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide
                  class="swiper-slide"
                  v-for="item in swiperImage"
                  :key="item.fileId"
                >
                  <div class="swiper-content"><img :src="item.fileUrl" alt="" /></div>
                </swiper-slide>
              </swiper>

              <div
                class="swiper-button-prev"
                :style="{ 'background-image': `url(${leftIcon})` }"
                slot="button-prev"
              ></div>
              <div
                class="swiper-button-next"
                :style="{ 'background-image': `url(${rightIcon})` }"
                slot="button-next"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <detailTabs></detailTabs>
  </div>
</template>

<script>
import network from "@/api/index";
import breadcrumb from "@/nskin/components/breadcrumb";
import detailTabs from "./detailTabs";
export default {
  components: { breadcrumb, detailTabs },
  data() {
    return {
      competitionCard:{},
      rightIcon: require("@/nskin/assets/img/icon-right.png"),
      leftIcon: require("@/nskin/assets/img/icon-left.png"),
      tag: ["榜单竞赛", "电子信息类", "国赛"],
      swiperImage: [
        require("@/nskin/assets/img/competion1.png"),
        require("@/nskin/assets/img/competion1.png"),
      ],
      swiperOption: {
        loop: true,
        autoplay: false, // 是否自动播放
        // allowTouchMove: false,
        initialSlide: 1,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  created(){
    this.getInfo();
    this.getCardPage();
  },
  methods: {

    async getInfo(){
      let res = await network.competitionCard({data:{infoId: '3',}})
        this.competitionCard=res

    },
    async getCardPage(){
      let cardPage = await network.cardPage({data: {infoId:'3',bizType:'1',pageNum:1,pageSize:9}})
      this.swiperImage=cardPage.list
      console.log(cardPage)
      // network.competitionCard({data: {infoId:'1'}}).then(res=>{
      //   console.log(res)
      // })
        

    },
  
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}
.content {
  width: 100%;
  .title {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 18px;
    .name {
      height: 32px;
      font-size: 22px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      line-height: 32px;
      // margin-right: 20px;
    }
    .tag {
      margin-left: 20px;
    }
  }
  .info {
    margin-bottom: 60px;
    ul {
      li {
        width: 100%;
        text-align: left;
        .list {
          margin-top: 20px;
          height: 23px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          line-height: 23px;
          display: flex;
          flex-wrap: nowrap;
          span {
            width: 64px;
            display: block;
            color: #9e9e9e;
            margin-right: 34px;
          }
        }
        .line {
          margin-top: 22px;
          height: 1px;
          background-image: linear-gradient(
            to right,
            #dedede 0%,
            #dedede 50%,
            transparent 0%
          );
          background-size: 25px 1px;
          background-repeat: repeat-x;
        }
        .swiper {
          width: 1200px;
          margin-top: 20px;
          .swiper-content {
            width: 800px;
            height: 320px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .swiper-con {
          position: relative;
          .swiper-button-prev {
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
            position: absolute;
            left: 0px;
            top: 140px;
            cursor: pointer;
            z-index: 99;
          }
          .swiper-button-next {
            width: 41px;
            height: 41px;
            background-size: 100% 100%;
            position: absolute;
            top: 140px;
            right: 0px;
            cursor: pointer;
            z-index: 99;
          }
        }
      }
    }
  }
}
</style>
