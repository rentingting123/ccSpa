<template>
    <div class="">
        <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>用户导入</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="手机号码:" prop="phoneStr">
                        <Input v-model="formValidate.phoneStr" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="手机号码"></Input>
                        <p style="text-align:left;"><i>多个手机号码之间用英文逗号隔开</i></p>
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
                    groupId:'',
                    phoneStr:''
                },
                ruleValidate: {
                    phoneStr: [
                        { required: true, message: '手机号码', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.ashow=this.importShow;
            this.formValidate.groupId=this.importData;
        },
        methods: {
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
                    groupId: this.formValidate.groupId,//组织名称
                    phoneStr: this.formValidate.phoneStr,//登录账号
                }
                this.$api.post('/usercenter/group/importuserphone',data).then(reset => {
                    if (reset.code == 0) {
                        _this.$Message.success('导入成功');
                        _this.$emit('exportData',{show:false})
                        this.ashow=false
                        _this.$refs[name].resetFields();
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        }
    }
</script>
