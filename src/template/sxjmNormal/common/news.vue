<template>
    <div>
        <h1>赛事动态
            <a @click="more"> 查看详情> </a>
        </h1>
        <div v-for="(list,index) in news" :key="list.id" class="newsmain" @click="todetail(list)">
            <span>{{list.newsTitle}}</span>
            <time>{{list.newsTime | time}}</time>
        </div>

    </div>
</template>

<script>
import network from '@@/api/jxapi/index'
import moment from "moment"; 

export default {
    data(){
        return{
            news:[],
        }
    },
    methods:{
        async getList(type){
            let params={
                type:"",
                pageNum:1,
                pageSize:10,
                competitionId:localStorage.getItem('competitionId')
            }
            let newsList = await network.getNewsList({data:params});
            if(newsList=='error') return;
            this.news = newsList.pageData
        },
        more(){
            this.$router.push({path:'/news'})
        },
        todetail(item){
            this.$router.push({path:'/newsDetail',query:{id:item.id}})
        }
    },
    created(){
        this.getList();
    },
    filters:{
        time(val){
            if(!val) return;
            return moment(parseInt(val)).format('YYYY.MM.DD');
        }
    } 
}
</script>

<style lang="less" scoped>
h1{
    width: 100%;
    font-size: 22px;
    color: #4A4A4A;
    line-height: 33px;
    font-weight: bold;
    border-bottom: 3px solid #0041AB;
    padding-bottom: 16px;
    a{
        font-size: 14px;
        font-weight: 150;
        float: right;
        cursor: pointer;
    }
}
.newsmain{
    width: 100%;
    border-bottom: 1px solid rgba(155,155,155,0.3);
    padding: 12px 0;
    cursor: pointer;
    span{
        font-size: 16px;
        color: #4A4A4A;
        line-height: 30px;
        height: 24px;
        width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        font-weight: bold;
    }
    time{
        float: right;
        font-size: 12px;
        color: #4A4A4A;
        line-height: 36px;
        text-align: right;
        display: block;
        // margin-top: 5px;
    }
}
.no.newsmain{
    border-bottom: none;
}

</style>

