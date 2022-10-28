<template>
    <div>
        
        <!-- nav -->
        <!-- <navs /> -->
        <!-- 轮播图 -->
        <banner />
        <!-- 新闻资讯 -->
        <news />
        <!-- 排行榜竞赛 -->
        <leaderboard />
        <!-- 培训会议 -->
        <meeting />
        <!-- 赛事日历 -->
        <calendar />
        <!-- 竞赛 -->
        <competition />
        <!-- 合作院校 -->
        <school />
        <!-- 友情链接 -->
        <organize />
        <!-- 安全认证 -->
        <certificate />
        
        
    </div>
</template>

<script>

import navs from '../view/nav'
import banner from '../view/banner'
import news from '../view/news'
import calendar from '../view/calendar'
import competition from '../view/competition'
import school from '../view/school'
import organize from '../view/organize'
import certificate from '../view/certificate'
import leaderboard from '../view/leaderboard'
import meeting from '../view/meeting'

export default {
    components:{
        navs,
        banner,
        news,
        calendar,
        competition,
        school,
        organize,
        certificate,
        leaderboard,
        meeting,

    }
}
</script>
