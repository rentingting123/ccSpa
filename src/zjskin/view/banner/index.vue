<template>
    <div class="banner">
         <el-carousel height="350px" class="main">
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImg" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
            </el-carousel-item>
          </el-carousel>
    </div>
</template>

<script>
import network from '@/api/index'
import { getBaseInfo } from '@/common/common.js'
export default {
    data(){
        return{
             slideshowList: [
                 {
                     url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner1.1.jpg',
                     href:''
                 },
                 {
                     url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner2.jpg',
                     href:''
                 },
                 {
                     url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner3.1.jpg',
                     href:''
                 }
             ], // 轮播图图片列表
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            let baseInfo = getBaseInfo();
            if(baseInfo && baseInfo.banList){
                this.slideshowList = baseInfo.banList
            }
        },
        gotoDetail(item){
            window.open(item.href)
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 350px;
    position: relative;
    overflow: hidden;
}
.bannerImg{
    height: 350px;
    vertical-align: middle;
    width: 100%;
    // cursor: pointer;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.main{
    width: 1920px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item--card{
      max-width: 1024px;
  }
</style>