<template>
    <div class="videos" v-if="lists.length>0">
        <div class="right">
            <h2title title="宣讲大纲" />
            <ul>
                <li v-for="list,i in lists" :key="i" :class="{'on': i==on}" @click="changeUrl(i)">
                    {{list.name}}
                </li>
            </ul>
        </div>
        <div class="video">
            <video :src="videoUrl" v-if="videoUrl" id="videosss" controls controlslist="nodownload"></video>
            <!-- <div class="img" v-if="videoUrl" @click="videoShow" :class="{'no': play}">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/play1.png" v-if="!play">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/pause1.png" v-else>
            </div> -->
            <div class="mess" :class="{'no': play}">
                <h3 class="dian">{{detail && detail.activityTitle}}</h3>
                <div class="dian">
                    <p>
                        <span>{{obj && obj.competitionName}}</span> · 
                        <span>{{detail && detail.competitionYear || 2021 }}</span> · 
                        <span>第{{detail && detail.competitionRound || 1 }}届</span>
                    </p>
                    <p>
                        <span v-if="obj && obj.sponsor">主办方  {{obj && obj.sponsor}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import h2title from './h2title'
export default {
    props: ['id', 'obj'],
    components:{
        h2title
    },
    data(){
        return{
            lists: [],
            videoUrl: '',
            on: 0,
            detail: {},
            play: false,
        }
    },
    created(){
        this.getVideos();
    },
    methods:{
        async getVideos(){
            let res = await network.selectCompetitionActivity({data:{
                competitionId: this.id, 
                flag: true
            }})
            this.detail = res && res.length>0 && res[0] || {}
            let arr = this.detail && this.detail.videoInfo
            this.lists = arr && JSON.parse(arr) || []
            this.videoUrl = this.lists.length>0 && this.lists[0] && this.lists[0].url || ''
        },
        changeUrl(i){
            this.play = false
            this.on = i
            this.videoUrl = this.lists[i].url
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
        
    }
}
</script>

<style lang='less' scoped>
.videos{
    width: 1200px;
    height: 466px;
    margin: 0 auto;
    .video{
        width: 827px;
        height: 466px;
        background: rgba(0, 0, 0, 0);
        position: relative;
        video{
            width: 100%;
            height: 100%;
        }
        .img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0 , 0, 0, 0.5);
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
        .mess{
            width: 100%;
            height: 83px;
            background: rgba(237, 30, 38, 0.8);
            position: absolute;
            top: 0;
            left: 0;
            padding: 15px 50px;
            text-align: left;
            z-index: 4;
            display: none;
            h3{
                height: 30px;
                font-size: 22px;
                line-height: 30px;
                color: #FFFFFF;
                font-weight: normal;
                margin-bottom: 5px;
            }
            >div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                line-height: 21px;
                color: #FFFFFF;

            }
            &.no{
                display: none;
            }
        }
        &:hover{
            .img{
                &.no{
                    display: block;
                }
            }
            .mess{
                display: block;
                &.no{
                    display: block;
                }
            }
        }
    }
    .right{
        width: 357px;
        height: 466px;
        background: #E6EBEB;
        float: right;
        ul{
            width: 100%;
            padding: 43px 24px 0 24px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            li{
                width: auto;
                height: 47px;
                background: rgba(246, 246, 246, 0.65);
                border: 1px solid #F6F6F6;
                font-size: 17px;
                font-weight: 400;
                line-height: 47px;
                color: #4A4A4A;
                text-align: center;
                overflow: hidden;
                cursor: pointer;
                margin-bottom: 32px;
                padding: 0 10px;
                &:nth-child(2n){
                    margin-right: 0;
                }
                &.on{
                    background: #EB1E26;
                    color: #ffffff;
                }
            }
        }
    }
}
</style>