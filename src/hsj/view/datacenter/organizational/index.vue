<template>
    <div class="right">
        <h3Title title="组织机构" id='2-1'/>
        <h3>主办单位</h3>
        <p>中国创新设计产业战略联盟</p>
        <p>中国工程院中国工程科技知识中心</p>
        <h3>承办单位</h3>
        <p>中国机械工程学会</p>
        <h3>协办单位</h3>
        <p>浙江大学</p>
    </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import datashow from '../../common/datashow'
export default {
    components:{
        h3Title,
        datashow
    }
}
</script>

<style lang="less" scoped>
    .right{
        >h3{
            font-size: 16px;
            margin-top: 20px;
        }
        >p{
            font-size: 16px;
            margin-top: 10px;
        }
    }
</style>