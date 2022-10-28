<template>
    <div class="left">
        <h1 class="title">头条资讯</h1>
        <ul>
            <li v-for="(item,index) in news" @click="tonewsdetail(item)">
                <img :src="item.banner" alt="">
                <div>
                    <h3 class="dian">{{item.newsTitle}}</h3>
                    <div class="dian" v-html="item.newsInfo"></div>
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

        this.news = this.newsBannerList
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
}
h1{
    background-color: #ffffff;
}
ul{
    li{
        width: 370px; 
        cursor: pointer;
        margin-bottom: 30px;
        background: #ffffff;
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
                margin-top: 8px;
            }
            >div{
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
}
</style>
