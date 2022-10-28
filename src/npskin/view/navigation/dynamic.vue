<template>
    <div class="review">
        <h3 class="title">
            <p>赛事动态</p> 
            <span @click="$router.push('/datacenter/news/dynamicevents')">more</span>
        </h3>
        <ul class="clearfix" >
            <li v-for="list,index in lists" @click="$router.push('/datacenter/news/detail?id='+list.id)">
                <div class="other dian" :title="list.newsTitle">{{list.newsTitle}}</div>
                <div>{{list.newsTime}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import network from "@/api";
import {parseTime} from "@/lib/util"
export default {
    data(){
        return{
            lists:[]
        }
    },
    async created(){
        let id = localStorage.getItem('groupId');
        let res = await network.npgetNewsList({data:{
            groupId: id,
            type: 22,
            pageNum: 1,
            pageSize: 5
        }})
        if(res=='error') return;
        this.lists = res.pageData&&res.pageData.map(item=>{item.newsTime=parseTime(item.newsTime,'MM-dd');return item}) || []
    },
}
</script>

<style lang="less" scoped>
.review{
    width: 395px;
    height: auto;
    text-align: left;
    .title{
        border-bottom: 1px solid #4c4c4c;
        margin-bottom: 0;
        padding-bottom: 13px;
        box-sizing: content-box;
    }
    ul{
        width: 100%;
        li{
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            border-bottom: 1px dotted #C4C4C4;
            padding: 11px 0px;
        }
        .other{
            width: 351px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.5px;
            text-align: justify;
            line-height: 20px;
        }
    }
}
</style>
