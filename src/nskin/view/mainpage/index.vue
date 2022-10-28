<template>
    <div class="mainpage">
        <!-- 轮播图 -->
        <banner />
        <!-- 新闻资讯 -->
        <news />
        <!-- 教发指数 -->
        <development />
        <!-- 竞赛排行 -->
        <assessment />
        <!--学生竞赛省级排行 -->
        <provincialranking />
        <!-- 省级数据平台 -->
        <provincialcenter />
        <!-- 友情链接 -->
        <organize />
        <!-- 弹窗 20210512暂时隐藏，高博会时放开 -->
        <!-- <ads v-if="show"/> -->
    </div>
</template>

<script>
import banner from './banner'
import organize from './organize'
import news from './news'
import provincialcenter from './provincialcenter'
import provincialranking from './provincialranking'
import ads from './ads'
import development from './development'
import assessment from './assessment'

export default {
    components:{
        banner,
        organize,
        news,
        provincialcenter,
        provincialranking,
        ads,
        development,
        assessment,

    },
    computed: {
        show() {
            return this.$store.state.showads
        }
    }
}
</script>
<style lang="less" scoped>
.mainpage{
    background: #fff;
    padding-bottom: 20px;
    >div{
        max-width: 1200px;
        margin: 30px auto 0;
    }
    >div.banner{
        margin-top: 0;
        max-width: 1920px;
    }
}
</style>
