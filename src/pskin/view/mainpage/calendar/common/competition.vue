<template>
    <div>
        <h2>
            <time>{{times}}</time>
            <p>共有<span>{{total}}</span>个竞赛</p>
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
        }
    },
    props:['times'],
    components:{calendarlist},
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
