<template>
    <div class="h">
        <i class="el-icon-caret-right breadcrumbIcon"></i>
        {{title}}
        <small v-if="small">{{small}}</small>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['title', 'small'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.h{
    width: 100%;
    height: 31px;
    font-size: 23px;
    line-height: 31px;
    color: #252223;
    text-align: left;
}
</style>