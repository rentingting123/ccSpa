<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="0" @submit.native.prevent>
                    <FormItem style="display:inline-block;width:200px;">
                        <Input v-model="formCustom.q" search placeholder="组名" @on-search="handleSubmit">
                            <!-- <Icon type="ios-search" slot="suffix" /> -->
                        </Input>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="importExpert">导出</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="addGroup">添加组</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <autoGroup @close='list'/>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="error"  @click="removeGroup">批量删除组</Button>
                    </FormItem>
                    <!-- <span><i class="iconfont icon-wodejingsai"></i></span> -->
                </Form>
			</div>
            <div class="tableListForm">
                <Form :model="formValidate" :label-width="0">
                    <FormItem style="display:inline-block;">
                        <Select v-model="formValidate.school" clearable filterable placeholder="请选择学校" @on-change="schoolChange">
                            <Option v-for="(item,index) in schoolData" :value="item.label" :key="item.key">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Select v-model="formValidate.major" clearable filterable placeholder="请选择专业" @on-change="majorChange">
                            <Option v-for="(item,index) in majorData" :value="item.majorName" :key="index">{{item.majorName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Select v-model="formValidate.jobTitle" clearable filterable placeholder="请选择职称" @on-change="jobTitleChange">
                            <Option value="教授">教授</Option>
                            <Option value="研究员">研究员</Option>
                            <Option value="副教授">副教授</Option>
                            <Option value="副研究员">副研究员</Option>
                            <Option value="讲师">讲师</Option>
                            <Option value="助教">助教</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>
                </Form>
			</div>
			<!--操作按钮-->
            <div class="tableListOperator" style="color:#2089E5;font-weight:600;">
                <!-- <span style="margin-right:15px;cursor:pointer;" @click="authorizeExpert" v-if="userInfo!=3">授权专家库<Icon type="ios-arrow-forward" /></span> -->
                <span style="margin-right:15px;cursor:pointer;" @click="authorizeExpert">授权专家库<Icon type="ios-arrow-forward" /></span>
                <span style="cursor:pointer;" @click="applyExpert">申请学校授权<Icon type="ios-arrow-forward" /></span>
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
						<Table :columns="columnsdata" :data="objArr"
                            :row-class-name="rowClassName"
                            @on-selection-change="selectChange"
                            @on-select-all="selectionAllChange"
                            :loading='loading'
                            @on-select-all-cancel="cancelAllChange">

                            <template slot-scope="{ row, index}" slot="groupName">
                                <div style="cursor: pointer;" v-if="!row.groupNameEdit" @click="edit('groupName', index)"> {{row.groupName}} <Icon type="md-create" /></div>
                                <Input v-else v-model="row.groupName" @on-blur="rename('groupName', index, row.groupName)"/>
                            </template>

                            <template slot-scope="{ row, index }" slot="action">
                                    <TeamGroup :captainSelection="row.captainSelection"
                                    :groupName="row.groupName" 
                                    :list="row.userList" 
                                    :cb="list"
                                    v-if="row.userList.length>10&&row.accredit"/>
                                    <!-- <Button type="primary" v-if="row.userList.length>10" size="small" style="margin-right: 5px" @click="teamGroup(row.userList)">分小组</Button> -->
                                    <span v-else>小于10人或无权限</span>
                            </template>
                        </Table>
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
        <!-- <edit-index :importShow="editShow" :importData="editData" @exportData="exportEditData" v-if="editShow"></edit-index> -->
    </div>
</div>
</template>
<script>
import paging from "@/usercenter/views/pub/page"
import expandRow from "./expandRow"
import TeamGroup from "@/usercenter/views/common/onair"
import addIndex from "./addIndex"
import autoGroup from './autoGroup'
import transferComponent from "@/usercenter/views/pub/transfer"
import transferComponentApply from "@/usercenter/views/pub/transfer"
// import expoIndex from "./expoIndex"
export default {
    components:{
        paging,
        expandRow,
        addIndex,
        autoGroup,
        transferComponent,
        transferComponentApply,
        TeamGroup
        // expoIndex
    },
    data () {
        return {

            loading: false,
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
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '组名',
                    align: 'left',
                    slot: 'groupName'
                },
                {
                    title: '分小组',
                    align: 'left',
                    slot: 'action',
                },
                {
                    title: ' ',
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
                    type: 'expand',
                    width: 60,
                    render: (h, params) => {
                        let this_ = this
                        return h(expandRow, {
                            props: {
                                row: params.row,
                                importData:params.row.userList,
                                close: this_.close
                            }
                        })
                    }
                },

            ],
            objArr: [],
            idList:[],//勾选组的id集合
            selList:[],//勾选组的数据集合
            userType:0,
            formValidate:{
                school:'',
                major:'',
                jobTitle:''
            },
            schoolData:[],
            majorData:[],
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (to.path=='/system/expert/expertDatabase') {
                vm.$store.commit('tabNumExpert','1-1')
            }
        })
    },
    created(){
        this.userInfo=JSON.parse(this.$webapi.getlocal("userInfo")).type
        if (this.$store.state.common.schoolData.length==0) {
            this.$store.dispatch("schoolDataCommon").then((reset)=>{
                this.schoolData=reset;
            })
        }else{
            this.schoolData=this.$store.state.common.schoolData
        }
        if (this.$store.state.common.majorData.length==0) {
            this.$store.dispatch("majorDataCommon").then((reset)=>{
                this.majorData=reset;
            })
        }else{
            this.majorData=this.$store.state.common.majorData
        }
    },
    mounted() {
        this.list()
    },
    methods:{
        close(){
            this.list()
        },
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
            this.loading = true
            this.$api.get('/web/specialist/queryGroup',data).then(reset => {
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
        // 接收授权专家选择值
        transferData(e){
            this.transferShow=e.show
            var data={
                selfGroupId:this.$webapi.getlocal("groupId"),
                specialistGroups:this.idList,
                groupId:e.data
            }
            this.$api.post("/web/specialist/accredit",data).then((res)=>{
                if (res.code==0) {
                    this.$Message.success("授权成功!")
                }
            })
        },
        // 接收申請授权专家组选择值
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
                        type:57
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
        // 导出专家组
        importExpert(){
            // window.location.href
            if(this.idList.length>0){
                if(!this.selectionAll){
                    var data={
                        groupIdList:this.idList
                    }
                    this.$api.exportPost("/web/specialist/exportByGroup", data)
                }else{
                    var data={
                        groupId:this.$webapi.getlocal("groupId"),
                        pageSize:this.pageData.totalCount,
                        pageNum: 1
                    }
                    this.$api.exportPost("/web/specialist/exportByGroup", data)
                }
            }else{

                this.$Message.warning("请选择需要导出的专家账号!")
            }
        },
        addGroup(){
            this.addShow=true;
        },
        // 选择数据变化
        selectChange(e){
            this.selList=e;
            if(this.selectionAll){
                if (e.length<this.idList.length) {
                    this.selectionAll=false;
                    this.idList=[];
                    e.forEach((val)=>{
                        this.idList.push(val.groupId);
                    })
                }else{
                    this.idList=[];
                    e.forEach((val)=>{
                        this.idList.push(val.groupId);
                    })
                }
            }else{
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.groupId);
                })
            }
            // e.forEach((val)=>{
            //     this.idList.push(val.groupId);
            // })
            // if(this.selectionAll){
            //     this.selectionAll=false;
            // }
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
            var _this=this;
            var data={
                groupId:item.groupId
            }
            this.$api.get("/web/specialist/updateGroupStatus", data).then(reset => {
                if (reset.code == 0) {
                    this.list()
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 批量删除组
        removeGroup () {
            if(this.idList.length>0){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除吗?</p>',
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
                            this.del()
                        }else{
                            this.$Message.warning("暂无删除【"+noDel.groupName+"】组的权限!")
                        }
                    },
                    onCancel: () => {

                    }
                });
            }else{
                this.$Message.warning("请选择需要删除的组!")
            }
        },
        del (item){
            let _this = this;
            var data = {
                selfGroupId:this.$webapi.getlocal("groupId"),
                groupIds:this.idList
            }
            this.$api.post("/web/specialist/deleteGroup", data).then(reset => {
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
            this.list();
        },
        exportExpoData(e){
            this.expoShow=e.show
        },
        exportEditData(e){
            this.editShow=e.show
        },
        // table行内样式
        rowClassName (row, index) {
            if (index%2 === 1) {
                return 'expandClass';
            }
        },
        // 查询
        // 查询条件
        schoolChange(){
            this.list();
        },
        jobTitleChange(){
            this.list();
        },
        majorChange(){
            this.list();
        },
        edit(name, i){
            this.$set(this.objArr[i], name+'Edit', true)
        },
        rename(name, i, e){
            this.$set(this.objArr[i], name, e)
            this.$set(this.objArr[i], name+'Edit', false)
            let data = {
                name: e,
                groupId: this.objArr[i].groupId
            }
            this.$api.get('/usercenter/specialist/updateExpertGroupName',data).then(res=>{})
        }
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
