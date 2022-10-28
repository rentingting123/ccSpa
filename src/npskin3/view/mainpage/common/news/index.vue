<template>
    <div class="news">
        <div>
            <div class="newsmain left">
                <titles t1='赛事' t2='动态' t3='COMPETITION' t4='NEWS' to='/news?type=22'/>
                <listShow :lists='newsList1' :type='22' class="listShow"/>
            </div>
            <div class="newsmain right">
                <titles t1='通知' t2='文件' t3='NOTIFICATION' t4='DOCUMENT' to='/news?type=30'/>
                <listShow :lists='newsList2' :type='30' class="listShow"/>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import titles from '@/npskin3/components/title'
import listShow from '@/npskin3/components/newlist/main'
export default {
    components:{
        titles,
        listShow,

    },
    data(){
        return{
            newsList1: [],
            newsList2: [],
        }
    },
    created(){
        this.getDocument();
        this.getNews();
    },
    methods:{
        async getNews(){
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: 22,
                pageNum: 1,
                pageSize: 6
            }})
            if(res=='error') return
            this.newsList1 = res && res.pageData || []
        },
        async getDocument(){
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: 30,
                pageNum: 1,
                pageSize: 6
            }})
            if(res=='error') return
            this.newsList2 = res && res.pageData || []
        }
    }
}
</script>

<style lang='less' scoped>
.news{
    width: 100%;
    background: url('http://web.moocollege.com/mooc/hzq/vueskin/npskin3/linebg.png') no-repeat;
    background-size: 1480px auto;
    background-position: center;
    padding: 43px 0; 
    >div{
        width: 1106px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .newsmain{
            width: 539px;
            height: 336px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 1px solid #D5D5D5;
            padding: 26px 31px 25px 35px;
            &.right{
                position: relative;
                left: -4px;
            }
            .listShow{
                padding-top: 4px;
            }
        }
    }
}
</style>