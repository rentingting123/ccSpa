<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="0" @submit.native.prevent>
                    <FormItem style="display:inline-block;width:200px;">
                        <Input v-model="formCustom.q" search placeholder="手机号、姓名" @on-search="handleSubmit" @on-enter="handleSubmit">
                            <!-- <Icon type="ios-search" slot="suffix" /> -->
                        </Input>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="importExpert">导出</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <uploadComponent @exportData="exportUpload"></uploadComponent>
                    </FormItem>
                    <!-- 查询导入 -->
                    <FormItem style="display:inline-block;margin:0 15px;">
                        <searchUpload />
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="editPassword">批量修改密码</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="addAccount">添加账号</Button>
                    </FormItem>
                </Form>
			</div>
            <div class="tableListForm">
                <Form :model="formValidate" :label-width="0">
                    <FormItem style="display:inline-block;">
                        <!-- 学校 -->
                        <school v-model="formValidate.school" :onChange="list"/>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Select v-model="formValidate.major" clearable filterable placeholder="请选择专业" @on-change="list">
                            <Option v-for="(item,index) in majorData" :value="item.majorName" :key="index">{{item.majorName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Select v-model="formValidate.jobTitle" clearable filterable placeholder="请选择职称" @on-change="list">
                            <Option value="教授">教授</Option>
                            <Option value="研究员">研究员</Option>
                            <Option value="副教授">副教授</Option>
                            <Option value="副研究员">副研究员</Option>
                            <Option value="讲师">讲师</Option>
                            <Option value="助教">助教</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Select v-model="formValidate.importYear" clearable filterable placeholder="请选择导入年份" @on-change="list">
                            <Option :value="year" v-for="(year,i) in years" :key="i">{{year}}</Option>
                        </Select>
                    </FormItem>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator" style="color:#2089E5;font-weight:600;">
                <span style="margin-right:15px;cursor:pointer;" @click="uploadTemp">下载导入模板</span>
                <!-- <span style="margin-right:15px;cursor:pointer;" @click="authorizeExpert" v-if="userInfo!=3">授权专家库<Icon type="ios-arrow-forward" /></span> -->
                <span style="margin-right:15px;cursor:pointer;" @click="authorizeExpert">授权专家库<Icon type="ios-arrow-forward" /></span>
                <span style="cursor:pointer;" @click="applyExpert">申请学校授权<Icon type="ios-arrow-forward" /></span>
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
						<Table border
                            :columns="columnsdata"
                            :data="objArr"
                            @on-selection-change="selectChange"
                            @on-select-all="selectionAllChange"
                            @on-select-all-cancel="cancelAllChange"
                            :loading='loading'
                        ></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
        <transfer-component :importShow="transferShow" :importData="transferDatas" v-if="transferShow" @exportData="transferData"></transfer-component>
        <transfer-component-apply :importShow="transferShowApply" :importData="transferDatasApply" v-if="transferShowApply" @exportData="transferDataApply"></transfer-component-apply>
        <add-index :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-index>
        <!-- <edit-index :importShow="editShow" :importData="editData" @exportData="exportEditData" v-if="editShow"></edit-index>
        <expo-index :importShow="expoShow" :importData="expoData" @exportData="exportExpoData" v-if="expoShow"></expo-index> -->
    </div>
</div>
</template>
<script>
import paging from "@/usercenter/views/pub/page"
import transferComponent from "@/usercenter/views/pub/transfer"
import transferComponentApply from "@/usercenter/views/pub/transfer"
import addIndex from "./addIndex"
import uploadComponent from "@/usercenter/views/pub/upload"
import searchUpload from "./searchUpload"
import { mapGetters,mapState } from 'vuex';
import school from './school'
// import editIndex from "./editIndex"
// import expoIndex from "./expoIndex"
export default {
    components:{
        paging,
        transferComponent,
        addIndex,
        uploadComponent,
        transferComponentApply,
        searchUpload,
        school,
        // editIndex,
        // expoIndex
    },
    data () {
        return {
            loading: false,
            switch1:true,
            selectionAll:false,//是否全选
            transferShow:false,//transfer组件是否显示
            transferShowApply:false,
            transferDatas:{},//transfer组件数据
            transferDatasApply:{},//transfer组件数据
            addShow:false,//新增model是否显示
            editShow:false,//修改model是否显示
            editData:{},//修改数据
            expoShow:false,//用户导入model是否显示
            expoData:'',//用户导入数据
            pageShow:false,//分页是否显示
            // 查询条件
            formCustom:{
                q:''
            },
            formValidate:{
                school:'',
                major:'',
                jobTitle:''
            },
            // 分页
            pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:10,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            columnsdata: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                // {
                //     title: '序号',
                //     align: 'center',
                //     width: 120,
                //     key: 'id',
                //     fixed: 'left'
                // },
                {
                    type: 'index',
                    title: '序号',
                    width: 80,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '专家姓名',
                    align: 'center',
                    width: 120,
                    key: 'idcardName',
                    fixed: 'left'
                },
                {
                    title: '省份',
                    align: 'center',
                    width: 120,
                    key: 'province',
                    fixed: 'left'
                },
                {
                    title: '手机号',
                    align: 'center',
                    width: 150,
                    key: 'contactPhone',
                },
                {
                    title: '学校',
                    align: 'center',
                    width: 100,
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
                {
                    title: '开户行',
                    align: 'center',
                    width: 180,
                    key: 'bankAddress',
                },
                {
                    title: '银行账号',
                    align: 'center',
                    width: 180,
                    key: 'bankNumber',
                },
                {
                    title: '导入年份',
                    align: 'center',
                    width: 120,
                    key: 'importYear',
                },
                {
                    title: '使用状态',
                    align: 'center',
                    width: 120,
                    key: 'status',
                    render: (h, params) => {
                        var str="启用中"
                        var switch1=true
                        var accreditShow="inline-block"
                        if (params.row.accredit) {
                            if(params.row.status==1){
                                str="启用中"
                                switch1=true
                            }else{
                                str="禁用中"
                                switch1=false
                            }
                        }else{
                            accreditShow="none"
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
                                    display:accreditShow,
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
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        var strTrue="inline-block"
                        var strFalse="none"
                        if (!params.row.accredit) {
                            strTrue="none"
                            strFalse="inline-block"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    display:strTrue,
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        var item=[params.row.id]
                                        this.handleRender(item)
                                    }
                                }
                            }, '重置密码'),
                            h("span",{
                                style: {
                                    display:strFalse,
                                    marginRight: '5px'
                                },
                            },'无权限')
                        ]);
                    }
                }
            ],
            objArr: [],
            idList:[],//选中的专家
            selList:[],
            userType:0,
            majorData:[],
            years: []
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (to.path=='/system/expert/expertAccount') {
                vm.$store.commit('tabNumExpert','1-0')
            }
        })
    },
    computed: {
        ...mapState({
            authority:store=>store.system.authorityManagement
        }),
    },
    async created(){
        await this.$store.dispatch('getAuthority')
        this.userInfo=JSON.parse(this.$webapi.getlocal("userInfo")).type
        
        if (this.$store.state.common.majorData.length==0) {
            this.$store.dispatch("majorDataCommon").then((reset)=>{
                this.majorData=reset;
            })
        }else{
            this.majorData=this.$store.state.common.majorData
        }
    },
    mounted() {
        this.getYears()
        this.list()
    },
    methods:{
        list () {
            let _this = this
            let data={
                groupId:this.$webapi.getlocal("groupId"),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            if (this.formCustom.q) {
                data.q=this.formCustom.q
            }
            if(this.formValidate.school){
                data.school=this.formValidate.school
            }
            if(this.formValidate.major){
                data.major=this.formValidate.major
            }
            if(this.formValidate.jobTitle){
                data.jobTitle=this.formValidate.jobTitle
            }
            if(this.formValidate.importYear){
                data.importYear=this.formValidate.importYear
            }
            this.loading = true
            this.$api.get('/web/specialist/query',data).then(reset => {
                this.loading = false
                if (reset.code == 0) {
                    if (reset.data) {
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
                    }else{
                        _this.objArr =[]
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
        // 重置密码
        handleRender (item) {
            var passwords=''
            this.$Modal.confirm({
                render: (h) => {
                    return h('div',[
                        h("p",'重置密码'),
                        h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '新密码'
                            },
                            on: {
                                input: (val) => {
                                    passwords = val;
                                }
                            }
                        })
                    ])
                },
                onOk: () => {
                    var delBool=true;
                    var noDel={}
                    for (var i = 0; i < this.selList.length; i++) {
                        if (!this.selList[i].accredit) {
                            delBool=false
                            noDel=this.selList[i]
                            break
                        }
                    }
                    if(delBool){
                        let _this = this;
                        var data = {
                            idList:item
                        }
                        if(passwords){
                            data.password=passwords
                        }
                        this.$api.post("/web/specialist/batch/reset", data).then(reset => {
                            if (reset.code == 0) {
                                this.$Message.success("重置成功!")
                                this.list()
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    }else{
                        this.$Message.warning("暂无修改【"+noDel.idcardName+"】密码的权限!")
                    }

                },
                onCancel: () => {

                }
            })
        },
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
        // 是否全选
        selectionAllChange(e){
            this.selectionAll=true;
        },
        // 取消全选
        cancelAllChange(e){
            this.selectionAll=false;
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
        handleSubmit (name) {
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportAddShow(e){
            this.addShow=e.show
            this.list()
        },
        // 授权专家选择值
        transferData(e){
            if(e.data){
                this.transferShow=e.show
                if(this.idList.length>0){
                    var data={
                        selfGroupId:this.$webapi.getlocal("groupId"),
                        userList:this.idList,
                        groupId:e.data
                    }
                    this.$api.post("/web/specialist/accredit",data).then((res)=>{
                        if (res.code==0) {
                            this.$Message.success("授权成功!")
                        }
                    })
                }else{
                    this.$Message.warning("请选择授权专家!")
                }
            }else{
                this.transferShow=e.show
            }
        },
        // 接收申請授权专家选择值
        transferDataApply(e){
            if(e.data){
                if(e.data.length==0){
                    this.$Message.warning("申请授权学校不能为空!")
                }else if(this.$webapi.getlocal("groupId")==e.data){
                    this.$Message.warning("申请授权学校不能是本校!")
                }else{
                    this.transferShowApply=e.show
                    var data={
                        selfGroupId:this.$webapi.getlocal("groupId"),
                        groupId:e.data,
                        type:56
                    }
                    this.$api.post("/web/specialist/applyForAccredit",data).then((res)=>{
                        if (res.code==0) {
                            this.$Message.success("申请授权成功!")
                        }
                    })
                }
            }else{
                this.transferShowApply=e.show
            }

        },
        exportExpoData(e){
            this.expoShow=e.show
        },
        exportEditData(e){
            this.editShow=e.show
        },
        // 授权专家库
        authorizeExpert(){
            this.transferShow=true;
            this.transferDatas.title="授权专家"
            this.transferDatas.accreditType=0
        },
        // 申请专家库
        applyExpert(){
            this.transferShowApply=true;
            this.transferDatasApply.accreditType=1
        },
        exportUpload(e){
            if (e) {
                this.list();
            }
        },
        importExpert(){
            // window.location.href
            if(this.idList.length>0){
                if(!this.selectionAll){
                    var data={
                        userList:this.idList
                    }
                    this.$api.exportPost("/web/specialist/export", data)
                }else{
                    var data={
                        groupId:this.$webapi.getlocal("groupId"),
                        pageSize:this.pageData.totalCount,
                        pageNum: 1
                    }
                    this.$api.exportPost("/web/specialist/export", data)
                }

            }else{

                this.$Message.warning("请选择需要导出的专家账号!")
            }
        },
        exportExpert(){

        },
        editPassword(){
            if(this.idList.length>0){
                this.handleRender(this.idList)
            }else{
                this.$Message.warning("请选择需要修改密码的专家账号!")
            }
        },
        addAccount(){
            this.addShow=true;
        },
        uploadTemp(){
            this.$api.exportGet("/web/specialist/template/export", null)
            // .then(res => {
            //     const aLink = document.createElement("a");
            //     let blob = new Blob([res])
            //     const fileName = '导入模板.xls';
            //     aLink.href = URL.createObjectURL(blob)
            //     aLink.download = fileName
            //     aLink.click()
            //     document.body.appendChild(aLink)
            // })
        },
        getYears(){
            // todo 需要获取导入年份列表
            this.$api.get('/web/specialist/getImportYear').then(res=>{
                this.years = res && res.data || []
            })
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
