<template>
    <div class="news">
        <ul class="navs">
            <li v-for="nav in navs" :key="nav.type" :class="{'on':nav.type==type}" @click="setId(nav)">
                {{nav.name}}
            </li>
        </ul>
        <div class="newslists">
            <h3>
                <p class="head">赛事动态<span></span></p>
                <p>
                    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
                        <span style="float:left;">当前位置：</span>
                        <el-breadcrumb-item to="/" >首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="type==22">赛事动态</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="type==30">通知文件</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="type==24">赛事回顾</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="type==25">成果展示</el-breadcrumb-item>
                    </el-breadcrumb>
                </p>
            </h3>
            <div v-loading="loading">
                <newsList :lists='newsList' :type='type' v-if="type==22 || type==30"/>
                <picsmall :lists='newsList' :type='type' v-if="type==24"/>
                <picbig :lists='newsList' :type='type' v-if="type==25"/>
            </div>
            <div class="pages">
                <el-pagination
                    @current-change="getNewsList"
                    :current-page.sync="pageNum"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div> 
    </div>
</template>

<script>
import newsList from '@/npskin3/components/newlist/news'
import picsmall from '@/npskin3/components/newlist/picsmall'
import picbig from '@/npskin3/components/newlist/picbig'
import network from '@/api'
export default {
    components:{
        newsList,
        picsmall,
        picbig,
    },
    created(){
        this.type = this.$route.query.type || 22
        this.getNewsList();
    },
    data(){
        return{
            type: '',
            loading:false,
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
                    name: '历届作品',
                    type: 25,
                },
            ],
            newsList: [],
            pageNum: 1,
            pageSize: 12,
            total: 0,
        }
    },
    methods:{
        async getNewsList(){
            this.loading = true
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: this.type,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }})
            if(res=='error') return
            this.loading = false
            this.newsList = res && res.pageData || []
            this.total = res && res.total || 0
        },
        setId(nav){
            this.newsList=[]
            this.type=nav.type

            if(this.type==22 || this.type ==30){
                this.pageSize = 12
            }else if(this.type==24){
                this.pageSize = 6
            }else if(this.type==25){
                this.pageSize = 4
            }
            this.pageNum = 1

            this.getNewsList();
            if(nav.path){
                this.$router.push(nav.path)
            }else{
                this.$router.push('/news?type='+nav.type)
            }
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
    .newslists{
        width: 830px;
        h3{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #AFAFAF;
            padding: 11px 0;
        }
        .head{
            position: relative;
            span{
                width: 100%;
                height: 3px;
                background: #6283FF;
                position: absolute;
                bottom: -12px;
                left: 0;
            }
        }
        .pages{
            text-align: center;
            margin: 20px 0;
        }
    }
}
</style>