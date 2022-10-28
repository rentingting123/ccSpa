<template>
    <div class="ranking">
        <rank :type="type" num='1' />
        <no v-if="type==1 && base.picshow" :type="type" num='2' />
        <rank v-else :type="type" num='2' />
    </div>
</template>

<script>
import rank from './common/index'
import no from './common/no'
import {getBaseInfo} from '@/common/common.js'
export default {
    props:['type'],
    components:{
        rank,
        no
    },
    data(){
        return{
            base:{}
        }
    },
    created(){
        this.base = getBaseInfo()
    }
}
</script>

<style lang="less" scoped>
.ranking{
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>