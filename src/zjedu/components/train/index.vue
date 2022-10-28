<template>
    <div class="train">
        <div class="img">
            <img :src="item.bannerUrl" width="100%" height="100%">
            <p>
                <span>{{item.province || '-'}}</span>
                <span>{{item.trainingBeginTime | date}}-{{item.trainingEndTime | date}}</span>
            </p>
        </div>
        <h3 class="dian">{{item.name}}</h3>
        <div class="bottom">
            <p class="prize">{{item | price}}</p>
            <p class="nums">{{item.personNum || 0}}人已报名</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['item'],
    filters:{
        date(val){
            if(!val) return ''
            return moment(val).format('YYYY.MM.DD')
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

<style lang='less' scoped>
.train{
    width: 100%;
    .img{
        width: 100%;
        height: 152px;
        overflow: hidden;
        position: relative;
        p{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(22, 22, 22, 0.6) 100%);
            padding: 16px 7px 6px;
            display: flex;
            justify-content: space-between;
            span{
                font-size: 14px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 20px;
            }
        }
        &:hover{
            img{
                transform: scale(1.1);
            }
        }
    }
    h3{
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        color: #4A4A4A;
        line-height: 22px;
        margin: 8px 0 6px;
        text-align: left;
    }
    .bottom{
        display: flex;
        font-size: 14px;
        line-height: 20px;
        color: #4C4C4C;
        font-weight: 400;
        .prize{
            color: #FC3782;
            margin-right: 14px;
        }
    }
}
</style>