<template>
    <div class="">
        <Modal v-model="ashow" width="480" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改组织</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    
                    <FormItem label="组织名称:" prop="groupName">
                        <Input v-model="formValidate.groupName" placeholder="组织名称"></Input>
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
    export default {
        props:['importData','importShow'],
        data () {
            return {
                focusBool:'',
                ashow:false,
                formValidate: {
                    groupName:'',
                    type:1,
                    createType:''
                },
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组织名称不能为空', trigger: 'blur' }
                    ]
                },
                groupNameAll:[]
            }
        },
        created() {
            console.log(this.importData)
            this.ashow=this.importShow;
            this.formValidate.groupName=this.importData.name
            this.formValidate.createType=this.importData.createType
        },
        methods: {
            list (e) {
                let _this = this
                let data={
                    groupId:e.id,
                    groupName:e.groupName,
                    type:1
                }
                this.$api.get('/usercenter/group/queryrelationname',data).then(reset => {
                    if (reset.code == 0) {
                        this.groupNameAll=reset.data;
                        this.$store.commit("orgaAllSystem",reset.data)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
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
                    id: this.importData.id,
                    groupName: this.formValidate.groupName,
                    createType: this.formValidate.createType,
                    // type: 3,//组织类型
                    // relationGroupIdList: this.formValidate.groupName,//密码
                }
                this.$api.post('/usercenter/group/updategroupname',data).then(reset => {
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
