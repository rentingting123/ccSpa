<template>
    <div class="banner">
         <el-carousel height="350px" class="main">
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImg" @click="gotoDetail(item.bannerLink)" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
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
             slideshowList: [ ], // 轮播图图片列表
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
            if(!item) return;
            let url = item.indexOf('http') == -1 ? 'http://' + item : item
            window.open(url)
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
    cursor: pointer;
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
<style lang='less'>
.banner{
    .el-carousel__item--card{
        max-width: 1024px;
    }
}
</style>