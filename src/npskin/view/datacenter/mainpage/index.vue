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
                        <!-- <schedule /> -->
                          <!-- 赛事通道 -->
                        <passage />

                    </div>
                   
                </div>
                <!-- <div style="margin-top:31px;"> -->
                  
              
                <!-- </div> -->
                <div style="margin-top:31px;">
                    <!-- 赛事回顾 -->
                        <review />
                    <!-- 往届作品 -->
                        <works />
                </div>
            </div>
            <div class="right">
                <!-- 视屏展播 -->
                <videos />
            
                <!-- 友情链接 -->
                <rules />
            </div>
        </div> 
        <div class="bottom">
            <footerCom />
        </div>
    </div>
</template>

<script>
import active from './common/active'
import review from './common/review'
import passage from './common/passage'
import schedule from './common/schedule'
import works from './common/works'
import videos from './common/videos'
import communication from './common/communication'
import rules from './common/rules'
import footerCom from './common/footer'
export default {
    components:{
        active,
        review,
        passage,
        schedule,
        works,
        videos,
        communication,
        rules,
        footerCom
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
        height: 631px;
        border-bottom: 2px solid #0041AB;
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
        height: 76px;
    }
}
</style>