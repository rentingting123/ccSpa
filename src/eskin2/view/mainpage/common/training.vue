<template>
    <ul class="lists clearfix">
        <li v-for="list,index in lists">
            <div class="logo" @click="$router.push('/meetingdetail/'+list.id)">
                <img :src="list.bannerUrl" alt="">
                <p>
                    {{list.province}}
                    <span>{{list.trainingBeginTime | date}}-{{list.trainingEndTime | date}}</span>
                </p>
            </div>
            <h2 class="ellipse" :title="list.name">{{list.name}}</h2>
            <p class="h3">
                {{list | price}}
                <span>{{list.personNum || 0}}人已报名</span>
            </p>
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
           return moment(val).format('YYYY.MM.DD');
        },
        price(list){
           let start = list.trainingEStartTime;
           let end = list.trainingEndTime;
           let now = new Date().getTime();
            if(now > end){
                return '已结束'
            }else if(now < start){
                return '待定'
            }else{
                let val = list.price;
                if(val==0){
                    return '免费'
                }else if(val>0){
                    return '¥ '+val+'起'
                }else{
                    return '待定'
                }
            }
        }
    }
}
</script>


<style lang="less" scoped>
.lists{
    li{
        width: 270px;
        height: 208px;
        margin: 0 30px 30px 0;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        .logo{
            width: 100%;
            height: 152px;
            overflow: hidden;
            position: relative;
            background: #D8D8D8;
            border-radius: 3.63px;
            img{
                width: 100%;
                height: 100%;
            }
            p{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(22,22,22,0.60) 100%);
                border-radius: 4.03px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0.88px;
                text-align: left;
                padding: 7px;
                span{
                    float: right;
                }
            }
        }
        .logo:hover{
            img{
                transform: scale(1.1)
            }
        }
        h2{
            font-size: 16px;
            color: #4A4A4A;
            letter-spacing: 0;
            margin: 8px 0 6px;
            text-align: left;
            font-weight: bold;
        }
        .h3{
            font-size: 14px;
            color: #FC3782;
            letter-spacing: 0;
            text-align: left;
            span{
                font-size: 14px;
                color: #4C4C4C;
                letter-spacing: 0;
                margin-left: 15px;
            }
        }
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>

