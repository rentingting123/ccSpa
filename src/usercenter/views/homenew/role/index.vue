<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >角色管理</BreadcrumbItem>
                    <BreadcrumbItem>角色列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>角色列表</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
            <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :label-width="80">
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="角色名称" prop="name">
                                    <Input v-model="formCustom.name" placeholder="角色名称"></Input>
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
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div>
                                <Button type="primary" :disabled="!authority.addRole" @click="addrole()"> <Icon type="android-add"></Icon> 添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                       <i-table border  :columns="columns7" :data="datas" class="table"></i-table>
                       <div class="mt20">
                           <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
                       </div>
                    </Col>
                </Row>
                <add-role-component :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-role-component>
                <edit-role-component :importEditShow="editShow" :importEditData="editData" @exportEditData="exportEditShow" v-if="editShow"></edit-role-component>
            </div>
        </div>
    </div>
</template>
<script>
    import addRoleComponent from './addRoleComponent.vue'
    import editRoleComponent from './editRole.vue'
    import paging from "@/usercenter/views/pub/page"
    import { mapGetters,mapState } from 'vuex';
    export default {
        components:{
            addRoleComponent,
            editRoleComponent,
            paging,
        },
        data () {
            return {
                addShow:false,
                editShow:false,
                editData:{},
                self:this,
                formCustom: {
                    name:''
                },
                modals:{
                    modalBool: false,
                    successText:""
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
                pageShow:false,
                columns7: [
                    {
                        title: '角色编号',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '描述',
                        key: 'description',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.description)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '创建时间',
                        key: 'createdDate',
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
                        align: 'center',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    attrs: {
                                        disabled: !this.authority.editRole,
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.editData=params.row.id;
                                            this.editShow=true
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    attrs: {
                                        disabled: !this.authority.delRole,
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                datas: []
            }
        },
        computed: {
            ...mapState({
                authority:store=>store.system.authorityManagement
            }),
        },
        async created(){
            await this.$store.dispatch('getAuthority')
        },
        beforeRouteEnter(to, from, next){
            next((vm)=>{
                vm.$store.commit('tabNumExpert','0-3')
            })
        },
        mounted () {
          //do something after creating vue instance
          this.list()
        },
        methods: {
            addrole () {
                this.addShow = true
            },
            list () {
                let _this = this
                var data={
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                }
                if(this.formCustom.name){
                    data.roleName=this.formCustom.name
                }
                this.$api.get('/usercenter/role/query',data).then(reset => {
                    if (reset.code === 0) {
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
                        _this.datas = reset.data.list;
                        _this.pageShow=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (item) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【'+item.name+'】吗?</p>',
                    onOk: () => {
                       this.del(item)
                    },
                    onCancel: () => {

                    }
                });
            },
            del (item){
                let _this = this;
                this.$api.delete("/usercenter/role/"+item.id, null).then(reset => {
                    if (reset.code === 0) {
                        _this.$Message.success("删除成功!")
                        _this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportAddShow(e){
                this.addShow=e.show;
                this.list();
            },
            exportEditShow(e){
                this.editShow=e.show;
                this.list();
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.list()
            },
            // 页码改变
            pageComponentDate (e) {
                if (e.pageCurrent!=0) {
                    this.pageData.pageCurrent = e.pageCurrent
                    this.pageData.pagesize = e.pagesize
                    this.list()
                }
            },
            handleSubmit (name) {
                this.pageData.pageCurrent = 1
                this.list()
            },
        }
    }
</script>
<style scoped>
    .page-component-bd{
        padding:15px;
    }
   .base-info{
        font-size: 18px;
        text-align: left;
        padding-top: 15px;
        margin-bottom: 26px;
        padding-left: 30px;
        padding-bottom: 15px;
        background-color: #fff;
   }
   .base-color{
        color: #8c8c8c;
   }
    h3{
        font-size: 26px;
        text-align: left;
    }
    .dep-updata{
        text-align: left;
        padding-left: 30px;
        margin-bottom: 15px;
    }
</style>
