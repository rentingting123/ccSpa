<template>
  <div v-if="$store.state.skin.adminRole || urls.length>0"class="banner">
    <!-- banner大于1轮播 -->
    <el-carousel height='650px' v-if="urls.length > 1" indicator-position="outside">
      <el-carousel-item v-for="item in urls" :key="item.fileKey">
       <div @click="linkClick(item.link)" :style="`background-image:url(${item.url})`" class="ContestBanner">
    </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 等于1背景 -->
    <div v-else :style="`background-image:url(${urls[0]&&urls[0].url})`" @click="linkClick(urls[0]&&urls[0].link)" class="ContestBanner">

    </div>
    <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      <bannerEdit :editOk="getUrls" :list="urls"></bannerEdit>
    </div>

    <!-- logo -->
    <div class="header" v-if="$store.state.skin.data.logo">
        <div style="width:1200px;margin:0 auto;">
            <div class="logo"><img :src="$store.state.skin.data.logo" alt="" srcset=""></div>
        </div>
    </div>

  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import jxapi from "@/api/index"
import bannerEdit from './edit'
export default {
    props:['id'],
  components: {
    upload,
    bannerEdit
  },
  data() {
    return {
        urls:[],
    };
  },
  created(){
      this.getUrls()
  },
  methods: {
    linkClick(link){
        if(link){
          link = link.indexOf('http') == -1 ? 'http://' + link : link
          window.open(link)
        }
    },
    async getUrls(){
        let urls = await jxapi.bannerList()
        if(urls == "error")return 
        this.urls = urls
    }
  },
};
</script>

 <style lang="less" scoped>
  .banner{
      position: relative;
  }
  .edit{
      position:absolute;
      right: 0;
      top:0;
    z-index: 999;
  }
  .ContestBanner {
    height: 650px;
    overflow: hidden;
    background: center 0 no-repeat;
    background-size: cover;
  }
  .el-carousel{
    z-index: 0 !important;
  }
  .header{
    width: 100%;
    /* background: #000; */
    height: 51px;
    position: absolute;
    top: 0;
  }
  .logo{
      height: 27px;
      margin-top: 12px;
      float: left;
      position: relative;
      z-index: 9;
  }
  .logo  img{
      height: 100%;
      width: auto;
  }

</style>