<template>
    <div class="mainpage">
        <!-- 轮播图 -->
        <banner />
        <!-- 新闻 -->
        <news />
        <!-- 竞赛 -->
        <competitions />
        <!-- 合作院校 -->
        <school />
        <!-- 友情链接 -->
        <organize />
    </div>
</template>

<script>
import banner from '@/provinceSkin/view/banner'
import school from '@/pskin3/components/school'
import organize from '@/pskin3/components/organize'
import news from './common/news'
import competitions from './common/competitions'

export default {
    components:{
        banner,
        organize,
        school,
        news,
        competitions,
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
.mainpage{
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
}
</style>