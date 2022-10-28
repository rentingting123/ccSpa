<template>
    <div>
        <h2>
            <time>{{times}}</time>
            <p>共有<span>{{total}}</span>个竞赛</p>
            <span class="more" @click="$router.push('/competition')">查看更多</span>  
        </h2>
        <ul class="clearfix">
            <li v-for="item in lists" :key="item.id" @click="todetail(item)">
                <div class="img">
                    <img v-if="item.banner" :src="item.banner" width="100%" height="100%">
                    <div v-else>
                        <img :src="require(`../../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)" width="100%" height="100%">
                        <p>{{item.name}}</p>
                    </div>
                </div>
                <h3 :title="item.name" class="dian">{{item.name}}</h3>
                <p :title="item.secretariat">{{item.secretariat}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            total:0,
            lists:[],
            baseurl: ''
        }
    },
    props:['times'],
    created(){
        if(!this.times) return;
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getCompetitionByCalendar({data:{
                date:this.times,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.total = res.total;
            this.lists = res.competitionList;
        },
        async todetail(item){
            let url = item.url
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
            let res = await network.updateClickCount({data:{
                id: item.id
            }});
        }
    },
    watch:{
        times(val){
            if(!val) return;
            this.init()
        }
    }
}
</script>

<style lang="less" scoped>
h2{
    font-size: 16px;
    color: #d3c5c5;
    line-height: 24px;
    text-align: left;
    margin: 0 0 14px 0;
    time{
        
        font-size: 18px;
        color: #4A4A4A;
    }
    p{
        display: inline-block;
        font-size: 16px;
        color: #000000;
        span{
            color: #0078E2;
        }
    }
}
ul{
    width: 100%;
    li{
        width: 150px;
        height: auto;
        float: left;
        text-align: left;
        margin-right: 60px;
        cursor: pointer;
        .img{
            width: 150px;
            height: 210px;
            position: relative;
            p{
                position: absolute;
                top: 42px;
                width: 100%;
                padding: 0 16px;
                font-size: 16px;
                color:#ffffff;
                text-align: center;
                font-weight: 500;
                text-shadow: 2px 1px 8px #000;
            }
        }
        h3{
            font-size: 16px;
            color: #4A4A4A;
            line-height: 25px;
            max-height: 50px;
            overflow: hidden;
            margin: 5px 0;
        }
        >p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            height: 18px;
            overflow: hidden;
        }
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>

<style>
    span.more{
        font-size: 14px;
        color: #9B9B9B;
        float: right !important;
        cursor: pointer;
        line-height: 40px;
        position: relative;
        top: -4px;
        font-weight: 400;
    }
</style>
