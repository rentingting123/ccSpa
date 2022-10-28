<template>
    <div class="videos">
         <h2 class="title">
            <p>友情链接</p>
            <!-- <span @click="$router.push('/datacenter/news/filesystem')">more</span> -->
        </h2>
        <ul>
            <li v-for="list in webInfo.links" class="dian" :title="list.name"><a target="_blank" :href="list.url.indexOf('http')>-1?list.url:'http://'+list.url">{{list.name}}</a></li>
        </ul>
    </div>
</template>

<script>
import network from "@/api";
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
             webInfo: {}
        }
    },
    async created(){
        let id = localStorage.getItem('groupId');
         this.webInfo = getWebInfo();
        let res = await network.npgetNewsList({data:{
            groupId: id,
            type: 20,
            pageNum: 1,
            pageSize: 3
        }})
        if(res=='error') return;
        this.lists = res.pageData || []
    },
}
</script>


<style lang="less" scoped>
.videos{
    margin-top: 26px;
    height: 385px;
    overflow-y: scroll;
    ul{
        li{
            text-align: left;
            width: 100%;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.52px;
            line-height: 38px;
            border-bottom: 1px dotted #C4C4C4;
            cursor: pointer;
        }
    }
}
</style>