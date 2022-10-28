<template>
    <div class="expand-row">
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <Table :columns="columnsdata" :data="objArr" :loading="loadShow"></Table>
            </Col>
        </Row>
        <!-- <div v-if="loadShow">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div> -->
    </div>
</template>
<script>
    export default {
        props:["importData", 'rowId', 'cId', 'pattern', 'notime'],
        data () {
            return {
                columnsdata: [],//columnsdata
                objArr:[],
                loadShow:true,
            }
        },
        created() {
            this.list();
        },
        methods:{
            list(){
                let data={
                    pattern: this.pattern,// 0：作品 1：附件
                    competitionId: this.cId, //竞赛id
                    rowId: this.rowId,//赛项id
                    userId: this.importData.userId, //用户id

                }
                this.loadShow=true
                this.$api.post("review/resource/getDistributionDetail", data).then(reset => {
                    if (reset.code == 0) {
                        var arr1=this.colData()
                        if(this.pattern==1){
                            var obj= {
                                title: '附件名称',
                                align: 'center',
                                minWidth:238,
                                key: 'attachName',
                                render:(h,params)=>{
                                    // var divArr=[]
                                    // var domDiv={
                                    //
                                    // }
                                    return h('div',params.row.attachName.map((item,i) => {
                                        return h('div',{
                                            style:{
                                                marginBottom:"10px",
                                                textAlign:"left"
                                            }
                                        // },params.row.attachName.join('\n'))
                                    },i+1+" : "+item)
                                    }))
                                }
                            };
                            arr1.splice(2,0,obj);
                        }
                        this.loadShow=false
                        // 分配作品-专家-不显示状态

                        if(this.notime){
                            arr1.splice(1, 1)
                        }
                        this.columnsdata=arr1
                        this.objArr=reset.data
                    }else {
                        this.loadShow=false
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            colData(){
                var _this=this;
                return [
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                        width:100
                    },
                    {
                        title: '状态',
                        align: 'center',
                        width: 120,
                        key: 'reviewStatus', //  1:已评审 0:未评审
                        render:(h,params)=>{
                            return h('div',[
                                h('span',params.row.reviewStatus==1?'已评审':'未评审')
                            ])
                        }
                    },
                    {
                        title: '作品名称',
                        align: 'center',
                        minWidth: 150,
                        key: 'title',
                    },
                    // {
                    //     align: 'center',
                    //     minWidth: 150,
                    //     key: 'attachName',
                    //     renderHeader:(h, params) => {
                    //         let show="none"
                    //         if (this.pattern==1) {
                    //             show="inline-block"
                    //         }
                    //         console.log(show)
                    //         return h('div', [
                    //             h('span',{
                    //                 style:{
                    //                     display:show
                    //                 }
                    //             },"附件名称")
                    //         ]);
                    //     },
                    //     // render:(h,params)=>{
                    //     //     return h('div',[
                    //     //         h('span',params.row.attachName)
                    //     //     ])
                    //     // }
                    // },
                    {
                        title: '学校',
                        align: 'center',
                        minWidth: 120,
                        key: 'school',
                    },
                    {
                        title: '省份',
                        align: 'center',
                        minWidth: 100,
                        key: 'province',
                    }
                ]
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
