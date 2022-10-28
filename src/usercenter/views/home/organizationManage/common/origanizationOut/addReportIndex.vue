<template>
    <div class="">
        <Modal v-model="ashow" width="480" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加汇报</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="组织名称:" prop="groupName">
                        <Select v-model="formValidate.groupName" multiple filterable>
                            <Option v-for="(item,index) in groupNameAll" :value="item.id" :key="index">{{ item.groupName }}</Option>
                        </Select>
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
                },
                ruleValidate: {
                    groupName: [
                        { required: true, message: '组织名称不能为空' }
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
                this.$emit('exportShow',{show:false})
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
                this.$emit('exportShow',{show:false})
                this.ashow=false
                this.$refs[name].resetFields();
            },
            post (name) {
                let _this = this;
                var data = {
                    groupId: this.importData.id,
                    type: 4,//组织类型
                    relationGroupIdList: this.formValidate.groupName,//密码
                }
                this.$api.post('/usercenter/group/addrelation',data).then(reset => {
                    if (reset.code == 0) {
                        _this.$Message.success('添加成功,请等待回复!');
                        _this.$emit('exportShow',{show:false})
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
