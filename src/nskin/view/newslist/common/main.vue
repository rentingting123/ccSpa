<template>
    <div class="newMain">
        <ul class="type">
            <li :class="{'on':referType==null}" @click="choose(null)">全部<p class="line"></p></li>
            <li :class="{'on':referType==5}" @click="choose(5)">政策文件<p class="line"></p></li>
            <li :class="{'on':referType==4}" @click="choose(4)">赛事资讯<p class="line"></p></li>
            <li :class="{'on':referType==9}" @click="choose(9)">赛事通知<p class="line"></p></li>
            <li :class="{'on':referType==6}" @click="choose(6)">竞赛排行<p class="line"></p></li>
            <li :class="{'on':referType==7}" @click="choose(7)">教发指数<p class="line"></p></li>
        </ul>
        <ul class="lists">
            <li v-for="item,index in competitionReferList" :key="index" @click="tonewsdetail(item)">
                <p class="newsTitle dian" :title="item.newsTitle"> {{item.newsTitle}}</p>
                <p class="newsDate">{{item.newsDate}}</p>
                <img class="next" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/newList_next.png" >
            </li>
            <div style="text-align:center;margin:42px auto 0;">
                <el-pagination 
                    background
                    layout="prev, pager, next" 
                    @current-change="pagechange" 
                    :current-page.sync="pageNum" 
                    :page-size="pageSize" 
                    :total="total">
                </el-pagination>                
            </div>
        </ul>
    </div>
</template>
<script>
import network from '@/api/index'
export default {
    props:['searchName'],
    data(){
        return{
            referType: null,
            news: [],
            hover: 0,
            competitionReferList: [],
            pageNum: 1,
            pageSize: 13,
            total: 0,
        }
    },
    created(){
        this.referType = this.$route.query.type || null;
        this.init()
    },
    methods:{
        async init(flag){
            if(flag) this.pageNum = 1;
            let res = await network.getNewsHeadline({data:{
                page: this.pageNum,
                size: this.pageSize,
                referType: this.referType,
                name: this.searchName,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.total = res.total
        },
        choose(type){
            this.referType = type;
            this.pageNum = 1
            this.init()
        },
        pagechange(){
            this.init();
        },
        tonewsdetail(item){
            this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    },
}
</script>


<style lang="less" scoped>
.newMain{
    width: 100%;
    height: 864px;
    font-size: 0;
    margin-top: 37px;
    .type{
        width: 168px;
        height: 100%;
        background: #252223;
        padding: 65px 0 0;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        li{
            width: 100%;
            margin-bottom: 24px;
            font-size: 18px;
            line-height: 24px;
            color: #FFFFFF;
            cursor: pointer;
            &.on{
                color: #ED1E26;
            }
        }
    }
    .lists{
        text-align: left;
        display: inline-block;
        vertical-align: top;
        width: 1031px;
        height: 864px;
        background: #FFFFFF;
        box-shadow: 0px 2px 9px rgba(199, 199, 199, 0.6);
        border-radius: 0px 10px 10px 0px;
        li{
            padding: 0 34px;
            border-bottom: 1px solid #999999;
            height: 58px;
            cursor: pointer;
            font-size: 0;
            text-align: left;
            p{
                display: inline-block;
                vertical-align: top;
                font-size: 18px;
                line-height: 58px;
                color: #4A4A4A;
            }
            .newsTitle{
                width: 650px;
                margin-right: 48px;
            }
            .newsDate{
                width: 230px;
            }
            .next{
                width: 33px;
                height: 33px;
                margin-top: 12px;
                opacity: 0.3;
            }
            &:hover{
                background: rgba(237, 30, 38, 0.1);
                p{
                    color: #ED1E26;
                }
                .next{
                    opacity: 1;
                }
            }
        }
    }
    /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #ED1E26;
    }
}

</style>