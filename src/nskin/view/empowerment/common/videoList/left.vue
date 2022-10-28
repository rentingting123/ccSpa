<template>
    <div class="left" >
        <div class="video" v-if="videoList.length>0" >
            <video :src="obj && obj.url" v-if="obj && obj.url" :poster="datas.videoBanner" id="videosss" controls controlslist="nodownload"></video>
            <!-- 20210618 永乐要求不要动画 -->
            <!-- <img :src="`https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/animal.gif?${new Date().getTime()}`" v-if="!play" class="animal"> -->
            <!-- <div class="img" v-if="obj && obj.url" :class="{'no': play}" @click="videoShow">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/play1.png" v-if="!play">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/pause1.png" v-else>
            </div> -->
        </div>
        <img v-else :src="datas.videoBanner" width="100%" height="100%" @click="toDetail" style="cursor: pointer;">

        <div class="videoMain" v-if="videoList.length>0">
             <span class="videoLists"
                :title="item.name"
                v-for="item,i in videoList"
                :key="i"
                :class="{'on':videoId==i}"
                @click="showVideo(item,i)">
                {{item.name.length > 6 ? item.name.slice(0, 7) + '..' : item.name}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:['datas'],
    data(){
        return{
            obj: '',
            videoId: '',
            showNav: false,
            play: false,
        }
    },
    created() {
    },
    computed:{
        videoList(){
            let arr = []
            if(this.datas && this.datas.videoInfo=='null'){
                // 不需要处理
            }else if(this.datas && this.datas.videoInfo){
                arr = JSON.parse(this.datas.videoInfo) 
                this.obj = arr[0]
                this.videoId = 0
            }
            return arr
        }
    },
    methods:{
        toDetail(){
            if(!this.datas.redirectUrl) return;
            let url  = this.datas.redirectUrl.indexOf('http') == -1 ? 'http://' + this.datas.redirectUrl : this.datas.redirectUrl
            window.open(url)
        },
        showVideo(item,i){
            this.obj = {}
            // 选择视频时，视频停止状态
            this.play = false
            this.$nextTick(()=>{
                this.obj = item
                this.videoId = i
            })
        },
        videoShow(){
            let dom = document.getElementById('videosss')
            if(dom.paused){
                dom.play()
                this.play = true
            }else{
                dom.pause()
                this.play = false
            }
        }
    },
    watch:{
        // 切换活动时，视频停止状态
        datas(){
            this.play = false
        }
    }
}
</script>

<style lang='less' scoped>
.left{
    text-align: left;
    border-radius: 3px;
    &:hover{
        .videoMain {
            display: block;
        }
    }
    .video{
        width: 100%;
        height: 100%;
        background: #000000;
        position: relative;
        z-index: 1;
        
        video{
            width: 100%;
            height: 100%;
            position: relative;
            background: #000000;
            z-index: 1;
            cursor: pointer;
        }
        .animal{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0 , 0, 0, 0.3);
            z-index: 3;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                z-index: 3;
                width: 100px;
                cursor: pointer;
            }
            &.no{
                display: none;
            }
        }
    }
    &:hover{
        .video{
            .img{
                display: block;
                background: rgba(0 , 0, 0, 0.3);
            }
        }
    }
    
    .videoMain{
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        background: #ED1E26;
        padding: 20px 28px;
        z-index: 2;
        display: none;
        .videoLists{
            width: auto;
            font-size: 14px;
            line-height: 36px;
            color: #ffffff;
            background: #ED1E26;
            border: 1px solid rgba(255, 255, 255, 0.8);
            text-align: center;
            white-space: nowrap;
            display: inline-block;
            margin-right: 18px;
            margin-top: 10px;
            cursor: pointer;
            padding: 0 10px;
            &:last-child {
                margin-right: 0;
            }
            &.on{
                border: 1px solid rgba(255, 255, 255, 0.8);
                background: #fff;
                color: #ED1E26;
            }

        }

    }
}
</style>
