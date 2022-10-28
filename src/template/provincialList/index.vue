<template>
    <div class="provincialList">
        <div class="titleContent">
            <h3>{{$t('skin.competitionProvincial')}}</h3>
            <p>PROVINCIAL COMPETITON</p>
        </div>
        <div class="clearfix">
            <left :list='list' v-if="list" class="left"/>
            <right :lists='lists' v-if="lists.length>0" class="right"/>
        </div>
    </div>
</template>


<script>
import left from './common/left'
import right from './common/right'
import network from '@/api/index'
export default {
    components:{
        left,
        right,
    },
    data(){
        return{
            list:'',
            lists:[]
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let res = await network.provinceThroughTrain({data:{
                competitionId: this.$store.state.skin.id
            }});
            if(res=='error') return;
            this.list = res.competition
            this.lists = res.competitionList?res.competitionList:[]
        }
    }
}
</script>

<style lang="less" scoped>
.provincialList{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    .titleContent {
        width: 100%;
        text-align: center;
        margin-bottom: 46px;
    
        h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        }
    
        p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
        }
    }

    .left{
        width: 430px;
        height: 440px;
        float: left;
        background: #FFFFFF;
        box-shadow: 0 2px 15px 0 rgba(218,218,222,0.50);
        padding: 15px 25px;
    }
    .right{
        width: 740px;
        height: auto;
        float: right;
    }

}
</style>
