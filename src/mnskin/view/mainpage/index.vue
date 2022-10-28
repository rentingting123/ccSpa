<template>
    <div class="mainpage">
        <!-- 轮播图 -->
        <banner />
        <!-- 快讯 -->
        <fastnews />
        <!-- 新闻资讯 -->
        <news />
        <!-- 教发指数 -->
        <rank />
        <!-- 2015-2019高校学生竞赛 -->
        <ranks />
        <!-- 2015-2019学生竞赛省级排行 -->
        <provincialranking />
        <!-- 友情链接 -->
        <organize />
    </div>
</template>

<script>
import banner from './banner'
import fastnews from './fastnews'
import news from './news'
import rank from './rank'
import ranks from './ranks'
import provincialranking from './provincialranking'
import organize from './organize'

export default {
    
    components:{
        banner,
        fastnews,
        news,
        rank,
        ranks,
        provincialranking,
        organize,

    }
}
</script>
<style lang="less" scoped>
.mainpage{
    background: rgb(247, 247, 247);
}
</style>
