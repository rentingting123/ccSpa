<template>
    <div class="banner">
         <el-carousel height="500px" class="main">
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <!-- <div class="bannerImg" :style="{backgroundImage: 'url(' + item.url + ')'}"></div> -->
                <img :src="item.url"  class="bannerImg" srcset="">
            </el-carousel-item>
          </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return{
             slideshowList: [
                 {
                     url: require('../../../assets/jxws/banner.jpg'),
                     href:''
                 },
                //  {
                //      url: require('../../../assets/index/banner2.jpg'),
                //      href:''
                //  }
             ], // 轮播图图片列表
        }
    },
    methods:{
        gotoDetail(item){
            window.open(item.href)
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
}


.bannerImg{
    width: 1920px;
    height: 500px;
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