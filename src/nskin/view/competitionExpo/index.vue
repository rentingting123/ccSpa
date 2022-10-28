<template>
  <div class="competitionExpo">
    <div class="bannerbox">
      <div class="imgblur"></div>
      <!--  href="https://www.wjx.top/vm/PpUwiYa.aspx#" target="_blank" -->
      <a class="bannerItem"></a>
    </div>
    <div class="exhibitorsList">
      <div class="exhibitorsItem">展会面积<span class="fontBig">90000</span> ㎡</div>
      <div class="exhibitorsItem">参展竞赛<span class="fontBig">1000</span> +</div>
      <div class="exhibitorsItem">参展高校<span class="fontBig">1000</span> +</div>
      <div class="exhibitorsItem">专业观众<span class="fontBig">100000</span> +</div>
    </div>
    <div class="countDown">
      <div class="down">倒计时</div>
      <div class="count">
        <span class="time">{{ day }}</span
        >天
      </div>
    </div>
    <div>
      <div class="headline">竞赛专区介绍</div>
      <div class="intruceMain">
        <div class="intruce">
          <!-- <p>中国高等教育博览会（HIGHER EDUCATION EXPOCHINA，简称高博会）是由教育部批准，中国高等教育学会主办的国际领先的集现代教育高端装备展示、高等教育学术交流、教学改革成果推介、教师专业化发展培训、科研成果转化、科技创新企业孵化、技术服务、贸易洽谈等为一体的高品质、综合性、专业化的著名品牌活动。</p><br> -->
          <p>
            为落实“教育这十年”相关工作安排，充分展示党的十八大以来，我国高等教育事业取得的历史性成就，经教育部批准，第58届中国高等教育博览会将于2022年12月2日-4日在重庆市举办。
          </p>
          <br />
          <p>
            本届高博会以“校地聚合·产教融合：高质量发展”为主题，将首次设立竞赛专区，计划邀请全国150个竞赛组委会参展，集中开展线下活动，展示竞赛在创新人才培养上的成果和特色，助力竞赛资源拓展、宣传推广、产教融合、成果与需求信息发布等，加强沟通交流，引导竞赛工作良性开展，促进竞赛高质量发展。
          </p>
        </div>
        <div class="pic">
          <img src="@/nskin/assets/img/intruce.png" alt="" />
        </div>
      </div>
    </div>
    <div>
      <div class="headline">参展权益</div>
      <ul class="competitionMain">
        <li v-for="(item, i) in equityList" :key="item.key" class="equityItem">
          <div
            class="mess"
            @mouseover="changeTypes(i)"
            :style="{ 'background-image': `url('${item.background}')` }"
          >
            <div :class="{ check: item.checked }" class="name" v-html="item.name"></div>
          </div>
          <div :class="{ on: item.checked }" class="lists">
            <div class="line"></div>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </li>
      </ul>
      <div class="areabox">
        <a class="area">
          <div class="text1">
            <img src="@/nskin/assets/img/logo_heec.png" alt="" /> 第58届中国高等教育博览会
          </div>
          <div class="text1">【竞赛专区】</div>
          <div class="text2">12月2日-4日 中国·重庆</div>
          <el-popover
            placement="top-start"
            title="参展咨询：中国高等教育学会"
            width="260"
            trigger="hover"
          >
            <div>
              <b>吴礼平</b> <br />
              TeL：18768130141<br />
              <b>余晓霞</b><br />
              TeL：15381072855
            </div>
            <div slot="reference" class="text3">立即参展</div>
          </el-popover>
          <div class="text4">参展热线：15381072855</div>
        </a>
      </div>
    </div>
    <div>
      <div class="headline">展区介绍</div>
      <div class="exhAreaTab">
        <div class="exhAreaItem" v-for="(item, index) in exhAreaList" :key="index">
          <div class="imgbox">
            <img :src="item.pic" alt="" />
            <div class="maskbox">
              <div v-for="(list, index) in item.details" :key="index" class="list">
                {{ list }}
              </div>
              <el-popover
                placement="top"
                title="参展咨询：中国高等教育学会"
                width="260"
                trigger="hover"
              >
                <div>
                  <b>吴礼平</b> <br />
                  TeL：18768130141<br />
                  <b>余晓霞</b><br />
                  TeL：15381072855
                </div>
                <div slot="reference" class="moreBtn">了解更多</div>
              </el-popover>
            </div>
          </div>
          <div class="titlebox">
            <div class="title">{{ item.name }}</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="headline">参展案例</div>
      <div>
        <swiper class="exhibitionsList" ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            class="exhibitionsItem"
            v-for="(item, index) in exhibitionsList"
            :key="index"
          >
            <div class="imgbox">
              <img :src="item.pic" alt="" />
            </div>
            <div class="titlebox">
              <div class="title">{{ item.name }}</div>
              <div class="line"></div>
              <div class="listbox">
                <div v-for="(list, index) in item.details" :key="index" class="list">
                  {{ list }}
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="competitions">
      <div class="headline">参展竞赛</div>
      <div class="search">
        <el-input placeholder="搜索竞赛" v-model="input2">
          <template slot="append">搜索</template>
        </el-input>
      </div>
      <div class="competitionsList">
        <div class="part" v-for="(item, index) in competitions" :key="index" @click="toDetail(item.id)">
          <div class="left">{{ item.tag }}</div>
          <div class="right" v-if="item.tag2">{{ item.tag2 }}</div>
          <div class="pic"><img :src="item.img" alt="" /></div>
          <div class="title">{{ item.name }}</div>
        </div>
        <div class="part">
          <img src="@/nskin/assets/img/seat.png" alt="" />
        </div>
      </div>
    </div>
    <div class="suspension">
      <el-popover placement="left-start" width="200" trigger="hover">
        <div>
          <img src="@/nskin/assets/img/qrcode2.png" style="width: 180px" alt="" />
        </div>
        <div slot="reference" class="icon">
          <img src="@/nskin/assets/img/icon4.png" alt="" />
          <div>官方微信</div>
        </div>
      </el-popover>

      <hr style="color: #fff; width: 100%" />
      <a class="icon">
        <el-popover
          placement="left-start"
          title="参展咨询：中国高等教育学会"
          width="260"
          trigger="hover"
        >
          <div>
            <b>吴礼平</b> <br />
            TeL：18768130141<br />
            <b>余晓霞</b><br />
            TeL：15381072855
          </div>
          <div slot="reference">
            <img src="@/nskin/assets/img/icon5.png" alt="" />
            <div>我要参展</div>
          </div>
        </el-popover>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      day: 0,
      input2: "",
      current: 1,
      equityList: [
        {
          key: 1,
          name: "品<br>牌<br>宣<br>传",
          background: require("@/nskin/assets/img/equity4.png"),
          checked: false,
          content:
            "全媒体矩阵宣传，展厅主屏播放宣传视频，竞赛名片线上展示，优先承办相关论坛。",
        },
        {
          key: 2,
          name: "竞<br>赛<br>推<br>介",
          background: require("@/nskin/assets/img/equity2.png"),
          content: "择优参加中国高等教育学会“竞赛质量提升行动”；制作参展竞赛宣传册。",
          checked: false,
        },
        {
          key: 3,
          name: "资<br>源<br>对<br>接",
          background: require("@/nskin/assets/img/equity1.png"),
          checked: false,
          content: "1000余所高校，6500家企业，12万人次现场参展。",
        },
        {
          key: 4,
          name: "成<br>果<br>展<br>示",
          background: require("@/nskin/assets/img/equity3.png"),
          checked: true,
          content: "竞赛作品展示、育人成果案例展示。",
        },
        // {
        //     key: 5,
        //     name: '信<br>息<br>发<br>布',
        //     background: require("@/nskin/assets/img/equity5.png"),
        //     checked: false,
        //     content: '高博会全媒体矩阵立体宣传（1000+所高校，6条直播线路，线上观众1500+万人次，现场观众10+万人次），现场展厅主屏播放竞赛宣传视频，择优推荐参与现场专访和会后总结宣传；',
        // },
        // {
        //     key: 6,
        //     name: '',
        //     background: require("@/nskin/assets/img/equity6.png"),
        //     checked: true,
        //     content: '相关创新成果可进入云上高博会教育现代化、高校科技创新成果、创新创业成果等项目库；针对遴选出的优质创新成果，将根据学会合作伙伴城市(园区)的发展需求，举办系列精准对接活动；',
        // },
      ],
      exhAreaList: [
        {
          id: 1,
          icon: require("@/nskin/assets/img/icon1.png"),
          name: "发展历程与研究成果专区",
          title: "展示创新教育10年发展历程以及展现“创新人才培养这十年”的成果和风采。",
          pic: require("@/nskin/assets/img/introduce1.png"),
          details: [
            "创新教育（学科竞赛）10年历程概述",
            "专家工作组研究成果",
            "高校学生竞赛与教师发展数据平台展示",
          ],
        },
        {
          id: 2,
          icon: require("@/nskin/assets/img/icon2.png"),
          name: "高质量竞赛专区",
          title:
            "展示竞赛在创新人才培养上的成果和特色，助力竞赛资源拓展、宣传推广、科技成果转化、产教深度融合、成果与需求信息发布等，促进竞赛高质量发展。",
          pic: require("@/nskin/assets/img/introduce2.png"),
          details: ["学生竞赛", "教师竞赛", "省级竞赛", "技能大赛"],
        },
        {
          id: 3,
          icon: require("@/nskin/assets/img/icon3.png"),
          name: "交流互动区",
          title:
            "参展竞赛可围绕赛事相关主题，优先合作，组织开展竞赛相关论坛、发布会、闭门会、决赛竞赛路演等会议活动。",
          pic: require("@/nskin/assets/img/introduce3.png"),
          details: ["指数发布", "竞赛发布", "竞赛路演", "交流对接"],
        },
      ],
      competitions: [
        {
          id: 1,
          tag: "教师类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion1.png"),
          name: "全国高校教师教学创新大赛",
        },
        {
          id: 2,
          tag: "理工类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion2.png"),
          name: "全国大学生集成电路创新创业大赛",
        },
        {
          id: 3,
          tag: "理工类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion3.png"),
          name: "全国大学生物理实验竞赛",
        },
        {
          id: 4,
          tag: "理工类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion4.png"),
          name: "全国大学生光电设计竞赛",
        },
        {
          id: 5,
          tag: "电子信息",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion5.png"),
          name: "中国高校计算机大赛-移动应用创新赛",
        },
        {
          id: 6,
          tag: "人文社科类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion6.png"),
          name: "两岸新锐设计竞赛·华灿奖",
        },
        {
          id: 7,
          tag: "综合类",
          tag2: "国赛",
          img: require("@/nskin/assets/img/competion7.png"),
          name: "中国“互联网+”大学生创新创业大赛",
        },
        // {
        //   id: 4,
        //   tag: "电子信息",
        //   tag2: "国赛",
        //   img: require("@/nskin/assets/img/competion8.png"),
        //   name: "中国高校智能机器人创意大赛",
        // },
      ],
      exhibitionsList: [
        {
          id: 1,
          name: "全国大学生机器人大赛",
          pic: require("@/nskin/assets/img/exhibitions1.png"),
          details: ["参与第57届高博会", "展区面积108㎡"],
        },
        {
          id: 2,
          name: "中国大学生方程式系列赛事",
          pic: require("@/nskin/assets/img/exhibitions2.png"),
          details: ["参与第57届高博会", "展区面积54㎡"],
        },
        {
          id: 3,
          name: "两岸新锐设计竞赛·华灿奖",
          pic: require("@/nskin/assets/img/exhibitions3.png"),
          details: [
            "参与第52届、56届、57届高博会高博会",
            "颁奖仪式、大赛作品成果展、宣介会",
          ],
        },
        {
          id: 4,
          name: "iCAN国际创新创业大赛",
          pic: require("@/nskin/assets/img/exhibitions4.png"),
          details: ["参与第52届高博会", "现场展示、论坛交流、答辩竞赛"],
        },
        {
          id: 5,
          name: "全国高等学校民航服务技能大赛",
          pic: require("@/nskin/assets/img/exhibitions5.png"),
          details: [
            "连续三年参与（2020-2022年）高博会",
            "产教融合系列活动、现场技能竞赛",
            "推荐就业、组织展演",
          ],
        },
        {
          id: 6,
          name: "全国高校教师教学创新大赛",
          pic: require("@/nskin/assets/img/exhibitions6.png"),
          details: ["参与第56届高博会", "决赛、颁奖仪式、闭幕式、路演、签约仪式"],
        },
      ],
      swiperOptions: {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
      },
    };
  },
  created() {
    this.countTime();
  },
  methods: {
    countTime() {
      //获取当前时间
      let date = new Date();
      let now = date.getTime();
      //设置截止时间
      let endDate = new Date("2022-12-2");
      let end = endDate.getTime();
      //时间差
      let leftTime = end - now;
      if (leftTime >= 0) {
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24) + 1;
      }
    },
    changeTypes(i) {
      this.equityList.map((res) => {
        res.checked = false;
      });
      this.equityList[i].checked = true;
    },
    changeTabs(id) {
      this.current = id;
    },
    toDetail(id){
      this.$router.push({ path: `/competitionExpo/detail/${id}` })
    }
  },
};
</script>
<style>
.search .el-input-group__append {
  width: 148px;
  background: #333333;
  color: #fff;
  border: 1px solid #333333;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.el-input__inner {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
<style lang="less" scoped>
.competitionExpo {
  // width: 1480px;
  margin: 0 auto;

  .exhibitorsList {
    width: 1200px;
    margin: -30px auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 99;

    .exhibitorsItem {
      width: 285px;
      height: 60px;
      background: #e62129;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 60px;
      // border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fontBig {
      font-size: 24px;
    }
  }
}

.headline {
  height: 49px;
  font-size: 34px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 49px;
  margin: 30px auto 35px;
}

.intruceMain {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  .intruce {
    width: 529px;
    box-sizing: border-box;

    p {
      text-align: left;
      font-size: 18px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      line-height: 26px;
      text-indent: 36px;
    }
  }

  .pic {
    width: 479px;
    height: 247px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.competitionMain {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;

  .equityItem {
    display: flex;
    align-items: center;

    .mess {
      width: 250px;
      height: 170px;
      background-size: cover;
      cursor: pointer;
      font-size: 22px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
      line-height: 34px;
      transition: all 1s;
    }

    .name {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 500ms;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .name:hover {
      background-color: rgba(64, 0, 0, 0.8);
    }

    .check {
      background-color: rgba(64, 0, 0, 0.8);
    }

    .lists {
      display: none;
      width: 250px;
      height: 170px;
      background: rgba(249, 251, 255, 0.3);
      padding: 20px;
      box-sizing: border-box;
      text-align: left;

      .line {
        width: 60px;
        height: 2px;
        background: #e62129;
        margin-bottom: 10px;
      }

      .content {
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 32px;
      }

      &.on {
        display: inline-block;
      }
    }
  }
}

.bannerbox {
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  .imgblur {
    width: 110%;
    height: 120%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../../assets/img/banner1.png") no-repeat;
    background-size: cover;
    -webkit-filter: blur(50px);
    filter: blur(50px);
    z-index: 0;
  }

  .bannerItem {
    position: relative;
    display: block;
    height: 100%;
    max-width: 1920px;
    z-index: 200;
    margin: 0px auto;
    background: url("../../assets/img/banner1.png") no-repeat center center;
    background-size: cover;
    cursor: pointer;
  }
}

.area {
  width: 100%;
  height: 220px;
  background: #fafaff url("../../assets/img/bg1.png") no-repeat center center;
  background-size: cover;
  margin: 60px auto;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .text1 {
    font-size: 30px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    line-height: 43px;
  }

  .text2 {
    font-size: 18px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    line-height: 32px;
  }

  .text3 {
    width: 260px;
    height: 40px;
    background: #e62129;
    font-size: 22px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    margin: 0 auto;
  }

  .text4 {
    font-size: 18px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    line-height: 26px;
  }
}

.countDown {
  position: fixed;
  z-index: 99;
  right: 220px;
  width: 60px;
  top: 240px;
  height: 115px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.302);
  border-radius: 40px;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .down {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    line-height: 23px;
  }

  .count {
    width: 48px;
    margin: 0 auto;
    border-top: 1px solid #d8d8d8;
    font-size: 22px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    line-height: 32px;
    padding-top: 10px;

    .time {
      color: #e62129;
      font-weight: 500;
      font-size: 22px;
    }
  }
}

.exhAreaTab {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-bottom: 30px;

  .exhAreaItem {
    cursor: pointer;
    width: 387px;
    height: 432px;
    margin-right: 20px;

    .imgbox {
      width: 387px;
      height: 312px;
      position: relative;
      transition: all 1s;

      img {
        width: 387px;
        height: 312px;
        object-fit: cover;
      }
    }

    .imgbox:hover {
      .maskbox {
        display: block;
      }
    }

    .maskbox {
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.74);
      padding-top: 55px;

      .list {
        width: 320px;
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
        text-align: center;
        margin: 0 auto;
      }

      .moreBtn {
        width: 136px;
        height: 40px;
        background: #e62129;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin: 23px auto 0;
      }
    }

    .titlebox {
      height: 120px;
      background: #f9fbff;
      font-size: 22px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      text-align: center;
      box-sizing: border-box;
      padding-top: 28px;

      .line {
        width: 74px;
        height: 2px;
        background: #e62129;
        margin: 10px auto 0;
      }
    }

    .tab {
      padding-bottom: 10px;
      font-size: 22px;
      font-weight: 400;
      color: #333333;
      line-height: 32px;
    }
  }

  .active {
    border-bottom: #e62129 2px solid;
    color: #e62129;
  }
}

.exhAreaList {
  height: 350px;
  margin: 42px auto 60px;
}

.exhAreaContent {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;

  .left {
    width: 385px;

    img {
      width: 100%;
    }
  }

  .right {
    width: 550px;
    text-align: left;

    .title {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      line-height: 26px;
      margin-bottom: 30px;
    }

    ul {
      .tags {
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        line-height: 30px;
        background: linear-gradient(134deg, #516afe 0%, #549bfd 100%);
        border-radius: 4px;
        padding: 10px 20px;
        margin: 20px;
      }
    }
  }
}

.competitions {
  background: #f9fbff;
  width: 100%;
  height: 687px;
  overflow: hidden;

  .search {
    width: 730px;
    margin: 20px auto;
  }

  .competitionsList {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;

    .part {
      width: 285px;
      position: relative;
      margin-right: 20px;
      margin-bottom: 20px;

      .left {
        position: absolute;
        left: 0;
        top: 0;
        background: #333333;
        color: #fff;
        padding: 0px 5px;
        height: 24px;
        line-height: 24px;
        border-bottom-right-radius: 5px;
      }

      .right {
        position: absolute;
        right: 0;
        top: 0;
        background: #f00;
        color: #fff;
        padding: 0px 5px;
        height: 24px;
        line-height: 24px;
        border-bottom-left-radius: 5px;
        font-size: 12px;
      }

      .pic img {
        width: 100%;
        height: 160px;
        object-fit: cover;
      }

      .title {
        background-color: #fff;
        font-size: 16px;
        line-height: 22px;
        text-align: left;
        padding: 10px 8px;
        height: 66px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    .part:nth-child(4n) {
      margin-right: 0px;
    }
  }
}

.exhibitionsList {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;

  .exhibitionsItem {
    cursor: pointer;
    width: 285px;
    // height: 476px;
    margin-right: 20px;

    .imgbox {
      width: 285px;
      height: 312px;
      position: relative;
      transition: all 1s;
      overflow: hidden;

      img {
        width: 285px;
        height: 312px;
        object-fit: cover;
      }
    }

    .titlebox {
      height: 200px;
      background: #f9fbff;
      font-size: 22px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      text-align: center;
      box-sizing: border-box;
      padding-top: 28px;

      .line {
        width: 74px;
        height: 2px;
        background: #e62129;
        margin: 10px auto 0;
      }
    }

    .listbox {
      margin-top: 10px;
    }

    .list {
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
      text-align: center;
      color: #666666;
    }
  }

  .active {
    border-bottom: #e62129 2px solid;
    color: #e62129;
  }
}

.suspension {
  display: flex;
  flex-wrap: wrap;
  width: 60px;
  height: 217px;
  background: #333333;
  border-radius: 48px 48px 48px 48px;
  opacity: 1;
  position: fixed;
  bottom: 10px;
  right: 220px;
  padding: 16px 6px;
  box-sizing: border-box;
  align-items: center;

  .icon {
    font-size: 12px;
    color: #fff;
    text-align: center;
    cursor: pointer;

    img {
      width: 30px;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 1480px) {
  .suspension,
  .countDown {
    display: none;
  }
}
</style>
