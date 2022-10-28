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
            </div>
            
            <div class="middle">
                <!-- 时间 -->
                <a-select size="large" style="width:50%;" v-model="version" placeholder="请选择" @change="init">
                    <a-select-option v-for="item in status" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <!-- 省份 -->
                <a-select size="large" style="width:50%;" v-model="provincesValue" placeholder="请选择省份" @change="init">
                    <a-select-option v-for="item in provinces" :key="item.province" :value="item.province">{{item.province}}</a-select-option>
                </a-select>
            </div>
            <div class="bottom">
                <div class="iconname">
                    <a-icon type="search" />
                </div>
                <a-select
                    size="large"
                    showSearch
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
        <!-- 6+1 -->
        <teacherdevelopment :type="type" :version='version'/>

        <div class="main">
            <h1>
                <p>
                    <i class="el-icon-caret-right breadcrumbIcon"></i>  {{type}}院校教发指数
                </p>
                <a-select v-if="type=='本科'" v-model="hot" placeholder="请选择" @change="choosehot()">
                    <a-select-option value="0">总榜单</a-select-option>
                    <a-select-option value="1">双一流</a-select-option>
                    <a-select-option value="2">地方院校</a-select-option>
                    <a-select-option value="3">综合类</a-select-option>
                    <a-select-option value="4">理工类</a-select-option>
                    <a-select-option value="5">农林类</a-select-option>
                    <a-select-option value="6">医药类</a-select-option>
                    <a-select-option value="7">师范类</a-select-option>
                    <a-select-option value="8">人文社科类</a-select-option>
                    <a-select-option value="9">民办及独立学院</a-select-option>
                    <a-select-option value="10">新建本科</a-select-option>
                    <a-select-option value="11">师均指数</a-select-option>
                </a-select>
                <a-select v-else-if="type=='高职'&&version=='2020'" v-model="hot" placeholder="请选择" @change="choosehot()">
                    <a-select-option value="0">总榜单</a-select-option>
                    <a-select-option value="1">双高</a-select-option>
                    <a-select-option value="4">一般高职(不含双高)</a-select-option>
                    <a-select-option value="9">民办</a-select-option>
                    <a-select-option value="5">东部</a-select-option>
                    <a-select-option value="6">中部</a-select-option>
                    <a-select-option value="7">西部</a-select-option>
                    <a-select-option value="8">东北</a-select-option>
                </a-select>
                <a-select v-else v-model="hot" placeholder="请选择" @change="choosehot()">
                    <a-select-option value="0">总榜单</a-select-option>
                    <a-select-option value="1">高水平</a-select-option>
                    <a-select-option value="2">示范校</a-select-option>
                    <a-select-option value="3">骨干校</a-select-option>
                    <a-select-option value="4">普通(除示范骨干)</a-select-option>
                    <a-select-option value="9">民办</a-select-option>
                    <a-select-option value="5">东部</a-select-option>
                    <a-select-option value="6">中部</a-select-option>
                    <a-select-option value="7">西部</a-select-option>
                    <a-select-option value="8">东北</a-select-option>
                </a-select>
            </h1>
            <no v-if="type=='高职' && base.picshow" />
            <a-spin v-else :spinning="loading">
                <detail  :lists='lists' />
            </a-spin>
        </div>
    </div>
</template>
<script>
import detail from './common/list'
import teacherdevelopment from './mainpage/development/teacherdevelopment'
import network from '@/mnskin/api/index'
import no from './mainpage/rank/common/no'
import {getBaseInfo} from '@/common/common.js'
import {cloneDeep} from 'lodash'
export default {
    components:{
        detail,
        teacherdevelopment,
        no,
    },
    data(){
        return{
            status:[
                 {
                    value: '2021',
                    label: '2021'
                },
                {
                    value: '2020',
                    label: '2020'
                },
                {
                    value: '2019',
                    label: '2019'
                },
            ],
            version: '2021',
            provinces: [],
            provincesValue: '全国',
            schoolname: undefined,
            type: '本科',
            hot: '0',
            lists:[],
            oldlists:[],
            loading: false,
            loading1: false,
            schoolList: [],
            base: {},
        }
    },
    async created(){
        this.type = this.$route.query.type || '本科'
        this.base = getBaseInfo()
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
            let version = this.version + this.type + '教发6+1'
            if(this.version=='2019' && this.type=='高职'){
                version+='y'
            }
            let  res = await network.getTeachersDevelopment({data:{
                provinceId: 1,
                province: this.provincesValue=='全国'?'':this.provincesValue,
                version: version,
                type: this.type=='本科'? 0 : 1,
                schoolType: this.hot,
                year: this.version
            }});
            this.loading = false;
            if(res=='error') return;
            if(this.type=='高职' && res.length>300){
                res.length = 300
            }
            this.lists = res.slice(0,99);
            this.oldlists = cloneDeep(res)
            let _this =this
            setTimeout(_this.search,2000)
        },
        

        search(){
            this.lists = cloneDeep(this.oldlists)
            for(let i in this.lists){
                if(this.lists[i].schoolName==this.schoolname){
                    this.lists[i].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
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
        typechange(type){
            this.hot = '0'
            this.type = type;
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
        .top{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                background: #B7B7B7;
                border: .02rem solid #B7B7B7;
                display: inline-block;
                width: 3.6rem;
                height: .7rem;
                line-height: .7rem;
                font-size: .36rem;
                color: #ffffff;
            }
            span.on{
                background: #ED1E26;
                border: .02rem solid #ED1E26;
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
                margin: 0 .15rem !important;
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
                font-size: .24rem;
            }
        }
    }
    .main{
        background: #ffffff;
        text-align: left;
        margin-top: .2rem;
        padding: .3rem 0;
        h1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .3rem;
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