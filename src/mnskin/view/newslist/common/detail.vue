<template>
    <ul>
        <li v-for="news in competitionReferList" :key="news.id" @click="tonewsdetail(news)">
            <div>
                <p class="dian2">{{news.newsTitle}}</p>
                <time>{{news.newsDate}}</time>
            </div>
            <img :src="news.banner" alt="" srcset="">
        </li>
    </ul>
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
        padding: 0.36rem 0.25rem 0.14rem;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .01rem solid #E7E7E7;
        div{
            width: 4.6rem;
            height: 1.12rem;
            font-weight: bold;
            p{
                width: 100%;
                height: .78rem;
                line-height: .39rem;
                font-size: .24rem;
                color: #252223;
            }
            time{
                font-size: .24rem;
                color: #d2d2d2;
            }
        }
        img{
            width: 2.2rem;
            height: 1.12rem;
        }
    }
}
</style>