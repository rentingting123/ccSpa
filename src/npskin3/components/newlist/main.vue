<template>
    <ul>
        <li v-for="list in lists" :key="list.id" @click="toNews(list)">
            <p class="dian">{{list.newsTitle}}</p>
            <time>{{list.newsTime | time}}</time>
        </li>
    </ul>
</template>

<script>
import moment from 'moment'
export default {
    props: ['lists','type'],
    methods:{
        toNews(list){
            this.$router.push('/details/'+list.id+'?type='+this.type)
        }
    },
    filters:{
        time(val){
            if(!val) return '';
            return moment(Number(val)).format('MM-DD')
        }
    }
}
</script>

<style lang='less' scoped>
ul{
    li{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        color: #4A4A4A;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        p{
            width: 360px;
        }
        time{
            width: 50px;
        }
        &:hover{
            color: #409EFF;
        }
    }
}
</style>