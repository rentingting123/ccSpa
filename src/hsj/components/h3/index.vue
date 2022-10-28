<template>
    <h2 :id="id"> {{title}} </h2>
</template>

<script>
export default {
    props:['title','id'],
}
</script>

<style lang="less" scoped>
    h2{
        width: 100%;
        font-size: 18px;
        font-weight:600;
        color: #4A4A4A;
        line-height:27px;
        letter-spacing:1px;
        position: relative;
        padding-bottom: 17px;
        border-bottom: 2px solid #C71E23;
        cursor: pointer;
    }
</style>