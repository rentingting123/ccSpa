<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="80">
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
                <Button type="primary"  @click="add()">新增</Button>
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
        <add-index :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-index>
        <edit-index :importShow="editShow" :importData="editData" @exportData="exportEditData" v-if="editShow"></edit-index>
        <expo-index :importShow="expoShow" :importData="expoData" @exportData="exportExpoData" v-if="expoShow"></expo-index>
    </div>
</div>
</template>
<script>
import paging from "@/usercenter/views/pub/page"
import addIndex from "./addIndex"
import editIndex from "./editIndex"
import expoIndex from "./expoIndex"
export default {
    components:{
        paging,
        addIndex,
        editIndex,
        expoIndex
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
                    title: '组织名称',
                    align: 'center',
                    key: 'groupName'
                },
                {
                    title: '组织类型',
                    align: 'center',
                    key: 'type',
                    render: (h, params) => {
                        var str=""
                        if(params.row.type==1){
                            str="学校"
                        }else if(params.row.type==2){
                            str="企业"
                        }else if(params.row.type==3){
                            str="竞赛"
                        }else if(params.row.type==7){
                            str="政府"
                        }else if(params.row.type==31){
                            str="参赛队伍"
                        }else if(params.row.type==32){
                            str="个人"
                        }
                        return h('div', [
                            h('span',str)
                        ]);
                    },
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    render: (h, params) => {
                        var str="正常"
                        if(params.row.status==1){
                            str="正常"
                        }else{
                            str="正常"
                        }
                        return h('div', [
                            h('span',str)
                        ]);
                    },
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
                                        this.editData=params.row;
                                        this.editShow=true;
                                    }
                                }
                            }, '修改'),
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
                            }, '删除'),
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
                                        // this.remove(params.row);
                                        this.expoData=params.row.id;
                                        this.expoShow=true;
                                    }
                                }
                            }, '用户导入'),
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
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            if (this.formCustom.groupName) {
                data.groupName=this.formCustom.groupName
            }
            // if (this.formCustom.loginName) {
            //     data.loginName=this.formCustom.loginName
            // }
            // if (this.formCustom.loginPhonenumber) {
            //     data.loginPhonenumber=this.formCustom.loginPhonenumber
            // }
            this.$api.get('/usercenter/group/query',data).then(reset => {
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
        add(){
            this.addShow=true;
        },
        // 删除
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+item.groupName+'】吗?</p>',
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
                id:item.id
            }
            this.$api.delete("/usercenter/group/"+item.id, null).then(reset => {
                if (reset.code == 0) {
                    this.$Message.success("删除成功!")
                    this.formCustom.groupName=''
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
        exportAddShow(e){
            this.addShow=e.show
        },
        exportExpoData(e){
            this.expoShow=e.show
        },
        exportEditData(e){
            this.editShow=e.show
            this.$router.go(0)
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
