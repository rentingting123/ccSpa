<template>
    <div class="media">
        <h3 class="title">
            <p>媒体社评</p>
            <span @click="$router.push('/datacenter/news/mediaeditorial')">more</span>
        </h3>
        <div class="mediamain">
            <ul>
                <li v-for="list in lists" @click="$router.push('/datacenter/news/detail?id='+list.id)">
                    <img :src="list.newsIcon" alt="" srcset="">
                    <div><p :title="list.newsTitle">{{list.newsTitle}}</p></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import network from "@/api";
export default {
    data(){
        return{
            lists:[]
        }
    },
    async created(){
        let id = localStorage.getItem('groupId');
        let res = await network.npgetNewsList({data:{
            groupId: id,
            type: 27,
            pageNum: 1,
            pageSize: 2
        }})
        if(res=='error') return;
        this.lists = res.pageData || []
    },
}
</script>

<style lang="less" scoped>
.media{
    .mediamain{
        width: 814px;
        height: 88px;
        background: #F5F5F5;
        padding: 10px;
        ul{
            text-align: left;
            li{
                display: inline-block;
                vertical-align: top;
                margin-right: 43px;
                cursor: pointer;
                img{
                    width: 130px;
                    height: 69px;
                    margin-right: 11px;
                }
                div{
                    display: inline-block;
                    vertical-align: top;
                    width: 229px;
                    height: 68px;
                    position: relative;
                    p{
                        width: 100%;
                        height: auto;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 0;
                    }
                }

            }
            li:nth-child(2n){
                margin-right: 0;
            }
        }
    }
}
</style>