<template>
    <div class="mytrain">
        <el-input placeholder="请输入内容" class="search" v-model="trainingName">
            <el-button slot="append" @click.native="init">搜索</el-button>
        </el-input>
        <ul>
            <li v-for="list in lists" class="clearfix">
                <img @click="todetail(list)" :src="list.bannerUrl" alt="" srcset="">
                <div>
                    <h2 class="dian" v-html="list.name"></h2>
                    <p>
                        <strong>培训时间</strong> <span>{{list.trainingBeginTime | date}} ~ {{list.trainingEndTime | date}}</span>
                    </p>
                    <p>
                        <strong>培训地点</strong> <i ></i><span v-html="list.trainingAddr"></span>
                    </p>
                    <el-button size="small" type="primary" v-if="!(list.payStatus>=1 || list.offlineStatus == 1 ) && list.price!=0" @click="paychoose=true;id=list.trainingId" round>报名缴费</el-button>
                    <a v-if="list.certificate" :href="list.certificate" target="_blank" download="证书.jpg">
                        <el-button size="small" type="primary" round>证书下载</el-button>
                    </a>
                    <el-button size="small" round v-if="list.invoiceStatus==1" @click="applyInvoice(2,list)">查看发票</el-button>
                    <el-button size="small" round v-if="list.invoiceStatus!=1 && (list.payStatus>=1 || list.offlineStatus == 1 )" @click="applyInvoice(1,list)">申请发票</el-button>
                </div>
            </li>
        </ul>
        <!-- 缴费弹窗 -->
        <el-dialog class="paytype" title="报名费缴款方式有两种(您可以根据自己的情况，任选其中一种方式)" :close-on-click-modal= false :append-to-body="true" :visible.sync="paychoose">
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
import moment from 'moment'
import invoice from '@/eskin/components/meetingdetail/common/invoice/index'
import invoiceDetail from '@/eskin/components/meetingdetail/common/invoice/detail'
import outlinepay from '@/eskin/components/meetingdetail/common/pay/outline'

export default {
    components:{
        invoice,
        invoiceDetail,
        outlinepay
    },
    data(){
        return{
            trainingName: '',
            lists:[],
            paychoose: false,
            payFlag: 0,
            outlineDia: false,
            id: '',
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.queryMyTraining({data:{
                trainingName: this.trainingName
            }});
            if(res=='error') return;
            this.lists = res;
        },
        todetail(list){
            this.$router.push('/meetingdetail/'+list.trainingId)
        },
        closepay(){
            this.outlineDia = false;
            this.paychoose = false;
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
        applyInvoice(num,list){
            this.id=list.trainingId
            this.payFlag = num
        },
        closeInvoice(){
            this.payFlag = 0;
            this.init();
        },
    },
    filters:{
        date(val){
            return moment(val).format('YYYY.MM.DD');
        },
    }
}
</script>

<style lang="less" scoped>
.mytrain{
    padding: 40px;
    .search{
        width: 256px;
    }
    ul{
        li{
            margin-top: 40px;
            img{
                width: 240px;
                height: 135px;
                float: left;
                margin-right: 17px;
            }
            >div{
                width: 675px;
                // height: 135px;
                float: left;
                h2{
                    font-size: 24px;
                    color: #4A4A4A;
                    letter-spacing: 2.18px;
                    margin-bottom: 10px;
                }
                p{
                    font-size: 16px;
                    color: #4A4A4A;
                    letter-spacing: 1.45px;
                    margin-bottom: 14px;
                }
            }
        }
    }
}
</style>