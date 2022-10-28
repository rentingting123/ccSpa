<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>组织管理</BreadcrumbItem>
			<BreadcrumbItem>账户管理</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>账户管理</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Form :model="formCustom" :label-width="60">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <Select v-model="childValue" clearable placeholder="请选择下级组织或竞赛" filterable @on-change="chooseChild" >
                                <Option v-for="item in childlist" :value="item.id" :key="item.id">{{ item.groupName }}({{ item.type==0?'组织':item.type==1?'竞赛':'赛项' }})</Option>
                            </Select>
                        </Col>
                        <Col :xs="24" :sm="24" :md="1" :lg="1">
                            <FormItem>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4">
                         <div style="display:flex">
                             <Select v-model="searchName" style="width: 80px;">
                                    <Option value="idcardName">姓名</Option>
                                    <Option value="loginName">登录名</Option>
                                    <Option value="loginPhonenumber">手机号</Option>
                                    <Option value="belongSchool">学校</Option>
                                    <Option value="roleId">角色</Option>
                                </Select>
                           <Select v-if="searchName == 'roleId'" v-model="searchValue" placeholder="请选择">
                               <Option value="">全部</Option>
                               <Option
                                 v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                               </Option>
                             </Select>
                              <Input v-if="searchName !== 'roleId'" v-model="searchValue"></Input>
                         </div>
                        </Col> 
                        <Col :xs="24" :sm="24" :md="2" :lg="2">
                            <Button type="primary" style="margin-left:30px;" @click="handleSubmit('formCustom')">查询</Button>
                        </Col>
                        <Col :xs="24" :sm="24" :md="2" :lg="2">
                            <FormItem>
                               
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4" style="display:flex;justify-content: flex-start;align-items: flex-start;">
                        <Button type="primary" @click="expert" style="margin-right:6px;">导出</Button>
                            <Button  type="primary" @click="addshow=true" style="margin-right:6px;">添加用户</Button>
                            <a href="https://web.moocollege.com/edit/20191015/f15956861200bd58c3d33825b9d75daf/qwvbmchh_1571135138793/用户模版.xls" style="margin-right:6px;"><Button type="primary" >模版下载</Button></a>
                            <Upload action='/api/usercenter/user/import' ref="upload" :before-upload="handleUpload" style="dispaly:inline-block;" :headers="header" :data="datas" :on-success="handleSuccess">
                                <Button type="primary" >导入用户</Button>
                            </Upload>
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
						<Table border :loading="loading" 
                        :columns="columnsdata" 
                        @on-selection-change="selectChange"
                        :data="objArr">
                            <!-- <template slot-scope="{ row }" slot="status">
                                <p v-if="row.status==-1">过期</p>
                                <p v-else-if="row.status==0">禁用</p>
                                <p v-else-if="row.status==2">已认证</p>
                                <p v-else>正常</p>
                            </template> -->
                            <template slot-scope="{ row }" slot="createTime">
                               <span>{{ $webapi.gettime("date", row.createTime) }}</span>
                            </template>
                            <template slot-scope="{ row }" slot="dis">
                               <Button type="primary" size="small" :disabled="!getAuthority.setPassword" @click="update(row.id)">重置密码</Button>
                               <Button type="primary" size="small" :disabled="!getAuthority.setPermission"  @click="edit(row)">修改</Button>
                               <Button type="error" size="small" :disabled="!getAuthority.setPermission"  @click="del(row.id)">删除</Button>
                            </template>
                        </Table>
                        <div class="mt20">
							<paging :pageData="pageData" v-if="pageData.totalCount>0" @pageComponentDate="pageComponentDate"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
    </div>
    <edit-index v-if="importEditShow" :close="closeEdit" :importEditData="importEditData"></edit-index>
    <edit-pw v-if="passwordEditShow" :close="closeEdit" :importEditData="importEditData"></edit-pw>
    <add-role v-if="addshow" :close="closeEdit" />
  </div>
</template>
<script>
    import paging from "@/usercenter/views/pub/page"
    import addRole from "./addRole.vue"
    import editIndex from "./editIndex.vue"
    import editPw from "./editPassword.vue"
    import { mapGetters } from 'vuex';
    import {getToken} from '@@/utils/oauth'
    import uploadComponent from "@/usercenter/views/pub/upload"
export default {
    components:{
        paging,
        addRole,
        editIndex,
        editPw,
        uploadComponent
    },
    data () {
        return {
              options: [
        //  {
        //   value: '2',
        //   label: '指导老师'
        // }, {
        //   value: '3',
        //   label: '队长'
        // }, 
        {
          value: '4',
          label: '竞赛执行平台报名管理员'
        }],
            searchName: 'idcardName',
            searchValue: '',
            childValue: '',
            childlist: [],
            gId:'',
            addshow:false,
            editshow:false,
            pageshow:true,
            switch1:true,
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
                belongSchool:''
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
            pageShow:false,//分页是否显示
            columnsdata: [
                {
                    title: '姓名',
                    align: 'center',
                    key: 'idcardName'
                },
                {
                    title: '学校',
                    align: 'center',
                    key: 'belongSchool'
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
                    title: '使用状态',
                    align: 'center',
                    width: 120,
                    key: 'status',
                    render: (h, params) => {
                        var str="启用中"
                        var switch1=true
                        if (params.row.accredit) {
                            if(params.row.status==1){
                                str="启用中"
                                switch1=true
                            }else{
                                str="禁用中"
                                switch1=false
                            }
                        }else{
                            if(params.row.status==1){
                                str="启用中"
                            }else{
                                str="禁用中"
                            }
                        }
                        return h('div', [
                            h('i-switch', {
                                props: {
                                    // type: 'primary',
                                    value:switch1,
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    'on-change': (e) => {
                                        this.stateChange(params.row,e)
                                    }
                                }
                            }),
                            h('span',str)
                        ]);
                    },
                },
                // {
                //     title: '状态',
                //     align: 'center',
                //     slot: 'status'
                // },
                {
                    title: '注册时间',
                    slot: 'createTime',
                    align: 'center'
                },
               
                {
                    title: '操作',
                    width: '200',
                    slot: 'dis',
                    align: 'center'
                }
            ],
            objArr: [],
            datas:{
                groupId:this.$webapi.getlocal("groupId"),
                type: this.$webapi.getselfType()
            },
            header:{
                Authorization:'Bearer '+ getToken()
            },
            selectGroup: '',
            loading: false,
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.$store.commit('tabNumExpert','0-0')
        })
    },
    created(){
        this.$store.dispatch('getAuthority')
        this.isAdmin = this.$webapi.getlocal("isAdmin")
        this.selectGroup = JSON.parse(this.$webapi.getlocal('selectGroup'));
        this.childValue = this.selectGroup.objectId;
        this.getChildlist()
        this.getsearchvalue()
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
         selectChange(e){
            this.selList=e;
            if(this.selectionAll){
                if (e.length<this.idList.length) {
                    this.selectionAll=false;
                    this.idList=[];
                    e.forEach((val)=>{
                        this.idList.push(val.id);
                    })
                }else{
                    this.idList=[];
                    e.forEach((val)=>{
                        this.idList.push(val.id);
                    })
                }
            }else{
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.id);
                })
            }
        },
        // 状态是否启用
        stateChange(item,e){
            this.$api.post("/web/specialist/"+item.id+"/update/status", null).then(reset => {
                if (reset.code == 0) {
                    this.$Message.success("重置成功!")
                    this.list()
                }
            })
        },
         async expert(){
             let _this = this
             let data={}
            data[this.searchName] = this.searchValue
            data.groupId = this.gId ? this.gId : this.$webapi.getlocal('groupId')
             this.$api.exportGet('/usercenter/role/user/getUserExport',data)
        },
        handleUpload(){
            this.$refs.upload.clearFiles();
        },
        chooseChild(data){
            this.gId = data;
            this.handleSubmit('formCustom')
        },
        getsearchvalue(){
             this.$api.get('/usercenter/role/users').then(reset => {
                 console.log(reset);
                if (reset.code == 0) {
                   
                   
                }
            })
        },
        getChildlist(){
            let data = {
                groupId: this.$webapi.getlocal('groupId')
            }
            this.$api.get('/usercenter/group/queryDowmGroup',data).then(reset => {
                if (reset.code == 0) {
                    this.childlist = reset.data || []
                    
                    this.childlist.splice(0,0,{
                        groupName: this.selectGroup.objectName,
                        id: this.selectGroup.objectId,
                        type: this.selectGroup.type
                    })
                }else{
                    this.$netcode.getApiCode(reset)
                }
            })
        },
        handleSuccess(res,file,filelist){
            if(res.code==0){
                this.$Message.success('导入成功！')
                this.list();
            }else{
                this.$Message.error(res.message)
            }
        },
        closeEdit(){
            this.passwordEditShow = false
            this.importEditShow = false
            this.addshow = false
            this.list()
        },
        list () {
            let _this = this
            let data={
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            data[this.searchName] = this.searchValue
            data.groupId = this.gId ? this.gId : this.$webapi.getlocal('groupId')
            this.loading = true
            this.$api.get('/usercenter/role/users',data).then(reset => {
                this.loading = false
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
                    console.log( reset.data)
                    console.log( _this.pageData.totalCount)
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
         exportUpload(e){
            if (e) {
                this.list();
            }
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
        },
        edit(id){
            this.importEditData=id;
            this.importEditShow=true;
        },
        del(id){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>删除后无法恢复，确认要删除吗?</p>',
                onOk: () => {
                   let data = {
                        userId: id,
                        groupId: this.gId ? this.gId : this.$webapi.getlocal('groupId')
                    }
                    this.$api.get('/usercenter/group/delUserFromGroup',data).then(reset => {
                        if (reset.code == 0) {
                            this.list();
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
            
        },
        update(id){
            this.importEditData=id;
            this.passwordEditShow=true;
        }
    },
    watch: {
        searchName(newVal, oldVal) {
            this.searchValue = ''
        }
    }
  }
</script>
<style scoped>
.page-component-bd{
    padding:15px;
}
</style>
<style>
.rule .ivu-upload{
   display: inline-block; 
}
</style>
