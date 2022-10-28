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
            return moment(Number(val)).format('YYYY-MM-DD');
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
        line-height: 38px;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        border-bottom: 1px solid #E1E1E1;
        cursor: pointer;
        p{
            width: 710px;
        }
        time{
            width: 102px;
            text-align: right;
        }
        &:hover{
            color: #409EFF;
        }
    }
}
</style>