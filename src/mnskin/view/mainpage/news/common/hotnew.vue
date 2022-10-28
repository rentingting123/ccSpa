<template>
    <div class="left">
        <ul class="clearfix">
            <li v-for="(item,index) in news" @click="tonewsdetail(item)" :key="index" :class="{'on':index==0}">
                <div class="picdiv">
                    <img :src="item.banner" alt="">
                    <p>
                        {{item.newsBannerText}}
                    </p>
                </div>
                <div class="timediv">
                    <time>{{item.newsDate}}</time>
                    <p>头条</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
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
    margin-top: .12rem;
    background: #FFFFFF;
}
ul{
    li{
        padding: .32rem .25rem 0;
        width: 100%;
        display: none;
        float: left;
        cursor: pointer;
        background: #FFFFFF;
        .picdiv{
            width: 100%;
            height: 3.939rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 1;
            }
            p{
                display: none;
                font-size: .32rem;
                color: #FFFFFF;
                line-height: .40rem;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                z-index: 2;
                text-align: left;
                padding: .20rem .12rem .10rem;
                background: linear-gradient(0deg, #252223 0%, rgba(109, 107, 108, 0) 100%);
                border-radius: 0 0 .05rem .05rem;
            }
        }
        .timediv{
            width: 100%;
            padding: .13rem 0 .16rem;
            text-align: left;
            time{
                font-size: .24rem;
                color: #ACB0B0;
                line-height: .35rem;
            }
            p{
                border: .02rem solid #AFB3B3;
                font-size: .28rem;
                color: #D4D4D4;
                width: .7rem;
                height: .35rem;
                line-height: .35rem;
                text-align: center;
                float: right;
            }
        }
    }
    li.on{
        display: block;
        p{
            display: block;
        }
    }
}
</style>
