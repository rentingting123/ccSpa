<template>
    <div class="banner">
        <el-carousel height="400px" ref="banner" class="main" arrow="never">
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImg" @click="gotoDetail(item.bannerLink)" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
            </el-carousel-item>
        </el-carousel>
          
        <i class="iconfont prev arrow" @click="prev">&#xe69d;</i>
        <i class="iconfont next arrow" @click="next">&#xe69b;</i>
        <div class="playVideo" v-if="videourl" @click="play">
            <img src="http://web.moocollege.com/mooc/hzq/vueskin/npskin3/play.png" width="100%"/>
            <p>播放宣传片</p>
        </div>
        <el-dialog :modal-append-to-body="false" title="宣传片" :visible.sync="dialogVisible">
            <video v-if="dialogVisible" :src="videourl" controls autoplay width="100%"></video>
        </el-dialog>
    </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
             slideshowList: [ ], // 轮播图图片列表
             videourl: '',
             dialogVisible: false,
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            let baseInfo = getWebInfo();
            if(baseInfo && baseInfo.banList){
                this.slideshowList = baseInfo.banList
            }

            if(baseInfo && baseInfo.videourl){
                this.videourl = baseInfo.videourl
            }
        },
        gotoDetail(item){
            if(!item) return;
            let url = item.indexOf('http') == -1 ? 'http://' + item : item
            window.open(url)
        },
        prev(){
            this.$refs.banner.prev()
        },
        next(){
            this.$refs.banner.next()
        },
        play(){
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    .arrow{
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 48px;
        color: #ffffff;
        cursor: pointer;
    }
    .prev{
        left: 30px;
    }
    .next{
        right: 30px;
    }
    &:hover{
        .arrow{
            display: block;
        }
    }
}


.bannerImg{
    height: 400px;
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
.playVideo{
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 112px;
    height: auto;
    // border: 1px dotted #eeeeee;
    cursor: pointer;
    p{
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 25px;
        letter-spacing: 1px;
        text-shadow: 0px 3px 32px rgba(0, 0, 0, 0.1);
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>
<style lang='less'>
.banner{
    .el-carousel__item--card{
        max-width: 1024px;
    }
}
</style>