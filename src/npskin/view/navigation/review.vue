<template>
    <div class="review" v-if="lists.length>0">
        <h3 class="title">
            <p>赛事回顾</p> 
            <span @click="$router.push('/datacenter/half/eventreview')">more</span>
        </h3>
        <detail v-if="lists.length>0" :lists='lists' id1="demo1" id2="demo2"/>
    </div>
</template>

<script>
import detail from './common/index'
import network from "@/api";
export default {
    components:{
        detail,
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
            type: 24,
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

<style lang="less">
h3.title{
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    font-size: 16px;
    height: 20px;
    p{
        line-height: 2;
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        color: #0041AB;
        letter-spacing: 1.45px;
        text-indent: 22px;
        background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/npskin/title.png') no-repeat;
        background-size: auto 16px;
        background-position: center left;
    }
    span{
        text-align: center;
        background: #6BB8FF;
        border-radius: 8px;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        cursor: pointer;
        padding: 0 6px;
        line-height: 1.5;
    }
}
</style>