<template>
    <div class="newsdetails">
        <div class="detailsmain">
            <h3>{{news.newsTitle}}</h3>
            <div class="title">
                <p v-if="news.publishTime">发布时间: {{news.publishTime | date}}</p>
                <p>浏览次数: {{news.clickCount}}</p>
            </div>
            <!-- pdf显示 -->
            <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />
            <qlediter :data='news.newsInfo' style="width: 100%"/>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import moment from 'moment'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview"
export default {
    components:{
        qlediter,
        FileReview,
    },
    data(){
        return{
            id: '',
            news: {}
        }
    },
    created(){
        this.id = this.$route.query.id
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getDynamicsDetail({data:{
                id: this.id
            }});
            if(res=='error') return;
            this.news = res
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(parseInt(val)).format('YYYY-MM-DD');
        }
    }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
    display: inline-block;
    vertical-align: middle;
}
.newsdetails{
    width: 698px;
    height: auto;
    text-align: left;
    .detailsmain{
        h3{
            font-size: 22px;
            color: #000000;
            letter-spacing: 2px;
            margin: 20px 0;
        }
        .title{
            width: 100%;
            padding-bottom: 20px;
            border-bottom: 1px solid #E5E5E5;
            p{
                display: inline-block;
                vertical-align: top;
                font-size: 13px;
                color: #4A4A4A;
                letter-spacing: 1.18px;
                margin-right: 20px;
            }
        }
    }
}
</style>
