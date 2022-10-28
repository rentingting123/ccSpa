<template>
    <div class="review" v-if="lists.length>0">
        <h3 class="title">
            <p>历届作品</p> 
            <span @click="$router.push('/datacenter/half/previousworks')">more</span>
        </h3>
        <detail v-if="lists.length>0" :lists='lists' id1='demo3' id2='demo4'/>
    </div>
</template>

<script>
import detail from './common/index'
import network from "@/api";
export default {
    components:{
        detail
    },
    data(){
        return{
            lists:[],
        }
    },
    async created(){
        let id = localStorage.getItem('groupId');
        let res = await network.npgetNewsList({data:{
            groupId: id,
            type: 25,
            pageNum: 1,
            pageSize: 4
        }})
        if(res=='error') return;
        this.lists = res.pageData || []
    },
}
</script>

<style lang="less" scoped>
.review{
    width: 392px;
    height: auto;
    text-align: left;
    overflow: hidden;
    margin-top: 20px;
}
</style>
