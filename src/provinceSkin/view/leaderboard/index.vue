<template>
    <div class="leaderboard clearfix">
        <fl class="fl" type=1 state=2 />
        <fr class="fr" type=2 state=0 />
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
    width: 1280px;
    margin: 0 auto;
    margin-top: 70px;
    padding: 0 40px;
}
</style>