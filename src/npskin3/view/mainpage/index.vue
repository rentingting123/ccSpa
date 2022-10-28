<template>
    <div class="mainpage">
        <!-- 系列赛事 -->
        <series />
        <!-- 新闻 -->
        <news />
        <!-- 赛事回顾 -->
        <review />
        <!-- 院士专家 -->
        <expert />
        <!-- 成果展示 -->
        <show />
        <!-- 友情链接 -->
        <contact />
    </div>
</template>

<script>
import series from './common/series'
import news from './common/news'
import review from './common/review'
import expert from './common/expert'
import show from './common/show'
import contact from './common/contact'
export default {
    components:{
        series,
        news,
        review,
        expert,
        show,
        contact,

    }
}
</script>


<style lang="less" scoped>
.mainpage{
    width: 100%;
}
</style>