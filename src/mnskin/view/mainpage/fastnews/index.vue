<template>
<div class="fastnews">
    <div class="main">
        <a-carousel :dots='false' autoplay :autoplaySpeed="5000">
            <div class="detail" v-for="(list,i) in lists" :key="i" @click="tonewsdetail(list)">
                <div class="img">
                    <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/news_210601.png">
                </div>
                <time>{{list.publishTime}}</time>
                <p class="dian">{{list.newsTitle}}</p>
            </div>
        </a-carousel>
    </div>
</div>
</template>

<script>
import network from '@/mnskin/api/index'
export default {
    data(){
        return{
            lists: []
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getNewsFlash({data:{provinceId:1}});
            if(res=='error') return;
            this.lists = res || []
        },
        tonewsdetail(item){
            this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>

<style lang="less" scoped>
.fastnews{
    background: rgb(247, 247, 247);
    width: 100%;
    padding: .2rem 0.18rem;
    .main{
        width: 7.14rem;
        height: .7rem;
        background: #FFFFFF;
        box-shadow: 0 .02rem .12rem 0 rgba(201,201,201,0.50);
    }
    .detail{
        width: 100%;
        height: .7rem;
        line-height: .7rem;
        text-align: left;
        .img{
            background: #ED1E26;
            width: 0.7rem;
            height: 0.7rem;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            img{
                width: .34rem;
                height: auto;
                display: inline-block;
                vertical-align: middle;
            }
        }
        time{
            font-size: .24rem;
            color: #C0C0C0;
            margin: 0 .12rem;
            display: inline-block;
            vertical-align: middle;
        }
        p{
            display: inline-block;
            font-size: .24rem;
            width: 4.5rem;
            vertical-align: middle;
            color: #252223;
        }
    }
}

</style>
<style>
    .fastnews .ant-carousel >>> .slick-slide {
        width: 7.14rem;
        height: .7rem;
        background: #FFFFFF;
        overflow: hidden;
    }
</style>

