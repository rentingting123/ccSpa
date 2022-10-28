<template>
    <ul>
        <li v-for="list in lists" :key="list">
            {{list}}
        </li>
    </ul>
</template>

<script>
export default {
    props:['lists'],
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    height: auto;
    li{
        width: 100%;
        font-size:14px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:21px;
        letter-spacing:1px;
        margin-top: 10px;
    }
}

</style>