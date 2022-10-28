<template>
    <div class="competition">
        <div>
            <!-- 省A -->
            <provincial :lists="competitionList1" :yearchange="init" id="2"/>
            <!-- 省B -->
            <!-- <provincial2 :lists="competitionList2" id="3" /> -->
            
            <!-- 直通国赛 -->
            <national-race :lists="competitionList3" id="6"/>



        </div>
    </div>
</template>
<script>
import provincial from './common/provincial'
import provincial2 from './common/provincial2'
import nationalRace from './common/nationalrace'
import point from './common/point'
import network from '@/api/index'
export default {
    components:{
        provincial,
        provincial2,
        point,
        nationalRace,
    },
    data(){
        return{
           competitionList1:{},
           competitionList2:[],
           competitionList3:[],
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(year=new Date().getFullYear()){
            let res = await network.getCompetitionA({data:{
                provinceId: localStorage.getItem('competitionId'),
                year: year
            }});
            if(res=='error') return;
            this.competitionList1 = res.competitionList1;
            this.competitionList2 = res.competitionList2;
            this.competitionList3 = res.competitionList3;
        }
    }
}
</script>

<style lang="less" scoped>
.competition{
    width: 100%;
    margin-top: 50px;
    text-align: left;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
    }
    .mold{
        margin-top: 50px;
    }
}
</style>

<style lang="less">
        h1{
            font-size: 25px;
            color: #4A4A4A;
            text-align: left;
            margin-bottom: 30px !important;
            .iconfont{
                font-size: 16px;
                color: #0078E2;
                margin-right: 20px;
                position: relative;
                top: -4px;
                font-weight: 150;
            }
        }
</style>
