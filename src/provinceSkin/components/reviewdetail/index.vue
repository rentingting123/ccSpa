<template>
    <div class="news">
        <h2>{{news.title}}</h2>
        <qlediter :data='news.descrption' style="width: 100%"/>
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
            let res = await network.selectTrainingMetting({data:{
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
    }
    div{
        font-size: 16px;
        color: #4A4A4A;
        line-height: 28px;
    }

}
</style>