<template>
    <div class="development">
        <div>
            <div class="search">
                <ul class="right">
                    <li :class="{'on':type=='本科'}" @click="typechange('本科')">本科</li>
                    <li :class="{'on':type=='高职'}" @click="typechange('高职')">高职</li>
                </ul>
                <div class="left">
                    <!-- 年份 -->
                    <el-select v-model="version" placeholder="请选择" @change="init">
                        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <!-- 省份 -->
                    <el-select v-model="provincesValue" placeholder="请选择省份" @change="init">
                        <el-option v-for="item in provinces" :key="item.province" :label="item.province" :value="item.province"></el-option>
                    </el-select>
                    <!-- 搜索院校 -->
                    <el-select
                        filterable
                        v-model="schoolname"
                        reserve-keyword
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading1"
                        placeholder="搜索院校"
                        @change="search"
                        class="searchicon"
                        >
                        <el-option
                            v-for="item in schoolList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            
            <!-- 教发指数6+1 -->
            <teacherdevelopment :type="type" :version='version'/>

            <h :title='title'></h>
            <div class="main">
                <ul class="type" v-if="type=='本科'">
                    <li :class="{'on':hot == 0}" @click="choosehot(0)">总榜单<p class="line"></p></li>
                    <li :class="{'on':hot == 1}" @click="choosehot(1)">双一流<p class="line"></p></li>
                    <li :class="{'on':hot == 2}" @click="choosehot(2)">地方院校<p class="line"></p></li>
                    <li :class="{'on':hot == 3}" @click="choosehot(3)">综合类<p class="line"></p></li>
                    <li :class="{'on':hot == 4}" @click="choosehot(4)">理工类<p class="line"></p></li>
                    <li :class="{'on':hot == 5}" @click="choosehot(5)">农林类<p class="line"></p></li>
                    <li :class="{'on':hot == 6}" @click="choosehot(6)">医药类<p class="line"></p></li>
                    <li :class="{'on':hot == 7}" @click="choosehot(7)">师范类<p class="line"></p></li>
                    <li :class="{'on':hot == 8}" @click="choosehot(8)">人文社科类<p class="line"></p></li>
                    <li :class="{'on':hot == 9}" @click="choosehot(9)">民办及独立学院<p class="line"></p></li>
                    <li :class="{'on':hot == 10}" @click="choosehot(10)">新建本科<p class="line"></p></li>
                    <li :class="{'on':hot == 11}" @click="choosehot(11)">师均指数<p class="line"></p></li>
                </ul>
                <ul class="type on" v-else-if="type=='高职'&&version=='2020'">
                    <li :class="{'on':hot == 0}" @click="choosehot(0)">总榜单<p class="line"></p></li>
                    <li :class="{'on':hot == 1}" @click="choosehot(1)">双高<p class="line"></p></li>
                    <li :class="{'on':hot == 4}" @click="choosehot(4)">一般高职(不含双高)<p class="line"></p></li>
                    <li :class="{'on':hot == 9}" @click="choosehot(9)">民办<p class="line"></p></li>
                    <li :class="{'on':hot == 5}" @click="choosehot(5)">东部<p class="line"></p></li>
                    <li :class="{'on':hot == 6}" @click="choosehot(6)">中部<p class="line"></p></li>
                    <li :class="{'on':hot == 7}" @click="choosehot(7)">西部<p class="line"></p></li>
                    <li :class="{'on':hot == 8}" @click="choosehot(8)">东北<p class="line"></p></li>
                </ul>
                <ul class="type on" v-else>
                    <li :class="{'on':hot == 0}" @click="choosehot(0)">总榜单<p class="line"></p></li>
                    <li :class="{'on':hot == 1}" @click="choosehot(1)">高水平<p class="line"></p></li>
                    <li :class="{'on':hot == 2}" @click="choosehot(2)">示范校<p class="line"></p></li>
                    <li :class="{'on':hot == 3}" @click="choosehot(3)">骨干校<p class="line"></p></li>
                    <li :class="{'on':hot == 4}" @click="choosehot(4)">普通(除示范骨干)<p class="line"></p></li>
                    <li :class="{'on':hot == 9}" @click="choosehot(9)">民办<p class="line"></p></li>
                    <li :class="{'on':hot == 5}" @click="choosehot(5)">东部<p class="line"></p></li>
                    <li :class="{'on':hot == 6}" @click="choosehot(6)">中部<p class="line"></p></li>
                    <li :class="{'on':hot == 7}" @click="choosehot(7)">西部<p class="line"></p></li>
                    <li :class="{'on':hot == 8}" @click="choosehot(8)">东北<p class="line"></p></li>
                </ul>
                <!-- <no> 查找方便 -->
                <div v-if="type=='高职' && base.picshow">
                    <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/no.jpg" alt="" srcset="">
                </div>
                <same v-else v-loading="loading" :lists='lists' :type="type"/>
            </div>

            <!--  -->

        </div>
    </div>
</template>

<script>
import teacherdevelopment from './common/teacherdevelopment'
import {cloneDeep} from 'lodash'
import detail from '../assessment/common/index'
import same from '../assessment/common/same'
import network from '@/api/index'
import {getBaseInfo} from '@/common/common.js'
import h from '@/nskin/components/h'
  export default {
    components:{
        detail,
        teacherdevelopment,
        same,
        h,
    },
    data() {
      return {
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
        schoolname: '',
        type: '本科',
        hot: 0,
        lists:[],
        oldlists:[],
        loading: false,
        loading1: false,
        schoolList: [],
        base: {},
      }
    },
    created(){
     this.type = this.$route.query.type==2?'高职':'本科'
     this.base = getBaseInfo();
     this.getProvinceList();
     this.init();
    },
    computed:{
        title(){
            let str = ''
            if(this.type=='高职'&&this.version=='2019'){
                str = '（预发布）'
            }
            return this.type + "院校教发指数" + str
        }
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
            this.schoolname = "";
            this.loading = true;

            let version = this.version+this.type+'教发6+1'
            if(this.type=='高职' && this.version=='2019'){
                version+='y'
            }
            let res = await network.getTeachersDevelopment({data:{
                provinceId: 1,
                province: this.provincesValue=='全国'?'':this.provincesValue,
                version: version,
                type: this.type=='本科'? 0 : 1,
                schoolType: this.hot,
                year: this.version,
            }});
            this.loading = false
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
                // todo
                if(this.lists[i].schoolName==this.schoolname){
                    this.lists[i].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
                }
            }
            this.$nextTick(()=>{
                let lis = document.querySelectorAll('.ref')
                if(!this.schoolname) return;
                if(lis.length<=0 && this.type=='高职') 
                    return this.$confirm('请先登录系统，查看具体数据', '提示', {
                        confirmButtonText: '管理员入口',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        window.open('https://rankadmin.moocollege.com/login');
                    }).catch(() => {});
                
                if(lis.length<=0) return this.$message.warning('未找到该学校');
                scrollTo(0, lis[0].offsetTop)
                
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
        choosehot(i){
            this.hot = i;
            this.init();
        },
        typechange(type){
            this.type = type
            this.hot = 0;
            this.schoolname = ''
            this.init();
        }
    },
    watch:{
        type(val){
            this.$nextTick(()=>{
                document.querySelector('.searchicon i').classList.add("el-icon-arrow-up");
            })
        }
    }
  }
</script>

<style lang="less" scoped>
.development{
    background: rgb(248, 248, 248);
    width: 100%;
    >div{
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .search{
        padding-bottom: 36px;
        text-align: left;
        .right{
            width: auto;
            height: 58px;
            display: inline-block;
            vertical-align: top;
            background: #B7B7B7;
            color: #ffffff;
            font-size: 23px;
            line-height: 58px;
            text-align: center;
            li{
                width: 148px;
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                &.on{
                    background: #ED1E26;
                }
            }
        }
        .left{
            float: right;
            margin-top: 21px;
        }
        .el-select{
            margin-right: 15px;
        }
        .el-input{
            width: 250px;
        }
    }
    .main{
        margin-top: 20px;
        .type{
            height: 50px;
            background: #252223;
            line-height: 50px;
            color: #ffffff;
            font-size: 19px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            li{
                padding: 0 12px;
                cursor: pointer;
                text-align: center;
                &.on{
                    background: #ED1E26;
                }
            }
        }
    }

}
</style>