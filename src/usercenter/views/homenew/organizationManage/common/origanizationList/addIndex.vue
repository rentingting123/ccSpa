<template>
    <div class="">
        <Modal v-model="ashow" width="600" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <!-- admin组织关联 -->
               <span>新增组织</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                    <FormItem label="组织名称:" prop="groupName">
                        <Input v-model="formValidate.groupName" placeholder="组织名称"></Input>
                    </FormItem>
                    <FormItem label="组织类型:" prop="type">
                        <Select v-model="formValidate.type" @on-change="change" placeholder="组织类型">
                            <Option :value="1">学校</Option>
                            <Option :value="2">企业</Option>
                            <Option :value="3">竞赛</Option>
                            <Option :value="7">政府</Option>
                        </Select>
                    </FormItem>
                      <FormItem label="省份:" prop="province">
                        <Select v-model="formValidate.province" placeholder="省份">
                            <Option v-for="item in provinces" :key="item.provinceId" :value="item.province">{{item.province}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="竞赛类型:" prop="competitionRange" v-if="formValidate.type==3">
                        <div class="competitionRange">
                            <Select v-model="formValidate.competitionType" placeholder="竞赛类型">
                                <Option 
                                    :value="item.code"
                                    v-for="item in competitionTypes" 
                                    :key="item.code">
                                    {{item.name}}
                                </Option>
                            </Select>
                            <Select v-model="formValidate.competitionRange" placeholder="竞赛范围">
                                <Option 
                                    :value="item.code"
                                    v-for="item in competitionRanges" 
                                    :key="item.code">
                                    {{item.name}}
                                </Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem label="登录账号:" prop="loginName">
                        <Input v-model="formValidate.loginName" placeholder="登录账号" :disabled="isAccount"></Input>
                    </FormItem>
                    <FormItem label="管理员手机:" prop="loginPhonenumber">
                        <Input v-model="formValidate.loginPhonenumber" placeholder="管理员手机"></Input>
                    </FormItem>
                    <FormItem label="初始密码:" prop="password">
                        <Input v-model="formValidate.password" placeholder="初始密码"></Input>
                    </FormItem>
                    <FormItem label="最大人数:" prop="maxMember">
                        <Input v-model="formValidate.maxMember" placeholder="最大人数"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading='loading' style="margin-left: 8px" size="large">确定</Button>
                       <Button type="error" @click="handleReset('formValidate')" :loading='loading' size="large">取消</Button>
                   </FormItem>
                </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import network from '@/mnskin/api/index'
    export default {
        props:['importData','importShow'],
        data () {
            const loginNameCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('登录账号不能为空'));
                }else if (this.formValidate.type==7 && value.indexOf('gv')!=0) {
                    callback(new Error('政府类型登录帐号需要用“gv”开头'));
                }else if (this.formValidate.type!=7 && value.indexOf('gv')==0) {
                    callback(new Error('非政府类型登录帐号不能用“gv”开头'));
                }else{
                    callback();
                }
            };
            return {
                 provinces:[],
                focusBool:'',
                ashow:false,
                formValidate: {
                    province:'',
                    groupName:'',
                    type:1,
                    loginName:'',
                    loginPhonenumber:'',
                    password:'',
                    maxMember:'',
                    competitionRange: '', // 竞赛范围 0:国际 1:亚太 2:国 3:区 4:省 5:校
                    competitionType: '', // 竞赛类型 0:学科 1:教师 2:企业 3:政府 4:K12 5:评审活动
                },
                isAccount:false,
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组织名称不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '组织类型不能为空' }
                    ],
                    loginName: [
                        { required: true,  validator:loginNameCheck ,trigger: 'blur'},
                        // { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '初始密码不能为空' , trigger: 'blur'}
                    ],
                    competitionRange: [
                        { required: true, message: '竞赛范围不能为空' }
                    ],
                    // loginPhonenumber: [
                    //     { required: true, message: '管理员手机号不能为空' , trigger: 'blur'}
                    // ]

                },
                competitionRanges: [],
                competitionTypes: [],
                loading: false,
            }
        },
        created() {
            this.ashow=this.importShow;
           
            this.getLists()
        },
        methods: {
             async getsheng(){
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
            getLists(){
                 this.getsheng()
                this.$api.get('/usercenter/selectCompetitionRange').then(res=>{
                    if(res.code==0){
                        this.competitionRanges = res && res.data || []
                    }

                })
                this.competitionTypes = [
                    {
                        name: '学科',
                        code: 0,
                    },
                    {
                        name: '教师',
                        code: 1,
                    },
                    
                    {
                        name: '企业',
                        code: 2,
                    },
                    {
                        name: '政府',
                        code: 3,
                    },
                    {
                        name: 'K12',
                        code: 4,
                    },
                    {
                        name: '评审活动',
                        code: 5,
                    },

                ]
            },
            change(val){
                // 当为政府时，加上gv，当不为政府时去掉gv
                if(val==7){
                    if(this.formValidate.loginName.indexOf('gv')!=0){
                        this.formValidate.loginName = "gv"+this.formValidate.loginName
                    }
                }else{
                    if(this.formValidate.loginName.indexOf('gv')==0){
                        this.formValidate.loginName = this.formValidate.loginName.substring(2);
                    }
                }
                if(val==3){
                    this.isAccount=true
                }else{
                    this.isAccount=false
                }
            },
            cancel () {
                this.$emit('exportData',{show:false})
                this.ashow=false

            },
            handleSubmit (name) {
                if(this.formValidate.type==3 && this.formValidate.competitionType===''){
                   return this.$Message.warning('请选择竞赛类型') 
                }
                if (this.formValidate.type==3) {
                    this.formValidate.loginName='竞赛账号将自动生成'
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.$emit('exportData',{show:false})
                this.ashow=false
                this.$refs[name].resetFields();
            },
            post (name) {
                let _this = this;
                var data = {
                    groupName: this.formValidate.groupName,//组织名称
                    loginName: this.formValidate.loginName,//登录账号
                    type: this.formValidate.type,//组织类型
                    password: this.formValidate.password,//密码
                    competitionRange: this.formValidate.competitionRange,
                    competitionType: this.formValidate.competitionType,
                    province:this.formValidate.province
                }
                if (this.formValidate.maxMember) {
                    data.maxMember=this.formValidate.maxMember
                }
                if (this.formValidate.loginPhonenumber) {
                    data.loginPhonenumber=this.formValidate.loginPhonenumber
                }
                this.loading = true
                this.$api.post('/usercenter/group/addrootgroup',data).then(reset => {
                    this.loading = false
                    if (reset.code == 0) {
                        if(this.formValidate.type==3){
                            this.$Modal.info({
                                title: '添加成功',
                                content: '<p>账号为:'+reset.data+'</p><p>请牢记!</p>',
                                onOk: () => {
                                    this.$emit('exportData',{show:false})
                                    this.ashow=false
                                }
                            });
                        }else{
                            this.$Message.success("添加成功!")
                            this.$emit('exportData',{show:false})
                            this.ashow=false
                        }

                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
.competitionRange{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    >div:first-child{
        margin-right: 10px;
    }
}
</style>