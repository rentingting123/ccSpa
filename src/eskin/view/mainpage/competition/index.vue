<template>
    <div class="competition">
        <div>
            <!-- 校级竞赛 -->
            <div style="margin-bottom: 50px;" v-if="newlist.length>0">
                <h1>
                    <i class="iconfont">&#xe688;</i>校级竞赛
                    <span class="more" @click="$router.push('/competition?tags=5')">查看更多</span>
                </h1>
                <schoolcompetition :lists="newlist"/>
            </div>

            <div>
                <!-- 省赛数据 -->
                <provincial-total />

                <!-- 直通国赛 -->
                <national-race />
            </div>

        </div>
    </div>
</template>
<script>
import schoolcompetition from '@/pskin/components/competition/common/detail'
import provincialTotal from '@/pskin/view/mainpage/competition/common/provincialtotal'
import nationalRace from '@/pskin/view/mainpage/competition/common/nationalrace'
import network from '@/api/index'
export default {
    components:{
        schoolcompetition,
        provincialTotal,
        nationalRace,
    },
    data(){
        return{
           newlist: [],
        }
    },
    created(){
        this.getschoolcompetition()
    },
    methods:{
        async getschoolcompetition(){
            let res = await network.getschoolcompetition({data:{
                provinceId: localStorage.getItem('competitionId'),
                schoolCode: localStorage.getItem('schoolCode'),
                page:1,
                size: 8,
            }});
            if(res=='error') return;
            this.newlist = res.list||[]
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
