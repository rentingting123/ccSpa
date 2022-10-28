<template>
    <div class="news">
        <div class="clearfix">
            <div class="fl" >
                <right :competitionReferList="competitionReferList" :init="init"/>
                <div style="text-align:center;margin:0 auto 100px;background:#fff;width:100%;">
                    <el-pagination layout="prev, pager, next" @current-change="pagechange" :current-page.sync="pageNum"  :page-size="pageSize" :total="total"> </el-pagination>                
                </div>
            </div>
            <left class="fr" v-if="newsBannerList.length>0" :newsBannerList="newsBannerList"/>
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
            newsBannerList:[],
            pageNum: 1,
            pageSize: 20,
            total: 0,
            referType: null,
        }
    },
    created(){
        this.referType = this.$route.query.type || null;
        this.init(this.referType)
    },
    methods:{
        async init(referType, page){
            this.referType = referType;
            if(!page) this.pageNum = 1;
            let res = await network.getNewsHeadline({data:{
                page: this.pageNum,
                size: this.pageSize,
                referType: this.referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.newsBannerList = res.newsBannerList?res.newsBannerList:[]
            this.total = res.total
        },
        pagechange(){
            this.init(this.referType, 1);
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 100%;
    background: rgb(248, 248, 248);
    padding: 30px 0;
    > div{
        width: 1171px;
        margin: 0 auto;
    }
}
</style>


