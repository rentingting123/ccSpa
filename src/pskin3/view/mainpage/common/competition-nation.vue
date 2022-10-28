<template>
    <div class="provincial">
        <h2Title title='直通国赛' more='true' path='/competition?tags=3' :years='years' :setYear='setYear'/>
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
import network from '@/api/index'

export default {
    components:{
        h2Title,
        competition,
    },
    data(){
        return{
            page: 1,
            size: 3,
            tags: '3',
            lists: [],
            years:[],
            year: new Date().getFullYear(),
        }
    },
    created(){
        this.getYears();
        this.init()
    },
    methods:{
        setYear(val){
            this.year = val
            this.init(val)
        },
        async getYears(){
            let res = await network.throughNationalCompetitionYearList();
            if(res=='error' || !res || res==[]) return this.years.push(this.year);
            this.years = res;
        },
        async init(year=this.year){
            let res = await network.throughNationalCompetition({data:{
                provinceId: localStorage.getItem('competitionId'),
                year: year
            }});
            if(res=='error') return;
            this.lists = res.competitionList
            if(this.lists.length>3){
                this.lists.length = 3
            }
        }
    }
}
</script>

<style lang="less" scoped>
.provincial{
    width: 550px;
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