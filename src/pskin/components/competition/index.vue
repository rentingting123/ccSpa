<template>
    <div class="competition">
        <div class="top">
            <div class="types">
                <p>分类：</p>
                <el-radio-group v-model="tags" size="small" @change="chooseType">
                    <el-radio-button :label="item.value" v-for="item in tagss" :key="item.value">{{item.label}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="types">
                <p>时间：</p>
                <el-radio-group v-model="date" size="small" @change="chooseTime">
                    <el-radio-button :label="item.value" v-for="item in dates" :key="item.value">
                        <el-date-picker v-if="item.value==4" @focus="datefocus(4)" @change="choosemotch" value-format="yyyy-MM" v-model="monthvalue" type="month" class="monthvalue"></el-date-picker>
                        <el-date-picker v-if="item.value==5" @focus="datefocus(5)" @change="chooseyear" value-format="yyyy-MM" v-model="yearvalue" type="year" class="monthvalue"></el-date-picker>
                        <span :class="{'monthspan':item.value==4}">{{item.label}}</span>
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="types">
                <p>状态：</p>
                <el-radio-group v-model="status" size="small" @change="chooseStatus">
                    <el-radio-button :label="item.value" v-for="item in statuss" :key="item.value">{{item.label}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="main clearfix">
            <div class="fl">
                 <ul class="hot clearfix">
                    <li :class="{'on':sort==0}" @click="choosehot(0)">综合排序<p></p></li>
                    <li :class="{'on':sort==1}" @click="choosehot(1)">最新发布<p></p></li>
                    <li :class="{'on':sort==2}" @click="choosehot(2)">热门竞赛<p></p></li>
                </ul>
                <detail v-if="lists.length>0" :lists="lists"/>
            </div>
            <div style="text-align:center;">
                <el-pagination class="pages" layout="prev, pager, next" @current-change="init" :current-page.sync="page"  :page-size="size" :total="total"> </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import detail from './common/detail'
import network from '@/api/index'
import moment from 'moment'
export default {
    components:{
        detail
    },
    data(){
        return{
            sort: 0,
            tagss:[
                {
                    label: '全部',
                    value: 0,
                },
                // {
                //     label: '省级A类',
                //     value: 1,
                // },
                // {
                //     label: '省级其他',
                //     value: 2,
                // },
                {
                    label: '省级竞赛',
                    value: 4,
                },
                {
                    label: '直通国赛',
                    value: 3,
                }

            ],
            tags:0,
            dates:[
                {
                    label: '全部',
                    value: '0',
                },
                {
                    label: '今天',
                    value: '1',
                },
                {
                    label: '一周内',
                    value: '2',
                },
                {
                    label: '一月内',
                    value: '3',
                },
                {
                    label: '',
                    value: '4',
                },
                {
                    label: '',
                    value: '5',
                },
            ],
            date:'0',
            statuss:[
                {
                    label: '全部',
                    value: '3',
                },
                {
                    label: '报名中',
                    value: '2',
                },
                {
                    label: '进行中',
                    value: '1',
                },
                {
                    label: '已结束',
                    value: '0',
                }
            ],
            status:'3',
            lists:[],
            times:[],
            monthvalue:'',
            yearvalue: '',
            page: 1,
            size: 16,
            total: 0,
        }
    },
    created(){
        this.start()
    },
    methods:{
        start(){
            this.page = 1;
            this.monthvalue = ''
            this.yearvalue = ''
            this.date = '0';
            this.tags = this.$route.query.tags?this.$route.query.tags:0
            if(this.tags==1 || this.tags==2) this.tags=0
            let time = this.$route.query.time
            let year = this.$route.query.year
            if(time){
                this.date = '4';
                this.monthvalue = time
                this.choosemotch(time);
            }else if(year){
                this.date = '5';
                this.yearvalue = year
                this.chooseyear(year);
            }else{
                this.init();
            }
        },
        async init(){   
            let res = await network.getCompetitionByRequirement({data:{
                page: this.page,
                size: this.size,
                tags: this.tags,
                date: JSON.stringify(this.times),
                status: this.status,
                provinceId: localStorage.getItem('competitionId'),
                sort: this.sort
            }});
            if(res=='error') return;
            this.lists = res.competitionList;
            this.total = res.total
        },
        choosehot(index){
            this.page = 1;
            this.sort = index;
            this.init();
        },
        chooseType(val){
            this.page = 1;
            this.init();
        },
        chooseTime(val){
            this.monthvalue = ''
            this.yearvalue = ''
            let start = '',end = '';
            this.times = []
            if(val==1){
                start = moment().format('YYYY-MM-DD')
                end = moment().format('YYYY-MM-DD')
                this.times.push(start)
                this.times.push(end)
            }else if(val==2){
                start = moment().day(-6).format('YYYY-MM-DD')
                end = moment().format('YYYY-MM-DD')
                this.times.push(start)
                this.times.push(end)
            }else if(val==3){
                start = moment().day(-29).format('YYYY-MM-DD')
                end = moment().format('YYYY-MM-DD')
                this.times.push(start)
                this.times.push(end)
            }else if(val==4 || val==5){
                this.times = []
            }else{
                this.times = []
            }
            this.page = 1;
            this.init();
        },
        datefocus(date){
            this.date = date;
        },
        choosemotch(val){
            if(!val) return;
            this.yearvalue = ""
            this.times = []
            let month = moment(val).endOf('month').format('YYYY-MM-DD');
            this.times.push(val+'-01');
            this.times.push(month);
            this.init();
        },
        chooseyear(val){
            if(!val) return;
            this.monthvalue = ""
            this.times = []
            let month = moment(val).endOf('year').format('YYYY-MM-DD');
            let start = moment(val).startOf('year').format('YYYY-MM-DD');
            this.times.push(start);
            this.times.push(month);
            this.init();
        },
        chooseStatus(val){
            this.page = 1;
            this.init();
        },
    },
    watch:{
        $route(){
            this.start();
        }
    }
}
</script>

<style lang="less" scoped>
.top{
    width: 1166px;
    height: 179px;
    background: #FFFFFF;
    border: 1px solid #CBD3E5;
    border-radius: 5px;
    padding: 25px;
    margin: 32px auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .types{
        p{
            display: inline-block;
            width: 100px;
            font-size: 18px;
            font-weight: 500;
        }
    }
    .types:nth-child(1){
        margin-top: 0px;
    }
}
.main{
    width: 1170px;
    margin: 0 auto;
    padding-bottom: 40px;
    .fl{
        width: 100%;
        text-align: center;
        .hot{
            margin-bottom: 30px;
            li{
                float: left;
                width: 150px;
                cursor: pointer;
                font-size: 16px;
                p{
                    width:17px;
                    border: 2px solid #4AA1F2;
                    margin: 0 auto;
                    display: none;
                }
            }
            li.on{
                font-size: 25px;
                color: #4A4A4A;
                font-weight: bold;
                position: relative;
                top: -5px;
                p{
                    display: block;
                }
                
            }
        }
    }
}
.monthvalue{
    width: 120px !important;
    height: 20px;
    overflow: hidden;
}
.monthspan{
    position: relative;
    top: -6px;
}
.pages{
    margin-top: 30px;
    white-space: normal !important;
    text-align: center;
}
</style>

<style lang="less">
.monthvalue{
    .el-input__inner{
        height: 20px;
        width: 120px;
        padding-right: 0;
    }
    .el-input__icon{
        line-height: 20px !important;
    }
}
.el-picker-panel__content{
    margin: 0 !important;
}
.el-month-table td.today .cell{
    color: #606266;
    font-weight: 150;
}

.el-radio-button{
    margin-right: 20px;
}
.el-radio-button__inner{
    border: 1px solid #DCDFE6 !important;
    border: none !important;
    border-radius: 0 !important;
}
.el-radio-button--small .el-radio-button__inner{
    font-size: 14px !important;
}
</style>

