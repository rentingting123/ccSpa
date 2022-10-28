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
                        <passage pnSkin="1"/>

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
            
                <!-- 制度文件 -->
                <rules />
            </div>
        </div> 
        <div class="bottom">
            <footerCom />
        </div>
    </div>
</template>

<script>
import active from '@/npskin/view/datacenter/mainpage/common/active'
import review from '@/npskin/view/datacenter/mainpage/common/review'
import passage from '@/npskin/view/datacenter/mainpage/common/passage'
import schedule from '@/npskin/view/datacenter/mainpage/common/schedule'
import works from '@/npskin/view/datacenter/mainpage/common/works'
import videos from '@/npskin/view/datacenter/mainpage/common/videos'
import communication from '@/npskin/view/datacenter/mainpage/common/communication'
import rules from '@/npskin/view/datacenter/mainpage/common/rules'
import footerCom from '@/npskin/view/datacenter/mainpage/common/footer'
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
            .videos{
                margin-top: 12px;
            }
        }
    }
    .bottom{
        border-top: 2px solid #0041AB;
        width: 100%;
        height: 76px;
    }
}
</style>