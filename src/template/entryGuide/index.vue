<template>
    <div>
        <h1 @click="$router.back(-1)">{{$t('skin.back')}}</h1>
        <entry-guide />
    </div>
</template>

<script>
import entryGuide from "@@/views/details/entryGuide";
export default {
    components:{
        entryGuide
    }
}
</script>

<style lang="less" scoped>
    h1{
        width: 983px;
        margin: 0 auto;
        font-size: 16px;
        color: #6666;
        /* line-height: 10px; */
        margin-top: 10px;
        cursor: pointer;
    }
</style>

