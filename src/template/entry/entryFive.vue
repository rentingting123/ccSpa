<template>
  <div class="skin2">
    <div class="titleContent" v-if="skin">
      <h3>{{skin.chineseName}}</h3>
      <p>{{skin.englishName}}</p>
    </div>
    <div class="ContestPurpose">
      <div v-for="(item,index) in blockRow" :key="index" class="ContestPurposeDetail">
        <div  v-if='item==1'>
          <div class="middle" @click="join">
            <div :style="`background-image:url(${skin.signup})`" class="ContestBanner img"></div>
            <div class="main top" >
              <h2>{{$t('skin.signup')}}</h2>
              <a>{{$t('skin.raceIntroduceMore')}}></a>
              <div class="line"></div>
            </div>
          </div>
          <div class="middle" @click="submitWork">
            <div :style="`background-image:url(${skin.works})`" class="ContestBanner img"></div>
            <div class="main top" >
              <h2>{{$t('skin.works')}}</h2>
              <a>{{$t('skin.raceIntroduceMore')}}></a>
              <div class="line"></div>
            </div>
          </div>
        </div>

        <div v-if='item==2'>
          <div class="middle" @click="$router.push('/details/entryGuide')">
            <div :style="`background-image:url(${skin.guide})`" class="ContestBanner img"></div>
            <div class="main" :class="{top:index==1}">
              <h2>{{$t('skin.guide1')}}</h2>
              <a>{{$t('skin.raceIntroduceMore')}}></a>
              <div class="line"></div>
            </div>
          </div>
          <div @click="$router.push({name:'manual',query:{url:encodeURIComponent(skin.pdf)}})" class="middle">
            <div :style="`background-image:url(${skin.manual})`" class="ContestBanner img"></div>
            <div class="main" :class="{top:index==1}">
              <h2>{{$t('skin.manual')}}</h2>
              <a>{{$t('skin.raceIntroduceMore')}}></a>
              <div class="line"></div>
            </div>
          </div>
        </div>

        <div @click="linkClick('http://cc.moocollege.com/expert/login')" v-if='item==3'>
          <div :style="`background-image:url(${skin.expert})`" class="ContestBanner img"></div>
          <div class="main" :class="{top:index==1}">
            <h2>{{$t('skin.expert')}}</h2>
            <a>{{$t('skin.raceIntroduceMore')}}></a>
            <div class="line"></div>
          </div>
        </div>

      </div>
      <div class="clear"></div>
    </div>

  </div>
</template>

<script>
import { tologin } from '@@/utils/util' 
import network from "@@/api/jxapi/index";
import { getToken } from "@@/utils/oauth"
export default {
  props: ["blockRow","skin"],
  data() {
    return {
      user:{},
    };
  },

  methods: {
    linkClick(link) {
      //console.log(link)
      window.open(link);
    },
    async submitWork(){
      if (!getToken()) {
        tologin();
      }
      let competition = await network.groupChildInfo({data:{competitionId:this.id}});
      if (competition == "error") return;
      window.location.href='https://cc.moocollege.com/#/details?id='+this.id+'&autoLogin=true'
    },
    async join() {
          this.$router.push("/apply");
    },
    close(type) {
      return () => {
        this[type] = false;
      };
    }
  },
  computed:{
     id(){
      return this.$store.state.skin.id
    }
  }
};
</script>

 <style lang="less" scoped>
.skin2 {
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
}
.edit {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
.ContestPurpose {
  font-size: 0;
}
.ContestPurposeDetail {
  position: relative;
  width: 400px;
  height: 298px;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  overflow: hidden;
  background: #dedede;
  cursor: pointer;
  margin: 0;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  .main {
    margin: 185px 0 0 30px;
    position: relative;
    z-index: 2;
    h2 {
      font-size: 22px;
      color: #ffffff;
    }
    a {
      font-size: 14px;
      color: #ffffff;
      display: block;
      margin: 8px 0;
      cursor: pointer;
    }
    .line {
      width: 42px;
      height: 5px;
      background: #ffffff;
    }
  }
  .main.top {
    margin: 36px 0 0 30px;
  }
}
.middle{
  width: 100%;
  height: 149px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.clear {
  clear: both;
}
</style>