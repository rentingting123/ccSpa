<template>
    <div class="backgrounds" v-html="datas">
    </div>
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.backgrounds{
    padding: 20px 24px;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: #4A4A4A;
    line-height: 24px;
}
</style>