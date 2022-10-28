<template>
    <div class="teacherdevelopment">
        <div class="index">
            <h1 class="title">
                <i class="el-icon-caret-right breadcrumbIcon"></i> 教发指数6+1
                <span class="more" @click="ashow=true">指标体系</span>
            </h1>
            <ul>
                <li >
                    <div>教师团队</div>
                    <p>{{indexs.teacherTeam || 0}}</p>
                </li>
                
                <li >
                    <div v-if="type=='本科'">教改项目</div>
                    <div v-else>产教融合</div>
                    <p >{{indexs.educationalProject|| 0}}</p>
                </li>
                
                <li >
                    <div v-if="type=='本科'">教材项目</div>
                    <div v-else>专业与课程</div>
                    <p >{{indexs.textbookProject|| 0}}</p>
                </li>
                
                <li >
                    <div v-if="type=='本科'">教学论文</div>
                    <div v-else>教材与论文</div>
                    <p >{{indexs.teachingPaper|| 0}}</p>
                </li>
                
                <li >
                    <div>教学成果奖</div>
                    <p >{{indexs.teachingAchievementAward|| 0}}</p>
                </li>
                
                <li >
                    <div>教师培训基地</div>
                    <p >{{indexs.teacherTrainingBase|| 0}}</p>
                </li>
                
                <li >
                    <div>教师竞赛</div>
                    <p >{{indexs.teachersCompetition|| 0}}</p>
                </li>
            </ul>
        </div>


        <a-modal v-model="ashow"  style="top: 0;width:100%;">
            <div class="system" >
                <h1 class="title">
                    指标体系
                    <a-input style="width:2rem" size="small" v-model="search" @change="tablechange" placeholder="请输入内容"></a-input>
                </h1>
                <div >
                    <a-table :columns="columns" :dataSource="tableData" 
                            :rowKey="record => record.threeIndex +(record.fourIndex?record.fourIndex:'') "
                            bordered :pagination="false" >
                    </a-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <a-button type="primary" @click="ashow = false">确 定</a-button>
            </span>
        </a-modal>

    </div>
</template>

<script>
import network from '@/mnskin/api/index'
import {cloneDeep} from 'lodash'
export default {
    props:['type', 'version'],
    data(){
        return{
            indexs:{},
            columns:[],
            tableData: [],
            oldtableData: [],
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
            let version = this.version + this.type + '指标'
            
            if(this.version=='2020'){
                this.columns = [
                    {
                        title: '一级指标',
                        dataIndex: 'firstIndex'
                    },
                    {
                        title: '二级指标',
                        dataIndex: 'secondIndex'
                    },
                    {
                        title: '三级指标',
                        dataIndex: 'threeIndex'
                    },
                    {
                        title: '四级指标',
                        dataIndex: 'fourIndex'
                    }
                ]
            }else{
                this.columns = [
                    {
                        title: '一级指标',
                        dataIndex: 'firstIndex'
                    },
                    {
                        title: '二级指标',
                        dataIndex: 'secondIndex'
                    },
                    {
                        title: '三级指标',
                        dataIndex: 'threeIndex'
                    }
                ]
            }

            let res = await network.getTeachersDevelopment({data:{
                provinceId: 1,
                version: version,
                type: 2
            }});
            if(res=='error') return;
            this.tableData = res
            this.oldtableData = cloneDeep(res)
        },
        async getIndexs(){
            let version = this.version + this.type + '教发6+1'
            let res = await network.getStatisticsTeacherDevelopment({data:{
                provinceId: 1,
                version: version,
                type: this.type=='本科'? 0 : 1 ,  //0是本科  1是高职
            }})
            if(res=='error') return;
            this.indexs = res || {}
        },
        tablechange(a){
            if(!this.search) return this.tableData = cloneDeep(this.oldtableData);
            this.tableData = [];
            for(let i in this.oldtableData){
                if(
                    (this.oldtableData[i].firstIndex&&this.oldtableData[i].firstIndex.indexOf(this.search) != -1) ||
                    (this.oldtableData[i].secondIndex&&this.oldtableData[i].secondIndex.indexOf(this.search) != -1)||
                    (this.oldtableData[i].threeIndex&&this.oldtableData[i].threeIndex.indexOf(this.search) != -1) ||
                    (this.oldtableData[i].fourIndex&&this.oldtableData[i].fourIndex.indexOf(this.search) != -1)
                ){
                    this.tableData.push(this.oldtableData[i])
                }
            }
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
        },
    }
}
</script>

<style lang="less" scoped>
.teacherdevelopment{
    background: #ffffff;
    padding-bottom: 0.38rem;
    h1{
        text-align: left;
        height: .88rem;
        line-height: .88rem;
        font-size: .32rem;
        color: #252223;
        padding: 0 .68rem 0 0.28rem;
        span{
            display: block;
            width: 1.32rem;
            height: .36rem;
            background: #252223;
            float: right;
            color: #FFFFFF;
            font-size: 0.24rem;
            text-align: center;
            line-height: 0.36rem;
            margin-top: .26rem;
        }
    }
    .index{
        ul{
            width: 100%;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: left;
                line-height: 0.4rem;
                margin-bottom: 0.24rem;
                font-weight: bold;
                div{
                    font-size: .28rem;
                    color: #252223;
                    margin-left: .68rem;
                }
                p{
                    font-size: .28rem;
                    color: #D0021B;
                    text-align: right;
                    margin-right: .68rem !important;
                }
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
    .system{
        background: #ffffff;
        >div{
            padding: .30rem 0;
        }
    }
}
</style>