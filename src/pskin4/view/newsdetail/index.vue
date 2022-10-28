<template>
    <div class="newsdetail">
        <div class="newsheader">
            <div>
                <h3>{{news.newsTitle}}</h3>
                <p>
                    <span>{{news.newsType}}</span>
                    <time>{{news.newsDate}}</time>
                    <i>阅读量：{{news.clickCount || 0}}</i>
                </p>
            </div>
        </div>
        <div class="newsmain">
            <div style="width: 1000px">
                 <!-- pdf显示 -->
                <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />
                <qlediter :data='news.newsInfo' />
            </div>
            <hot />
        </div>
    </div>
</template>

<script>
import network from "@/api/index";
import hot from './common/hot'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview";
export default {
    components:{
        hot,
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
            let res = await network.getNewsDetails({data:{
                id: this.id,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.news = res
        }
    }
}
</script>

<style lang="less" scoped>
.newsdetail{
    width: 100%;
    height: auto;
    .newsheader{
        width: 100%;
        height: auto;
        background:rgba(242,242,242,1);
        padding: 30px 0 19px;
        >div{
            width: 850px;
            margin: 0 auto;
            text-align: left;
            h3{
                font-size:20px;
                font-weight:bold;
                color:rgba(74,74,74,1);
                line-height:30px;
                letter-spacing:1px;
            }
            p{
                margin-top: 16px;
                span{
                    font-size:14px;
                    font-weight:400;
                    color:rgba(0,120,226,1);
                    line-height:21px;
                    margin-right: 30px;
                }
                time{
                    font-size:14px;
                    font-weight:400;
                    color:rgba(74,74,74,1);
                    line-height:21px;
                }
                i{
                    font-size:14px;
                    font-weight:400;
                    line-height:21px;
                    margin-left: 30px;
                    font-style: normal;
                }
            }
        }
    }
    .newsmain{
        width: 1100px;
        margin: 0 auto;
        margin-top: 27px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
}
</style>
