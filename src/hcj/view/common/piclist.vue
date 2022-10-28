<template>
    <ul>
        <li v-for="list in lists" :key="list.is" @click="$router.push('/datacenter/newsdetail?id='+list.id)">
            <img :src="list.newsIcon" alt="">
            <h3 class="dian" :title="list.newsTitle">{{list.newsTitle}}</h3>
        </li>
    </ul>
</template>

<script>
export default {
    props:['lists'],
}
</script>

<style lang="less" scoped>
ul{
    width: 852px;
    margin: 0 auto;
    text-align: left;
    li{
        display: inline-block;
        vertical-align: top;
        width: 262px;
        height: 191px;
        margin-bottom: 20px;
        margin-right: 33px;
        cursor: pointer;
        img{
            width: 100%;
            height: 150px;
        }
        h3{
            width: 100%;
            height: 40px;
            font-size: 15px;
            color: #4A4A4A;
            letter-spacing: 1px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #E8E7E7;
            padding: 0 5px;
        }
    }
    li:nth-child(3n){
        margin-right: 0;
    }
}
</style>