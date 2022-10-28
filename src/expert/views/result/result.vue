<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <!-- <BreadcrumbItem to="/">首页</BreadcrumbItem> -->
                    <BreadcrumbItem >结果查看</BreadcrumbItem>
                    <BreadcrumbItem>评审结果</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>结果列表</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">
                    <div class="sourch-left">
                        <div class="" style="display:inline-block;">
                            <chooseId :rowId='rowId' :cId='competitionId' :rowIdChange='rowIdChange' :cIdChange='itemChange' />
                        </div>
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Input v-model="formValidate.q" search placeholder="作品编号,团队名,队长或手机号" @on-search="handleSubmit">
                                <!-- <Icon type="ios-search" slot="suffix" /> -->
                            </Input>
                        </div>
                    </div>
                    <div class="sourch-right">
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Button type="primary" @click="importResult">导出</Button>
                        </div>
                    </div>
    			</div>
    			<!--操作按钮-->
    			<div class="tableListOperator">

    			</div>
                <Row>
    				<Col :xs="24" :sm="24" :md="24" :lg="24">
                        <p class="result-watch" >当前总计：{{pageData.totalCount || 0}}个团队</p>
    				</Col>
    			</Row>
    			<Row>
    				<Col :xs="24" :sm="24" :md="24" :lg="24">
                        <Table border :columns="columnsdata" :data="objArr" :loading="loadingTable"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
    				</Col>
    			</Row>
    		</div>
        </div>
        <div v-if="loadShow">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>
    </div>
</template>
<script>
    import paging from "@/expert/components/pub/page"
    let Base64 = require('js-base64').Base64
    import chooseId from '@/expert/components/chooseId'

    export default {
        components:{
            paging,
            chooseId,
        },
        data () {
            return {
                loadShow:false,
                pageShow:false,//分页是否显示
                // 查询条件
                formValidate:{
                    groupName:'',
                    rowId:''
                },
                competitionId: '',
                rowId: '',
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[30,50,80],
                    //分页大小
                    pagesize:30,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                columnsdata: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 64,
                        align: 'center'
                    },
                    {
                        title: '得分',
                        align: 'center',
                        children: []
                    },
                    {
                        title: '当前赛段得分',
                        align: 'center',
                        minWidth:77,
                        key: 'totalScore',
                        render:(h,params)=>{
                            var str=params.row.totalScore
                            if(params.row.showScore){
                                str=params.row.showScore
                            }
                            return h('span',str)
                        }

                    },
                    {
                        title: '最终得分',
                        align: 'center',
                        minWidth:87,
                        key: 'allScore',
                        render:(h,params)=>{
                            var str=params.row.allScore
                            if(params.row.showScore){
                                str=params.row.allScore
                            }
                            return h('span',str)
                        }

                    },
                    {
                        title: '赛项',
                        align: 'center',
                        minWidth:230,
                        key: 'competitionName'
                    },
                    {
                        title: '作品名称',
                        align: 'center',
                        minWidth:100,
                        key: 'poolName',
                        render:(h,params)=>{
                            return h('div',[
                                h('a',{
                                    on: {
                                        click : () => {
                                            this.$router.push({
                                                path:"/expert/detail",
                                                query:{
                                                    id:Base64.encode(params.row.poolId),
                                                    reviewStatus:2,
                                                    back:1,
                                                    rowId: this.rowId,
                                                    competitionId: this.competitionId
                                                }
                                            })
                                        }
                                    }
                                },params.row.poolName)
                            ])
                        }
                    },
                    {
                        title: '作品编号',
                        align: 'center',
                        minWidth:100,
                        key: 'poolCode',
                    },
                    {
                        title: '学校',
                        align: 'center',
                        minWidth:100,
                        key: 'school'
                    },
                    {
                        title: '团队名/参赛者',
                        align: 'center',
                        minWidth:100,
                        key: 'groupName',
                        render:(h,params)=>{
                            return h('div',[
                                h('a',{
                                    on: {
                                        click : () => {
                                            this.$router.push({
                                                path:"/expert/detail",
                                                query:{
                                                    id:Base64.encode(params.row.poolId),
                                                    reviewStatus:2,
                                                    back:1,
                                                    rowId: this.rowId,
                                                    competitionId: this.competitionId
                                                }
                                            })
                                        }
                                    }
                                },params.row.groupName)
                            ])
                        }
                    },
                    {
                        title: '队长',
                        align: 'center',
                        minWidth:100,
                        key: 'leadName'
                    },
                    {
                        title: '联系电话',
                        align: 'center',
                        minWidth:120,
                        key: 'leadPhone'
                    },

                ],
                objArr: [],
                compData:[],
                loadingTable: false,
                rowidData:[],
                rowId: '',
            }
        },
        
        created() {
        },
        methods: {
            gettable(){
                if(!this.objArr[0].rowIdWeightDtos) return this.loadingTable = false;
                let lists = this.objArr[0].rowIdWeightDtos
                let arr = []
                for(let i in lists){
                    arr.push({
                        title: lists[i].rowName+'('+(lists[i].scoreWeight*100)+'%)',
                        align: 'center',
                        minWidth:132,
                        key: 'rowIdWeightDtos'+i,
                        render:(h,params)=>{
                            var str=params.row.rowIdWeightDtos[i]
                            str = str.totalScore + ' * ' + (str.scoreWeight*100) + '%'
                            return h('span',str)
                        }
                    })
                }
                this.columnsdata.splice(1,1,{
                    title: '得分',
                    align: 'center',
                    children: arr
                })
                this.loadingTable = false
                
            },
            rowIdChange(e){
                this.rowId = e.rowId
                this.list();
            },
            async list () {
                let _this = this
                let data={
                    competitionId:this.competitionId,
                    rowId:this.rowId,
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                }
                if(this.formValidate.q){
                    data.search=this.formValidate.q
                }
                this.loadingTable = true;
                this.$api.get('/review/review/get/result',data).then(reset => {
                    if (reset.code == 0) {
                        this.objArr=reset.data.list
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.pageData.pageCurrent=reset.data.pageNum//当前页
                        _this.pageData.pagesize=reset.data.pageSize
                        if (this.objArr.length>0) {
                            this.gettable()
                            _this.pageShow=true;
                        }else{
                            this.loadingTable = false;
                            _this.pageShow=false;
                        }
                    }else {
                        this.loadingTable = false;
                        _this.pageShow=false;
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            // 搜索
            handleSubmit(){
                this.pageData.pageCurrent=1
                this.list();
            },
            // 导出结果
            importResult(){
                this.loadShow=true;
                var data={
                    competitionId:this.competitionId,
                    rowId:this.rowId
                }
                this.$api.exportGet("/review/review/export/result", data)
                .then(res => {
                    this.loadShow=false;
                })
            },
            // 赛项
            itemChange(e){
                this.rowId = e.rowId
                this.competitionId = e.id
                this.list();
            },
        }
    }
</script>
<style scoped>
    .sourch-left{
        float: left;
        margin-bottom:15px;
        min-width:345px;
    }
    .sourch-right{
        float: right;
        margin-bottom:15px;
    }
    .tableListForm{
        overflow: hidden;

    }
    .result-watch{
        float: left;
        margin-bottom:15px;
        margin-left:0;
        cursor:pointer;
        color:#4A4A4A;
    }
    .page-component-bd{
        padding:15px;
    }
</style>
