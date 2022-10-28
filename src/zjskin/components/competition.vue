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
                        <el-date-picker v-if="item.value==4" @focus="datefocus" @change="choosemotch" value-format="yyyy-MM" v-model="monthvalue" type="month" class="monthvalue"></el-date-picker>
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
                    <li :class="{'on':sort==2}" @click="choosehot(2)">热门点击<p></p></li>
                    <li :class="{'on':sort==3}" @click="choosehot(3)">最多报名<p></p></li>
                </ul>
                <detail v-if="lists.length>0" :lists="lists"/>
            </div>
            <div class="fr">
                <h3>您可能还喜欢</h3>
                <like :lists="likes"/>
            </div>
        </div>


    </div>
</template>

<script>
import like from '../view/competitionshow/like'
import detail from '../view/competitionshow/detail'
import network from '@/api/index'
import moment from 'moment'
export default {
    components:{
        like,
        detail
    },
    data(){
        return{
            sort: 0,
            tagss:[
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '省级A级',
                    value: '省赛A',
                },
                {
                    label: '省级B级',
                    value: '省赛B',
                },
                // {
                //     label: '省级竞赛',
                //     value: '省级竞赛',
                // },
                // {
                //     label: '创新创业',
                //     value: '创新创业',
                // },
                // {
                //     label: '技能',
                //     value: '技能',
                // },
                // {
                //     label: '财经',
                //     value: '财经',
                // },
                // {
                //     label: '法学',
                //     value: '法学',
                // },
                // {
                //     label: '艺术',
                //     value: '艺术',
                // },
                // {
                //     label: '医学',
                //     value: '医学',
                // },
                // {
                //     label: '文学',
                //     value: '文学',
                // },
                // {
                //     label: '教师教学',
                //     value: '教师教学',
                // },
                {
                    label: '直通国赛',
                    value: '直通国赛',
                }

            ],
            tags:'',
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
                    label: '按月历',
                    value: '4',
                }
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
            likes:[],
            times:[],
            monthvalue:''
        }
    },
    created(){
        this.tags = this.$route.query.tags?this.$route.query.tags:''
        this.init();
        this.getlike();
    },
    methods:{
        async getlike(){
            let res = await network.guessLike({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.likes = res.likeCompetitionList;
        },
        async init(){   
            let res = await network.getCompetitionByRequirement({data:{
                page: 1,
                size: 100,
                tags: this.tags,
                date: JSON.stringify(this.times),
                status: this.status,
                provinceId: localStorage.getItem('competitionId'),
                sort: this.sort
            }});
            if(res=='error') return;
            this.lists = res.competitionList
        },
        choosehot(index){
            this.sort = index;
            this.init();
        },
        chooseType(val){
            this.init();
        },
        chooseTime(val){
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
            }else if(val==4){
                return;
                this.times = []
            }else{
                this.times = []
            }
            this.init();
        },
        datefocus(){
            this.date = 4;
        },
        choosemotch(val){
            if(!val) return;
            this.times = []
            let month = moment(val).endOf('month').format('YYYY-MM-DD');
            this.times.push(val+'-01');
            this.times.push(month);
            this.init();
        },
        chooseStatus(val){
            this.init();
        },
    },
    watch:{
        $route(){
            this.tags = this.$route.query.tags?this.$route.query.tags:''
            this.init();
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
    .types{
        margin-top: 20px;
        p{
            display: inline-block;
            width: 100px;
        }
    }
    .types:nth-child(1){
        margin-top: 0px;
    }
}
.main{
    width: 1166px;
    margin: 0 auto;
    padding-bottom: 40px;
    .fl{
        margin-right: 40px;
        width: 808px;
        .hot{
            li{
                float: left;
                width: 150px;
                cursor: pointer;
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
    .fr{
        width: 318px;
        height: 500px;
        background: #F5F8FE;
        padding: 27px;
        text-align: left;
        h3{
            font-size: 18px;
            color: #5871A9;
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
</style>

<style lang="less">
.monthvalue{
    .el-input__inner{
        height: 20px;
        width: 120px;
        padding-right: 0;
    }
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
</style>

