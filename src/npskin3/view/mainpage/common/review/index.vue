<template>
    <div class="review">
        <div>
            <titles t1='赛事' t2='回顾' t3='COMPETITION' t4='REVIEW' to='/news?type=24'/>
            <ul>
                <li v-for="news in newsList" :key="news.id" @click="toDetail(news)">
                    <img :src="news.newsIcon">
                    <p>{{news.newsTitle}}</p>
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
            this.$router.push('/details/'+news.id+'?type=24')
        },
        async init(){
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: 24,
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
    background: url('http://web.moocollege.com/mooc/hzq/vueskin/npskin3/reviewbg.png') no-repeat;
    background-size: 1920px auto;
    background-position: center;
    >div{
        max-width: 1106px;
        margin: 0 auto;
        padding: 53px 0 61px;
        
        ul{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 19px;
            li{
                width: 347px;
                height: 195px;
                overflow: hidden;
                position: relative;
                margin-right: 27px;
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
                    padding: 7px 15px;
                    min-height: 50px;
                    line-height: 18px;
                    font-size: 14px;
                    color: #ffffff;
                    background: linear-gradient(266deg, #559CFE 0%, #526AFE 100%);
                }
            }
        }
    }
}
</style>