<template>
    <div class="topnews">
        <h2Title :title='title' more='true' :path='"/newslist?type="+referType' />
        <el-carousel class="newbanner" indicator-position="outside" arrow='never' height="185px">
            <el-carousel-item class="topnewsmain" v-for="item in lists" :key="item.id" >
                <img :src="item.banner" width="100%" height="100%" @click="tonewsdetail(item)">
                <p>{{item.newsBannerText}}</p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import network from '@/api/index'
import h2Title from "@/pskin4/components/h2";

export default {
    props:['referType','title'],
    components:{
        h2Title
    },
    created(){
        this.init()
    },
    data(){
        return{
            lists:[],
            page: 1,
            pagesize: 3
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
.topnews{
    width:362px;
    height:261px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    .newbanner{
        width: 330px;
        margin: 0 auto;
        margin-top: 16px;
        cursor: pointer;
        .el-carousel__item p{
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
</style>
