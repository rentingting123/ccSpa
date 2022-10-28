<template>
    <div class="expand-row">
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <Table :columns="columnsdata" :data="objArr"></Table>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props:["importData","importShow"],
        data () {
            return {
                columnsdata: [
                    {
                        title: '队长',
                        key: 'isTeamLeader',
                        align: 'center',
                        width:62,
                        render:(h,params)=>{
                            var colorStr="#515A6E"
                            if (params.row.isTeamLeader) {
                                colorStr="#F5A623"
                            }
                            return h("span",[
                                h("Icon",{
                                    attrs:{
                                        type:"ios-star"
                                    },
                                    style:{
                                        fontSize:"16px",
                                        color:colorStr
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
                        width: 150,
                        key: 'idcardName',
                    },
                    {
                        title: '该赛段已分配',
                        align: 'center',
                        width: 80,
                        key: 'reviewNum',
                    },
                    {
                        title: '省份',
                        align: 'center',
                        minWidth: 100,
                        key: 'province',
                    },
                    // {
                    //     title: '性别',
                    //     align: 'center',
                    //     width: 60,
                    //     key: 'sex',
                    // },
                    {
                        title: '手机号',
                        align: 'center',
                        width: 150,
                        key: 'contactPhone',
                    },
                    {
                        title: '学校',
                        align: 'center',
                        width: 120,
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
                ],//columnsdata
                objArr:[],
            }
        },//data
        created() {
            this.objArr=this.importData
        },
    }
</script>
<style lang="less" scoped>

</style>
