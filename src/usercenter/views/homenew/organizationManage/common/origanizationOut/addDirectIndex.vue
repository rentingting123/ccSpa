<template>
    <div class="">
        <Modal v-model="ashow" width="480" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span v-if="type==1">添加直属上级</span>
               <span v-else-if="type==2">添加汇报上级</span>
               <span v-else-if="type==3">添加直属下级</span>
               <span v-else-if="type==4">添加汇报下级</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :label-width="80">
                    <FormItem label="类型:" prop="groupType">
                        <Select v-model="groupType" @on-change="changeType">
                            <Option value="0" :disabled="this.selfType==1">组织</Option>
                            <Option value="1">竞赛</Option>
                            <Option value="3">专业</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="名称:" prop="groupName">
                        <Select v-model="groupName" :multiple='type!=1' clearable @on-clear="clearname" filterable remote :remote-method="searchNameMethod">
                            <Option v-for="(item,index) in groupNameAll" :value="item.id" :key="index">{{ item.groupName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading" style="margin-left: 8px" size="large">确定</Button>
                       <Button type="error" @click="ashow=false" :loading="loading" size="large">取消</Button>
                   </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props:['close','type'],
        // type 1为直属上级 2为直属下级
        data () {
            return {
                focusBool:'',
                ashow:true,
                formValidate: {
                    groupName:'',
                    type:1,
                },
                groupNameAll:[],
                groupType: "0",
                groupName: '',
                name: '',
                loading: false,
                selfType: this.$webapi.getselfType(),

            }
        },
        created() {
            if(this.selfType==1){
                this.groupType = "1"
            }
            if (this.$store.state.system.orgaAll.length!=0) {
                this.groupNameAll=this.$store.state.system.orgaAll
            }else{
                this.list();
            }
        },
        methods: {
            clearname(){
                this.name = '';
                this.list();
            },
            changeType(type){
                this.groupName = ''
                this.list()
            },
            searchNameMethod(query){
                this.name = query;
                this.list();
            },
            list () {
                let data={
                    // groupId: Number(this.$webapi.getlocal("groupId")),
                    name: this.name,
                    type: this.groupType
                }
                this.$api.get('/usercenter/group/queryGroupOrCompetitionName',data).then(reset => {
                    if (reset.code == 0) {
                        this.groupNameAll=reset.data;
                        this.$store.commit("orgaAllSystem",reset.data)
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
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
            post (name) {
                let _this = this;
                if(!this.groupName) return this.$Message.warning('请选择要绑定的名称');
                var data = {
                    selfType: this.selfType,
                    groupId: Number(this.$webapi.getlocal("groupId")),
                    type: this.type,// 1上级直属 2上级汇报 3下级直属 4下级汇报
                    // 当为专业3时，实际为组织，查询时需要专业查询列表
                    upOrDownType: Number(this.groupType)==3 ? 0 : Number(this.groupType), //0组织 1竞赛 3专业
                    relationGroupIdList: this.type !=1 ? this.groupName : [this.groupName],//密码
                }
                this.loading = true;
                this.$api.post('/usercenter/group/addrelation',data).then(reset => {
                    this.loading = false;
                    if (reset.code == 0) {
                        _this.$Spin.hide()
                        _this.$Message.success('添加成功,请等待回复!');
                        this.ashow=false
                    }else {
                        _this.$Spin.hide()
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
