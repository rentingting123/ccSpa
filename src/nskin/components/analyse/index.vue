<template>
    <div class="analyse">
        <div class="imgs">
            <div class="top" :class="{'on': type=='student'}" @click="changeType('student')">
                <i class="iconfont">&#xe6fe;</i>
                竞赛查询
            </div>
            <div class="bottom" :class="{'on': type=='teacher'}" @click="changeType('teacher')">
                <i class="iconfont">&#xe6fd;</i>
                教发查询
            </div>
            <!-- <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/student.png"  >
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/teacher.png" > -->
        </div>
        <!-- 通过css控制 -->
        <div class="main" id="analyseMain">
            <div class="top">
                <el-select filterable v-model="schoolcolCodeID"
                    reserve-keyword
                    remote
                    :remote-method="remoteMethod"
                    :loading="loading"
                    placeholder="请输入学校"
                    @change="schoolChange"
                >
                    <el-option
                        v-for="item in schoolList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <p class="packup" @click="type=''">
                    收起
                    <i class="el-icon-caret-bottom"></i>
                </p>
            </div>
            <div class="mainbody">
                <div v-if="type=='teacher'" class="teachershow">
                    <div v-if="teachers.length>0" >
                        <h5 class="h5 h5-five" >
                            <span><i class="iconfont">&#xe618;</i></span>
                            <span>教师教学发展指数</span>
                        </h5>
                        <el-table :data="teachers" border style="width: 100%">
                            <el-table-column label="年份" prop="version">
                                <template slot-scope="scope">
                                    {{scope.row.version.replace('top300','')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="排名" prop="rankingIndex" width="120">
                                <template slot-scope="scope">
                                    <div>
                                        <span>{{scope.row.rankingIndex}}</span>
                                        <span class="span-bg span-bg-add" v-if="dataCheck(scope.$index, teachers)>0"><i class="el-icon-caret-top"></i>{{dataCheck(scope.$index, teachers)}}</span>
                                        <span class="span-bg span-bg-redu" v-if="dataCheck(scope.$index, teachers)<0"><i class="el-icon-caret-bottom"></i>{{dataCheck(scope.$index, teachers)}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="得分" prop="rankingScore" width="80"></el-table-column>
                        </el-table>
                    </div>
                    <!-- <div v-if="teachers">
                        <p class="p-img">
                            <img src="https://web.moocollege.com/mooc/hzq/competition/jiangbei.png" >
                        </p>
                        <h5 class="h5 h5-img"> <span>2020年教师教学发展指数</span></h5>
                        <div class="div-p-wrap"> 
                            <p class="t-indent inlineA inlineAll">
                                <span class="span-h5 span-all">名次</span>
                                <span class="span-color span-all">{{teachers.rankingIndex || 0}}</span>
                            </p>
                            <p class="p-border"></p>
                            <p class="t-indent inlineB inlineAll">
                                <span class="span-h5 span-all">分数</span>
                                <span class="span-color span-all">{{teachers.rankingScore || 0}}</span>
                            </p>
                        </div>
                    </div> -->
                </div>

                

                <div v-if="type=='student'" class="studentshow">
                    <div v-if="oneLists.length>0">
                        <h5 class="h5 h5-one">
                            <span><i class="iconfont">&#xe618;</i></span>
                            <span>学生竞赛(单年)</span>
                        </h5>
                        <el-table :data="oneLists" border style="width: 100%">
                            <el-table-column label="年份" prop="version"></el-table-column>
                            <el-table-column label="排名" prop="rankingIndex" width="120">
                                <template slot-scope="scope">
                                    <div>
                                        <span>{{scope.row.rankingIndex}}</span>
                                        <span class="span-bg span-bg-add" v-if="dataCheck(scope.$index, oneLists)>0"><i class="el-icon-caret-top"></i>{{dataCheck(scope.$index, oneLists)}}</span>
                                        <span class="span-bg span-bg-redu" v-if="dataCheck(scope.$index, oneLists)<0"><i class="el-icon-caret-bottom"></i>{{dataCheck(scope.$index, oneLists)}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="得分" prop="rankingScore" width="80"></el-table-column>
                        </el-table>
                    </div>

                    <div v-if="fiveLists.length>0">
                        <h5 class="h5 h5-five" >
                            <span><i class="iconfont">&#xe618;</i></span>
                            <span>学生竞赛(五年)</span>
                        </h5>
                        <el-table :data="fiveLists" border style="width: 100%">
                            <el-table-column label="年份" prop="version">
                                <template slot-scope="scope">
                                    {{scope.row.version.replace('top300','')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="排名" prop="rankingIndex" width="120">
                                <template slot-scope="scope">
                                    <div>
                                        <span>{{scope.row.rankingIndex}}</span>
                                        <span class="span-bg span-bg-add" v-if="dataCheck(scope.$index, fiveLists)>0"><i class="el-icon-caret-top"></i>{{dataCheck(scope.$index, fiveLists)}}</span>
                                        <span class="span-bg span-bg-redu" v-if="dataCheck(scope.$index, fiveLists)<0"><i class="el-icon-caret-bottom"></i>{{dataCheck(scope.$index, fiveLists)}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="得分" prop="rankingScore" width="80"></el-table-column>
                        </el-table>
                    </div>

                </div>
            </div>
            <div class="nomess" v-if="type && teachers.length<1 && oneLists.length<1 && fiveLists.length<1">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nomess.png" width="100px">
                <p>搜索学校查看分析报告</p>
            </div>
        </div>
    </div>
</template>

<script>
import network from "@/api/index";
export default {
    data(){
        return{
            type: '',
            search: '',
            loading: false,
            schoolList: [],
            schoolcolCodeID: '',
            technicalWuData: [
            ],
            version: '',
            oneyears:['2021','2020','2019','2018','2017','2016','2015','2014','2013','2012'],
            fiveyears:['2017-2021','2016-2020','2015-2019','2014-2018','2013-2017','2012-2016'],
            oneLists:[],
            fiveLists:[],
            teachers: []
        }
    },
    methods:{
        remoteMethod(q) {
          if (q !== "") {
            this.loading = true;
            this.querySchool({ q });
          } else {
            this.schoolList = [];
          }
        },
        async querySchool(param) {
          this.loading = false;
          param.limit = 10;

          const data = await network.schools({ data: param });
          if (data == "error") return;
          if (!data) {
            return this.schoolList = [];
          }
          this.schoolList = data.map(r => {
            return {
              value: r.schoolcolCodeID,
              label: r.schoolcolName,
              version: r.schoolcolDegree
            };
          });
        },
        dataCheck(i, data){
            // 2012-2020单独处理
            if(i == data.length - 2){
                if(data[i+1].version.indexOf('2012-2020') != -1){
                    return 0
                }
            }

            if(i < data.length-1){
                let a = data[i].rankingIndex - data[i+1].rankingIndex
                return -a
            }else{
                return 0
            }
        },
        changeType(val){
            this.type = val;
            if(val=='student'){
                this.getStudents();
            }else{
                this.getTeachers();
            }
        },
        schoolChange(value){
            let obj = this.schoolList.filter(res=>res.value==value)
            this.version = obj.length>0 && obj[0].version || ''
            if(this.type=='teacher'){
                this.getTeachers()
            }else{
                this.getStudents(value, this.version)
            }
        },
        async getTeachers(){
            if(!this.version) return;
            let version1 = '2019'+this.version+'教发6+1'
            let version = '2020'+this.version+'教发6+1'
            let version2 = '2021'+this.version+'教发6+1'
            let res = await network.getRankingList({data:{
                schoolcolCodeID: this.schoolcolCodeID,
                versions: [version1, version,version2]
            }})
            if(res=='error') return;

            this.teachers= res || ''
        },
        async getStudents(){
            if(!this.version){
                this.oneLists = [];
                this.fiveLists = [];
                return
            }
            let ones = [],fives=[]
            for(let i in this.oneyears){
                ones.push('学生竞赛'+this.version+this.oneyears[i])
            }
            for(let i in this.fiveyears){
                fives.push('学生竞赛'+this.version+this.fiveyears[i])
            }
            // 学生竞赛单年
            let res = await network.getRankingList({data:{
                schoolcolCodeID: this.schoolcolCodeID,
                versions: ones
            }});
            if(res=='error') return;
            this.oneLists = res || [];

            // 学生竞赛五年
            let fivedata = []
            let res1 = await network.getRankingList({data:{
                schoolcolCodeID: this.schoolcolCodeID,
                versions: fives
            }});
            if(res1=='error') return;
            if(res1 && res1.length>0){
                fivedata = res1
            }
            // // 学生竞赛 2012-2020 2.21号数据重复注释了下main代码
            // let str = '学生竞赛'+this.version+ '2012-2020top300'
            // let res2 = await network.getRankingList({data:{
            //     schoolcolCodeID: this.schoolcolCodeID,
            //     versions: [str]
            // }});
            // if(res2=='error') return;
            // if(res2 && res2.length>0){
            //     fivedata = [...fivedata, ...res2]
            // }

            // // 学生竞赛 2016-2020
            // str = '学生竞赛'+this.version+ '2016-2020top300'
            // let res3 = await network.getRankingList({data:{
            //     schoolcolCodeID: this.schoolcolCodeID,
            //     versions: [str]
            // }});
            // if(res3=='error') return;
            // if(res3 && res3.length>0){
            //     fivedata = [...res3, ...fivedata]
            // }

            this.fiveLists = fivedata

        }
    },
    watch:{
        type(val){
            let dom = document.getElementById('analyseMain')
            if(val){
                dom.style.width = '486px'
                dom.style.padding = '19px 26px'
            }else{
                dom.style.width = '0'
                dom.style.padding = '0'
            }
        }
    }
}
</script>

<style lang='less' scoped>
.analyse{
    position: fixed;
    right: 0;
    top: 100px;
    width: auto;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 3;
    .imgs{
        background: #ffffff;
        border-radius: 20px 0 0 20px;
        >div{
            width: 100px;
            height: 100px;
            background: rgba(167, 178, 198, 1);
            margin-bottom: 2px;
            cursor: pointer;

            font-size: 13px;
            line-height: 17px;
            color: #FFFFFF;
            text-align: center;
            i{
                font-size: 40px;
                line-height: 40px;
                display: block;
                padding: 22px 0 6px;
            }
            &:last-child{
                margin-bottom: 0;
            }
            &.top{
                border-radius: 20px 0 0 0 ;
            }
            &.bottom{
                border-radius: 0 0 0 20px;
            }
            &.on,&:hover{
                background: #ED1E26;
            }
        }
        // img{
        //     width: 100px;
        //     display: block;
        //     cursor: pointer;
        // }
        // img.on{
        //     opacity: 0.25;
        // }
    }
    .main{
        width: 0;
        height: auto;
        min-height: 300px;
        padding: 0;
        background: #ffffff;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.08);
        border-radius: 0px 10px 10px 10px;
        position: relative;
        transition: all 0.3s linear;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            .input-with-select{
                width: 300px;
            }
            .packup{
                font-size: 16px;
                font-weight: 400;
                color: #969696;
                line-height: 40px;
                cursor: pointer;
            }

        }
        .mainbody{
            max-height: calc(100vh - 220px);
            overflow: auto;
        }
        .nomess{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            p{
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                color: #9B9B9B;
                line-height: 20px;
                margin-top: 10px;
            }
        }
        .teachershow{
            .p-img{
                float: left;
                margin-left:30px;
                margin-top: -8px;
            }
            .h5{
                padding:3px 10px;
                margin: 10px 3px;
                border-radius: 3px;
                color: #fff;
                background: linear-gradient(to right,#CC0A0A,#FFEB00);
                text-align: left;
                span{
                    font-size: 16px;
                    letter-spacing: 3px;
                    margin-right: 5px;
                    color: #fff;
                }
                &.h5-img{
                    margin: 14px 0px 10px 55px;
                }
            }
            .div-p-wrap{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .inlineAll {
                    width: 150px;
                    height: 75px;
                    vertical-align: middle;
                    display: inline-block;
                }
                .inlineA {
                    margin: 20px 48px 20px 80px;
                }
                .inlineB {
                    margin: 20px 80px 20px 50px;
                }
                .span-h5 {
                    color: #4A4A4A;
                }
                .span-all {
                    font-size: 16px;
                    color: #4A4A4A;
                    width: 100%;
                    display: inline-block;
                    text-align: center;
                    font-weight: 600;
                }
                .span-color {
                    color: #2188FB;
                    line-height: 50px;
                    font-size: 30px;
                }
                .p-border {
                    display: inline-block;
                    width: 0px;
                    height: 75px;
                    vertical-align: middle;
                    border-right: 1px solid #DEDEDE;
                }
            }
        }
        .studentshow{
            .h5{
                padding:3px 10px;
                margin: 10px 3px;
                border-radius: 3px;
                color: #fff;
                text-align: left;
                span{
                    font-size: 16px;
                    letter-spacing: 3px;
                    margin-right: 5px;
                    color: #fff;
                    i{
                        margin-right: 5px;
                        color: #F8E71C;
                    }
                }
                &.h5-five{
                    background: linear-gradient(to right,#2BD2B3,rgba(0,120,226,0.00));
                }
                &.h5-one{
                    background: linear-gradient(to right,#A18CD1,rgba(251,194,235,0.00));
                }
            }
            
        }
        .span-bg {
            background-color: #E7E7E7;
            padding: 2px 5px;
            border-radius: 5px;
            margin-left: 5px;
        }
        .span-bg-add {
            color: #C80021;
        }
        .span-bg-redu {
            color: #3AB23F;
        }
        
    }

}
</style>