<template>
    <div style="backgroud:#000">
        <video controls :src="base.videourl"></video>
    </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
            base:{}
        }
    },
    created(){
        this.base = getWebInfo();
    }
}
</script>


<style lang="less" scoped>
video{
    width: 395px;
    height: 114px;
    background-color: #000;
}
</style>