<template>
    <div>
        <Button type="primary"  @click="autoGroup">自动编组</Button>

        <Modal v-model="show" :mask-closable="false" width="800">
            <p slot="header">
                <span>自动编组</span>
            </p>
            <div style="text-align:center" >
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="200" style="text-align:left;">
                    <Row style="margin-bottom:10px;">
                        <Col :span="22" :offset="1">
                            <FormItem label="生成专家组数量" prop="groupName" class="bg-form">
                                <Input v-model="formValidate.groupName" type="number" placeholder="请输入生成专家组数量" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="margin-bottom:10px;">
                        <Col :span="22" :offset="1">
                            <FormItem label="专家组人数（包含组长）" prop="TeamNumber" class="bg-form">
                                <Input v-model="formValidate.TeamNumber" type="number" placeholder="请输入专家组人数" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="22" :offset="1">
                            <FormItem label="其他设置" class="bg-form">
                                <CheckboxGroup v-model="formValidate.avoidTypes">
                                    <Checkbox label="0">队长参与评审任务</Checkbox>
                                    <Checkbox label="1">同校规避</Checkbox>
                                    <Checkbox label="2">同省规避</Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="margin-bottom:15px;">
                        <Col :span="22" :offset="1">
                           <FormItem label="选择专家组组长" class="bg-form">
                               <span @click="addLeader" class="addLeader">
                                  <Icon type="md-add-circle" />选择组长
                               </span>
                           </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="24" style="text-align:center;max-height:600px;overflow-y:scroll;">
                            <Table :columns="columnsdata" :data="objArr"></Table>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="default" @click="cancel" :loading='submitLoad'>取消</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px" :loading='submitLoad'>确定</Button>
            </div>
        </Modal>

        <Modal v-model="addShow" :mask-closable="false" width="800">
            <p slot="header">
                <span>选择组长</span>
            </p>
            <div style="text-align:center" >
                <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="100" style="text-align:left;">
                    <Row style="margin-bottom:10px;">
                       <Col :span="5">
                            <Input v-model="formValidate.q" search placeholder="请输入姓名或手机号关键字" @on-search="list"></Input>
                        </Col>
                        <Col :span="5" style="margin-left:15px;">
                            <Select v-model="formValidate.school" clearable filterable placeholder="请选择学校" @on-change="list">
                                <Option v-for="(item,index) in schoolData" :value="item.label" :key="item.key">{{item.label}}</Option>
                            </Select>
                        </Col>
                        <Col :span="5" style="margin-left:15px;">
                            <Select v-model="formValidate.major" clearable filterable placeholder="请选择专业" @on-change="list">
                                <Option v-for="(item,index) in majorData" :value="item.majorName" :key="index">{{item.majorName}}</Option>
                            </Select>
                        </Col>
                        <Col :span="5" style="margin-left:15px;">
                            <Select v-model="formValidate.jobTitle" clearable filterable placeholder="请选择职称" @on-change="list">
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
                            <Table :columns="columnsLeader" 
                                :data="objLeader" 
                                @on-selection-change="selectChange"
                                :loading='loading'>
                            </Table>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <span style="float: left;">需选择{{formValidate.groupName || 0}}名组长，已选择{{idList.length}}名</span>
                <Button type="default" @click="addShow=false">取消</Button>
                <Button type="primary" @click="addShowSubmit" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>

        <Modal v-model="showError" :mask-closable="false" width="800">
            <p slot="header">
                <span>错误提示</span>
            </p>
            <div style="text-align:center;color:red;" >
                <p v-for="(item,index) in errorList" :key="index" style="line-height:1.5;">{{item}}</p>
            </div>
            <div slot="footer">
                <Button type="default" @click="showError=false">取消</Button>
                <Button type="primary" @click="showError=false" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
import {cloneDeep} from 'lodash'
export default {
    data(){
        return{
            show: false,
            addShow: false,
            showError: false,
            errorList: [],
            formValidate:{
                q:'',
                school:'',
                captainSelection:false,
            },
            ruleValidate: {},
            columnsdata: [
                {
                    title: '姓名',
                    align: 'center',
                    width: 80,
                    key: 'idcardName',
                },
                {
                    title: '性别',
                    align: 'center',
                    width: 40,
                    key: 'sex',
                },
                {
                    title: '手机号',
                    align: 'center',
                    width: 120,
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
                    width: 80,
                    key: 'jobTitle',
                },
                {
                    title: '身份证号',
                    align: 'center',
                    width: 150,
                    key: 'idcardNumber',
                },
            ],
            objArr: [],
            objArrCopy: [],
            columnsLeader: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '姓名',
                    align: 'center',
                    width: 80,
                    key: 'idcardName',
                },
                {
                    title: '性别',
                    align: 'center',
                    width: 40,
                    key: 'sex',
                },
                {
                    title: '手机号',
                    align: 'center',
                    width: 120,
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
                    width: 80,
                    key: 'jobTitle',
                },
                {
                    title: '身份证号',
                    align: 'center',
                    width: 150,
                    key: 'idcardNumber',
                },
            ],
            objLeader: [],
            loading: false,
            submitLoad: false,
            schoolData:[],
            majorData:[],
            idList: [],
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
    methods:{
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
                    _this.objLeader = reset.data;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        selectChange(e){
            this.idList=[];
            this.objArrCopy = e;
            e.forEach((val)=>{
                this.idList.push(val.id);
            })
        },
        addShowSubmit(){
            this.objArr = cloneDeep(this.objArrCopy)
            this.objArrCopy = []
            this.addShow = false
        },
        addLeader(){
            this.list();
            this.addShow = true
        },
        handleSubmit(name){
            if(this.idList.length<1){
                return this.$Message.warning('请选择组长')
            }
            if(this.formValidate.groupName!=this.idList.length){
                return this.$Message.warning('选择的组长人数必须等于专家组数量，请重新选择')
            }
            var data={
                selfGroupId:this.$webapi.getlocal("groupId"),
            }
            if (this.formValidate.avoidTypes) {
                data.avoidTypes=this.formValidate.avoidTypes
            }
            if (this.formValidate.TeamNumber) {
                data.num=this.formValidate.TeamNumber
            }
            if (this.idList) {
                data.teamIds=this.idList
            }
            this.submitLoad = true
            this.$api.post('/usercenter/specialist/automaticGroup',data).then(reset => {
                this.submitLoad = false
                if (reset.code == 0) {
                    if(!reset.data){
                        this.$Message.warning('提交成功')
                        this.show=false;
                        this.$emit('close')
                    }else{
                        this.errorList = reset.data
                        this.showError = true
                    }
                }
            })
        },
        cancel(){
            this.show = false
        },
        autoGroup(){
            this.show = true;
        },
    }
}
</script>

<style lang='less' scoped>
.addLeader{
    color:rgba(29,134,255,1);
    line-height:29px;
    letter-spacing:1px;
    cursor: pointer;
    i{
        line-height: 29px;
    }
}
</style>