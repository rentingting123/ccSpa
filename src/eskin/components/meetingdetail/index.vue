<template>
    <div class="detail">
        <div class="competition clearfix">
            <img :src="message.bannerUrl" >
            <div>
                <h2>{{message.name}}</h2>
                <p class="clearfix"><span class="title">培训时间&nbsp;&nbsp;</span><span>{{message.trainingBeginTime | date}}-{{message.trainingEndTime | date}}</span></p>
                <p class="clearfix"><span class="title">培训地点&nbsp;&nbsp;</span><span><i class="el-icon-location-outline"></i>{{message.trainingAddr}}</span></p>
                <p class="clearfix"><span class="title">会议规模&nbsp;&nbsp;</span><span>{{message.maxNum || 0}}人</span></p>
                <p class="clearfix"><span class="title">主办单位&nbsp;&nbsp;</span><span>{{message.sponsorDtos | compony}}</span></p>
                <p class="clearfix" v-for="list in message.descrption" v-if="list.title">
                    <span class="title">{{list.title}}&nbsp;&nbsp;</span><span>{{list.info}}</span>
                </p>
                <p class="clearfix" v-if="!cert"><span class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;</span><span class="color1">{{message | price}}</span></p>
                <p class="clearfix" v-else><span class="title" style="color:#FC3782;">{{message | price}}</span></p>
                
                 <el-button type="text" v-if="singUpStatus==2 && payStatus!=1" disabled>已报名</el-button>
                 <el-button type="primary" v-if="singUpStatus==0 || singUpStatus==1" :disabled="singUpStatus==0" round @click="loginTrain">立即报名</el-button>
                 <el-button type="primary" v-if="payStatus==1" @click="paychoose=true" round>报名缴费</el-button>
                 <el-button round v-if="invoiceStatus==1" @click="applyInvoice(1)">申请发票</el-button>
                 <el-button round v-if="invoiceStatus==2" @click="applyInvoice(2)">查看发票</el-button>
                 <a v-if="certificateStatus" :href="certificateStatus" target="_blank" download="证书.jpg">
                     <el-button type="primary" round>证书下载</el-button>
                 </a>
            </div>
        </div>
        <div class="experts" v-if="message.expertDtos ">
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
                     <a :href="list.url" target="_blank"><i class="iconfont">&#xe61f;</i>{{list.name}}</a>
                     <!-- <a :href="isdownload && list.url" target="_blank"><i class="iconfont">&#xe61f;</i>{{list.name}}</a> -->
                 </li>
             </ul>
        </div>

        <div class="download" v-if="cert && message.meetingFileUrl">
             <h1>会议资料</h1>
             <ul>
                 <li v-for="list in message.meetingFileUrl">
                     <a :href="isdownload && list.url" target="_blank"><i class="iconfont">&#xe61f;</i>{{list.name}}</a>
                 </li>
             </ul>
        </div>

        <div class="review" v-if="cert && message.mettingList">
            <h1>会议回顾</h1>
             <ul class="clearfix">
                 <li v-for="list in message.mettingList">
                     <img :src="list.url" alt="" srcset="" @click="$router.push('/reviewdetail?id='+list.id)">
                     <p class="dian">{{list.title}}</p>
                 </li>
             </ul>
        </div>
        <!-- 报名弹窗 -->
        <loginTrain v-if="loginshow" :close='closeLogin' :id="id"/>
        <!-- 缴费弹窗 -->
        <el-dialog class="paytype" :append-to-body="true" title="报名费缴款方式有两种(您可以根据自己的情况，任选其中一种方式)" :close-on-click-modal= false :visible.sync="paychoose">
            <div style="margin:30px 0">
                <el-button @click="linepay">支付宝支付</el-button>
                <el-button @click="outlinePay">银行汇款</el-button>
            </div>
        </el-dialog>
        <!-- 申请发票 -->
        <invoice v-if="payFlag==1" :trainingId='id' :close="closeInvoice"/>
        <!-- 查看发票 -->
        <invoice-detail v-if="payFlag==2" :trainingId='id' :close="closeInvoice"/>
        <!-- 线下支付 -->
        <outlinepay v-if="outlineDia" :close="closepay" :trainingId='id' :payDetail='payDetail'/>
    </div>
</template>

<script>
import network from '@/api/index'
import invoice from './common/invoice/index'
import invoiceDetail from './common/invoice/detail'
import outlinepay from './common/pay/outline'

import moment from 'moment'
import loginTrain from './common/loginTrain'
export default {
    components:{
        loginTrain,
        invoice,
        invoiceDetail,
        outlinepay
    },
    data(){
        return{
            id:'',
            message: {},
            loginshow: false,
            singUpStatus: 0,    //0:不能报名 1：未报名 2：已报名
            payStatus: 0,   //0:免费 1：未缴费 2：已缴费
            invoiceStatus: 0,   //0:免费（不能申请） 1：未申请 2：已申请
            certificateStatus: '',
            paychoose: false,
            payFlag: 0,
            payDetail: {},
            outlineDia: false,
            // cert: false, //是否证书跳转来
            cert: false, //是否竞赛结束
            isdownload: false, //是否能够下载
        }
    },
    created(){
        this.id = this.$route.params.id;
        // let type = this.$route.query.type
        // if(type=='cert'){
        //     this.cert = true;
        // }
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getTrainDetail({data:{
                id: this.id
            }});
            if(res=='error') return;
            this.message = res;
            this.payStatus = res.payStatus
            this.invoiceStatus = res.invoiceStatus
            this.certificateStatus = res.certificateStatus
            
            this.singUpStatus = res.singUpStatus
            if(res.singUpStatus==2){
                this.isdownload = true
            }else{
                this.isdownload = false
            }
            
            let end = res.trainingEndTime;
            let now = new Date().getTime();
            if(end<now){
                this.cert = true
            }else{
                this.cert = false
            }
        },
        // 
        loginTrain(){
            if(!localStorage.getItem('login')){
                this.$router.push('/login?url='+this.$route.path)
                return;
            }
            this.loginshow = true
        },
        closeLogin(){
            this.loginshow = false
            this.init();
        },
        async outlinePay(){
            let res = await network.queryUserPay({data:{
                trainingId: this.id
            }});
            if(res=='error') return;
            this.payDetail = res
            this.outlineDia = true
        },
        async linepay(){
            //todo
            let pay = await network.teamPay({data:{
                returnUrl:location.href,
                trainingId: this.id
            }});
            if(pay=='error') return;
            document.getElementsByTagName('body')[0].innerHTML = pay
            document.getElementsByTagName('form')[0].submit()

        },
        applyInvoice(num){
            this.payFlag = num
        },
        closeInvoice(){
            this.payFlag = 0;
            this.init();
        },
        closepay(){
            this.outlineDia = false;
            this.paychoose = false;
            this.init();
        },
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
                font-size: 20px;
                color: #4A4A4A;
                letter-spacing: 2.73px;
                margin: 0 0 23px;
                font-weight: bold;
            }
            p{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 1.45px;
                margin-bottom: 10px;
                .color1{
                    color: #FC3782;
                }
                span{
                    width: 585px;
                    float: left;
                    display: block;
                }
                .title{
                    width: 110px;
                    overflow: hidden;
                    height: 22px;
                    font-weight: bold;
                }
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
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/leader/bg.png') no-repeat;
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
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/leader/bg.png') no-repeat;
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
    .review{
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
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            width: 1200px;
            margin: 0 auto;
            padding: 30px 0;
            li{
                width: 270px;
                margin: 0 15px;
                float: left;
                img{
                    width: 270px;
                    height: 152px;
                    cursor: pointer;
                }
                p{
                    width: 270px;
                    font-size: 18px;
                    color: #4A4A4A;
                    letter-spacing: 1.64px;
                    text-align: center;
                    margin-top: 10px;
                }

            }
        }
    }
}
</style>