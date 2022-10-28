<template>
    <ul v-if='length'>
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="index" v-if='index<length'>
            <div>
                <p class="dian" :title="list.title">{{list.title}}</p>
                <span>{{list.newsTime | date}}</span>
            </div>
        </li>
    </ul>
    <ul v-else>
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="index">
            <div>
                <p class="dian" :title="list.title">{{list.title}}</p>
                <span>{{list.newsTime | date}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
import moment from 'moment'
export default {
    props:['lists','length'],
    
    methods:{
        todetail(list){
            if(!list.links) return;
            window.open(list.links)
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD')
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    text-align: left;
    li{
        width: 100%;
        height: 38px;
        border-bottom: 1px dashed #e1e1e1;
        cursor: pointer;
        div{
            line-height: 38px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.52px;
            p{
                display: inline-block;
                vertical-align: top;
                width: 78%;
                height: 38px;
            }
            span{
                float: right;
            }
        }
    }
}
</style>
