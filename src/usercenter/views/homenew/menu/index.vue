<template>

<div id="resource" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem>系统管理</BreadcrumbItem>
                <BreadcrumbItem>资源权限</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>资源列表</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="100">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="资源名字" prop="name">
                                <Input type="text" v-model="formCustom.name"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
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
                            <Button type="primary" :disabled="!authority.addPermission" @click="add">
                                <Icon type="ios-plus-empty"></Icon>添加</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div>
                        <i-table border :columns="columns7" :data="objArr"></i-table>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </Col>
           </Row>
        </div>
        <add-menu-component :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-menu-component>
        <edit-menu-component :importShow="editShow" :importData="editData" @exportData="exportEditShow" v-if="editShow"></edit-menu-component>
    </div>
</div>

</template>

<script>
import paging from "@/usercenter/views/pub/page"
import addMenuComponent from './addMenuComponent.vue'
import editMenuComponent from './editMenuComponent.vue'
import { mapGetters,mapState } from 'vuex';
export default {
    components:{
        paging,
        addMenuComponent,
        editMenuComponent,
    },
    data() {
            return {
                pageshow: false,
                addShow:false,
                editShow:false,
                editData:{},
                formCustom: {
                    name:''
                },
                ruleCustom: {
                    departmentNo: [{
                        trigger: 'blur'
                    }],
                    name: [{
                        trigger: 'blur'
                    }]
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
                modals: {
                    modalBool: false,
                    successText: ""
                },
                objArr: [],
                columns7: [
                    {
                        title: '资源名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '资源编号',
                        key: 'permCode',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.permCode)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '黑名单',
                        key: 'blackUrls',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.blackUrls)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '白名单',
                        key: 'whiteUrls',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.whiteUrls)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '描述',
                        key: 'description',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.description)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            var str="正常"
                            if(params.row.status==0){
                                str="禁用"
                            }else if(params.row.status==2){
                                str="到期"
                            }
                            return h('div', [
                                h('span', str)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:130,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        disabled: !this.authority.editPermission,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData=params.row;
                                            this.editShow=true
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    attrs: {
                                        disabled: !this.authority.delPermission,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],

            }
        },
        beforeRouteEnter(to, from, next){
            next((vm)=>{
                vm.$store.commit('tabNumExpert','0-4')
            })
        },
        computed: {
            ...mapState({
                authority:store=>store.system.authorityManagement
            }),
        },
        mounted() {
            // this.$api.get('https://localhost:8080/static/json/data.json')
            // var num=0;
            this.list();
        },
        async created(){
            await this.$store.dispatch('getAuthority')
        },
        methods: {
            list() {
                let _this = this
                let data = {
                    pageNum: this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize
                }
                if(this.formCustom.name){
                    data.name=this.formCustom.name
                }
                this.$api.post('/usercenter/permission/query', data).then(reset => {
                    if (reset.code === 0) {
                        _this.objArr = reset.data.list
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.pageData.pageCurrent=reset.data.pageNum//当前页
                        _this.pageData.pagesize=reset.data.pageSize
                        _this.pageshow =  true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove(e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【' + e.name + '】吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            id:e.idw
                        }
                        this.$api.delete("/usercenter/permission/"+e.id, null).then(reset => {
                            if (reset.code === 0) {
                                _this.list();
                                _this.$Message.success('删除成功');
                                _this.pageshow = true;
                            } else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            add () {
                this.addShow = true
            },
            handleSubmit (name) {
                this.pageshow = false
                this.pageData.pageCurrent = 1
                this.list()
            },
            exportAddShow(e){
                this.addShow=e.show;
                this.list();
            },
            exportEditShow(e){
                this.editShow=e.show;
                this.list();
            },
            // 页码改变
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
        }
}
</script>
<style scoped>
.page-component-bd{
    padding:15px;
}
.res-name {
    padding: 10px 16px;
}
.res-name span {
    float: left;
    line-height: 32px;
    font-size: 20px;
}
ul {
    margin: 0;
    padding: 0px;
}
li {
    text-align: left;
    padding-left: 16px;
}
.res-title-name {
    padding-top: 6px;
    padding-bottom: 0px;
    position: relative;
    z-index: 1;
    transition: all .2s ease-in-out;
}
.res-title-div {
    font-size: 18px;
}
.res-title-div p {
    text-align: center;
}
.res-title-name-div {
    font-size: 16px;
}
.res-title-name-ul {
    margin: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    z-index: 900;
}
.icon {
    display: inline-block;
}
.icon-div {
    text-align: center;
}
.icon-div span {
    float: left;
}
.icon span {
    margin-left: 10px;
}
.menu {
    border-right: 1px solid #ccc;
}
</style>
