<template>
    <div class="">
        <Modal v-model="ashow" width="480" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span >合并竞赛(暂支持竞赛间合并)</span>
            </p>
            <div style="text-align:left">
                <Form ref="formValidate" :model="formValidate" label-position="top">
                    <FormItem label="选择合并后要保留的竞赛: " prop="toGroupId">
                       <RadioGroup v-model="toGroupId" style="margin-left:10px;" vertical @on-change="changegroupId">
                            <Radio v-for="item in teams" :key="item.id" :label="item.id">
                                <Icon type="social-apple"></Icon>
                                <span>{{item.groupName}}</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <!-- <FormItem label="合并后组织名称: " prop="groupName">
                        <Input v-model="formValidate.groupName"></Input>
                    </FormItem> -->
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
        props:['close','mergedata','objData'],
        // type 1为直属上级 2为直属下级
        data () {
            return {
                focusBool:'',
                ashow:true,
                formValidate: {},
                loading: false,
                teams:[],
                fromGroupId: '',
                toGroupId: '',
            }
        },
        created() {
            this.mergedata.forEach((data,j)=>{
                this.objData.groupDirectChildList.forEach((val,i)=>{
                    if(val.id==data){
                        this.teams.push(val)
                    }
                })
                this.objData.groupReportChildList.forEach((val,i)=>{
                    if(val.id==data){
                        this.teams.push(val)
                    }
                })
            })
        },
        methods: {
            changegroupId(toGroupId){
                for(let i in this.teams){
                    if(this.teams[i].id != toGroupId){
                        this.fromGroupId = this.teams[i].id
                    }
                }
            },
            handleSubmit (name) {
                if(!this.toGroupId){
                    return this.$Message.warning('请选择合并后保留的组织');
                }
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>请再次确定，合并后原有组织或竞赛将消失</p>',
                    onOk: () => {
                        this.post(name)
                    },
                    onCancel: () => {
                        this.$Message.info('已取消合并');
                    }
                });
            },
            post () {
                var data = {
                    fromGroupId: this.fromGroupId,
                    toGroupId: this.toGroupId,
                }
                this.loading = true;
                this.$api.post('/usercenter/group/combineCompetition',data).then(reset => {
                    this.loading = false;
                    if (reset.code == 0) {
                        this.$Message.success('合并成功,请等待回复!');
                        this.ashow=false
                    }else {
                        this.$netcode.getApiCode(reset)

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
