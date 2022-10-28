<template>
    <h2>
        <span></span>
        {{title}}
        <slot></slot>
    </h2>
</template>

<script>
export default {
    props: ['title'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
h2{
    width: 100%;
    border-bottom: 2px solid rgba(37, 34, 35, 0.5);
    line-height: 46px;
    font-size: 24px;
    color: #252223;
    text-align: left;
    font-weight: 400;
    span{
        display: inline-block;
        vertical-align: top;
        width: 9px;
        height: 9px;
        margin: 21px 12px 0 32px;
        background: #252223;
    }
}
</style>