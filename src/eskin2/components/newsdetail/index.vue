<template>
    <div class="news">
        <h2>{{news.newsTitle}}</h2>
        <p><span>{{news.newsType}}</span> {{news.newsDate}}</p>
        <qlediter :data='news.newsInfo' style="width:100%"/>
    </div>
</template>

<script>
import network from '@/api/index'
import qlediter from '@@/components/editor/show'
export default {
    components:{
        qlediter
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
    width: 940px;
    margin: 30px auto;
    padding: 30px 70px 70px;
    box-shadow: 0 4px 8px 0 #d5dde5;
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
        span{
            color: #0078E2;
            margin-right: 30px;
        }
    }

}
</style>