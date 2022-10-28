<template>
    <div class="newss">
        <!-- 面包屑 -->
        <breadcrumb :title1="news && news.newsType | newstypes" :title2="news && news.newsTitle || '通知公告'" border='true' path="/newslist" />

        <div class="news">
            <h2>{{news.newsTitle}}</h2>
            <div class="title">
                <span>{{news.newsType | newstypes}}</span>
                {{(news.newsDate || news.publishTime) | date}}
                <p v-if="news.clickCount">
                    <i class="iconfont">&#xe649;</i>
                    {{news.clickCount}}
                </p>
            </div>
            
            <!-- pdf显示 -->
            <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />

            <qlediter :data='news.newsInfo' style="width: 100%"/>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview";
import breadcrumb from '@/nskin/components/breadcrumb'
import moment from 'moment'
export default {
    components:{
        qlediter,
        FileReview,
        breadcrumb,
    },
    data(){
        return{
            id:'',
            platformType: null,
            news:{}
        }
    },
    created(){
        this.id = this.$route.query.id
        if(!this.id) return;
        this.platformType = this.$route.query.platformType || null
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getNewsDetails({data:{
                id: this.id,
                provinceId: localStorage.getItem('competitionId'),
                platformType: this.platformType ? true : null
            }});
            if(res=='error') return;
            this.news = res
        }
    },
    filters:{
        date(val){
            if(!val) return '';
            if(val.indexOf('-') == -1){
                val = parseInt(val)
            } 
            return moment(val).format('YYYY-MM-DD')
        },
        newstypes(val){
            if(!val) return '新闻资讯'
            if(val=='新闻报道'){
                return '赛事通知'
            }else if(val=='竞赛评估'){
                return '竞赛排行'
            }else if(val=='教师发展'){
                return '教发指数'
            }else if(val=='学生竞赛'){
                return '竞赛排行'
            }else{
                return val
            }
        }
    }
}
</script>

<style lang="less" scoped>
.newss{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
}
.news{
    width: 1200px;
    padding: 32px 50px 50px;
    box-shadow: 0 4px 8px 0 #d5dde5;
    text-align: left;
    h2{
        font-size: 28px;
        color: #4A4A4A;
        font-weight: bold;
        text-align: center;
        padding-bottom: 18px;
        border-bottom: 1px solid #9B9B9B;
    }
    .title{
        font-size: 14px;
        color: #4A4A4A;
        margin: 12px 0 25px 0;
        text-align: right;
        span{
            color: #D0021B;
            margin-right: 30px;
        }
        p{
            i{
                font-size: 14px;
                margin-right: 4px;
            }
            font-size: 14px;
            color: #9B9B9B;
            letter-spacing: 0.88px;
            text-align: right;
            line-height: 14px;
            margin-left: 30px;
            display: inline-block;
        }
    }

}
</style>