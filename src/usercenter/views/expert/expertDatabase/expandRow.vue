<template>
    <div class="expand-row">
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <Table :columns="columnsdata" :data="objArr">
                    <template slot="action" slot-scope="{ row, index }">
                        <Button type="error" size='small' @click="del(row)">移除</Button>
                    </template>
                </Table>
            </Col>
            <addExpert :groupId='groupId' :close='close'/>
        </Row>
    </div>
</template>
<script>
    import addExpert from './addExpert'
    export default {
        props:["importData","importShow", 'row', 'close'],
        components:{
            addExpert
        },
        data () {
            return {
                columnsdata: [
                    {
                        title: '队长',
                        key: 'isTeamLeader',
                        align: 'center',
                        width:62,
                        render:(h,params)=>{
                            var colorStr="none"
                            if (params.row.isTeamLeader) {
                                colorStr="inline-block"
                            }
                            // <span><i class="iconfont icon-wodejingsai"></i></span>
                            return h("span",[
                                h("Icon",{
                                    attrs:{
                                        type:"ios-flag"
                                    },
                                    style:{
                                        fontSize:"24px",
                                        display:colorStr,
                                        color:"#3F9AFF"
                                    },
                                    on:{

                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '专家姓名',
                        align: 'center',
                        minWidth: 100,
                        key: 'idcardName',
                    },
                    // {
                    //     title: '性别',
                    //     align: 'center',
                    //     minWidth: 100,
                    //     key: 'sex',
                    // },
                    {
                        title: '手机号',
                        align: 'center',
                        minWidth: 150,
                        key: 'contactPhone',
                    },
                    {
                        title: '学校',
                        align: 'center',
                        minWidth: 130,
                        key: 'school',
                    },
                    {
                        title: '省份',
                        align: 'center',
                        minWidth: 100,
                        key: 'province',
                    },
                    {
                        title: '院系',
                        align: 'center',
                        minWidth: 100,
                        key: 'academy',
                    },
                    {
                        title: '专业',
                        align: 'center',
                        minWidth: 100,
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
                        minWidth: 180,
                        key: 'idcardNumber',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 80,
                        slot: 'action',
                    },
                ],//columnsdata
                objArr:[],
                groupId: '',
            }
        },//data
        created() {
            this.objArr=this.importData
            this.groupId = this.row.groupId
        },
        methods:{
            del(row){
                let data = {
                    groupId: this.groupId,
                    userId: row.id
                }
                this.$api.get('/usercenter/specialist/removeUser',data).then(res => {
                    this.$Message.success('删除成功')
                    this.close && this.close();
                })
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
