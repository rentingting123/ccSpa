<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form :model="formCustom" :label-width="0" @submit.native.prevent>
                    <FormItem style="display:inline-block;width:200px;">
                        <Input v-model="formCustom.q" search placeholder="账号关键字" @on-search="handleSubmit">
                            <!-- <Icon type="ios-search" slot="suffix" /> -->
                        </Input>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="importExpert">导出</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="success"  @click="batchStart">批量启用</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="error"  @click="batchEnd">批量禁用</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="batchPassword">批量修改密码</Button>
                    </FormItem>
                    <FormItem style="display:inline-block;margin-left:15px;">
                        <Button type="primary"  @click="addAccount">添加账号</Button>
                    </FormItem>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Button type="primary"  @click="add()">新增</Button> -->
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
						<Table border :columns="columnsdata" :data="objArr"
                            @on-selection-change="selectChange"
                            @on-select-all="selectionAllChange"
                            :loading='loading'
                            @on-select-all-cancel="cancelAllChange">
                        </Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
        <add-index :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-index>
        <!-- <edit-index :importShow="editShow" :importData="editData" @exportData="exportEditData" v-if="editShow"></edit-index>
        <expo-index :importShow="expoShow" :importData="expoData" @exportData="exportExpoData" v-if="expoShow"></expo-index> -->
    </div>
</div>
</template>
<script>
import paging from "@/usercenter/views/pub/page"
import addIndex from "./addIndex"
// import editIndex from "./editIndex"
// import expoIndex from "./expoIndex"
export default {
    components:{
        paging,
        addIndex,
        // editIndex,
        // expoIndex
    },
    data () {
        return {
            loading: false,
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
                arrPageSize:[10,50,100],
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
                    width: 80,
                    align: 'center',
                },
                {
                    title: '账号编码',
                    align: 'left',
                    align: 'center',
                    key: 'loginName'
                },
                {
                    title: '使用状态',
                    align: 'center',
                    key: 'status',
                    render: (h, params) => {
                        var str="启用中"
                        var switch1=true
                        var accreditShow="inline-block"
                        // if (params.row.accredit) {
                            if(params.row.status==1){
                                str="启用中"
                                switch1=true
                            }else{
                                str="禁用中"
                                switch1=false
                            }
                        // }else{
                        //     accreditShow="none"
                        //     if(params.row.status==1){
                        //         str="启用中"
                        //     }else{
                        //         str="禁用中"
                        //     }
                        // }
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
                    }
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
            idList:[],//选中账号数据
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (to.path=='/system/expert/expertTemporary') {
                vm.$store.commit('tabNumExpert','1-2')
            }
        })
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
                pageSize:_this.pageData.pagesize,
                type:6
            }
            if (this.formCustom.loginName) {
                data.loginName=this.formCustom.loginName
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
        // 选择数据变化
        selectChange(e){
            // this.idList=[];
            // e.forEach((val)=>{
            //     this.idList.push(val.id);
            // })
            // if(this.selectionAll){
            //     this.selectionAll=false;
            // }
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
        // 导出专家组
        importExpert(){
            // window.location.href
            if(this.idList.length>0){
                //if(!this.selectionAll){
                    var data={
                       // userList:this.idList,
                        type:6
                    }
                    this.$api.exportPost("/web/specialist/export", data)
            }else{
                this.$Message.warning("请选择需要导出的专家账号!")
            }
        },
        // 状态是否启用
        stateChange(item,e){
            var type=0
            if (e) {
                type=1
            }
            var _this=this;
            var arr=[]
            arr.push(item.id)
            var data={
                idList:arr,
                type:type
            }
            this.$api.post("/web/specialist/updateTemporaryStatus", data).then(reset => {
                if (reset.code == 0) {
                    this.list()
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 批量启用
        batchStart(){
            if(this.idList.length>0){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要批量启用吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            idList:this.idList,
                            type:1
                        }
                        this.$api.post("/web/specialist/updateTemporaryStatus", data).then(reset => {
                            if (reset.code == 0) {
                                this.$Message.success("启用成功!")
                                this.list()
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            }else{

                this.$Message.warning("请选择需要启用的专家账号!")
            }
        },
        // 批量禁用
        batchEnd(){
            if(this.idList.length>0){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要批量禁用吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            idList:this.idList,
                            type:0
                        }
                        this.$api.post("/web/specialist/updateTemporaryStatus", data).then(reset => {
                            if (reset.code == 0) {
                                this.$Message.success("禁用成功!")
                                this.list()
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            }else{

                this.$Message.warning("请选择需要禁用的专家账号!")
            }
        },
        // 批量修改密码
        batchPassword(){
            if(this.idList.length>0){
                this.handleRender(this.idList)
            }else{
                this.$Message.warning("请选择需要修改密码的专家账号!")
            }
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
                },
                onCancel: () => {

                }
            })
        },
        // 添加账号
        addAccount(){
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
            this.list();
        },
        exportExpoData(e){
            this.expoShow=e.show
        },
        exportEditData(e){
            this.editShow=e.show
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
