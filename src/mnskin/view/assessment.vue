<template>
    <div class="assessment">
        <div class="search">
            <div class="top">
                <span class="first" :class="{'on':type=='本科'}" @click="typechange('本科')">
                    本科
                </span>
                <span :class="{'on':type=='高职'}" @click="typechange('高职')">
                    高职
                </span>
                <span class="last" :class="{'on':type=='专业'}" @click="typechange('专业')">
                    专业
                </span>
            </div>
            
            <div class="middle">
               
                <a-select size="large" v-if="type=='专业'" style="width:50%;" v-model="majorVersion" placeholder="请选择专业" @change="getInit">
                    <a-select-option v-for="item in majorVersionList" :key="item.value" :value="item.value+'@'+item.name">{{item.label}}</a-select-option>
                </a-select>
                <!-- 时间 -->
                <a-select size="large" v-else style="width:50%;" v-model="statusValue" placeholder="请选择" @change="getInit">
                    <a-select-option v-for="item in status" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
               
                <!-- 省份 -->
                <a-select  size="large" style="width:50%;" v-model="provincesValue" placeholder="请选择省份" @change="init">
                    <a-select-option v-for="item in provinces" :key="item.province" :value="item.province">{{item.province}}</a-select-option>
                </a-select>
            </div>
            <div class="bottom">
                <div class="iconname">
                    <a-icon type="search" />
                </div>
                <a-select
                    showSearch
                    size="large"
                    v-model="schoolname"
                    placeholder="搜索院校"
                    style="width:7.2rem;"
                    :defaultActiveFirstOption="false"
                    :showArrow="false"
                    :filterOption="false"
                    @search="remoteMethod"
                    @change="search"
                    :notFoundContent="null"
                >
                    <a-select-option v-for="d in schoolList" :key="d.value">{{d.label}}</a-select-option>
                </a-select>
            </div>
        </div>

        <div class="main">
            <h1>
                <p v-if="type!='专业'">
                    <i class="el-icon-caret-right breadcrumbIcon"></i> {{type}}院校学生竞赛
                </p>
                <p v-else>
                    <i class="el-icon-caret-right breadcrumbIcon"></i> {{showname}}  &nbsp;
                    <small><a-icon type="question-circle" @click="visible=true" /></small>
                </p>
                <a-select v-model="hot" placeholder="请选择" @change="choosehot()">
                    <a-select-option v-for="item in scoolTypes" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
                </a-select>
                
            </h1>
            <a-spin :spinning="loading">
                <discipline v-if="type=='专业'" :lists='lists' />
                <detail v-else :lists='lists' />
            </a-spin>
        </div>
        <a-modal title="备" v-model="visible" centered :footer="null" >
           <p>每个分数段内，按照省（市、自治区）拼音排序，同省内按奖项数进行排序</p>
        </a-modal>
    </div>
</template>
<script>
import detail from './common/listnew'
import discipline from './common/discipline'
import network from '@/mnskin/api/index'
import {cloneDeep} from 'lodash'
export default {
    components:{
        detail,
        discipline,
    },
    data(){
        return{
            hot: 5,
            lists:[],
            oldlists:[],
            status:[
                 {
                    value: '2017-2021',
                    label: '2017-2021'
                },
                {
                    value: '2016-2020',
                    label: '2016-2020'
                },
                {
                    value: '2015-2019',
                    label: '2015-2019'
                },
                {
                    value: '2014-2018',
                    label: '2014-2018'
                },
                {
                    value: '2013-2017',
                    label: '2013-2017'
                },
                {
                    value: '2012-2016',
                    label: '2012-2016'
                },
                {
                    value: '2012-2020',
                    label: '2012-2020'
                },
            ],
            majorVersionList:[
                {
                    value: '2019学生本科机器人topv1',
                    label: '2019学生本科机器人',
                    name: '机器人竞赛'
                },
            ],
            majorVersion: '2019学生本科机器人topv1@机器人竞赛',
            statusValue: '2017-2021',
            provinces: [],
            provincesValue: '全国',
            schoolname: undefined,
            type: '本科',
            loading: false,
            loading1: false,
            schoolList: [],
            showname: '',
            visible: false,
        }
    },
    computed: {
        scoolTypes(){
            if(this.type=='高职'&&(this.statusValue=='2016-2020'||this.statusValue=='2017-2021')){
                return [
                {
                    name: '总榜单',
                    value: 5,
                },
                {
                    name: '双高',
                    value: 1,
                },
                {
                    name: '一般(除双高)',
                    value: 2,
                },
                {
                    name: '东北',
                    value: 3,
                },
                {
                    name: '东部',
                    value: 4,
                },
                {
                    name: '中部',
                    value: 6,
                },
                {
                    name: '西部',
                    value: 7,
                },
                {
                    name: '民办',
                    value: 8,
                }
                ]
            }else if(this.type=='高职'&&this.statusValue=='2015-2019'){
                return [
                {
                    name: '总榜单',
                    value: 5,
                },
                {
                    name: '示范校',
                    value: 0,
                },

                {
                    name: '骨干校',
                    value: 1,
                },

                {
                    name: '高水平',
                    value: 3,
                },
                {
                    name: '一般',
                    value: 2,
                },
                {
                    name: '民办',
                    value: 9,
                },

                {
                    name: '东部',
                    value: 4,
                },
                {
                    name: '中部',
                    value: 6,
                },
                {
                    name: '西部',
                    value: 7,
                },
                {
                    name: '东北',
                    value: 8,
                },
                
                ]
            }else if(this.type=='本科'&&(this.statusValue=='2016-2020' || this.statusValue=='2015-2019')){
                return [
                {
                    name: '总榜单',
                    value: 5,
                },
                {
                    name: '双一流',
                    value: 0,
                },
                {
                    name: '地方院校',
                    value: 1,
                },
                {
                    name: '综合类',
                    value: 2,
                },
                {
                    name: '理工类',
                    value: 3,
                },
                {
                    name: '人文社科类',
                    value: 4,
                },
                {
                    name: '农林类',
                    value: 6,
                },
                {
                    name: '医药类',
                    value: 7,
                },
                {
                    name: '师范类',
                    value: 8,
                },
                {
                    name: '民办独立院校',
                    value: 9,
                },
                {
                    name: '新建本科',
                    value: 10,
                },
                ]
            }else if(this.type=='本科'&&this.statusValue=='2014-2018'){
                return [
                {
                    name: '总榜单',
                    value: 5
                },
                {
                    name: '综合类',
                    value: 0
                },
                {
                    name: '理工类',
                    value: 1
                },
                {
                    name: '人文社科类',
                    value: 4
                },
                {
                    name: '农林医药类',
                    value: 2
                },
                {
                    name: '师范类',
                    value: 3
                },
                {
                    name: '民办及独立学院',
                    value: 6
                },

                ]
            }else{
                return [
                    {
                        name: '总榜单',
                        value: 5
                    },
                ]
            }
        }
    },
    async created(){
        this.type = this.$route.query.type || '本科'
        await this.getProvinceList();
        this.init();
    },
    methods:{
        async getProvinceList(){
            let res = await network.getProvinceList();
            if(res=='error') return;
            var arr = []
            for(let i in res){
                if(!(res[i].province=='香港特别行政区' || res[i].province=='澳门特别行政区' || res[i].province=='台湾省' ||res[i].province=='中国' || res[i].province=='亚太' || res[i].province=='国际')){
                    arr.push(res[i])
                }
            }
            arr.unshift({
                province: '全国',
                provinceId: 1
            })
            this.provinces = arr;
        },
        async init(){
            this.schoolname = undefined
            this.loading = true;
            let arr = this.majorVersion.split('@')
            let verson = arr[0];
            this.showname = arr.length>1?this.majorVersion.split('@')[1]:'';
            let res = '';
            if(this.type=='专业'){
                res = await network.majorStudentCompetition({data:{
                    provinceId: 1,
                    province: this.provincesValue=='全国'?'':this.provincesValue,
                    version: verson,
                }})
                this.loading = false;
                if(res=='error') return;
                this.lists = res;
                this.oldlists = cloneDeep(res)
            }else{
                res = await network.getEvaluationWhiteBook({data:{
                    provinceId: 1,
                    province: this.provincesValue=='全国'?'':this.provincesValue,
                    version: this.statusValue,
                    type: this.type=='本科'? 0 : 1,
                    schoolType: this.hot
                }});
                this.loading = false;
                if(res=='error') return;
                this.lists = res.slice(0,99);
                this.oldlists = cloneDeep(res)
                let _this =this
                setTimeout(_this.search,2000)
            }
        },
        

        search(){
            this.lists = cloneDeep(this.oldlists)
            
            if(this.type=='专业'){
                for(let i in this.lists){
                    for(let j in this.lists[i].rankList){
                        if(this.lists[i].rankList[j].schoolName==this.schoolname){
                            this.lists[i].rankList[j].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
                        }
                    }
                }
            }else{
                for(let i in this.lists){
                    if(this.lists[i].schoolName==this.schoolname){
                        this.lists[i].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
                    }
                }
            }

            this.$nextTick(()=>{
                let lis = document.querySelectorAll('.ref')
                if(!this.schoolname) return;
                if(lis.length<=0) return this.$message.warning('未找到该学校');
                scrollTo(0, lis[0].offsetTop-15)
                
            })

        },
        remoteMethod(q) {
            if (q !== "") {
                this.loading1 = true;
                this.querySchool({ q });
            } else {
                this.schoolList = [];
            }
        },
        async querySchool(param) {
            this.loading1 = false;
            param.limit = 10;
            const data = await network.school({ data: param });
            if (data == "error") return;
            if (!data) {
                this.schoolList = [];
                return;
            }
            this.schoolList = data.map(r => {
                return { value: r.schoolcolName, label: r.schoolcolName };
            });
        },
        choosehot(){
            this.init();
        },
        getInit(){
            this.hot = 5
            this.schoolname = undefined
            this.init();
        },
        typechange(type){
            this.type = type
            this.schoolname = undefined
            this.init();
        }
    }
}
</script>


<style lang="less" scoped>
.assessment{
    background: rgb(247, 247, 247);
    width: 100%;
    .search{
        padding: .30rem 0;
        .ant-input{
            width: 2.78rem;
        }
        .top{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                background: #B7B7B7;
                border: .02rem solid #B7B7B7;
                display: inline-block;
                width: 2.4rem;
                height: .76rem;
                line-height: .76rem;
                font-size: .36rem;
                color: #ffffff;
                &.on{
                    background: #ED1E26;
                    border: .02rem solid #ED1E26;
                }
            }
        }
        .middle{
            margin: .15rem 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .ant-select{
                margin: 0 .15rem;
            }
        }
        .bottom{
            width: 100%;
            position: relative;
            .ant-select{
                margin: 0 .15rem;
                width: 7.2rem;
            }
            .iconname{
                width: .24rem;
                height: .24rem;
                position: absolute;
                right: .4rem;
                top: 50%;
                transform: translateY(-50%);
                z-index: 999;
                color: rgba(0, 0, 0, 0.25);
                font-size: .24rem
            }
        }
    }
    .main{
        background: #ffffff;
        text-align: left;
        padding: .3rem;
        h1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-size: .32rem;
                color: #252223;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .ant-select{
                width: 2rem;
            }
        }
    }
}
</style>