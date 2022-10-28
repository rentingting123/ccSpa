<template>
    <div @click="tocompetition(list)">
        <div class="logo">
            <img :src="list.bannerUrl" width="100%" height="100%">
        </div>
        <h1>{{list.competitionName}}</h1>
        <h2>{{list.competitionYear}} / {{$t('skin.di')}} {{list.competitionRound||1}}{{$t('skin.th')}} / {{list.time}}</h2>
        <p>{{$t('skin.sponsor')}}：{{list.organizations.competitionOrganizations[0].units[0].name|| '-'}}</p>
        <p>{{$t('skin.organization')}}：{{list.organizations.competitionOrganizations[1].units[0].name|| '-'}}</p>
        <p>{{$t('skin.sponsor1')}}：{{list.organizations.competitionOrganizations[5].units[0].name|| '-'}}</p>
        <p>{{$t('skin.secretariat')}}：{{list.organizations.competitionOrganizations[6].units[0].name|| '-'}}</p>
    </div>
</template>

<script>
import momnet from 'moment'
export default {
    props:['list'],
    data(){
        return{
            
        }
    },
    methods:{
        tocompetition(details){
          if(!details.id) return; 
          window.open('https://cc.moocollege.com/#/details?id='+details.id)
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(parseInt(val)).format('YYYY-MM-DD');
        }
    }
}
</script>



<style lang="less" scoped>
.logo{
    position: relative;
    width: 380px;
    height: 213px;
}
h1{
    font-size: 25px;
    height: 34px;
    color: #4A4A4A;
    margin: 22px 0 8px;
    overflow: hidden;
}
h2{
    font-size: 18px;
    color: #4A4A4A;
    margin-bottom: 12px;
    height: 25px;
    overflow: hidden;
}
p{
    font-size: 13px;
    color: #4C4C4C;
    width: 100%;
    height: 18px;
    overflow: hidden;
    margin-bottom: 7px;
}
</style>
