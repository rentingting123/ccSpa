<template>
<div>
    <h1>
        <i class="iconfont">&#xe624;</i>人气竞赛TOP5
        <span class="more" @click="$router.push('/competition')">查看更多</span>
    </h1>
    <ul class="clearfix">
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="list.id" class="clearfix">
            <div class="num">
                {{index+1}}
            </div>
            <div class="topmain" :class="{'no':index>2}">
                <div class="img">
                    <img :src="list.banner" width="100%" height="100%">
                </div>
                <div class="message">
                    <h3>{{list.name}}</h3>
                    <p>{{list.sponsor}}</p>
                    <p class="type" :class="{'type0':list.type==0,'type1':list.type==1,'type2':list.type==2}">{{list.type | competitionType}}</p>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            lists:[]
        }
    },
    created(){
       this.init();
    },
    methods:{
        async init(){
            let res = await network.rankingtopList({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.lists = res.competitionList
        },
        todetail(list){
           window.open(list.url)
        }
    }
}
</script>


<style lang="less" scoped>
h1{
    i{
        color: #C72222;
    }
}
ul{
    li{
        width: 312px;
        height: 113px;
        margin: 10px 0 20px 0;
        cursor: pointer;
        .num{
            width: 30px;
            height: 30px;
            border-radius: 100%;
            line-height: 30px;
            margin-right: 17px;
            font-size: 15px;
            color: #FFFFFF;
            background: #0078E2;
            float: left;
            text-align: center;
        }
        .topmain{
            width: 265px;
            height: 113px;
            float: left;
            .img{
                width: 72px;
                height: 100px;
                float: left;
                margin-right: 11px;
            }
            .message{
                width: 178px;
                height: 113px;
                float: left;
                h3{
                    font-size: 15px;
                    color: #4A4A4A;
                    line-height: 25px;
                    max-height: 50px;
                    overflow: hidden;
                    margin: 5px 0;
                }
                p{
                    font-size: 12px;
                    color: #9B9B9B;
                    line-height: 18px;
                    max-height: 18px;
                    overflow: hidden;
                    margin: 5px 0;
                }
                .type{
                    height: 20px;
                    width: 72px;
                    background: #F5A623;
                    border-radius: 1px;
                    font-size: 14px;
                    color: #FFFFFF;
                    text-align: center;
                    margin: 0;
                }
            }
        }
        .no{
            .img{
                display: none;
            }
            .message{
                width: 100%;
            }
        }

    }
}
</style>

<style>
.type0{
    background: #9B9B9B  !important;
}
.type1{
    background: #0078E2  !important;
}
.type2{
    background: #F5A623 !important;
}
</style>

