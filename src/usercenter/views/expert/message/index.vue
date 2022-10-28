<template>
  <div class="rule">
    <div class="pageHeader">
    	<div class="pageBread">
    		<Breadcrumb>
    		<BreadcrumbItem>专家库</BreadcrumbItem>
    		<BreadcrumbItem>消息通知</BreadcrumbItem>
    		</Breadcrumb>
    	</div>
    	<div class="page-detail">
    		<div class="page-detail-hd">
    		 	<h2>消息通知</h2>
    		</div>
    	</div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
        <!--查询条件-->
            <div class="tableListForm">

            </div>
            <!--操作按钮-->
            <div class="tableListOperator">

            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <i-table border  :columns="columnsdata" :data="objArr" class="table"></i-table>
                   <div class="mt20">
                       <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
                   </div>
                </Col>
            </Row>
        </div>
    </div>
</div>
</template>
<script>
import paging from "@/usercenter/views/pub/page"
export default {
    components:{
        paging,
    },
    data () {
        return {
            addShow:false,//新增model是否显示
            editShow:false,//修改model是否显示
            editData:{},//修改数据
            expoShow:false,//用户导入model是否显示
            expoData:'',//用户导入数据
            pageShow:false,//分页是否显示
            // 查询条件
            formCustom:{
                groupName:''
            },
            // 分页
            pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:15,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            columnsdata: [
                {
                    title: 'id',
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '请求组织名称',
                    align: 'center',
                    key: 'operationInfo'
                },
                {
                    title: '请求类型',
                    key: 'createTime',
                    align: 'center',
                    render:(h,params)=>{
                        var str="请求授权专家"
                        if(params.row.operation==57||params.row.operation==570||params.row.operation==571){
                            var str="请求授权专家组"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '请求时间',
                    key: 'createTime',
                    align: 'center',
                    render:(h,params)=>{
                        var time=this.$webapi.gettime("date",params.row.createTime)
                        return h('div',[
                            h('span',time)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    align: 'center',
                    render: (h, params) => {
                        var showButton="inline-block";
                        var showSpan="none";
                        var str="已同意"
                        if(params.row.operation==571||params.row.operation==561){
                            showButton="none"
                            showSpan="inline-block"
                            str="已同意"
                        }else if(params.row.operation==560||params.row.operation==570){
                            showButton="none"
                            showSpan="inline-block"
                            str="已拒绝"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    display:showButton,
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.agreement(params.row);
                                    }
                                }
                            }, '同意'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    display:showButton,
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.reject(params.row);
                                    }
                                }
                            }, '拒绝'),
                            h("span",{
                                style: {
                                    display:showSpan,
                                    marginRight: '5px'
                                },
                            },str)
                        ]);
                    }
                }
            ],
            objArr: []
        }
    },
    created(){

    },
    mounted() {
        this.list()
    },
    methods:{
        list () {
            let _this = this
            let data={
                groupId:this.$webapi.getlocal("groupId"),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
            }
            this.$api.get('/web/specialist/queryAccreditMessage',data).then(reset => {
                if (reset.code == 0) {
                    _this.pageData.pageCount=reset.data.pages//总页数
                    _this.pageData.totalCount=reset.data.total//总条数
                    _this.pageData.pageCurrent=reset.data.pageNum//当前页
                    _this.pageData.pagesize=reset.data.pageSize
                    _this.objArr = reset.data.list;
                    if(_this.objArr.length!=0){
                        _this.pageShow=true;
                    }else{
                        _this.pageShow=false;
                    }
                }else {
                    _this.pageShow=false;
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        agreement(item){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要同意【'+item.operationInfo+'】请求吗?</p>',
                onOk: () => {
                    let _this = this;
                    var data = {
                        messageId:item.id,
                        type:1
                    }
                    this.$api.get("/web/specialist/accreditMessage", data).then(reset => {
                        if (reset.code == 0) {
                            this.$Message.success("已同意!")
                            this.list()
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        reject(item){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要拒绝【'+item.operationInfo+'】请求吗?</p>',
                onOk: () => {
                    let _this = this;
                    var data = {
                        messageId:item.id,
                        type:0
                    }
                    this.$api.get("/web/specialist/accreditMessage", data).then(reset => {
                        if (reset.code == 0) {
                            this.$Message.success("已拒绝!")
                            this.list()
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
    }
  }
</script>
<style lang="less" scoped>
    .page-component-view{
        padding:15px;
    }
</style>
