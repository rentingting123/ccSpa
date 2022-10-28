<template>
    <div class="teacherdevelopment">
        <h title='教发指数6+1'>
            <p class="ashow" @click="ashow=true">指标体系</p>
        </h>
        <div class="index">
            <ul>
                <li >
                    <div>01 教师团队</div>
                    <p><numScroll v-if="indexs.teacherTeam" :num="indexs.teacherTeam" /></p>
                </li>
                <li >
                    <div v-if="type=='本科'">02 教改项目</div>
                    <div v-else>02 产教融合</div>
                    <p ><numScroll v-if="indexs.educationalProject" :num="indexs.educationalProject" /></p>
                </li>
                <li >
                    <div v-if="type=='本科'">03 教材项目</div>
                    <div v-else>03 专业与课程</div>
                    <p ><numScroll v-if="indexs.textbookProject" :num="indexs.textbookProject" /></p>
                </li>
                <li >
                    <div v-if="type=='本科'">04 教学论文</div>
                    <div v-else>04 教材与论文</div>
                    <p ><numScroll v-if="indexs.teachingPaper" :num="indexs.teachingPaper" /></p>
                </li>
                <li >
                    <div>05 教学成果奖</div>
                    <p ><numScroll v-if="indexs.teachingAchievementAward" :num="indexs.teachingAchievementAward" /></p>
                </li>
                <li >
                    <div>06 教师培训基地</div>
                    <p ><numScroll v-if="indexs.teacherTrainingBase" :num="indexs.teacherTrainingBase" /></p>
                </li>
                <li >
                    <div>+1 教师竞赛</div>
                    <p ><numScroll v-if="indexs.teachersCompetition" :num="indexs.teachersCompetition" /></p>
                </li>
            </ul>
        </div>

        <el-dialog top="0" :visible.sync="ashow" width="60%">
            <div class="system" >
                <h1 class="title">
                    指标体系
                    <el-input style="width:200px" size="small" v-model="search" placeholder="请输入内容"></el-input>
                </h1>
                <div >
                    <el-table :data="tableData.filter(data => !search || 
                        (data.firstIndex&&data.firstIndex.includes(search)) || 
                        (data.secondIndex&&data.secondIndex.includes(search)) || 
                        (data.threeIndex&&data.threeIndex.includes(search)) || 
                        (data.fourIndex && data.fourIndex.includes(search)))" 
                        border stripe style="width: 100%" :header-cell-style="{'background':'#56A7F2','color':'#ffffff'}">
                        <el-table-column prop="firstIndex" label="一级指标" min-width="180"> </el-table-column>
                        <el-table-column prop="secondIndex" label="二级指标" min-width="180"> </el-table-column>
                        <el-table-column prop="threeIndex" label="三级指标" min-width="180"></el-table-column>
                        <el-table-column v-if="version!='2019'" prop="fourIndex" label="四级指标" min-width="180"></el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ashow = false">取 消</el-button>
                <el-button type="primary" @click="ashow = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import network from '@/api/index'
import numScroll from './numscroll'
import h from '@/nskin/components/h'
export default {
    props:['type', 'version'],
    components:{
        numScroll,
        h,
    },
    data(){
        return{
            indexs:{},
            tableData: [],
            ashow: false,
            search: '',
        }
    },
    created(){
        this.getone();
        this.getIndexs();
    },
    methods:{
        async getone(){ // 指标体系
            let version = this.version+this.type+'指标'

            let res = await network.getTeachersDevelopment({data:{
                provinceId: 1,
                version: version,
                type: 2
            }});
            if(res=='error') return;
            this.tableData = res
        },
        async getIndexs(){
            
            let version = this.version+this.type+'教发6+1'

            let res = await network.getStatisticsTeacherDevelopment({data:{
                provinceId: 1,
                version: version,
                type: this.type=='本科'? 0 : 1 ,  //0是本科  1是高职
            }})
            if(res=='error') return;
            this.indexs = res || {}
        }
    },
    watch:{
        type(val){
            this.getIndexs();
            this.getone();
        },
        version(val){
            this.getIndexs();
            this.getone();
        }
    }
}
</script>

<style lang="less" scoped>
.teacherdevelopment{
    .ashow{
        height: 21px;
        font-size: 16px;
        line-height: 21px;
        color: #000000;
        float: right;
        cursor: pointer;
        &:hover{
            color: #ED1E26;
        }
    }
    .index{
        margin-bottom: 20px;
        margin-top: 21px;
        width: 100%;
        position: relative;
        padding-bottom: 36px;
        
        &::before{
            content: '';
            width: 100%;
            height: 50px;
            background: #ED1E26;
            position: absolute;
            top: 0;
            left: 0;
        }
        >ul{
            font-size: 0;
            position: relative;
            z-index: 2;
            top: 16px;
            >li{
                display: inline-block;
                vertical-align: top;
                width: 142px;
                height: 85px;
                background: #FFFFFF;
                box-shadow: 0px 0px 15px rgba(237, 30, 38, 0.4);
                border-radius: 8px;
                margin-right: 16px;
                padding-top: 14px;
                >div{
                    height: 21px;
                    font-size: 16px;
                    line-height: 21px;
                    color: #4A4A4A;
                    text-align: center;
                }
                >p{
                    /deep/.d-roll-list .d-roll-item{
                        color: #D0021B !important;
                        font-size: 23px;
                        line-height: 31px;
                    }
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .system{
        background: #ffffff;
        >div{
            padding: 30px 35px;
        }
    }
}
</style>