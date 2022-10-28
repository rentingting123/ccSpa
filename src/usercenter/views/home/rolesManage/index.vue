<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>系统管理</BreadcrumbItem>
			<BreadcrumbItem>账号列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>账号列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Form :model="formCustom" :label-width="60">
                    <Row>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="姓名" prop="schoolId">
                                <Input v-model="formCustom.idcardName" placeholder="姓名"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="登录名" prop="classId">
                                <Input v-model="formCustom.loginName" placeholder="登录名"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="手机号" prop="classId">
                                <Input v-model="formCustom.loginPhonenumber" placeholder="手机号"></Input>
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
                <!-- <Row>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:right;">
                            <Button type="primary" @click="add">添加单个账号</Button>
                        </div>
                    </Col>
                </Row> -->
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="">
						<Table border :columns="columnsdata" :data="objArr"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
    </div>
    <edit-index v-if="importEditShow" :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData"></edit-index>
    <edit-pw v-if="passwordEditShow" :close="closeEdit" :importEditData="importEditData"></edit-pw>
  </div>
</template>
<script>
    import paging from "@/usercenter/views/pub/page"
    import editIndex from "./editIndex.vue"
    import editPw from "./editPassword.vue"
    import { mapGetters } from 'vuex';
export default {
    components:{
        paging,
        editIndex,
        editPw,
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            importShow:false,
            importEditShow:false,
            passwordEditShow:false,
            importEditData:'',
            isAdmin:'',
            editData:{},
            formCustom:{
                idcardName:'',
                loginName:'',
                loginPhonenumber:'',
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
                    title: '姓名',
                    align: 'center',
                    key: 'idcardName'
                },
                {
                    title: '登录名',
                    align: 'center',
                    key: 'loginName'
                },
                {
                    title: '手机号',
                    align: 'center',
                    key: 'loginPhonenumber'
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    render:(h,params)=>{
                        var str="正常";
                        if(params.row.status==-1){
                            str="过期"
                        }else  if(params.row.status==0){
                            str="禁用"
                        }else if( params.row.status==2){
                            str="已认证"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '注册时间',
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
                    key: 'dis',
                    align: 'center',
                    render: (h, params) => {

                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                attrs: {
                                        disabled: !this.getAuthority.setPassword,
                                    },

                                style: {
                                    // display:this.isAdmin=="false"?"none":"inline-block",
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        // this.remove(params.row);
                                        this.importEditData=params.row.id;
                                        this.passwordEditShow=true;
                                    }
                                }
                            }, '重置密码'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                attrs: {
                                        disabled: !this.getAuthority.setPermission,
                                    },
                                style: {
                                    marginRight: '5px',

                                },
                                on: {
                                    click: () => {
                                        // this.remove(params.row);
                                        this.importEditData=params.row.id;
                                        this.importEditShow=true;
                                    }
                                }
                            }, '权限'),
                        ]);
                    }
                }
            ],
            objArr: [],
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (to.path=='/system/expert/expertAccount') {
                vm.$store.commit('tabNumExpert','0-0')
            }
        })
    },
    created(){
        this.$store.dispatch('getAuthority')
        this.isAdmin = this.$webapi.getlocal("isAdmin")
    },
    mounted() {
          this.list()
    },
    computed: {
        ...mapGetters([
        'getAuthority'
        ])
    },
    
    methods:{
        closeEdit(){
            this.passwordEditShow = false
        },
        list () {
            let _this = this
            let data={
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            if (this.formCustom.idcardName) {
                data.idcardName=this.formCustom.idcardName
            }
            if (this.formCustom.loginName) {
                data.loginName=this.formCustom.loginName
            }
            if (this.formCustom.loginPhonenumber) {
                data.loginPhonenumber=this.formCustom.loginPhonenumber
            }
            this.$api.get('/usercenter/role/users',data).then(reset => {
                if (reset.code == 0) {
                    if (reset.data.pages!=0) {
                        _this.pageData.pageCount=reset.data.pages
                    }
                    if(reset.data.pageNum!=0){
                        _this.pageData.pageCurrent=reset.data.pageNum//当前页
                    }
                    if (reset.data.pageSize!=0) {
                        _this.pageData.pagesize=reset.data.pageSize
                    }
                    _this.pageData.totalCount=reset.data.total//总条数
                    _this.pageshow = true
                    // _this.pageSize=reset.data.pageSize
                    // _this.total=reset.data.total
                    // _this.pageSize=reset.data.pageSize
                    if (reset.data.list) {
                        _this.objArr = reset.data.list;
                    }else{
                        _this.objArr = [];
                    }

                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        
        pageComponentDate (e) {
            if (e.pageCurrent!=0) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            }
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        }
    }
  }
</script>
<style scoped>
.page-component-bd{
    padding:15px;
}
</style>
