<template>
    <div class="news">
        <ul class="navs">
            <li v-for="nav in navs" :key="nav.type" :class="{'on':nav.type==type}" @click="setId(nav)">
                {{nav.name}}
            </li>
        </ul>
        <div class="detailsmain">
            <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
                <span style="float:left;">当前位置：</span>
                <el-breadcrumb-item to="/" >首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/news',query:{type:22}}" v-if="type==22">赛事动态</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/news',query:{type:30}}" v-if="type==30">通知文件</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/news',query:{type:24}}" v-if="type==24">赛事回顾</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/news',query:{type:25}}" v-if="type==25">成果展示</el-breadcrumb-item>
                <el-breadcrumb-item >正文</el-breadcrumb-item>
            </el-breadcrumb>
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
import moment from 'moment'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview";
import network from '@/api'
export default {
    components:{
        qlediter,
        FileReview,
    },
    created(){
        this.type = this.$route.query.type || 22
        this.id = this.$route.params.id
        this.getNewsList();
    },
    data(){
        return{
            type: '',
            id: '',
            news: {},
            navs: [
                {
                    name: '首页',
                    type: 0,
                    path: '/',
                },
                {
                    name: '赛事动态',
                    type: 22,
                },
                {
                    name: '通知文件',
                    type: 30,
                },
                {
                    name: '赛事回顾',
                    type: 24,
                },
                {
                    name: '成果展示',
                    type: 25,
                },
            ],
        }
    },
    methods:{
        async getNewsList(){
            let res = await network.getDynamicsDetail({data:{
                id: this.id
            }});
            if(res=='error') return;
            this.news = res || {}
        },
        setId(nav){
            if(nav.path){
                this.$router.push(nav.path)
            }else{
                this.$router.push('/news?type='+nav.type)
            }
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

<style lang='less' scoped>
.news{
    width: 1045px;
    margin: 0 auto;
    padding: 23px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .navs{
        width: 190px;
        height: auto;
        li{
            width: 190px;
            height: 41px;
            line-height: 41px;
            text-align: center;
            font-size: 16px;
            color: #4A4A4A;
            letter-spacing: 1px;
            cursor: pointer;
            &.on{
                font-weight: bold;
                color: #FFFFFF;
                background: linear-gradient(266deg, #559CFE 0%, #526AFE 100%);
            }
        }
    }
    .detailsmain{
        padding-top: 11px;
        width: 830px;
        h3{
            font-size: 22px;
            color: #0041AB;
            letter-spacing: 2px;
            margin: 20px 0;
            text-align: left;
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