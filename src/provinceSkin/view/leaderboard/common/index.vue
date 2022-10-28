<template>
    <div class="common">
        <div class="logo" :style="`background-image:url(${bg})`" >
            <h1>{{title}}</h1>
            <p>共<span>{{total}}</span>个竞赛</p>
        </div>
        <ul >
            <li v-for="list in lists" @click="todetail(list)">{{list.name}}</li>
        </ul>
        <div style="text-align:center;margin-top:10px;">
            <el-pagination layout="prev, pager, next" @current-change="getlist" :current-page.sync="page"  :page-size="pagesize" :total="total"> </el-pagination>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            bg:'',
            title:'',
            lists:[],
            page: 1,
            pagesize: 6,
            total: 0
        }
    },
    props:['type','state'],
    created(){
        this.init();
        this.getlist();
    },
    methods:{
        init(){
            this.bg = require('../../../assets/leader/bg'+this.type%2+'.png');
            
            if(this.type==1){
                this.title = '省A类竞赛'
            }else if(this.type==2){
                this.title = '省级其他竞赛'
            }else if(this.type==3){
                this.title = '纳入排行榜竞赛'
            }else if(this.type==4){
                this.title = '申请排行榜竞赛'
            }
        },
        async getlist(){
            let res = await network.getRankingCompetition({data:{
                provinceId: localStorage.getItem('competitionId'),
                type: this.state,
                page: this.page,
                size: this.pagesize,
            }});
            if(res=='error') return;
            this.lists = res.list;
            this.total = parseInt(res.total);
        },
        async todetail(item){
            let url = item.url
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
            let res = await network.updateClickCount({data:{
                id: item.id
            }});
        }
    }
}
</script>

<style lang='less' scoped>
.common{
    width: 566px;
    height: 469px;
    background: #F9FAFB;
    text-align: left;
    .logo{
        width: 100%;
        height: 112px;
        background-size: cover;
        
        h1{
            font-size: 37px;
            color: #FFFFFF;
            letter-spacing: 2.31px;
            padding: 20px 0 0 58px;
            margin-bottom: 0 !important;
        }
        p{
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 1px;
            margin: 0 0 0 58px;
        }
    }
    ul{
        width: 494px;
        margin: 0 auto;
        height: 306px;
        overflow: hidden;
        li{
            line-height: 50px;
            font-size: 18px;
            color: #4A4A4A;
            letter-spacing: 1.12px;
            border-bottom: 1px solid #EBEBEB;
            cursor: pointer;
        }
    }

}
</style>
<style lang="less">
.el-pager li{
    background: none !important;
}
.el-pagination .btn-next, .el-pagination .btn-prev,.el-pagination button:disabled{
    background: none !important;
}
</style>