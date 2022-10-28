<template>
    <div class="news">
        <div class="clearfix">
            <left class="fl" v-if="newsBannerList.length>0" :newsBannerList="newsBannerList"/>
            <right class="fr" :competitionReferList="competitionReferList" :init="init"/>
        </div>
    </div>
</template>

<script>
import left from './common/left'
import right from './common/right'
import network from '@/api/index'
export default {
    components:{
        right,
        left
    },
    data(){
        return{
            competitionReferList:[],
            newsBannerList:[]
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(referType=4){
            let res = await network.getNewsHeadline({data:{
                page: 1,
                size: 5,
                referType: referType,
                provinceId: localStorage.getItem('competitionId'),
                schoolCode: localStorage.getItem('schoolCode'),
                
            }});
            if(res=='error') return;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.newsBannerList = res.newsBannerList?res.newsBannerList:[]
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 100%;
    margin: 40px 0 0;
    // background: #ffffff;
    > div{
        width: 1200px;
        margin: 0 auto;
    }
}
</style>


