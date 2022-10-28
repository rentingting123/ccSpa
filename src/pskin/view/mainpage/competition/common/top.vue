<template>
<div class="top clearfix">
    <h1>
        <i class="iconfont">&#xe624;</i>人气竞赛榜
    </h1>
    <topcompetition :lists="lists" />
    <span class="more" @click="$router.push('/competition')">查看更多</span>
</div>
</template>

<script>
import network from '@/api/index'
import topcompetition from '@/pskin/common/topcompetition'
export default {
    components:{topcompetition},
    data(){
        return{
            lists:[],
        }
    },
    created(){
       this.init();
    },
    methods:{
        async init(){
            let res = await network.rankingtopList({data:{
                size: 8,
                provinceId: localStorage.getItem('competitionId') 
            }});
            if(res=='error') return;
            this.lists = res.competitionList
        }
    }
}
</script>


<style lang="less" scoped>
h1{
    i{
        color: #C72222;
        margin-right: 9px;
    }
}
.top{
    background: #F8F8F8;
    padding: 14px 14px 14px 24px;
}
.more{
    display: block !important;
    top: 0;
    line-height: 1;
}
</style>

