<template>
    <div class='upload'>
        <meterial isSkin ref="upload"/>
    </div>
    
</template>
<script>
import meterial from '@@/views/details/common/meterial'
export default {
    components:{meterial}
    
}
</script>

<style lang="less" scoped>
.upload{
    padding: 50px;
    width: 500px;
    display: block;
    margin: 0 auto;
}
</style>

