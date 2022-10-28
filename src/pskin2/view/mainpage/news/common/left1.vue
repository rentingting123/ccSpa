<template>
    <div class="left">
        <h1 class="title">头条资讯</h1>
        <ul>
            <li v-for="(item,index) in news" @click="tonewsdetail(item)" :class="{'on':index==0}">
                <img :src="item.banner" alt="">
                <div>
                    <h3 class="dian2">{{item.newsTitle}}</h3>
                    <div class="dian " v-html="item.newsInfo"></div>
                    <p><span>{{item.newsType}}</span><i class="fr">{{item.days}}</i></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { removeHtmlTag } from '@@/utils/util';
export default {
    props:['newsBannerList'],
    data(){
        return{
            news:[],
            interval:''
        }
    },
    created(){
        for(let i in this.newsBannerList){
            this.newsBannerList[i].newsInfo = removeHtmlTag(this.newsBannerList[i].newsInfo)
        }
        let arr = this.newsBannerList
        this.news = arr
        if(arr.length==3){
           this.interval = setInterval(() => {
                this.news = []
                let str = arr[0]
                arr[0] = arr[1]
                arr[1] = arr[2]
                arr[2] = str
                this.news = arr
            }, 5000);
        }else if(arr.length==2){
            this.interval = setInterval(() => {
                this.news = []
                let str = arr[0]
                arr[0] = arr[1]
                arr[1] = str
                this.news = arr
            }, 5000);
        }
    },
    destroyed(){
        if(this.interval){
            clearInterval(this.interval)
        }
    },
    methods:{
        tonewsdetail(item){
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
            // this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>


<style lang="less" scoped>
.left{
    width: 370px;
    background: #FFFFFF;
    height: 400px;
    overflow: hidden;
}
ul{
    li{
        width: 370px; 
        display: none;
        cursor: pointer;
        img{
            width: 100%;
            height: 209px;
        }
        >div{
            padding: 0 12px;
            padding-bottom: 22px;
            text-align: left;
            h3{
                font-size: 20px;
                color: #2F2F2F;
                letter-spacing: 1.25px;
                line-height: 26px;
                height: 52px;
                overflow: hidden;
                margin-top: 8px;
            }
            >div{
                height: 26px;
                margin: 8px 0;
                line-height: 26px;
            }
            p{
                font-size: 16px;
                color: #636363;
                letter-spacing: 1px;
                text-align: justify;
                line-height: 23px;
                margin-top: 4px;
                span{
                    font-size: 14px;
                    color: #0078E2;
                    letter-spacing: 0.88px;
                    line-height: 14px;
                    display: inline-block;
                }
                i{
                    display: inline-block;
                    font-size: 14px;
                    color: #9B9B9B;
                    letter-spacing: 0.88px;
                    float: right;
                    line-height: 14px;
                    font-style: normal;
                    margin-top: 3px;
                }
            }
        }
    }
    li.on{
        display: block;
        p{
            display: block;
        }
    }
}
</style>
