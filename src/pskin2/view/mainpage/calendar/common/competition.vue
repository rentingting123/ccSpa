<template>
    <div>
        <h2>
            <p>共有<span>{{total}}</span>个竞赛</p>
            <span @click="tomore">查看更多</span>  
        </h2>
       <calendar :lists="lists"/>
    </div>
</template>

<script>
import network from '@/api/index'
import calendar from '@/pskin2/common/calendar'
export default {
    components:{calendar},
    data(){
        return{
            total:0,
            lists:[],
        }
    },
    props:['times'],
    created(){
        if(!this.times) return;
        this.init()
    },
    methods:{
        tomore(){
            let time = this.times.replace('.', '-');
            this.$router.push('/competition?tags=4&time='+time)
        },
        async init(){
            let res = await network.getCompetitionByCalendar({data:{
                date:this.times,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.total = res.total;
            this.lists = res.competitionList;
        },
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
    font-weight: 500;
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 8px;
    margin-bottom: 18px;
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
            margin: 0 2px;
        }
    }
    >span{
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 0.88px;
        float: right;
        line-height: 23px;
        font-weight: 400;
        margin-right: 10px;
    }
}
</style>

