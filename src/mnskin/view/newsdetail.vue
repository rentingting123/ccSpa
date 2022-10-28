<template>
    <div class="news">
        <div>
            <h2>{{news.newsTitle}}</h2>
            <div class="title">
                <span>{{news.newsType}}</span> 
                {{news.newsDate}} 
                <p v-if="news.clickCount">
                    <a-icon type="eye" />
                    {{news.clickCount}}
                </p> 
            </div>
            <!-- pdf显示 -->
            <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />
            <div v-html="news.newsInfo" class="maximg" style="white-space:pre-wrap"></div>
            
        </div>
    </div>
</template>

<script>
import network from '@/mnskin/api/index'
import FileReview from "@@/components/fileReview";
export default {
    data(){
        return{
            id:'',
            news:{}
        }
    },
    components:{
        FileReview,
    },
    created(){
        this.id = this.$route.query.id
        if(!this.id) return;
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getNewsDetails({data:{
                id: this.id,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.news = res
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 100%;
    text-align: left;
    >div{
        padding: 0 .3rem;
    }
    h2{
        font-size: .36rem;
        color: #252223;
        line-height: .5rem;
        margin-top: .3rem;
    }
    .title{
        font-size: .24rem;
        color: #ACB0B0;
        margin: .24rem 0 .34rem 0;
        span{
            color: #EB1E26;
            margin-right: .28rem;
        }
        p{
            i{
                font-size: .24rem;
                margin-right: .08rem;
            }
            font-size: .24rem;
            color: #ACB0B0;
            text-align: right;
            float: right;
            margin-right: 0.5rem;
        }
    }
    .maximg{
        font-size: .32rem;
        color: #4A4A4A;
        line-height: 1.8;
    }

}
</style>
<style lang="less">
.maximg{
    img, video{
         max-width: 100%;
    }
    p{
        margin: .25rem 0 !important;
    }
    .ql-align-center{
        text-align: center;
    }
    .ql-align-right{
        text-align: right;
    }
}
</style>