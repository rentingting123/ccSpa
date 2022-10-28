<template>
    <div class="">
        <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改组织</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="组织名称:" prop="groupName">
                        <Input v-model="formValidate.groupName" placeholder="组织名称"></Input>
                    </FormItem>
                    <FormItem label="组织类型:" prop="type">
                        <Select v-model="formValidate.type" placeholder="组织类型">
                            <Option :value="1">学校</Option>
                            <Option :value="2">企业</Option>
                            <Option :value="3">竞赛</Option>
                            <Option :value="4">政府</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="省份:" prop="province">
                        <Select v-model="formValidate.province" placeholder="省份">
                            <Option v-for="item in provinces" :key="item.provinceId" :value="item.province">{{item.province}}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="登录账号:" prop="loginName">
                        <Input v-model="formValidate.loginName" placeholder="登录账号"></Input>
                    </FormItem>
                    <FormItem label="管理员手机:" prop="loginPhonenumber">
                        <Input v-model="formValidate.loginPhonenumber" placeholder="管理员手机"></Input>
                    </FormItem>
                    <FormItem label="初始密码:" prop="password">
                        <Input v-model="formValidate.password" placeholder="初始密码"></Input>
                    </FormItem> -->
                    <FormItem label="最大人数:" prop="maxMember">
                        <Input v-model="formValidate.maxMember" placeholder="最大人数"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
                       <Button type="error" @click="handleReset('formValidate')" size="large">取消</Button>
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
                    maxMember:''
                },
                formValidateCopy: {},
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组织名称不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '组织类型不能为空' }
                    ],
                }
            }
        },
        created() {
            this.getsheng()
            this.ashow=this.importShow;
            this.formValidate=this.importData;
            this.importData.province = this.importData.porvince
            this.formValidateCopy={...this.importData};
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
            cancel () {
                this.ashow = false
                this.$emit('exportData',{show:false})
                this.ashow=false
            },
            handleSubmit (name) {
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
                    userId:this.formValidate.userId,//urerId
                    id:this.formValidate.id,//urerId
                }
                if (this.formValidate.maxMember!=this.formValidateCopy.maxMember) {
                    data.maxMember=this.formValidate.maxMember
                }
                if (this.formValidate.groupName!=this.formValidateCopy.groupName) {
                    data.groupName=this.formValidate.groupName
                }
                 if (this.formValidate.province!=this.formValidateCopy.province) {
                    data.province=this.formValidate.province
                }
                if (this.formValidate.type!=this.formValidateCopy.type) {
                    data.type=this.formValidate.type
                }
                this.$api.put('/usercenter/group',data).then(reset => {
                    if (reset.code == 0) {
                        _this.$Message.success('修改成功');
                        _this.$emit('exportData',{show:false})
                        _this.ashow=false
                        _this.$refs[name].resetFields();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
        }
    }
</script>
