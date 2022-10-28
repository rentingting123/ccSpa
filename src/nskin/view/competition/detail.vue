<template>
    <ul>
        <li v-for="list in lists" :key="list.id"  @click="todetail(list)">
            <div class="img">
                <img v-if="list.bannerOne" :src="list.bannerOne+'!w480'" width="100%" height="100%">
                <img v-else :src="require(`../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)" width="100%" height="100%">
            </div>
            <h3 class="dian" :title="list.name">{{list.name}}</h3>
            <div class="mess">
                <p class="dian"><span>秘&nbsp;&nbsp;书&nbsp;&nbsp;处</span> {{list.secretariat || `&nbsp;&nbsp;&nbsp;&nbsp;-`}}</p>
                <p><span>报名时间</span> {{list.signUpTime || `&nbsp;&nbsp;&nbsp;&nbsp;-`}}</p>
                <p><span>竞赛时间</span> {{list.competitionTime || `&nbsp;&nbsp;&nbsp;&nbsp;-`}}</p>
            </div>
        </li>
    </ul>
</template>
<script>
import network from '@/api/index'
import moment from 'moment'
export default {
    props:['lists'],
    methods:{
        async todetail(item){
            let url = item.url
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
            let res = await network.updateClickCount({data:{
                id: item.id
            }});
        }
    },
    filters:{
        date(val){
            return moment(val).format('YYYY.MM.DD')
        },
        competitionType(value){
            if(value==2){
                return '火热报名'
            }else if(value==1){
                return '进行中'
            }else{
                return '已结束'
            }
        }
    }
}
</script>


<style lang="less" scoped>
ul{
    font-size: 0;
    li{
        width: 330px;
        height: 350px;
        padding: 25px 20px;
        background: rgba(0, 0, 0, 0.02);
        margin: 46px 73px 0 0;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        .img{
            width: 290px;
            height: 162px;
            background: #D8D8D8;
            overflow: hidden;
            &:hover{
                img{
                    transform: scale(1.1)
                }
            }
        }
        h3{
            font-size: 20px;
            color: #4A4A4A;
            line-height: 27px;
            margin: 11px 0 23px;
            font-weight: normal;
        }
        .mess{
            p{
                font-size: 18px;
                line-height: 24px;
                color: #4A4A4A;
                margin-top: 10px;
                span{
                    margin-right: 6px;
                }
            }
        }
        &:nth-child(3n){
            margin-right: 0;
        }
        &:nth-child(1),&:nth-child(2),&:nth-child(3){
            margin-top: 0;
        }
    }
}
</style>

