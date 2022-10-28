<template>
    <div class="provincial">
        <h2Title title='竞赛月历' more='true' :path="'/competition?tags=4&time='+time" />
        <calendar :setMonth='setMonth'/>
        <ul>
            <li v-for="item in lists" :key="item.id">
                <competition :data='item' />
            </li>
        </ul>
    </div>
</template>

<script>
import h2Title from '@/pskin3/components/h2'
import competition from '@/pskin3/components/competition'
import calendar from './calendar'
import network from '@/api/index'

export default {
    components:{
        h2Title,
        competition,
        calendar,
    },
    data(){
        return{
            page: 1,
            size: 2,
            tags: '0',
            lists: [],
            time: '',
            times: '',
        }
    },
    created(){
        // this.init([])
    },
    methods:{
        async init(date){
            let res = await network.getCompetitionByCalendar({data:{
                date:this.times,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.lists = res.competitionList;
            if(this.lists.length>2){
                this.lists.length=2
            }
        },
        setMonth(val){
            this.time = val
            // this.times = JSON.parse(val)[0].replace(/-/g, '.').substr(0,7)
            this.times = val.replace(/-/g, '.').substr(0,7)
            this.init(val)
        }
    }
}
</script>

<style lang="less" scoped>
.provincial{
    width: 544px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    ul{
        padding: 17px;
        li{
            width: 518px;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 28px;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
}
</style>