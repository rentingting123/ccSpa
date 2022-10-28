<template>
    <div class="review">
        <div>
            <titles t1='历届' t2='作品' t3='WORKS' t4='SHOW' to='/news?type=25'/>
            <ul>
                <li v-for="news in newsList" :key="news.id" @click="toDetail(news)">
                    <img :src="news.newsIcon">
                    <p class="dian">{{news.newsTitle}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import titles from '@/npskin3/components/title'
export default {
    components:{
        titles
    },
    data(){
        return{
            newsList: [],
        }
    },
    created(){
        this.init()
    },
    methods:{
        toDetail(news){
            this.$router.push('/details/'+news.id+'?type=25')
        },
        async init(){
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: 25,
                pageNum: 1,
                pageSize: 3
            }})
            if(res=='error') return
            this.newsList = res && res.pageData || []
        }
    }
}
</script>

<style lang='less' scoped>
.review{
    width: 100%;
    background: #F0F0F0;
    >div{
        max-width: 1106px;
        margin: 0 auto;
        padding: 30px 0 37px;
        ul{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
            li{
                width: 347px;
                height: 339px;
                overflow: hidden;
                position: relative;
                margin-right: 31px;
                cursor: pointer;
                &:last-child{
                    margin-right: 0;
                }
                &:hover{
                    img{
                        transform: scale(1.1);
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                p{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 16px 15px;
                    height: 50px;
                    line-height: 18px;
                    font-size: 14px;
                    color: #ffffff;
                    background: rgba(74, 74, 74, 0.88);
                }
            }
        }
    }
}
</style>