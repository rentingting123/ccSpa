<template>
    <div class="main">
        <!--  -->
        <banner />
        <!-- 为什么要学习这门课程？ -->
        <why />
        <!-- 谁适合以及如何学习这门课程？ -->
        <who />
        <!-- 金融分布式架构先导课 -->
        <how />
        <!-- 课程研发团队 -->
        <teams />
        <!-- 学员评价 -->
        <appraisal />
    </div>
</template>

<script>
import banner from '../view/detail/banner'
import why from '../view/detail/why'
import who from '../view/detail/who'
import how from '../view/detail/how'
import teams from '../view/detail/teams'
import appraisal from '../view/detail/appraisal'

export default {
    components:{
        banner,
        why,
        who,
        how,
        teams,
        appraisal,
    }
}
</script>
