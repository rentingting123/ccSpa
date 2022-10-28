<template>
    <div class="review">
        <h3 class="title">
            <p>赛事简讯</p> 
            <span @click="$router.push('/datacenter/half/communication')">more</span>
        </h3>
        <ul class="clearfix" >
            <li v-for="list,index in lists" @click="$router.push('/datacenter/news/detail?id='+list.id)">
                <div class="first" v-if="index==0">
                    <img :src="list.newsIcon" alt="" srcset="">
                    <p class="dian" :title="list.newsTitle">{{list.newsTitle}}</p>
                </div>
                <div class="other dian" v-else :title="list.newsTitle">{{list.newsTitle}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import network from "@/api";
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
            type: 31,
            pageNum: 1,
            pageSize: 5
        }})
        if(res=='error') return;
        this.lists = res.pageData || []
    },
}
</script>

<style lang="less" scoped>
.review{
    width: 100%;
    height: auto;
    text-align: left;
    h2{

    }
    ul{
        width: 100%;
        li{
            cursor: pointer;
        }
        .first{
            width: 144px;
            height: 81px;
            position: relative;
            float: left;
            margin-right: 12px;
            img{
                width: 100%;
                height: 100%;
            }
            p{
                position: absolute;
                bottom: 0;
                left: 0;
                background: rgba(0,0,0,.3);
                width: 100%;
                height: 26px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0.92px;
                text-align: center;
                line-height: 26px;
                padding: 0 3px;
                text-align: center;
            }
        }
        .other{
            width: 205px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.5px;
            text-align: justify;
            line-height: 20px;
        }
    }
}
</style>
