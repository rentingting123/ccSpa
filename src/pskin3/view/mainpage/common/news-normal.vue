<template>
    <div class="topnews">
        <h2Title :title='title' more='true' :path='"/newslist?type="+referType'/>
        <ul class="newslist">
            <li v-for="(list,index) in lists" :key="list.id" :title="list.newsTitle">
                <newsList :lists='list' :index="index"/>
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api/index'
import newsList from '@/pskin3/components/news'
import h2Title from "@/pskin3/components/h2";

export default {
    props:['title','referType'],
    components:{
        h2Title,
        newsList
    },
    created(){
        this.init()
    },
    data(){
        return{
            lists:[],
            page: 1,
            pagesize: 7,
        }
    },
    methods:{
        async init(){
            let res = await network.getHeadline2020({data:{
                page: this.page,
                size: this.pagesize,
                referType: this.referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.lists = res.pageData || []
        }
    }

}
</script>

<style lang="less" scoped>
.topnews{
    width:362px;
    height:261px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    margin-left: 7px;
    .newslist{
        padding: 16px;
        li{
            margin-bottom: 13px;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
}
</style>