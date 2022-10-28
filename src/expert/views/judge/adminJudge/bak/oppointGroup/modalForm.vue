<template>
    <div class="">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="46" style="text-align:left;">
            <Row style="margin-bottom:15px;">
                <Col :span="5">
                    <Input v-model="formValidate.q" search placeholder="请输入姓名或手机号关键字" @on-change="handleSearch"></Input>
                </Col>
                <Col :span="5" style="margin-left:15px;">
                    <Select v-model="formValidate.school" clearable filterable placeholder="请选择学校" @on-change="schoolChange">
                        <Option v-for="(item,index) in schoolData" :value="item.label" :key="item.key">{{item.label}}</Option>
                    </Select>
                </Col>
                <Col :span="5" style="margin-left:15px;">
                    <Select v-model="formValidate.major" clearable filterable placeholder="请选择专业" @on-change="majorChange">
                        <Option v-for="(item,index) in majorData" :value="item.majorName" :key="index">{{item.majorName}}</Option>
                    </Select>
                </Col>
                <Col :span="5" style="margin-left:15px;">
                    <Select v-model="formValidate.jobTitle" clearable filterable placeholder="请选择职称" @on-change="jobTitleChange">
                        <Option value="教授">教授</Option>
                        <Option value="研究员">研究员</Option>
                        <Option value="副教授">副教授</Option>
                        <Option value="副研究员">副研究员</Option>
                        <Option value="讲师">讲师</Option>
                        <Option value="助教">助教</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col :span="24" style="text-align:center;max-height:600px;overflow-y:scroll;">
                    <Table :columns="columnsdata" :data="objArr"
                        @on-selection-change="selectChange"
                    ></Table>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import {cloneDeep} from 'lodash'
    import expandRow from "../common/expandRow"
    export default {
        props:["importData","importShow"],
        components:{
            expandRow,
        },
        data () {
            return {
                schoolData:[],
                majorData:[],
                formValidate:{
                    q:'',
                    school:'',
                    captainSelection:false,
                },
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组名不能为空', trigger: 'blur' }
                    ]
                },
                teamIds:[],//白名单
                idList:"",//选择组成员
                // selectionAll:false,
                columnsdata: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '组名',
                        align: 'left',
                        key: 'groupName'
                    },
                    {
                        title: '白名单',
                        key: 'star',
                        align: 'center',
                        width:76,
                        render:(h,params)=>{
                            var colorStr="#515A6E"
                            if (params.row.star==1) {
                                colorStr="#F5A623"
                            }
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        // type: 'primary',
                                        value:false,
                                        // size: 'small',
                                    },
                                    style: {
                                        // marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': (e) => {
                                            if (e) {
                                                if(this.teamIds.indexOf(params.row.groupId)==-1){
                                                    this.teamIds.push(params.row.groupId)
                                                    this.$emit('exportData',{data:this.idList,whiteSpecialistId:this.teamIds})
                                                }
                                            }else{
                                                for (let i = 0; i < this.teamIds.length; i++) {
                                                    if (this.teamIds[i]==params.row.groupId) {
                                                        this.teamIds.splice(i,1)
                                                        this.$emit('exportData',{data:this.idList,whiteSpecialistId:this.teamIds})
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        type: 'expand',
                        width: 60,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row,
                                    importData:params.row.userList
                                }
                            })
                        }
                    },

                ],//columnsdata结束
                objArr:[],
                oldChoose: [],
            }
        },
        created() {
            if (this.$store.state.common.schoolData.length==0) {
                this.$store.dispatch("schoolDataCommon").then((reset)=>{
                    this.schoolData=reset;
                })
            }else{
                this.schoolData=this.$store.state.common.schoolData
            }
            if (this.$store.state.common.majorData.length==0) {
                this.$store.dispatch("majorDataCommon").then((reset)=>{
                    this.majorData=reset;
                })
            }else{
                this.majorData=this.$store.state.common.majorData
            }
        },
        mounted(){
            this.list();
        },
        methods: {
            list(){
                let _this = this
                let data={
                    groupId:this.$webapi.getlocal("groupId"),
                    rowId:this.$webapi.getlocal("rowId"),
                    pageSize:0,
                }
                if (this.formValidate.q) {
                    data.q=this.formValidate.q
                }
                if(this.formValidate.school){
                    data.school=this.formValidate.school
                }
                if(this.formValidate.major){
                    data.major=this.formValidate.major
                }
                if(this.formValidate.jobTitle){
                    data.jobTitle=this.formValidate.jobTitle
                }
                this.$api.get('/web/specialist/queryGroup',data).then(reset => {
                    if (reset.code == 0) {
                        if (reset.data) {
                            _this.objArr = _this.oldChoose.concat( reset.data.list.filter(item=>(this.idList.indexOf(item.groupId)<0)))
                        }else{
                            _this.objArr =[]
                        }
                    }else {
                        _this.pageShow=false;
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择数据变化
            selectChange(e){
                this.oldChoose = cloneDeep(e);
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.groupId);
                })
                this.$emit('exportData',{data:this.idList,whiteSpecialistId:this.teamIds})
            },

            schoolChange(){
                this.list();
            },
            jobTitleChange(){
                this.list();
            },
            majorChange(){
                this.list();
            },
            // 搜索
            handleSearch(){
                this.oldChoose = this.oldChoose.map(item=>{
                    return {
                        ...item,
                        '_checked': true
                    }
                })
                this.list();
            },

        }
    }
</script>
