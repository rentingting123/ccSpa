<template>
    <div class="videos">
         <h2 class="title">
            <p>视频展播</p>
            <!-- <span>more</span> -->
        </h2>
        <div>
            <video width="229px" height="129px" controlslist="nodownload" controls :src="base.videourl"></video>
            <p class="dian">{{ '华灿奖历年作品集锦' || $store.state.skin.competitionDetail.name}}</p>
        </div>
    </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
            base:{}
        }
    },
    created(){
        this.base = getWebInfo();
    }
}
</script>


<style lang="less" scoped>
.videos{
    margin-top: 13px;
    >div{
        video{
            margin-top: 12px;
        }
        p{
            margin-top: 3px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.92px;
           
        }
    }
}
</style>