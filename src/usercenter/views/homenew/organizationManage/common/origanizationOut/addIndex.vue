<template>
    <div class="">
        <Modal v-model="ashow" width="600"  :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <!-- 校组织关联 -->
               <span>新增组织</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                    <FormItem label="组织名称:" prop="groupName">
                        <Input v-model="formValidate.groupName" placeholder="组织名称"></Input>
                    </FormItem>
                    <FormItem label="组织类型:" prop="type">
                        <Select v-model="formValidate.type" placeholder="组织类型">
                            <Option :value="1">学校组织</Option>
                            <Option :value="3">竞赛组织</Option>
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
    export default {
        props:['close'],
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
                ashow:true,
                formValidate: {
                    groupName:'',
                    type:1,
                    loginPhonenumber:'',
                    password:'',
                    maxMember:'',
                    competitionRange: '', // 竞赛范围 0:国际 1:亚太 2:国 3:区 4:省 5:校
                    competitionType: '', // 竞赛类型 0:学科 1:教师 2:企业 3:政府 4:K12 5:评审活动
                },
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组织名称不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '组织类型不能为空' }
                    ],
                    password: [
                        { required: true, message: '初始密码不能为空' , trigger: 'blur'}
                    ],
                    competitionRange: [
                        { required: true, message: '竞赛范围不能为空' }
                    ],

                },
                competitionRanges: [],
                competitionTypes: [],
                loading: false,
            }
        },
        created(){
            this.getLists()
        },
        methods: {
            getLists(){
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
            handleSubmit (name) {
                if(this.formValidate.type==3 && this.formValidate.competitionType===''){
                   return this.$Message.warning('请选择竞赛类型') 
                }
                this.$refs[name].validate((valid) => {
                    if (!valid) return;
                    this.post(name)
                })
            },
            handleReset (name) {
                this.$emit('exportData',{show:false})
                this.ashow=false
                this.$refs[name].resetFields();
            },
            post (name) {
                
                var data = {
                    createType: this.formValidate.type, //1:组织(学校,写死)  2:主办方(admin用的) //3:竞赛组织 
                    downType: 1,//上下级 0上级 1下级
                    type: 1,
                    groupId: this.$webapi.getlocal('groupId'),
                    groupName: this.formValidate.groupName,//组织名
                    password: this.formValidate.password,//密码
                    competitionRange: this.formValidate.competitionRange,
                    competitionType: this.formValidate.competitionType,
                }
                if (this.formValidate.maxMember) {
                    data.maxMember=this.formValidate.maxMember
                }
                if (this.formValidate.loginPhonenumber) {
                    data.loginPhonenumber=this.formValidate.loginPhonenumber
                }
                this.loading = true
                this.$api.post('/usercenter/group/addgroup',data).then(reset => {
                    this.loading = false
                    if (reset.code == 0) {
                        this.$Message.success('添加成功');
                        this.ashow=false
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        },
        watch:{
            ashow(val){
                if(!val) return this.close && this.close();
            }
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
