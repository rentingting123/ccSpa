<template>
    <div class="left">
        <h1><i class="iconfont">&#xe629;</i>竞赛头条资讯</h1>
        <ul>
            <li v-for="(item,index) in news" @click="tonewsdetail(item)" :class="{'on':index==0}">
                <img :src="item.banner" alt="">
                <p>
                    {{item.newsBannerText}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import { clearInterval } from 'timers';
export default {
    props:['newsBannerList'],
    data(){
        return{
            news:[],
            interval:''
        }
    },
    created(){
        let arr = this.newsBannerList
        this.news = arr
        if(arr.length==3){
           this.interval = setInterval(() => {
                this.news = []
                let str = arr[0]
                arr[0] = arr[1]
                arr[1] = arr[2]
                arr[2] = str
                this.news = arr
            }, 5000);
        }else if(arr.length==2){
            this.interval = setInterval(() => {
                this.news = []
                let str = arr[0]
                arr[0] = arr[1]
                arr[1] = str
                this.news = arr
            }, 5000);
        }
    },
    destroyed(){
        if(this.interval){
            clearInterval(this.interval)
        }
    },
    methods:{
        tonewsdetail(item){
            this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>


<style lang="less" scoped>
.left{
    width: 312px;
    height: 100%;
    margin-left: 54px;
}
h1{
    font-size: 25px;
    color: #4A4A4A;
    text-align: left;
    i{
        font-size: 16px;
        color: #0078E2;
        margin-right: 20px;
    }
}
ul{
    width: 312px;
    height: 175px;
    margin-top: 30px;
    li{
        width: 152px;
        height: 77px;
        display: none;
        position: relative;
        float: left;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1;
        }
        p{
            display: none;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 18px;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 2;
            text-align: left;
            padding: 20px 12px 10px;
            background-image: linear-gradient(-180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.7) 70%);
            border-radius: 0px 0px 5px 5px;
        }
    }
    li.on{
        margin-right: 14px;
        width: 312px;
        height: 175px;
        display: block;
        p{
            display: block;
        }
    }
    li:nth-child(2){
        margin-bottom: 20px;
    }
}
</style>
