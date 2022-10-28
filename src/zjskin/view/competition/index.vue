<template>
    <div class="competition">
        <div>
            <!-- 省A -->
            <provincial v-if="competitionList1.length" :lists="competitionList1" id="2"/>
            <!-- 省B -->
            <provincial2 :lists="competitionList2" id="3" v-if="competitionList2.length"/>
            <!-- <div class="mold" id='7' v-if="competitionList2.length">
                <h1>
                    <i class="iconfont">&#xe688;</i>省级B类竞赛
                    <span class="more" @click="$router.push('/competition?tags=省赛B')">查看更多</span>
                </h1>
                <point :lists="competitionList2"/>
            </div> -->
            <!-- 省级竞赛 -->
            <!-- <provincial :lists="competitionList1" id="2"/> -->
            <!-- 理工 -->
            <!-- <div class="mold" id='7'>
                <h1>
                    <i class="iconfont">&#xe688;</i>理工
                    <span class="more" @click="$router.push('/competition')">查看更多</span>
                </h1>
                <point :lists="competitionList2"/>
            </div> -->
            <!-- 创新创业·技能 -->
            <!-- <div class="mold" id='3'>
                <h1>
                    <i class="iconfont">&#xe688;</i>创新创业·技能
                    <span class="more" @click="$router.push('/competition')">查看更多</span>
                </h1>
                <point :lists="competitionList3"/>
            </div> -->
            <!-- 财经·法学 -->
            <!-- <div class="mold" id='4'>
                <h1>
                    <i class="iconfont">&#xe688;</i>财经·法学
                    <span class="more" @click="$router.push('/competition')">查看更多</span>
                </h1>
                <point :lists="competitionList4"/>
            </div> -->
            <!-- 艺术·医学·文学·教师教学 -->
            <!-- <div class="mold" id="5">
                <h1>
                    <i class="iconfont">&#xe688;</i>艺术·医学·文学·教师教学
                    <span class="more" @click="$router.push('/competition')">查看更多</span>
                </h1>
                <point :lists="competitionList5"/>
            </div> -->

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
        point,
        nationalRace,
    },
    data(){
        return{
           competitionList1:{},
           competitionList2:[],
           competitionList3:[],
           competitionList4:[],
           competitionList5:[],
           competitionList6:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getCompetition({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.competitionList1.list = res.competitionList1;
            this.competitionList1.title = '省级A';
            this.competitionList2 = res.competitionList2;
            this.competitionList3 = res.competitionList3;
            // this.competitionList4 = res.competitionList4;
            // this.competitionList5 = res.competitionList5;
            // this.competitionList6 = res.competitionList6;
        }
    }
}
</script>

<style lang="less" scoped>
.competition{
    width: 100%;
    margin-top: 100px;
    text-align: left;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
    }
    .mold{
        margin-top: 100px;
    }
}
</style>

<style lang="less">
        h1{
            font-size: 25px;
            color: #4A4A4A;
            text-align: left;
            margin-bottom: 30px !important;
            i{
                font-size: 16px;
                color: #0078E2;
                margin-right: 20px;
                position: relative;
                top: -4px;
                font-weight: 150;
            }
        }
</style>
