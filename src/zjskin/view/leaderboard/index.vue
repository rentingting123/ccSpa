<template>
    <div class="leaderboard clearfix">
        <fl class="fl" type=1 />
        <fr class="fr" type=2 />
    </div>
</template>

<script>
import fl from './common'
import fr from './common'
export default {
    components:{
        fl,
        fr,
    }
}
</script>
<style lang="less" scoped>
.leaderboard{
    width: 1172px;
    margin: 0 auto;
    margin-top: 70px;
}
</style>