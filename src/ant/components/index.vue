<template>
    <div class="main">
        <!-- 轮播图 -->
        <banner />
        <!-- 系统培养课程，多维度学习 -->
        <multidimensional />
        <!-- 入门课—金融分布式架构线上初级课 -->
        <introduction />
        <!-- 进阶课—金融分布式架构系统学习 -->
        <advanced />
        <!-- 能力认证—阿里云和蚂蚁权威认证 -->
        <cert />
        <!-- 实战为先，精选企业级案例和实训项目 -->
        <actual-combat />
        <!-- 精心打磨，360度保障学习效果 -->
        <study />
        <!-- 原汁原味，蚂蚁资深讲师团 -->
        <lecturer />
        <!-- 名企及生态企业认可，全方位就业对接 -->
        <famous />
    </div>
</template>

<script>
import banner from '../view/index/banner'
import multidimensional from '../view/index/multidimensional'
import introduction from '../view/index/introduction'
import advanced from '../view/index/advanced'
import study from '../view/index/study'
import cert from '../view/index/cert'
import actualCombat from '../view/index/actualCombat'
import lecturer from '../view/index/lecturer'
import famous from '../view/index/famous'

export default {
    components:{
        banner,
        multidimensional,
        introduction,
        advanced,
        study,
        cert,
        actualCombat,
        lecturer,
        famous


    }
}
</script>