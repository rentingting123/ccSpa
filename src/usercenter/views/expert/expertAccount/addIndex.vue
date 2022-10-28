<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="600">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>新增账号</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top" style="text-align:left;">
                <Row>
                    <Col :span="10" :offset='1'>
                        <FormItem label="专家姓名" prop="idcardName">
                           <Input v-model="formValidate.idcardName" placeholder="专家姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='2'>
                        <FormItem label="手机号" prop="loginPhonenumber">
                           <Input v-model="formValidate.loginPhonenumber" placeholder="手机号"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='1'>
                        <FormItem label="学校" prop="school">
                            <school v-model="formValidate.school"/>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='2'>
                        <FormItem label="身份证号" prop="idcardNumber">
                            <Input v-model="formValidate.idcardNumber" placeholder="身份证号"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="10" :offset='1'>
                        <FormItem label="开户行" prop="bankAddress">
                           <Input v-model="formValidate.bankAddress" placeholder="开户行"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='2'>
                        <FormItem label="银行卡号" prop="bankNumber">
                           <Input v-model="formValidate.bankNumber" placeholder="银行卡号"></Input>
                        </FormItem>
                    </Col>

                    <Col :span="10" :offset='1'>
                        <FormItem label="院系" prop="academy">
                           <Input v-model="formValidate.academy" placeholder="院系"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='2'>
                        <FormItem label="专业" prop="major">
                            <Select v-model="formValidate.major" filterable placeholder="请选择专业">
                                <Option v-for="(item,index) in majorData" :value="item.majorName" :key="index">{{item.majorName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='1'>
                        <FormItem label="企业" prop="companyName">
                           <Input v-model="formValidate.companyName" placeholder="请输入企业"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='2'>
                        <FormItem label="职称" prop="jobTitle">
                           <Select v-model="formValidate.jobTitle" allow-create @on-create="handleCreate" filterable placeholder="请选择职称">
                               <Option v-for="item in jobs" :key="item.value" :value="item.value">{{item.label}}</Option>
                           </Select>
                        </FormItem>
                    </Col>
                    <Col :span="10" :offset='1'>
                        <FormItem label="备注" prop="remark">
                           <Input v-model="formValidate.remark" placeholder="请输入备注"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="14" :offset='1'>
                        <FormItem label="初始密码" prop="passWord">
                           <Input v-model="formValidate.passWord" placeholder="初始密码"></Input>
                        </FormItem>
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
    import school from './school'
    export default {
        props:["importData","importShow"],
        components:{
            school
        },
        data () {
            return {
                leftData:[],
                formValidate:{
                    idcardName:'',
                    loginPhonenumber:'',
                    idcardNumber:'',
                    school:'',
                    bankAddress:'',
                    bankNumber:'',
                    academy:'',
                    major:'',
                    jobTitle:'',
                    companyName: '',
                    remark: '',
                    passWord:'123456',
                },
                majorData:[],
                formValidateCopy:{},
                ruleValidate: {
                    idcardName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    loginPhonenumber: [
                        { required: true, message: '手机号不能为空',trigger: 'blur'},
                    ],
                    school: [
                        { required: true, message: '学校不能为空',trigger: 'blur'},
                    ],
                },
                show:false,
                id:'',
                groupname:'',//组织名字
                menuData:[],//权限数据
                rightData:[],//右侧显示数据
                jobs:[
                    {
                        value: '教授',
                        label: '教授',
                    },
                    {
                        value: '研究员',
                        label: '研究员',
                    },
                    {
                        value: '副教授',
                        label: '副教授',
                    },
                    {
                        value: '副研究员',
                        label: '副研究员',
                    },
                    {
                        value: '讲师',
                        label: '讲师',
                    },
                    {
                        value: '助教',
                        label: '助教',
                    },
                    {
                        value: '其他',
                        label: '其他',
                    },
                ]

            }
        },
        created() {
            this.show=this.importShow
           
            if (this.$store.state.common.majorData.length==0) {
                this.$store.dispatch("majorDataCommon").then((reset)=>{
                    this.majorData=reset;
                })
            }else{
                this.majorData=this.$store.state.common.majorData
            }
        },
        mounted(){

        },
        methods: {
            handleCreate(e){
                this.jobs.push({
                    value: e,
                    label:e
                })
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
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
                    groupId:this.$webapi.getlocal("groupId"),
                    idcardName:this.formValidate.idcardName,
                    loginPhonenumber:this.formValidate.loginPhonenumber,
                    school:this.formValidate.school
                }
                if (this.formValidate.bankAddress) {
                    data.bankAddress=this.formValidate.bankAddress
                }
                if (this.formValidate.bankNumber) {
                    data.bankNumber=this.formValidate.bankNumber
                }
                if (this.formValidate.academy) {
                    data.academy=this.formValidate.academy
                }
                if (this.formValidate.companyName) {
                    data.companyName=this.formValidate.companyName
                }
                if (this.formValidate.remark) {
                    data.remark=this.formValidate.remark
                }
                if (this.formValidate.major) {
                    data.major=this.formValidate.major
                }
                if (this.formValidate.jobTitle) {
                    data.jobTitle=this.formValidate.jobTitle
                }
                if (this.formValidate.idcardNumber) {
                    data.idcardNumber=this.formValidate.idcardNumber
                }
                if (this.formValidate.passWord) {
                    data.passWord=this.formValidate.passWord
                }else{
                    data.passWord='123456'
                }
                this.$api.post('/web/specialist/insert',data).then(reset => {
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
