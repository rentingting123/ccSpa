<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>新增专家组</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="46" style="text-align:left;">
                <Row style="background-color:#F8F8F8;margin-bottom:10px;">
                    <Col :span="12" :offset="3">
                        <FormItem label="组名" prop="groupName" class="bg-form">
                           <Input v-model="formValidate.groupName" placeholder="请输入组名"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="6">
                        <FormItem class="bg-form">
                            <Checkbox v-model="formValidate.captainSelection">队长参与评审任务</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Row style="margin-bottom:15px;">
                    <Col :span="5">
                        <Input v-model="formValidate.q" search placeholder="请输入姓名或手机号关键字" @on-search="handleSearch"></Input>
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
                            @on-select-all="selectionAllChange"
                            :loading='loading'
                        ></Table>
                    </Col>
                </Row>

                <!-- :target-keys="targetKeys" -->
            </Form>
         </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">确定</Button>
            </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:["importData","importShow"],
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
                teamIds:[],//队长
                idList:"",//选择组成员
                selectionAll:false,
                columnsdata: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: '队长',
                        key: 'star',
                        align: 'center',
                        width:62,
                        fixed: 'left',
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
                                                if(this.teamIds.indexOf(params.row.id)==-1){
                                                    this.teamIds.push(params.row.id)
                                                }
                                            }else{
                                                for (let i = 0; i < this.teamIds.length; i++) {
                                                    if (this.teamIds[i]==params.row.id) {
                                                        this.teamIds.splice(i,1)
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
                        title: '专家姓名',
                        align: 'center',
                        width: 100,
                        key: 'idcardName',
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
                        width: 100,
                        key: 'school',
                    },
                    {
                        title: '院系',
                        align: 'center',
                        width: 100,
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

            }
        },
        created() {
            this.show=this.importShow
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
            list () {
                let _this = this
                let data={
                    groupId:this.$webapi.getlocal("groupId"),
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
                        _this.objArr = reset.data;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择数据变化
            selectChange(e){
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.id);
                })
            },
            // 是否全选
            selectionAllChange(e){
                this.selectionAll=!this.selectionAll;
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
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
                this.list();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
                        // console.log(this.formValidate.captainSelection);
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    selfGroupId:this.$webapi.getlocal("groupId"),
                }
                if (this.formValidate.captainSelection) {
                    data.captainSelection=1
                }else{
                    data.captainSelection=0
                }
                if (this.formValidate.groupName) {
                    data.groupName=this.formValidate.groupName
                }
                if (this.idList) {
                    data.userIds=this.idList
                }
                if (this.teamIds) {
                    data.teamIds=this.teamIds
                }
                this.$api.post('/web/specialist/insertGroup',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("添加成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })

            },
            handleChange(targetKeys, direction, moveKeys){
                this.rightData=targetKeys;
            }
        }
    }
</script>
