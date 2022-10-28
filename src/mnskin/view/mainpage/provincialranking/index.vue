<template>
    <div class="provincialranking">
        <h1 class="title"><i class="el-icon-caret-right breadcrumbIcon"></i> 2016-2020学生竞赛省级排行</h1>
        <div class="main">
            <ul>
                <li v-for="list in lists" v-if="list.rankingIndex<=8" :key="list.rankingIndex">
                    <div class="num" :class="{'on':list.rankingIndex<=3}">{{list.rankingIndex}}</div>
                    <div class="name dian">{{list.province}}</div>
                    <p class="score">
                        <span>{{list.rankingScore}} </span>
                    </p>
                </li>
            </ul>
            <ul>
                <li v-for="list in lists" v-if="list.rankingIndex>8" :key="list.rankingIndex">
                    <div class="num">{{list.rankingIndex}}</div>
                    <div class="name dian">{{list.province}}</div>
                    <p class="score">
                        <span>{{list.rankingScore}} </span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import network from '@/mnskin/api/index'
export default {
    data(){
        return{
            lists:[],
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let res = await network.provincialRanking({data:{
                provinceId: 1,
            }});
            if(res=='error') return;
            this.lists = res;
        },
    }
}
</script>

<style lang="less" scoped>
.provincialranking{
    width: 100%;
    background: #ffffff;
    margin-top: .20rem;
    padding: .22rem .32rem;
    h1{
        font-size: .32rem;
        line-height: 0.42rem;
        color: #252223;
        text-align: left;
        margin: 0;
    }
    .main{
        display: flex;
        justify-content:space-between;
        padding-top: .45rem;
        margin-bottom: .3rem;
    }
    ul{
        border-right: .01rem solid #EBEBEB;
        padding-right: .32rem;
        li{
            display: flex;
            align-items: center;
            margin-bottom: .3rem;
            .num{
                width: .38rem;
                height: .28rem;
                line-height: .28rem;
                margin-right: .10rem;
                font-size: .27rem;
                color: #9B9B9B;
                letter-spacing: .01rem;
                text-align: center;
                &.on{
                    color: #0078E2;
                }
            }
            .name{
                width: 1.80rem;
                font-size: .28rem;
                color: #131313;
                text-align: left;
                font-weight: bold;
            }
            .score{
                font-size: .24rem;
                color: #ACB0B0;
                vertical-align: middle;
                span{
                    width: .83rem;
                    display: inline-block;
                    text-align: left;
                    font-weight: bold;
                }
            }

        }
        li:nth-child(8n){
            margin-bottom: 0;
        }
    }
    ul:last-child{
        border: none;
        padding-right: 0;
        padding-left: .32rem;
    }
}
</style>