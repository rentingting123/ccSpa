<template>
    <div class="mainpage">
        <div class="top">
            <div class="left">
                <div style="margin-top:13px;">
                    <!-- 赛事动态 -->
                    <active />
                    <div>
                        <!-- 竞赛简讯 -->
                        <communication />
                        <!-- 赛事日程 -->
                        <passage />
                    </div>
                </div>
                <div style="margin-top:17px;">
                    <theme />
                </div>
            </div>
            <div class="right">
                <!-- 视屏展播 -->
                <videos />
                <!-- 友情链接 -->
                <rules />
            </div>
        </div> 
        <div>
            <!-- 作品展出 -->
            <workShow />
        </div>
        <div class="bottom">
            <h2 class="title">
                <p>历届部分评委</p>
            </h2>
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/hcj/teachers.png" width="100%" >
        </div>
        <div class="contant">
            <!-- <p>联系我们</p>
            <p class="point" @click="toHelpcenter">常用资料</p> -->
            <p class="point" @click="tologin">管理员入口</p>
            <p class="point" style="color: #666;">访问量:{{num}}</p>
        </div>
    </div>
</template>

<script>
import active from './common/active'
import passage from './common/passage'
import workShow from './common/workShow'
import videos from './common/videos'
import network from '@/api'
import theme from './common/theme'
import communication from './common/communication'
import rules from './common/rules'
import { tologin } from "@@/utils/util";
import {setItem, getItem } from "@/common/common.js";
export default {
    components:{
        active,
        passage,
        workShow,
        videos,
        theme,
        communication,
        rules,
    },
    data(){
        return{
            num:0
        }
    },
    async created(){
         let res = await network.statistics({data:{
            groupId: getItem("groupId"),
        }});
        if(res=='error') return;
        this.num = res
        console.log(res,123);
        // api?groupId=13018
    },
    methods:{
        tologin(){
            tologin('');
        },
        toHelpcenter(){
            window.open('http://cc.moocollege.com/#/helpcenter')
        }
    }
}
</script>


<style lang="less" scoped>
.mainpage{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 28px;
    .top{
        width: 100%;
        height: 640px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left{
            width: 926px;
            height: 100%;
            >div{
                display: flex;
                justify-content:space-between;
                align-items: flex-start;
            }
        }
        .right{
            width: 278px;
            height: 100%;
            background: #F5F5F5;
            padding: 0 23px;
        }
    }
    .bottom{
        width: 100%;
        padding: 24px 0 30px;
        img{
            margin-top: 12px;
        }
    }
    .contant{
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
        color: #BB0294;
        border-top: 2px solid #cccc;
        text-align: left;
        font-weight: bold;
        p{
            display: inline-block;
            vertical-align: top;
            margin: 13px 13px 13px 0;
            padding-left: 13px;
            // border-left: 1px solid #DADADA;
            &:first-child{
                border: none;
                padding-left: 0;
            }
            &.point{
                cursor: pointer;
            }
        }
    }
}
</style>