<template>
    <div class="mainpage">
        <hotnew v-if="newsBannerList.length>0" :newsBannerList="newsBannerList"/>

        <ul class="type">
            <li :class="{'on':on==null}" @click="choose(null)">全部咨询</li>
            <li :class="{'on':on==6}" @click="choose(6)">竞赛排行</li>
            <li :class="{'on':on==7}" @click="choose(7)">教发指数</li>
            <li :class="{'on':on==4}" @click="choose(4)">赛事资讯</li>
            <li :class="{'on':on==5}" @click="choose(5)">政策文件</li>
        </ul>

        <detail :competitionReferList="competitionReferList" :type="on"/>
        <loadmore :more='scroll' :type="loadType"></loadmore>
        
    </div>
</template>

<script>
import network from '@/mnskin/api/index'
import hotnew from './common/hotnew'
import detail from './common/detail'
import loadmore from './common/scrollAdd';
export default {
    data(){
        return{
            competitionReferList:[],
            newsBannerList:[],
            on: null,
            totalpage: 0,
            page: 1,
            loadType: 'canload'
        }
    },
    components:{
        detail,
        loadmore,
        hotnew
    },
    created(){
        this.on = this.$route.query.type || null;
        if(this.on=='null') this.on = null;
        this.init(this.on);
    },
    methods:{
        scroll(){
            if(this.page>=this.totalpage) return this.loadType='nomore';
            this.loadType = 'canload'
            this.page++;
            this.init(this.on);
        },
        async init(referType=null){
            let res = await network.getNewsHeadline({data:{
                page: this.page,
                size: 20,
                referType: referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.totalpage = res.pages || 0
            this.competitionReferList = this.competitionReferList.concat(res.competitionReferList)
            this.newsBannerList = res.newsBannerList || []
        },
        choose(type){
            this.on = type;
            this.page = 1;
            this.loadType = 'canload'
            this.competitionReferList = []
            this.init(type)
        },
    }
}
</script>
<style lang="less" scoped>
.mainpage{
    background: rgb(247, 247, 247);
    .type{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: .2rem;
        height: .56rem;
        background: #252223;
        li{
            position: relative;
            text-align: center;
            font-size: .28rem;
            color: #ffffff;
            height: .56rem;
            line-height: .56rem;
            &.on{
                color: #ED1E26;
            }
        }
    }
}
</style>
