<template>
    <div>
        <h2>
            <time>{{times}}</time>
            <p>共有<span>{{total}}</span>个竞赛<small>(包含省赛)</small></p>
            <span class="more" @click="tomore">查看更多</span>  
        </h2>
        <calendarlist :lists="lists"/>
    </div>
</template>

<script>
import network from '@/api/index'
import calendarlist from '@/pskin/common/calendar'
export default {
    data(){
        return{
            total:0,
            lists:[],
            baseurl: ''
        }
    },
    components:{calendarlist},
    props:['times'],
    created(){
        if(!this.times) return;
        this.init()
    },
    methods:{
        tomore(){
            let time = this.times.replace('.', '-');
            this.$router.push('/competition?tags=5&time='+time)
        },
        async init(){
            let res = await network.getCompetitionByCalendar({data:{
                date:this.times,
                provinceId: localStorage.getItem('competitionId'),
                schoolCode: localStorage.getItem('schoolCode'),
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
    font-weight: 500;
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
        width: 250px;
        height: auto;
        float: left;
        text-align: left;
        margin-right: 21px;
        cursor: pointer;
        .img{
            width: 250px;
            height: 141px;
            position: relative;
            border-radius: 3.36px;
            overflow: hidden;
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
        .img:hover{
            img{
                transform: scale(1.1)
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
        .message{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 20px;
            height: 20px;
            overflow: hidden;
            p{
                display: inline-block;
            }
            .type{
                width: 60px;
                height: 16px;
                line-height: 16px;
                background: #F5A623;
                border-radius: 2px;
                margin: 2px 4px 2px 0;
                color: #ffffff;
                text-align: center;
            }
        }
    }
    li:nth-child(3n){
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
