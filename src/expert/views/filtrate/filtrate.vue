<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>晋级淘汰</BreadcrumbItem>
                    <BreadcrumbItem>晋级淘汰</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>晋级淘汰</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">
                    <div class="sourch" >
                        <chooseId :rowId='rowId' :cId='cid' :rowIdChange='rowIdChange' :cIdChange='itemChange' />
                        
                        <Input v-model="formValidate.num" 
                            v-if='!(filtrateType==1 || filtrateType==2 || statusType==3)' 
                            type="number" 
                            placeholder="数字" 
                            class="btn-loading" 
                            style="width:160px;min-width:160px;">
                            <span slot="prepend">晋级</span>
                            <Select slot="append"
                                v-model="formValidate.filtrateType" 
                                filterable placeholder="名"
                                style="width:60px;">
                                <Option value="名">名</Option>
                                <Option value="分">分</Option>
                            </Select>
                        </Input>
                        <Button type="primary" 
                            @click="goSubmit" 
                            v-if="!(filtrateType==1 || filtrateType==2 || statusType==3)" 
                            :disabled="isDone" 
                            class="btn-loading" 
                            :loading="isLoading">
                            保存
                        </Button>
                        <Dropdown class="btn-loading" @on-click='chooseType'>
                            <Button type="primary">&nbsp;晋级提交&nbsp;<Icon type="ios-arrow-down"></Icon></Button>
                            <DropdownMenu slot="list">
                                <DropdownItem style="text-align:center;" name="1"  :disabled="isDone">赛段晋级</DropdownItem>
                                <DropdownItem style="text-align:center;" name="2" :disabled="reviewTypeShow">组织晋级</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                    </div>
                    <div >
                        <div class="" style="display:inline-block;vertical-align: middle;">
                            <Input v-model="formValidate.q" search placeholder="请输入姓名或手机号关键字" @on-search="handleSearch">
                                <Select v-model="formValidate.province" slot="prepend" style="width: 72px">
                                    <Option value="关键字">关键字</Option>
                                    <Option value="省份">省份</Option>
                                    <Option value="团队">团队</Option>
                                </Select>
                            </Input>
                        </div>
                    </div>
    			</div>
                <div class="tableListFormBottom">
                    <Button type="primary" @click="uploadTable">下载专家签名评分表</Button>
                    <Button type="error" @click="del" class="btn-loading" :loading="delLoading">删除专家签字评分表</Button>
                    <Button type="primary" @click="expertDetail" class="btn-loading" :loading="expertDetailShow">导出专家评分详情</Button>
                    <Button type="primary" @click="importResult" class="btn-loading" :loading="loadShow">导出</Button>
                    <div class="btn-wrap" style="margin-left:15px;" v-if="!isDone">
                        <uploadComponent  
                            info="导入功能用于批量修改状态及得分。请先导出表格，修改后再导入。状态栏只写晋级或淘汰；得分为0-100分，保留小数后2位。" 
                            importData="review/review/import/resourcePoolList" 
                            :datas='{competitionId: cid}' 
                            @exportData="exportResult">
                        </uploadComponent>
                    </div>
                </div>
                
                <div class="">
                    <Table border :columns="columnsdata" :data="objArr"
                        ref="selection" :loading='spinShow'>
                    </Table>
                    <div class="mt20">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
                    </div>
                </div>
    		</div>
        </div>
        <!-- 赛段晋级弹窗 -->
        <stage :id='cid' v-if="stageShow" :rowId='rowId' @exportData="exportstage"/>
        <!-- 组织晋级弹窗 -->
        <promotedComp :importShow="promotedCompShow" :id='cid' :rowId='rowId' v-if="promotedCompShow" @exportData="exportPromotedCompData"></promotedComp>
    </div>
</template>
<script>
    import paging from "@/expert/components/pub/page"
    import promotedComp from "./common/promotedComp"
    import stage from "./common/stage"
    import uploadComponent from "@/expert/components/pub/upload"
    import chooseId from '@/expert/components/chooseId'
    import util from '@@/utils/util'

    export default {
        components:{
            paging,
            promotedComp,
            stage,
            uploadComponent,
            chooseId,
        },
        data () {
            return {
                isLoading:false,
                promotedCompShow:false,//组织晋级
                stageShow: false, //赛段晋级
                loadShow:false,
                expertDetailShow:false,//导出评分详情
                delLoading: false, //删除专家签字表loading
                pageShow:false,//分页是否显示
                spinShow:false,//加载中
                // 查询条件
                formValidate:{
                    groupName:'',
                    filtrateType:"名",
                    q:'',
                    province:'关键字'
                },
                filtrateType: 0, // 晋级方式 1晋级  2淘汰
                statusType: 0, //3的时候晋级
                cid: '',
                rowId: '',
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[30,50,80],
                    //分页大小
                    pagesize:30,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                columnsdata: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 68,
                        align: 'center'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        minWidth: 100,
                        key: 'status',
                        render: (h, params) => {
                            var str="未晋级"
                            var switch1=false
                            var isShow="inline-block"
                            if (params.row.status==3) {
                                str="已晋级"
                                switch1=true
                            }else if (params.row.status==6) {
                                str="待晋级"
                                switch1=true
                            }else if(params.row.status==4){
                                str="已淘汰"
                                switch1=false
                            }else{
                                str="未晋级"
                                switch1=false
                            }
                            
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        value:switch1,
                                        size: 'small',
                                        disabled: params.row.status==3 || params.row.status==4
                                    },
                                    style: {
                                        display:isShow,
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
                        title: '作品编号',
                        align: 'center',
                        minWidth:100,
                        key: 'poolId'
                    },
                    {
                        title: '作品名称',
                        align: 'center',
                        minWidth:100,
                        key: 'poolName'
                    },
                    {
                        title: '学校',
                        minWidth:100,
                        align: 'center',
                        key: 'school'
                    },
                    {
                        title: '团队名/参赛者',
                        align: 'center',
                        minWidth:100,
                        key: 'groupName'
                    },
                    {
                        title: '负责人',
                        align: 'center',
                        minWidth:100,
                        key: 'name'
                    },
                    {
                        title: '联系电话',
                        align: 'center',
                        minWidth:120,
                        key: 'phone'
                    },
                    {
                        title: '省份',
                        align: 'center',
                        minWidth:120,
                        key: 'province'
                    },
                    {
                        title: '得分',
                        align: 'center',
                        minWidth:80,
                        key: 'score'
                    }
                ],
                objArr: [],
                isDone:false,//是否已经发布结果
                reviewTypeShow:false,//是否晋级国赛

                compData:[],
                rowidData:[],
                phone: ''
                
            }
        },
        methods: {
            initPattern(){
                var data={
                    competitionId: this.cid,
                    rowId: this.rowId
                }
                this.$api.get('review/review/rule/get',data).then(res => {
                    if(res.code == 0){
                        if (res.data && res.data.isDone) {
                            this.isDone=true
                            this.$Message.warning("已晋级到下一赛段,不能操作有关内容!")
                        }else{
                            this.isDone=false
                        }

                        // 是否组织晋级 包含1时组织晋级
                        let reviewType = res.data && res.data.reviewType 
                        if (reviewType && reviewType.indexOf(1)>-1) {
                            this.reviewTypeShow=true
                        }else{
                            this.reviewTypeShow=false
                        }
                        
                    }
                })
            },
            rowIdChange(e){
                this.rowId = e.rowId
                this.list();
                this.initPattern()
            },
            // 赛项
            async itemChange(e){
                this.rowId = e.rowId
                this.cid = e.id
                this.list();
                this.initPattern()
            },
            list () {
                let _this = this
                this.spinShow=true
                var data={
                    rowId: this.rowId,
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    groupId: this.$webapi.getlocal("groupId"),
                }
                if (this.formValidate.q) {
                    if(this.formValidate.province=='关键字'){
                        data.q=this.formValidate.q
                    }else if(this.formValidate.province=='省份'){
                        data.province=this.formValidate.q
                    }else if(this.formValidate.province=='团队'){
                        data.team=this.formValidate.q
                    }
                }
                this.$api.post('review/review/resourcePoolList',data).then(reset => {
                    this.spinShow=false
                    this.filtrateType=0
                    this.statusType = 0
                    if (reset.code == 0) {
                        if(reset.data){
                            this.objArr=reset.data.list
                            _this.pageData.pageCount=reset.data.pages//总页数
                            _this.pageData.totalCount=reset.data.total//总条数
                            // _this.pageData.pagesize=reset.data.pageSize
                            if(this.objArr.length>0){
                                _this.filtrateType=this.objArr[0].type
                                _this.statusType=this.objArr[0].status
                                _this.pageShow=true;
                            }
                        }else{
                            _this.objArr=[];
                        }
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 赛段晋级弹窗关闭
            async exportstage(e){
                this.stageShow = e.show;
                if(e.reload){
                  await this.initPattern();
                }
                this.list()
            },
            // 组织晋级弹窗关闭
            exportPromotedCompData(e){
                this.promotedCompShow=e.show;
                if(e.reload){
                    this.list()
                }
            },
            // 导出专家作品评分详情
            expertDetail(e){
                this.expertDetailShow=true;
                var data={
                    rowId: this.rowId,
                    competitionId:this.cid
                }
                this.$api.exportGet("review/resource/expertScoreInfo",data).then(()=>{
                    this.expertDetailShow=false
                })
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            goSubmit(){
                if(!this.formValidate.num){
                    return this.$Message.warning("请填写晋级数据!")
                }

                var data={
                    rowId:this.rowId,
                    groupId:this.$webapi.getlocal("groupId"),
                    competitionId: this.cid,
                    type: 1, //1晋级  2淘汰
                }
                if(this.formValidate.filtrateType=="分"){
                    data.score=this.formValidate.num
                }else{
                    if(this.formValidate.num>this.pageData.totalCount || this.formValidate.num<0){
                        return this.$Message.warning("请填入晋级名数，且不超过当前数据!")
                    }
                    data.num = this.formValidate.num
                }
                this.isLoading=true;

                this.$api.post('/review/review/promoted/list',data).then(reset => {
                    if (reset.code == 0) {
                        this.isLoading=false;
                        this.$Message.success("成功!")
                        this.list();
                    }else {
                        this.isLoading=false;
                        this.$netcode.getApiCode(reset)
                    }
                })
                
            },
            chooseType(name){
                if(name==1){
                    // 赛段晋级
                    this.stageShow = true
                }else if(name==2){
                    // 组织晋级
                    this.promotedCompShow=true;
                }
            },
            // 搜索
            handleSearch(){
                this.pageData.pageCurrent=1

                this.list();
            },
            // 导出结果
            importResult(){
                this.loadShow=true;
                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    rowId:this.rowId,
                    competitionId:this.cid
                }
                if(this.formValidate.province=="省份"){
                    data.province=this.formValidate.q
                }
                this.$api.exportGet("/review/review/export/resourcePoolList", data).then(res => {
                    this.loadShow=false;
                })
            },
            // 导入结果
            exportResult(e){
                if (e) {
                    this.list();
                }
            },
            // 导出导出专家签名评分表
            uploadTable(){
                var data={
                    rowId:this.rowId,
                    competitionId:this.cid
                }
                this.$api.exportGet("/review/review/export/signNameZip", data)
            },
            // 删除专家签字评分表
            del(){
                this.$Modal.confirm({
                    title: '提示',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.phone,
                                autofocus: true,
                                placeholder: '请输入专家手机号'
                            },
                            on: {
                                input: (val) => {
                                    this.phone = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        if(!this.phone) return this.$Message.warning('请输入手机号')
                        if (!util.checkPhone(this.phone)) {
                            return this.$Message.warning('请输入正确的手机号')
                        }
                        this.delLoading = true
                        this.$api.get('/review/delSignature',{
                            rowId: this.rowId,
                            phone: this.phone
                        }).then(res=>{
                            this.delLoading = false
                            if(res && res.code ==0){
                                this.$Message.success('删除成功！')
                            }
                        })
                    }
                })
            },
            // 晋级状态
            stateChange(item,e){
                var _this=this;
                var data={
                    poolId:item.poolId,
                    competitionId:this.cid,
                    rowId:this.rowId
                }
                this.$api.get("/review/review/promotedByPoolId", data).then(reset => {
                    if (reset.code == 0) {
                        this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        },
    }
</script>
<style scoped lang='less'>
    .tableListForm{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .sourch{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .tableListFormBottom{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
    }
    .upload-style{
        display:inline-block;
        margin-bottom:15px;
        margin-left:15px;
        cursor:pointer;
        color:#2089E5;
    }
    .page-component-bd{
        padding:15px;
    }
    .btn-loading{
        margin-left: 15px;
        position: relative;
    }
    .demo-spin-icon-loads{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
