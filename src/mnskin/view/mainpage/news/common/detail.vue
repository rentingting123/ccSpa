<template>
    <div>
        <ul>
            <li v-for="news in competitionReferList" :key="news.id" @click="tonewsdetail(news)">
                <div>
                    <p class="dian2">{{news.newsTitle}}</p>
                    <time>{{news.newsDate}}</time>
                </div>
                <img :src="news.banner" alt="" srcset="">
            </li>
        </ul>
        <p class="more" @click="$router.push('/newslist?type='+type)">更多资讯 > </p>
    </div>
</template>

<script>
export default {
    props:['competitionReferList','type'],
    methods:{
        tonewsdetail(item){
            this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    background: #ffffff;
    li{
        width: 100%;
        padding: 0.3rem 0.25rem;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .01rem solid #E7E7E7;
        div{
            width: 5rem;
            height: 1.068rem;
            p{
                width: 100%;
                height: .8rem;
                line-height: .41rem;
                font-size: .26rem;
                color: #252223;
            }
            time{
                font-size: .26rem;
                color: #D2D2D2;
            }
        }
        img{
            width: 1.9rem;
            height: 1.068rem;
        }
    }
}
.more{
    width: 100%;
    text-align: center;
    background: #ffffff;
    line-height: .88rem;
    font-size: .24rem;
    color: #ED1E26;
}
</style>