<template>
    <div class="news">
        <h2>{{news.newsTitle}}</h2>
        <p>{{news.newsDate}}</p>
        <!-- pdf显示 -->
        <FileReview :url="news.pdfInfo" v-if="news.pdfInfo" index='pdfInfo' />
        <qlediter :data='news.newsInfo' style="width: 100%"/>
    </div>
</template>

<script>
import network from '@/api/index'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview";
export default {
    components:{
        qlediter,
        FileReview,
    },
    data(){
        return{
            id:'',
            news:{}
        }
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
    width: 760px;
    margin: 120px auto;
    text-align: left;
    h2{
        font-size: 28px;
        color: #4A4A4A;
        font-weight: bold;
    }
    p{
        font-size: 14px;
        color: #4A4A4A;
        margin: 16px 0 40px 0;
    }
}
</style>
