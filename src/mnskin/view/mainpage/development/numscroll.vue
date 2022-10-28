<template>
    <div>
        <DigitRoll :rollDigits="num" ref="num"/>
    </div>
</template>
<script>
import DigitRoll from '@huoyu/vue-digitroll';

export default {
    props:['num'],
    components: { DigitRoll },
    mounted(){
        this.$refs.num.setDigit(this.num);
    }
}
</script>

<style lang="less">
.d-roll-wrapper{
    margin: 0 auto !important;
}
.d-roll-list {
    justify-content: center;
    .d-roll-item{
        color: #56A7F2 !important;
        flex-grow: 0 !important;
        font-size: 22px !important;
    }
}
</style>