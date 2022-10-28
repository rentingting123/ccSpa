<template>
    <div class="news">
        <ul class="type">
            <li :class="{'on':on==null}" @click="choose(null)">全部资讯</li>
            <li :class="{'on':on==6}" @click="choose(6)">竞赛排行</li>
            <li :class="{'on':on==7}" @click="choose(7)">教发指数</li>
            <li :class="{'on':on==4}" @click="choose(4)">赛事资讯</li>
            <li :class="{'on':on==5}" @click="choose(5)">政策文件</li>
        </ul>
        <div style="background:rgb(247,247,247)">
            <detail :competitionReferList="competitionReferList" :type="on"/>
            <hotnew v-if="newsBannerList.length>0" :newsBannerList="newsBannerList"/>
        </div>
    </div>
</template>

<script>
import detail from './common/detail'
import hotnew from './common/hotnew'
import network from '@/mnskin/api/index'
export default {
    components:{
        detail,
        hotnew,
    },
    data(){
        return{
            competitionReferList:[],
            newsBannerList:[],
            on: null,
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(referType=null){
            let res = await network.getNewsHeadline({data:{
                page: 1,
                size: 6,
                referType: referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.newsBannerList = res.newsBannerList?res.newsBannerList:[]
        },
        choose(type){
            this.on = type;
            this.init(type)
        },
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 100%;
    background: #ffffff;
    .type{
        width: 100%;
        height: 0.56rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #252223;
        li{
            position: relative;
            text-align: center;
            font-size: .28rem;
            color: #ffffff;
            height: .56rem;
            line-height: .56rem;
            background: #252223;
        }
        li.on{
            color: #ED1E26;
        }
    }
}
</style>


