<template>
    <div class="">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="46" style="text-align:left;" v-loading='loading'>
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
                <Col :span="24" style="text-align:center;max-height:420px;overflow-y:scroll;">
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
    export default {
        props:["importData", "importShow", 'rowId'],
        components:{
            // expandRow,
        },
        data () {
            return {
                loading: false,
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
                        width: 50,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: '专家姓名',
                        align: 'center',
                        width: 100,
                        key: 'idcardName',
                        fixed: 'left',
                    },
                    {
                        title: '该赛段已分配',
                        align: 'center',
                        width: 80,
                        key: 'reviewNum',
                        fixed: 'left',
                    },
                    {
                        title: '省份',
                        align: 'center',
                        width: 100,
                        key: 'province',
                        fixed: 'left',
                    },
                    {
                        title: '性别',
                        align: 'center',
                        width: 60,
                        key: 'sex',
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        width: 150,
                        key: 'contactPhone',
                    },
                    {
                        title: '学校',
                        align: 'center',
                        width: 120,
                        key: 'school',
                    },
                    {
                        title: '院系',
                        align: 'center',
                        width: 180,
                        key: 'academy',
                    },
                    {
                        title: '专业',
                        align: 'center',
                        width: 100,
                        key: 'major',
                    },
                    {
                        title: '职称',
                        align: 'center',
                        width: 100,
                        key: 'jobTitle',
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        width: 180,
                        key: 'idcardNumber',
                    },
                ],//columnsdata
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
            if (this.$store.state.judge.expertArr.length==0) {
                this.list();
            }else{
                this.objArr = this.$store.state.judge.expertArr;
            }
        },
        methods: {
            list () {
                let _this = this
                let data={
                    groupId:this.$webapi.getlocal("groupId"),
                    rowId:this.rowId,
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
                if(this.formValidate.q){
                    data.q=this.formValidate.q
                }
                this.loading = true
                this.$api.post('/web/specialist/queryUser',data).then(reset => {
                    this.loading = false
                    if (reset.code == 0) {
                        let arr = _this.oldChoose.concat( reset.data.filter(item=>(this.idList.indexOf(item.id)<0)))
                        _this.objArr = arr;
                        _this.$store.commit("selExpertArr", arr)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择数据变化
            selectChange(e){
                this.oldChoose = cloneDeep(e);
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.id);
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
