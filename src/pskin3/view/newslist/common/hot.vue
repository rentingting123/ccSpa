<template>
    <div class="newshot">
        <h2Title title='头条资讯'/>
        <ul>
            <li v-for="item in lists" :key="item.id" class="topnewsmain" @click="tonewsdetail(item)">
                <img :src="item.banner" width="100%" height="100%">
                <p>{{item.newsBannerText}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import h2Title from '@/pskin3/components/h2'
import network from '@/api/index'
export default {
    components:{
        h2Title
    },
    data(){
        return{
            page: 1,
            size: 3,
            referType: 10,
            lists: []
        }
    },
    created(){
        this.init()
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
        },
        tonewsdetail(item){
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
        }
    }
}
</script>

<style lang="less" scoped>
.newshot{
    width:328px;
    height: auto;
    padding-bottom: 30px;
    ul{
        li{
            width:330px;
            height:185px;
            margin-top: 12px;
            position: relative;
            cursor: pointer;
            p{
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 12.6px;
                color: #FFFFFF;
                line-height: 14.4px;
                text-align: left;
                padding: 20px 12px 10px;
                background:rgba(0,0,0,0.3982);
            }
        }
    }
}
</style>