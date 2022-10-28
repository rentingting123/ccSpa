<template>
    <div class="">
        <Modal v-model="ashow" width="480" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>新增下级组织</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="组织类型:" prop="createType">
                        <Select v-model="formValidate.createType" placeholder="组织类型">
                            <Option :value="1">学院</Option>
                            <Option :value="2">竞赛主办方</Option>
                        </Select>
                    </FormItem>
                    
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
        props:['importData','importShow','type'],
        data () {
            return {
                focusBool:'',
                ashow:false,
                formValidate: {
                    groupName:'',
                    type:1,
                    createType:1
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
            this.ashow=this.importShow;
            if (this.$store.state.system.orgaAll.length!=0) {
                this.groupNameAll=this.$store.state.system.orgaAll
            }else{
                this.list(this.importData);
            }
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
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', '正在加载...')
                        ])
                    }
                });
                let _this = this;
                
                var data = {
                    groupId: this.importData.id,
                    type:this.type,
                    groupName: this.formValidate.groupName,//组织名
                    downType: 1,//组织类型
                    createType:this.formValidate.createType
                }
                this.$api.post('/usercenter/group/addgroup',data).then(reset => {
                    if (reset.code == 0) {
                        _this.$Spin.hide()
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                        this.ashow=false
                        _this.$refs[name].resetFields();
                    }else {
                        _this.$Spin.hide()
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        }
    }
</script>
