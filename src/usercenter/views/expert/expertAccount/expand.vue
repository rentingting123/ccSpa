<template>
    <ul>
        <li v-for="item,i in row && row.failInfoList || []" :key="i" class="failInfoList">
            {{item}}
        </li>
    </ul>
</template>

<script>
export default {
    props: ['row'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.failInfoList{
    margin: 5px 0;
}
</style>