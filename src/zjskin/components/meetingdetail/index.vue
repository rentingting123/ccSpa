<template>
    <div class="detail">
        <div class="competition clearfix">
            <img :src="message.bannerUrl" >
            <div>
                <h2>{{message.name}}</h2>
                <p>培训时间&nbsp;&nbsp; {{message.trainingBeginTime | date}}-{{message.trainingEndTime | date}}</p>
                <p>培训地点&nbsp;&nbsp; <i class="el-icon-location-outline"></i>{{message.trainingAddr}}</p>
                <p>会议规模&nbsp;&nbsp; {{message.maxNum || 0}}人</p>
                <p>主办单位&nbsp;&nbsp; {{message.sponsorDtos | compony}}</p>
                <p v-for="list in message.descrption">
                    {{list.title}}&nbsp;&nbsp; {{list.info}}
                </p>
                <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp; <span class="color1">{{message.price | price}}</span></p>
                <div>立即报名</div>
            </div>
        </div>
        <div class="experts" v-if="message.expertDtos">
             <h1>会议嘉宾</h1>
             <ul class="clearfix">
                 <li v-for="list in message.expertDtos">
                     <img :src="list.heardUrl" alt="">
                     <h2>{{list.expertName}}</h2>
                     <p>{{list.expertSchool}}</p>
                     <p>{{list.expertList | compony}}</p>
                 </li>
             </ul>
        </div>
        <div class="download" v-if="message.noticeFileUrl">
             <h1>通知下载</h1>
             <ul>
                 <li v-for="list in message.noticeFileUrl">
                     <a :href="list.url"><i class="iconfont">&#xe61f;</i>{{list.name}}</a>
                 </li>
             </ul>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import moment from 'moment'
export default {
    data(){
        return{
            id:'',
            message: {},
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getTrainDetail({data:{
                id: this.id
            }});
            if(res=='error') return;
            this.message = res;
        }
    },
    filters:{
        date(val){
           return moment(val).format('YYYY.MM.DD');
        },
        price(val){
            if(val==0){
                return '免费'
            }else if(val>0){
                return '¥ '+val+'起'
            }else{
                return '待定'
            }
        },
        compony(val){
            if(!val){
                return ''
            }else if(val instanceof Array){
                let str = ''
                for(let i in val){
                    str += val[i] + ' '
                }
                return str
            }else{
                return val
            }
        }
    }
}
</script>

<style lang="less" scoped>
.detail{
    background: #EEF2F7;
    padding: 20px;

    .competition{
        width: 1240px;
        min-height: 306px;
        background-color: #ffffff;
        margin: 0 auto;
        padding: 16px;
        img{
            width: 480px;
            height: 270px;
            float: left;
        }
        >div{
            width: 695px;
            float: left;
            text-align: left;
            margin-left: 33px;
            h2{
                font-size: 30px;
                color: #4A4A4A;
                letter-spacing: 2.73px;
                margin: 0 0 23px;
            }
            p{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 1.45px;
                margin-bottom: 10px;
                .color1{
                    color: #FC3782;
                }
            }
            div{
                background-image: linear-gradient(-90deg, #00B0F3 0%, #0078E2 100%);
                border-radius: 20px;
                width: 130px;
                height: 40px;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 1.45px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }
    .experts{
        width: 1240px;
        margin: 20px auto;
        background-color: #ffffff;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-align: left;
            text-indent: 36px;
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            width: 1080px;
            margin: 0 auto;
            padding: 28px 0 39px;
            li{
                width: 150px;
                height: 180px;
                float: left;
                margin: 0 15px;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                    display: block;
                    background: #eee;
                    margin: 0 auto;
                }
                h2{
                    font-size: 20px;
                    color: #4A4A4A;
                    letter-spacing: 3px;
                    text-align: center;
                    margin: 5px 0;
                }
                p{
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0.88px;
                    text-align: center;
                }
            }
        }
    }
    .download{
        width: 1240px;
        margin: 20px auto;
        background-color: #ffffff;
        text-align: left;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-indent: 36px;
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            padding-bottom: 28px;
            li{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 1.45px;
                text-indent: 38px;
                margin-top: 20px;
                cursor: pointer;
                i{
                    color: #1D86FF;
                    margin-right: 8px;
                }

            }
        }
    }
}
</style>