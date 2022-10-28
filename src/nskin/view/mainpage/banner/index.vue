<template>
    <div class="banner">
        <el-carousel height="575px" ref="banner" class="main" indicator-position='none' arrow="never">
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImg" @click="gotoDetail(item.bannerLink)" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
            </el-carousel-item>
        </el-carousel>
          
        <!-- <i class="iconfont prev arrow" @click="prev">&#xe69d;</i>
        <i class="iconfont next arrow" @click="next">&#xe69b;</i> -->
        <div class="right" @click="next">
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/banner_next.png">
        </div>
    </div>
</template>

<script>
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
        },
        prev(){
            this.$refs.banner.prev()
        },
        next(){
            this.$refs.banner.next()
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 1200px;
    height: 575px;
    margin: 0 auto;
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
        z-index: 3;
        &.prev{
            left: 30px;
        }
        &.next{
            right: 30px;
        }
    }
    &:hover{
        .arrow{
            display: block;
        }
    }
    .main{
        width: 1200px;
        margin: 0 auto;
        .bannerImg{
            height: 575px;
            vertical-align: middle;
            width: 100%;
            cursor: pointer;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    .right{
        width: 0;
        height: 573px;
        background: #ED1E26;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2;
        transition: 0.5s width;
        overflow: hidden;
        cursor: pointer;
        img{
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 0;
        }

    }
    &:hover{
        .right{
            width: 200px;
            img{
                width: 58px;
            }
        }
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