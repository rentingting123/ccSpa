<template>
    <div class="breadcrumb">
        <i class="el-icon-caret-right breadcrumbIcon"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-if="path" :to="{ path: path }">{{title1}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else>{{title1}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="title2">{{title2}}</el-breadcrumb-item>
        </el-breadcrumb>
        <p class="border" v-if="border"></p>
    </div>
</template>

<script>
export default {
    props: [
        'title1',
        'title2',
        'path',
        'border'
    ],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.breadcrumb{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 0 32px;
    overflow: hidden;
    .border{
        width: 100%;
        height: 4px;
        background: #ED1E26;
        margin-top: 20px;
        margin-left: 45px;
    }
    /deep/.el-breadcrumb{
        font-size: 27px;
        line-height: 36px;
        
    }
    /deep/.el-breadcrumb__inner{
        color: #ED1E26;
        &:hover{
            color: #ED1E26;
        }
        &.is-link{
            color: #303133;
        }
    }
    .breadcrumbIcon{
        font-size: 32px;
        margin-right: 17px;
        color: #252223;
    }
}
</style>