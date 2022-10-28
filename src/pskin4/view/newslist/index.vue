<template>
    <div class="newslist">
        <newsmain />
        <hot />
    </div>
</template>

<script>
import newsmain from './common/main'
import hot from './common/hot'
export default {
    components:{
        hot,
        newsmain
    }
}
</script>

<style lang="less" scoped>
.newslist{
    width: 1100px;
    margin: 0 auto;
    border-top: 1px solid #D8D8D8;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
}
</style>