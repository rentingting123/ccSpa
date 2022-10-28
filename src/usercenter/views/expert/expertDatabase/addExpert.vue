<template>
    <div>
        <Button type="success" style="margin-top:10px;" @click="addshow">添加专家</Button>
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加专家</span>
            </p>
            <div style="text-align:center">
            <Form ref="formValidate" :model="formValidate" label-position="left" :label-width="46" style="text-align:left;">
                    <Row style="margin-bottom:15px;">
                        <Col :span="5">
                            <Input v-model="formValidate.q" search placeholder="请输入姓名或手机号关键字" @on-search="list"></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col :span="24" style="text-align:center;max-height:600px;overflow-y:scroll;">
                            <Table :columns="columnsdata" :data="objArr"
                                @on-selection-change="selectChange"
                                @on-select-all="selectionAllChange"
                                :loading='loading'
                            ></Table>
                        </Col>
                    </Row>
                </Form>
            </div>
                <div slot="footer">
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="primary" @click="handleSubmit" style="margin-left: 15px">确定</Button>
                </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props:['groupId', 'close'],
        data () {
            return {
                loading: false,
                formValidate:{
                    q:'',
                },
                idList:"",//选择组成员
                selectionAll:false,
                columnsdata: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center',
                        fixed: 'left',
                    },
                    
                    {
                        title: '专家姓名',
                        align: 'center',
                        width: 100,
                        key: 'idcardName',
                        fixed: 'left',
                    },
                    {
                        title: '性别',
                        align: 'center',
                        width: 60,
                        key: 'sex',
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        width: 150,
                        key: 'contactPhone',
                    },
                    {
                        title: '学校',
                        align: 'center',
                        width: 100,
                        key: 'school',
                    },
                    {
                        title: '院系',
                        align: 'center',
                        width: 100,
                        key: 'academy',
                    },
                    {
                        title: '专业',
                        align: 'center',
                        width: 100,
                        key: 'major',
                    },
                    {
                        title: '职称',
                        align: 'center',
                        width: 100,
                        key: 'jobTitle',
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        width: 180,
                        key: 'idcardNumber',
                    },
                ],
                objArr:[],
                show: false,
            }
        },
        methods: {
            addshow(){
                this.list();
                this.show = true
            },
            list () {
                let _this = this
                let data={
                    groupId:this.groupId,
                }
                if(this.formValidate.q){
                    data.q=this.formValidate.q
                }
                this.loading = true
                this.$api.post('/web/specialist/queryUser',data).then(reset => {
                    this.loading = false
                    if (reset.code == 0) {
                        _this.objArr = reset.data;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择数据变化
            selectChange(e){
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.id);
                })
            },
            // 是否全选
            selectionAllChange(e){
                this.selectionAll=!this.selectionAll;
            },
            cancel () {
                this.show=false;
            },
            handleSubmit () {
                if(!this.idList || this.idList.length<1){
                    return this.$Message.warning('请选择要添加的专家')
                }
                var data={
                    groupId:this.groupId,
                    userIds: this.idList
                }
                this.$api.post('/usercenter/specialist/addUser',data).then(res => {
                    if(res.code==0){
                        this.$Message.success("添加成功!")
                        this.show=false;
                        this.close && this.close();
                    }
                })
            },
        }
    }
</script>
