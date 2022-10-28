<template>
    <div class="newshot">
        <h2Title title='头条资讯'/>
        <ul>
            <li v-for="item in lists" :key="item.id" class="topnewsmain" @click="tonewsdetail(item)">
                <img :src="item.banner">
                <p :title="item.newsBannerText">
                    <span class="dian2">{{item.newsBannerText}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import h2Title from '@/pskin4/components/h2'
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
    width:190px;
    height:475px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(228,228,228,1);
    padding-bottom: 8px;
    margin-bottom: 20px;
    ul{
        li{
            width:155px;
            height:auto;
            margin: 0 auto;
            margin-top: 8px;
            position: relative;
            cursor: pointer;
            img{
                width: 100%;
                height: 87px;
            }
            p{
                width: 100%;
                font-size:13px;
                font-weight:400;
                color:rgba(84,84,84,1);
                line-height:18px;
                text-align: left;
                padding: 2px 8px;
                background:rgba(244,244,244,1);
                span{
                    height: 36px;
                    margin: 2px auto;
                }
            }
        }
    }
}
</style>
