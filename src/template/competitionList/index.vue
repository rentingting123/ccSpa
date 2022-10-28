<template>
    <div class="comlist">
        <div class="titleContent">
            <h3>{{$t('skin.competitionList')}}</h3>
            <p>COMPETITION LIST</p>
        </div>
        <ul>
            <li v-for="data in pointsData" @click="toCompetition(data)" :key="data.name">
                <div class="img">
                    <img :src="data.bannerUrl" width="100%">
                </div>
                <h1>{{data.name}}</h1>
                <h2>
                    <span>{{data.competitionRange}}</span>
                    {{data.startTime|date}}~{{data.endTime|date}}
                </h2>
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api/index'
import moment from 'moment'
export default {
    data(){
        return{
            pointsData:[]
        }
    },
    async created(){
        const pointsData = await network.getSkinCompetitions({data:{competitionId:this.$store.state.skin.id}}); 
        if(pointsData=='error') return
        this.pointsData = pointsData.list;
    },
    filters:{
        date(val){
            return moment(val).format('YYYY-MM-DD');
        }
    },
    methods:{
        async toCompetition(data){
            let result = await network.getDomain({data:{competitionId:data.id}});
            if(result=='error' | !result) return location.href = "https://cc.moocollege.com/#/details?id="+data.id;
            location.href = "http://"+result
        }
    }
}
</script>


<style lang="less" scoped>
.comlist{
    padding: 40px 0;
    .titleContent {
        width: 100%;
        text-align: center;
        margin-bottom: 46px;
    
        h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        }
    
        p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
        }
    }
    ul{
        width: 1160px;
        margin: 0 auto;
        margin-top: 40px;
        li{
            width: 278px;
            height: auto;
            margin-right: 16px;
            margin-bottom: 30px;
            display: inline-block;
            cursor: pointer;
            .img{
                width: 100%;
                height: 163px;
                overflow: hidden;
                background-position: center;
                background-size: cover;
            }
            h1{
                font-size: 16px;
                color: #4A4A4A;
                line-height: 24px;
                width: 100%;
                height: 24px;
                overflow: hidden;
            }
            h2{
                font-size: 14px;
                color: #000000;
                font-weight: 150;
                span{
                    display: inline-block;
                    padding: 0 5px;
                    background: #000000;
                    color: #ffffff;
                    margin-right: 16px;
                    font-weight: 150;
                }
            }
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
}
</style>

