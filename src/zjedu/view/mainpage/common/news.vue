<template>
    <div class="newsMain">
        <h2>简学头条</h2>
        <ul>
            <li v-for="item in datas" :key="item.id" @click="toHref(item)">
                <div class="img">
                    <img :src="item.banner" width="100%" height="100%">
                </div>
                <div class="mess">
                    <h4 class="dian">{{item.newsTitle}}</h4>
                    <p class="dian3">{{item.newsBannerText}}</p>
                    <time>{{item.newsDate}}</time>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api'
export default {
    data(){
        return{
            datas: []
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            let res = await network.getZjeduNews({data:{
                page: 1,
                size: 4
            }})
            if(res=='error') return;
            this.datas = res && res.list || []
            console.log(res);
        },
        toHref(item){
           this.$router.push('/newsDetail?id='+item.id)
        }
    }
}
</script>

<style lang="less" scoped>
.newsMain{
    width: 1200px;
    margin: 0 auto;
    h2{
        width: 100%;
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        text-align: left;
        margin-bottom: 10px;
    }
    ul{
        li{
            display: inline-block;
            vertical-align: top;
            margin: 0 30px 30px 0;
            width: 585px;
            height: 136px;
            cursor: pointer;
            &:nth-child(2n){
                margin-right: 0;
            }
            .img{
                width: 242px;
                height: 136px;
                display: inline-block;
                vertical-align: top;
                overflow: hidden;
                &:hover{
                    img{
                        transform: scale(1.01);
                    }
                }
            }
            .mess{
                width: 324px;
                margin-left: 14px;
                text-align: left;
                display: inline-block;
                vertical-align: top;
                h4{
                    font-size: 16px;
                    font-weight: bold;
                    color: #4A4A4A;
                    line-height: 22px;
                    margin: 10px 0 14px;
                }
                p{
                    height: 66px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #9B9B9B;
                    line-height: 22px;
                }
                time{
                    font-size: 14px;
                    font-weight: 400;
                    color: #9B9B9B;
                    line-height: 22px;
                }
            }
        }
    }
}
</style>


