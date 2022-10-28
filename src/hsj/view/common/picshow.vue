<template>
    <ul>
        <li v-for="list in lists" :key="list.id">
            <a :href="list.path" target="_blank">
                <img :src="list.img" width="100%">
                <p>{{list.name}}</p>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['lists']
}
</script>

<style lang="less" scoped>
ul{
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    li{
        width: 180px;
        height: auto;
        img{
            width: 180px;
            height: auto;
        }
        p{
            margin-top: 17px;
            font-size:14px;
            font-weight:500;
            color:rgba(74,74,74,1);
            line-height:22px; 
            text-align: center;
        }
    }
}
</style>