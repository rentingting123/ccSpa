<template>
    <div class="organization">
        <h2><p>寄语</p></h2>
        <ul>
            <li v-for="list in lists" @click="$router.push('/datacenter/news/detail?id='+list.id)">
                <img :src="list.newsIcon" alt="" srcset="">
                <!-- <p class="dian2" :title="list.newsTitle">{{list.newsTitle}}</p> -->
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api'
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
            type: 28,
            pageNum: 1,
            pageSize: 6
        }})
        if(res=='error') return;
        this.total = res.total
        this.lists = res.pageData || []
    }
}
</script>


<style lang="less" scoped>
.organization{
    // margin-top: 60px;
}
ul{
    width: 846px;
    margin-top: 20px;
    li{
        width: 262px;
        height: auto;
        border: 1px solid #E8E7E7;
        display: inline-block;
        vertical-align: top;
        margin-right: 30px;
        margin-bottom: 17px;
        cursor: pointer;
        img{
            width: 100%;
            height: 150px;
        }
        p{
            width: 100%;
            line-height: 1.8;
            height: 55px;
            overflow: hidden;
            text-align: center;
            padding: 0 5px;
        }
    }
    li:nth-child(3n){
        margin-right: 0;
    }
}
</style>