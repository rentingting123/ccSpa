<template>
    <div class="provincial">
        <h2Title title='省级竞赛' more='true' path='/competition?tags=4' :years='years' :setYear='setYear'/>
        <ul>
            <li v-for="item in lists" :key="item.id">
                <competition :data='item'/>
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
            size: 6,
            tags: '4',
            lists: [],
            year: new Date().getFullYear(),
            years: [],
            open: '',
        }
    },
    created(){
        this.getYears()
        this.init()
    },
    methods:{
        setOpen(val){
            this.open = val
            this.init()
        },
        setYear(val){
            this.year = val
            this.init(val)
        },
        async getYears(){
            let res = await network.getProbinceYearList({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error' || !res || res==[]) return this.years.push(this.year);
            this.years = res;
        },
        async init(year=this.year){
            let res = await network.getCompetitionA({data:{
                provinceId: localStorage.getItem('competitionId'),
                year: year,
                open: this.open
            }});
            if(res=='error' || res=={} || !res) return;

            let arr1 = res.competitionList1 || []
            arr1 = arr1.map(item=>{
            return {
                'sort': 0, // 省A
                ...item
            }
            })
            let arr2 = res.competitionList2 || []
            arr2 = arr2.map(item=>{
            return {
                'sort': 1, //省其他
                ...item
            }
            })
            this.lists =  arr1.concat(arr2);

            if(this.lists.length>8){
                this.lists.length = 8
            }
        }
    }
}
</script>

<style lang="less" scoped>
.provincial{
    width: 1100px;
    margin: 0 auto;
    margin-top: 27px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    ul{
        padding: 17px;
        text-align: left;
        li{
            width: 518px;
            display: inline-block;
            vertical-align: top;
            margin-right: 30px;
            margin-top: 28px;
            &:nth-child(2n){
                margin-right: 0;
            }
            &:nth-child(1),&:nth-child(2){
                margin-top: 0;
            }
        }
    }
}
</style>
