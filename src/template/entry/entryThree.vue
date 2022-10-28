<template>
  <div class="skin2">
    <div class="titleContent" v-if="skin">
      <h3>{{skin.chineseName}}</h3>
      <p>{{skin.englishName}}</p>
    </div>
    <div class="ContestPurpose">
      <div v-for="(item,index) in blockRow" class="ContestPurposeDetail" :class='{"one":total==1,"two":total==2,"three":total==3}' v-if="(item==1 && skin.signup) || (item==2 && skin.guide) || (item==3  && skin.manual)">
        <signup :skin="skin" :item="item" :index="index"/>
        <guide :skin="skin" :item="item" :index="index"/>
        <manual :skin="skin" :item="item" :index="index"/>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>

import signup from "@/template/entry/common/signup"
import guide from "@/template/entry/common/guide"
import manual from "@/template/entry/common/manual"
export default {
  props: ["skin","blockRow","total"],
  components: {
    signup,
    guide,
    manual,
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
.ContestPurpose {
  font-size: 0;
}
.ContestPurposeDetail.one{
  width: 1200px;
}
.ContestPurposeDetail.two{
  width: 600px;
}
.ContestPurposeDetail.three{
  width: 400px;
}
.clear {
  clear: both;
}
</style>
<style lang="less">
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
</style>