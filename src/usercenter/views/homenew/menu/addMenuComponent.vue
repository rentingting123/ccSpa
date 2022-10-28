<template>
    <div class="">
        <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <!-- <span>{{formValidate.title}}</span> -->
               <span>新增资源权限</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="资源名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称" ref="focusBool"></Input>
                    </FormItem>
                    <FormItem label="资源编号:" prop="permCode">
                        <Input v-model="formValidate.permCode" placeholder="资源编号"></Input>
                    </FormItem>
                    <FormItem label="白名单:" prop="whiteUrls">
                        <Input v-model="formValidate.whiteUrls" placeholder="白名单"></Input>
                    </FormItem>
                    <FormItem label="黑名单:" prop="blackUrls">
                        <Input v-model="formValidate.blackUrls" placeholder="黑名单"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </FormItem>
                    <FormItem label="状态" prop="status">
                        <RadioGroup v-model="formValidate.status">
                            <Radio :label="1">正常</Radio>
                            <Radio :label="0">禁用</Radio>
                            <Radio :label="2">到期</Radio>
                        </RadioGroup>
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
                    name:'',
                    permCode:'',
                    description:'',
                    status:1,
                    whiteUrls:'',
                    blackUrls:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '资源名称不能为空', trigger: 'blur' }
                    ],
                    permCode: [
                        { required: true, message: '资源编号不能为空', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '状态不能为空' }
                    ],
                }
            }
        },
        created() {
            this.show=this.importShow
        },
        methods: {
            cancel () {
                this.ashow = false
                this.$emit('exportData',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    } else {
                        // this.$Message.error('内容填写有误!')
                        // this.focusBool=true;
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.$emit('exportData',{show:false})
                this.$refs[name].resetFields();
            },
            post (name) {
                let _this = this;
                var data = {
                    name:this.formValidate.name,
                    permCode: this.formValidate.permCode,
                    status:this.formValidate.status,
                }
                if (this.formValidate.description) {
                    data.description=this.formValidate.description
                }
                if (this.formValidate.whiteUrls) {
                    data.whiteUrls=this.formValidate.whiteUrls
                }
                if (this.formValidate.blackUrls) {
                    data.blackUrls=this.formValidate.blackUrls
                }
                this.$api.post('/usercenter/permission',data).then(reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                        _this.$refs[name].resetFields();
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            }
        }
    }
</script>
