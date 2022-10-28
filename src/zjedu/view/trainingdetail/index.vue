<template>
    <div class="detail">
        <div class="competition">
            <img :src="message.bannerUrl" >
            <div>
                <h2>{{message.name}}</h2>
                <p ><span class="title">培训时间&nbsp;&nbsp;</span><span>{{message.trainingBeginTime | date}}-{{message.trainingEndTime | date}}</span></p>
                <p ><span class="title">培训地点&nbsp;&nbsp;</span><span><i class="el-icon-location-outline"></i>{{message.trainingAddr}}</span></p>
                <p ><span class="title">会议规模&nbsp;&nbsp;</span><span>{{message.maxNum || 0}}人</span></p>
                <p ><span class="title">主办单位&nbsp;&nbsp;</span><span>{{message.sponsorDtos | compony}}</span></p>
                <p  v-for="list,i in message.descrption" :key="i" v-if="list.title">
                    <span class="title">{{list.title}}&nbsp;&nbsp;</span><span>{{list.info}}</span>
                </p>
                <p  v-if="!cert"><span class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;</span><span class="color1">{{message | price}}</span></p>
                <p  v-else><span class="title" style="color:#FC3782;">{{message | price}}</span></p>
            </div>
        </div>

        <div class="experts" v-if="message ">
             <h1>培训简介</h1>
             <p v-html="message.detail" class="messageDetail"></p>
        </div>

        <div class="experts" v-if="message.expertDtos ">
             <h1>主讲专家</h1>
             <ul >
                 <li v-for="(list,i) in message.expertDtos" :key="i">
                     <img :src="list.heardUrl" alt="">
                     <h2>{{list.expertName}}</h2>
                     <p>{{list.expertSchool}}</p>
                     <p>{{list.expertList | compony}}</p>
                 </li>
             </ul>
        </div>

        <div class="download" v-if="message.meetingFileUrl">
             <h1>资料下载</h1>
             <ul>
                 <li v-for="(list,i) in message.meetingFileUrl" :key="i">
                     <a :href="isdownload && list.url" target="_blank"><i class="iconfont">&#xe61f;</i>{{list.name}}</a>
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
            message: {
                "name": "「Code Lab科技创新营」浙江机电职业技术学院",
                "price": 0,
                "trainingYear": null,
                "maxNum": 300,
                "type": 0,
                "status": 1,
                "userId": "55072c3e76ad11e9bb8a00163e040299",
                "authorGroupId": 10004920,
                "authorGroupName": null,
                "clickCount": 0,
                "bannerUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/ZwfDSL1l_1574325659245.jpg",
                "tags": [
                    "Code Lab",
                    "杭州简学"
                ],
                "signupBeginTime": "2020-12-23T02:28:00.000+0000",
                "signupEndTime": "2020-12-25T02:28:00.000+0000",
                "trainingBeginTime": "2020-12-23T02:28:00.000+0000",
                "trainingEndTime": "2020-12-25T02:28:00.000+0000",
                "trainingAddr": "浙江省杭州市西湖区支付宝大楼",
                "province": "浙江省",
                "provinceId": 330000,
                "payAccount": null,
                "payNumber": null,
                "payAddress": null,
                "outlinePay": [
                    1,
                    2
                ],
                "expertDtos": [
                    {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    },
                     {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    },
                     {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    }, {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    }
                    , {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    }
                    , {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    }
                    , {
                        "expertName": "晓雨",
                        "expertSchool": "蚂蚁金服",
                        "expertList": [
                            "特聘讲师"
                        ],
                        "expertJob": null,
                        "expertPhone": "13800170003",
                        "heardUrl": "https://web.moocollege.com/webFile/20191121/55072c3e76ad11e9bb8a00163e040299/wWNzFubz_1574325747680.jpg"
                    }
                ],
                "sponsorDtos": [
                    "蚂蚁金服"
                ],
                "descrption": [
                    {
                        "title": "协办方",
                        "info": "简学万生"
                    }
                ],
                "noticeFileUrl": null,
                "meetingFileUrl": [{
                    name: '1231232131231233',
                    url: '123213213123'
                }],
                "mettingList": [],
                "singUpStatus": 0,
                "payStatus": null,
                "invoiceStatus": null,
                "certificateStatus": null,
                'detail': `	教育部在《新时代高校思想政治理论课教学工作基本要求》（教社科〔2018〕2号）中提出，党的十八大以来，以习近平同志为核心的党中央高度重视思想政治理论课建设，作出一系列重大决策部署，思想政治理论课建设在改进中不断加强，课堂教学状况显著改善，大学生学习思想政治理论课的获得感明显增强。中国特色社会主义进入新时代，对高校思想政治理论课发挥育人主渠道作用提出了新的更高要求。为继续打好提高思想政治理论课质量和水平的攻坚战，坚持不懈传播马克思主义科学理论，讲清讲透习近平新时代中国特色社会主义思想的时代背景、重大意义、科学体系、精神实质、实践要求，全面推动习近平新时代中国特色社会主义思想进教材进课堂进学生头脑，打牢大学生成长成才的科学思想基础，引导大学生树立正确的世界观、人生观、价值观。
	为深入贯彻落实习近平新时代中国特色社会主义思想和党的十九大精神，进一步巩固马克思主义在高校意识形态领域的指导地位，坚持社会主义办学方向，全面贯彻党的教育方针，坚持立德树人，围绕“培养什么人、怎样培养人、为谁培养人”根本问题，深入挖掘提炼专业课程蕴含的思政要素，引导高校构建全员、全过程、全方位育人大思政教育格局，中国高等教育培训中心主办，杭州简学科技有限公司承办的“新时代背景下加强开放教育课程思政建设培训班”如期开班。
`
            },
            loginshow: false,
            singUpStatus: 0,    //0:不能报名 1：未报名 2：已报名
            payStatus: 0,   //0:免费 1：未缴费 2：已缴费
            invoiceStatus: 0,   //0:免费（不能申请） 1：未申请 2：已申请
            certificateStatus: '',
            paychoose: false,
            payFlag: 0,
            payDetail: {},
            outlineDia: false,
            cert: false, //是否竞赛结束
            isdownload: false, //是否能够下载
        }
    },
    created(){
        this.id = this.$route.query.id;
        if(!this.id) return;
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
            vertical-align: top;
        }
        >div{
            width: 695px;
            text-align: left;
            margin-left: 28px;
            display: inline-block;
            vertical-align: top;
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
                    display: inline-block;
                    vertical-align: top;
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
        border-radius: 8px;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-align: left;
            text-indent: 36px;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            width: 1240px;
            margin: 0 auto;
            padding: 28px 36px 18px;
            text-align: left;
            li{
                width: 262px;
                height: 180px;
                display: inline-block;
                vertical-align: top;
                margin-right: 40px;
                margin-bottom: 30px;
                &:nth-child(4n){
                    margin-right: 0;
                }
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
        .messageDetail{
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 26px;
            text-align: left;
        }
    }
    .download{
        width: 1240px;
        margin: 20px auto;
        background-color: #ffffff;
        text-align: left;
        border-radius: 8px;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-indent: 36px;
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