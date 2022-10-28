<template>
    <div class="banner">
        <a-carousel autoplay>
            <div v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImg" @click="gotoDetail(item.bannerLink)" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
            </div>
        </a-carousel>
    </div>
</template>

<script>
import network from '@/mnskin/api/index'
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
            if(baseInfo && baseInfo.banListIphone){
                this.slideshowList = baseInfo.banListIphone
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
    height: 4rem;
    position: relative;
    overflow: hidden;
}
.bannerImg{
    width: 7.5rem;
    height: 4rem;
    vertical-align: middle;
    cursor: pointer;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
<style >
.ant-carousel >>> .slick-slide {
    width: 100%;
    height: 4rem;
    overflow: hidden;
  }
</style>