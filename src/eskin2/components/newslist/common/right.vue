<template>
    <div class="right">
        <h1 class="title title2">资讯
            <ul class="type">
                <li :class="{'on':on==null}" @click="choose(null)">全部<p class="line"></p></li>
                <li :class="{'on':on==4}" @click="choose(4)">赛事资讯<p class="line"></p></li>
                <li :class="{'on':on==5}" @click="choose(5)">政策文件<p class="line"></p></li>
                <li :class="{'on':on==6}" @click="choose(6)">学生竞赛<p class="line"></p></li>
                <li :class="{'on':on==7}" @click="choose(7)">教师发展<p class="line"></p></li>
            </ul>
        </h1>
        <ul>
            <li v-for="item,index in competitionReferList" :class="{'on':index==hover}" @mousemove="hover=index">
                <div class="normal">
                    <p @click="tonewsdetail(item)" :title="item.newsTitle">
                        <span class="first dian"><i></i>{{item.newsTitle}}</span>
                        <span class="last">{{item.newsDate}}</span>
                    </p>
                </div>
                <div class="on" @click="tonewsdetail(item)">
                    <img :src="item.banner">
                    <div>
                        <h3 class="dian" :title="item.newsTitle">{{item.newsTitle}}</h3>
                        <div class="dian2 html" v-html="item.newsInfo"></div>
                        <p class="eye"><span>{{item.days}}</span> <span class="last"><i class="iconfont">&#xe649;</i>{{item.clickCount || 0}}</span> </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { removeHtmlTag } from '@@/utils/util';
export default {
    props:['competitionReferList','init'],
    data(){
        return{
            on: null,
            news: [],
            hover: 0,
        }
    },
    created(){
        this.on = this.$route.query.type;
        for(let i in this.competitionReferList){
            this.competitionReferList[i].newsInfo = removeHtmlTag(this.competitionReferList[i].newsInfo)
        }
    },
    methods:{
        choose(type){
            this.on = type;
            this.init && this.init(type)
        },
        tonewsdetail(item){
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
            // this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    },
    watch:{
        competitionReferList(){
            for(let i in this.competitionReferList){
                this.competitionReferList[i].newsInfo = removeHtmlTag(this.competitionReferList[i].newsInfo)
            }
        }
    }
}
</script>


<style lang="less" scoped>
.right{
    width: 771px;
    background: #ffffff;
    h1{
        justify-content: flex-start;
        .type{
            width: auto;
            margin-left: 88px;
            li{
                width: 100px;
            }
        }
    }
    >ul{
        text-align: left;
        padding: 0 20px 20px;
        li{
            border-bottom: 1px solid #E0E0E0;
            cursor: pointer;
            padding: 1px 0;
            .normal{
                font-size: 18px;
                color: #2F2F2F;
                letter-spacing: 1.12px;
                line-height: 26px;
                margin-top: 10px;
                font-weight: bold;
                .first{
                    display: inline-block;
                    width: 600px;
                    i{
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        border-radius: 100%;
                        background: #B8B8B8;
                        margin-right:  9px;
                        position: relative;
                        top: -4px;
                    }
                }
                .last{
                    font-size: 14px;
                    color: #9B9B9B;
                    letter-spacing: 0.88px;
                    float: right;
                    line-height: 26px;
                    font-weight: 400;
                }
            }
            .on{
                display: none;
                width: 100%;
                height: 99px;
                margin: 23px 0;
                >img{
                    width: 175px;
                    height: 99px;
                    float: left;
                }
                >div{
                    width: 534px;
                    height: 99px;
                    float: right;
                    overflow: hidden;
                    h3{
                        font-size: 20px;
                        color: #2F2F2F;
                        letter-spacing: 1.25px;
                        line-height: 26px;
                    }
                    .html{
                        font-size: 16px !important;
                        color: #636363;
                        letter-spacing: 1px;
                        text-align: justify;
                        line-height: 26px;
                        height: 52px;
                        margin: 3px 0;
                    }
                    .eye{
                        font-size: 14px;
                        color: #9B9B9B;
                        letter-spacing: 0.88px;
                        line-height: 14px;
                        span{
                            display: inline-block;
                            i{
                                font-size: 14px;
                                margin-right: 8px;
                            }
                        }
                        .last{
                            float: right;
                        }
                    }
                }
            }
        }
        li.on{
            .normal{
                display: none;
            }
            .on{
                display: block;
            }
        }
        li:last-child{
            border: none;
        }
    }
}
</style>