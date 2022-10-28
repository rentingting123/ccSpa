<template>
    <div class="mainpage">
        <div class="top">
            <div class="left">
                <div style="margin-top:13px;">
                    <!-- 全国竞赛 -->
                    <national />
                    <!-- 分区赛 -->
                    <province />
                </div>
                <div style="margin-top:20px;">
                    <div style="width:395px;">
                       <dynamic /> 
                    </div>
                    <div style="width:395px;">
                         <!-- 竞赛简讯 -->
                        <communication />
                        <!-- 赛事回顾 -->
                        <review />

                    </div>
                    
                    
                </div>
                <!-- <div style="margin-top:30px;"> -->
                    <!-- 媒体社评 -->
                    <!-- 
                </div> -->
            </div>
            <div class="right" >
                <!-- 成果展示 -->
                <worksresult />
                <!-- 竞赛简讯 -->
                <!-- <communication /> -->
                <!-- 现场回顾 -->
                 <videos style="margin-top:20px;"/>
                    <!-- 历届作品 -->
                    <works />
            </div>
        </div>
        <div class="bottom">
            <footerCom />
        </div>
    </div>
</template>

<script>
import national from '../view/navigation/national'
import province from '../view/navigation/province'
import review from '../view/navigation/review'
import works from '../view/navigation/works'
import dynamic from '../view/navigation/dynamic'
import videos from '../view/navigation/videos'
import communication from '../view/navigation/communication'
import worksresult from '../view/navigation/worksresult'


import footerCom from '../view/datacenter/mainpage/common/footer'
export default {
    components:{
        national,
        province,
        review,
        works,
        dynamic,
        videos,
        communication,
        worksresult,
        footerCom
    }
}
</script>


<style lang="less" scoped>
.mainpage{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    // background: #eeeeee;
    .top{
        width: 100%;
        height: 456px;
        min-height: calc(100vh - 300px - 115px);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left{
            width: 814px;
            height: 456px;
            >div{
                display: flex;
                justify-content:space-between;
                align-items: flex-start;
            }
        }
        .right{
            width: 397px;
            height: 456px;
            // background: #F5F5F5;
            margin: 13px 0px 0 0px;
        }
    }
    .bottom{
        width: 100%;
        height: 48px;
        border-top: 2px solid #0041AB;
    }
}
</style>