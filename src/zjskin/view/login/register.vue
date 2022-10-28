<template>
    <div id="register">
        <register type="1" />
    </div>
</template>

<script>
import register from './common/register'
export default {
    components:{
        register
    }
}
</script>

<style lang="less" scoped>
#register{
    background-image: linear-gradient(-180deg, #29DFB2 0%, #019FFF 100%);
}
</style>
