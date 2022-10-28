<template>
    <div>
        <p v-for="(list,index) in lists" :key="index" :style="{'textIndent':indent?'0':'2em'}">{{list}}</p>
    </div>
</template>

<script>
export default {
    props:['lists','indent']
}
</script>

<style lang="less" scoped>
p{
    font-size:16px;
    font-weight:400;
    color:rgba(74,74,74,1);
    line-height:24px;
    letter-spacing:1px;
    text-indent: 2em;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
}

</style>