<template>
    <div class="mainpage">
       <!-- <h2Title title="测试" path='/datacenter/news' :more='true'></h2Title> -->
       <div class="main">
           <div class="top">
                <div class="left">
                    <div class='topLeftMain'>
                        <div class='topLeftMainLeft'>
                            <h2Title title="新闻动态" top='13px' :more='true' url='http://cgd.ckcest.cn/news/index/now'></h2Title>
                            <newslist v-if="newslist" :lists='newslist1 || []' />
                            
                        </div>
                        <div class='topLeftMainRight'>
                            <h2Title title="通知公告"  top='13px' :more='true' url='http://cgd.ckcest.cn/news/index/now'></h2Title>
                            <newslist v-if="newslist" :lists='newslist || []'/>
                            <h2Title title="评审日程" top='29px'></h2Title>
                            <schedule />
                        </div>
                    </div>
                    <h2Title title="作品展出" ></h2Title>
                    <workShow />
                    <h2Title title="院士专家" top='37px'></h2Title>
                    <academician height='385px'/>

                 </div>
                <div class="right">
                    <h2Title title="好设计-短视频讲堂" top='13px' url='http://cgd.ckcest.cn/ceremony/viewIndex' :more='true'></h2Title>
                    <videoshow 
                        src='http://web.moocollege.com/mooc/hzq/vueskin/hsj/1.mp4' 
                        poster='http://web.moocollege.com/mooc/hzq/vueskin/hsj/1.png' 
                        title='2020好设计·创意奖宣传片'
                    />

                    <h2Title title="好设计-颁奖典礼" url='http://cgd.ckcest.cn/ceremony/viewIndex' :more='true'></h2Title>
                    <videoshow 
                        src='http://web.moocollege.com/mooc/hzq/vueskin/hsj/2.mp4' 
                        poster='http://web.moocollege.com/mooc/hzq/vueskin/hsj/2.png' 
                        title='2018好设计·创意奖颁奖视频'
                    />

                    <h2Title title="合作伙伴"></h2Title>
                    <partner :lists='partnerlist' style="min-height:362px;"/>

                    <h2Title title="友情链接"></h2Title>
                    <links :lists='listslist' style="min-height:122px;"/>
                    
                </div>
           </div>
           <div class="mainbottom">
               <mainpageBottom />
           </div>
       </div>
    </div>
</template>

<script>
import {news, news1} from '@/hsj/mock/news'
import h2Title from '@/hsj/components/h2'
import videoshow from './common/videoshow'
import partner from './common/partner'
import links from './common/links'
import newslist from '@/hsj/components/newslist'
import schedule from './common/schedule'
import academician from '../common/academicians'
import workShow from './common/workShow'
import mainpageBottom from './common/mainpageBottom'
export default {
    components:{
        h2Title,
        videoshow,
        partner,
        links,
        newslist,
        schedule,
        academician,
        workShow,
        mainpageBottom,
    },
    data(){
        return{
            partnerlist:[
                '全国大学生机械创新设计大赛',
                '高端装备创新设计大赛',
                '中国大学生起重机创意大赛',
                '陕西省工业工程改善创意大赛',
                '之新创新设计大赛',
                '弹力方程式赛车国际设计锦标赛',
                '醒狮杯国际工业设计大赛',
                '沈阳盛京杯工业设计大赛'
            ],
            listslist:[
                {
                    name: '中国创新设计产业战略联盟',
                    links: '',
                    id: 1
                },
                {
                    name: '中国工程科技知识中心',
                    links: 'http://www.ckcest.cn/',
                    id: 2
                },
                {
                    name: '中国机械工程学会',
                    links: 'http://www.cmes.org/',
                    id: 3
                },
                {
                    name: '浙江大学',
                    links: 'http://www.zju.edu.cn/',
                    id: 4
                }
            ],
            newslist: news,
            newslist1: news1,
        }
    },

    
}
</script>


<style lang="less" scoped>
.mainpage{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 28px;
    .main{
        .top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
            .left{
                width: 872px;
                height: auto;
                .topLeftMain{
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    .topLeftMainLeft{
                        width: 418px;
                        height: auto;
                    }
                    .topLeftMainRight{
                        width: 419px;
                        height: auto;
                    }
                }
            }
            .right{
                width: 330px;
                padding: 0 19px;
                height: auto;
                background: #F5F5F5;
            }
        }
        .mainbottom{
            width: 100%;
            border-top: #EDEDED 2px solid;
            padding: 24px 0 30px;
        }
    }
}
</style>