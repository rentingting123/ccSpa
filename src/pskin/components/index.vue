<template>
    <div class="mainpage">
        <!-- 轮播图 -->
        <banner />
        <!-- 新闻资讯 -->
        <news />
        <!-- 赛事日历 -->
        <calendar />
        <!-- 竞赛 -->
        <competition />
        <!-- 培训会议 -->
        <!-- <meeting /> -->
        <!-- 合作院校 -->
        <school />
        <!-- 友情链接 -->
        <organize />
    </div>
</template>

<script>
import calendar from '../view/mainpage/calendar'
import competition from '../view/mainpage/competition'
import school from '../view/mainpage/school'
import banner from '@/provinceSkin/view/banner'
import news from '@/provinceSkin/view/news'
import meeting from '../view/mainpage/meeting'
import organize from '@/provinceSkin/view/organize'
export default {
    components:{
        banner,
        news,
        calendar,
        competition,
        meeting,
        school,
        organize,
    }
}
</script>
