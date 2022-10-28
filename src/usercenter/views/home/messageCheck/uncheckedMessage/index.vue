<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="60">
                    <Row>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="组织名称" prop="schoolId">
                                <Input v-model="formCustom.groupName" placeholder="组织名称"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Button type="primary"  @click="add()">新增</Button> -->
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
						<Table border :columns="columnsdata" :data="objArr"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
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
                    key: 'groupName'
                },
                {
                    title: '组织类型',
                    align: 'center',
                    key: 'type',
                    render: (h, params) => {
                        var str=""
                        if (params.row.type==1) {
                            str="学校"
                        }
                        if(params.row.type==2){
                            str="企业"
                        }else if(params.row.type==3){
                            str="竞赛"
                        }else if(params.row.type==7){
                            str="政府"
                        }
                        return h('div', [
                            h('span',str)
                        ]);
                    },
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
                    title: '消息类型',
                    key: 'messageType',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.sure(params.row)
                                    }
                                }
                            }, '同意'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
                                    }
                                }
                            }, '拒绝'),
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
                // groupId:10002289,
                groupId:this.$webapi.getlocal("groupId"),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
                type:0
            }
            if (this.formCustom.groupName) {
                data.groupName=this.formCustom.groupName
            }
            this.$api.post('/usercenter/message/query',data).then(reset => {
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
        sure(item){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确定同意【'+item.groupName+'】的请求吗?</p>',
                onOk: () => {
                    let _this = this;
                    var data = {
                        messageId:item.id,
                        type:0
                    }
                    this.$api.get("/usercenter/message/audit", data).then(reset => {
                        if (reset.code == 0) {
                            this.$Message.success("已确定!")
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
        // 删除
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确定要拒绝【'+item.groupName+'】的请求吗??</p>',
                onOk: () => {
                   this.del(item)
                },
                onCancel: () => {

                }
            });
        },
        del (item){
            let _this = this;
            var data = {
                messageId:item.id,
                type:1
            }
            this.$api.get("/usercenter/message/audit", data).then(reset => {
                if (reset.code == 0) {
                    this.$Message.success("已拒绝!")
                    this.list()
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        handleSubmit (name) {
            this.pageData.pageCurrent = 1
            this.list()
        },
    }
  }
</script>
<style lang="less" scoped>
.origanization-wrapper {

  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }

  .tab-wrapper {
    background: #ffffff;

    .tab-header {
      font-size: 0;
      background: #ffffff;
      padding: 0 20px;

      .header-item {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        cursor: pointer;
      }

      .item-on {
        border-bottom: 2px solid #409EFF;
      }
    }
  }
}
</style>
