<template>
    <div>
        <div v-for="(list,index) in lists" :key="index" class="titleshow">
            <h2>{{list.title}}</h2>
            <p v-for="item in list.mess" :key="item">
                {{item}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:['lists']
}
</script>

<style lang="less" scoped>
.titleshow{
    h2{
        font-size: 16px;
        line-height:24px;
        margin: 10px 0;
    }
    p{
        font-size:16px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:24px;
        letter-spacing:1px;
        text-indent: 2em;
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
    }
}

</style>