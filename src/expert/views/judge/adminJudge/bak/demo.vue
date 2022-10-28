<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <Form ref="formValidate" :model="formValidate" label-position="left" :label-width="60" style="text-align:left;">
                    <Row style="margin-bottom:15px;">
                        <Col :span="3">
                            <Select v-model="formValidate.compId" filterable placeholder="请选择赛项">
                                <Option v-for="(item,index) in competitionData" :value="item.id" :key="item.id" @click.native="itemChange(item)">{{item.name}}</Option>
                            </Select>
                        </Col>
                        <Col :span="2" style="margin-left:15px;">
                            <Select v-model="rowId" filterable placeholder="请选择赛段">
                                <Option v-for="(item,index) in rowidData" :value="item.rowId" :key="item.rowId" @click.native="rowIdChange(item)">{{item.rowName}}</Option>
                            </Select>
                        </Col>
                        <Col :span="2" style="margin-left:15px;">
                            <Input search v-model="searchValue" placeholder="作品编号/作品名称/学校/团队名/参赛者" @on-search="searchChange"/>
                        </Col>
                    </Row>
                </Form>
            </div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <Button type="default" @click="statisticsClick">评审统计</Button>
                <Button type="default" @click="checkRecord(2)">作品评审记录</Button>
                <Button type="default" @click="checkRecord(1)">专家评审记录</Button>
                <Button type="primary" @click="expertList" :loading="loadShow">导出全部</Button>
			</div>
            <div class="tableListForm">
                <p class="calculation">分数计算</p>
                <RadioGroup v-model="countType" class="calculationRadio" @on-change='changeCountType'>
                    <Radio :label="1">
                        <span>原始值</span>
                    </Radio>
                    <Radio :label="0">
                        <span>去掉最高分和最低分的均值</span>
                    </Radio>
                    <Radio :label="2">
                        <span>去掉最低分</span>
                    </Radio>
                    <Radio :label="3">
                        <Tooltip :content="countTypeContent" max-width='300'>
                            <span>离散算法 </span> <Icon type="ios-alert" />
                        </Tooltip>
                    </Radio>
                    <Radio :label="4">
                        <Tooltip content="每位专家需分配相同数量的作品并全部评审完毕。系统根据作品在分组内各专家的名次权重得到排名系数，系数越小排名越靠前" max-width='300'>
                            <span>排名加权 </span> <Icon type="ios-alert" />
                        </Tooltip>
                    </Radio>
                </RadioGroup>
                <Button v-if="datas && datas.scoreStatus==1" type="primary" style="vertical-align: top; margin: 7px 0 0 10px;" @click="getDatas">刷新</Button>
                <updateScoreRule  :datas='datas' v-else :countType='countType' :close='changeCountType'/>
            </div>
			<div style="margin-top:15px;" v-loading='spinShow'>
                <Table border :columns="columnsdata" :data="objArr" ref="selection">
                    <!-- 作品编号 -->
                    <template slot="id" slot-scope="{ row }">
                        <div @click="toexpertDetail(row)">
                            <a>{{row.id}}</a>
                        </div>
                    </template>
                    <!-- 作品名称 -->
                    <template slot="name" slot-scope="{ row }">
                        <div @click="toexpertDetail(row)">
                            <a>{{row.title}}</a>
                        </div>
                    </template>
                    <!-- 作品组名 -->
                    <template slot="poolGroupName" slot-scope="{ row, index }"> 
                        <div v-if="row.poolGroupName">
                            {{row.poolGroupName}}
                            <span v-if="!row.poolSortEdit">({{row.poolSort || 0 }})</span>
                            <Icon v-if="!row.poolSortEdit" type="ios-create-outline" @click="editPoolSort(index, true)"/>
                            <Input v-if="row.poolSortEdit" v-model="objArr[index].poolSort" on-enter="editPoolSort(index,false)" @on-blur="editPoolSort(index,false)"/>
                        </div>
                        <div v-else>
                            暂未分组
                        </div>
                    </template>
                    <!-- 历史评审 -->
                    <template slot="history" slot-scope="{ row }"> 
                        <reviewHistory :importData='row'></reviewHistory>
                    </template>
                    <!-- 总得分 -->
                    <template slot="score" slot-scope="{ row }"> 
                        <div v-if="datas && datas.scoreStatus==1">计算中</div>
                        <poptipComponent v-else :importData='row'></poptipComponent>
                    </template>
                    <!-- 评审状态 -->
                    <template slot="reviewStatus" slot-scope="{ row }"> 
                        <div v-if="row.reviewStatus==2">已评审</div>
                        <div v-else-if="row.reviewStatus==0" style="color:red;">未分配</div>
                        <div v-else>已分配</div>
                    </template>
                    <!-- 评审详情 -->
                    <template slot="reviewDetail" slot-scope="{ row }"> 
                        <expertDetail :importData="row" :rowId='rowId'/>
                    </template>
                </Table>
                <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
			</div>
		</div>
    </div>
   
</div>
</template>
<script>
import paging from "@/expert/components/pub/page"
import provices from "@/expert/until/province.js"
import poptipComponent from "./common/poptipComponent"
import reviewHistory from "./common/reviewHistory"
import expertDetail from "./common/expertDetail"
import updateScoreRule from './common/updateScoreRule'
import treeTable from './common/treeTable'

let Base64 = require('js-base64').Base64
export default {
    components:{
        paging,
        poptipComponent,
        reviewHistory,
        expertDetail,
        updateScoreRule,
        treeTable,
    },
    data () {
        return {
            countType: 0,
            datas:{},
            loadShow:false,
            compData:[],//选择赛项
            pageShow:false,//分页是否显示
            // 查询条件
            formValidate:{
                groupName:'',
                compId:'',
                status:'',
                rowId:'',
                province:'',
                poolGroupName: ''
            },
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
                totalCount:50
            },
            columnsdata: [],
            objArr: [],
            groupId:this.$webapi.getlocal("groupId"),

            isDone:false,//是否已经发布
            spinShow:false,//加载中
            searchValue:'',//搜索内容
            
            type:'',//状态
            provinceList:[], //省份筛选
            filterTeam: [], //作品组名筛选
            competitionData:[],
            rowidData:[],
            rowId: '',
        }
    },
    created(){
        this.provinceList=provices.provinces()
        this.getFilterTeam()
        
        if (this.$route.query.province) {
            this.formValidate.province = this.$route.query.province
        }
        if (this.$route.query.poolGroupName) {
            this.formValidate.poolGroupName = this.$route.query.poolGroupName
        }
        if (this.$route.query.searchValue) {
            this.searchValue = this.$route.query.searchValue
        }
        if (this.$route.query.type) {
            this.type = parseInt(this.$route.query.type)
        }
        // window.addEventListener('beforeunload', () => {
        //     if(this.$webapi.getlocal("pattern")){
        //         localStorage.removeItem('pattern');
        //     }
        // });
        if(this.$store.state.judge.compChild.length>0){
            this.compData=this.$store.state.judge.compChild
            this.formValidate.compId=this.$store.state.judge.selComptition
            this.$store.dispatch("getPattern").then((value)=>{
                if (value && value.isDone) {
                    this.isDone=true
                    this.$Message.warning("已晋级到下一赛段,不能操作有关内容!")
                }else{
                    this.isDone=false
                }
                this.countType = value && value.countType || 0
                this.datas = value
                this.list();
            })
        }else{
            this.getCompChild().then(val=>{
                if (val.length>0) {
                    this.$store.dispatch("getPattern").then((value)=>{
                        if (value && value.isDone) {
                            this.isDone=true
                            this.$Message.warning("已晋级到下一赛段,不能操作有关内容!")
                        }else{
                            this.isDone=false
                        }
                        this.countType = value && value.countType || 0
                        this.datas = value
                        this.list();
                    })
                }
            })
        }
    },
    computed:{
        compDatas:{
            get(vals){
                return this.$store.state.judge.compChild;
            },
            set(val){
            },
        },
        countTypeContent(){
            let num = this.datas&&this.datas.deviation||0.05;
            return '为了算法的公平，需要所有专家评审完分配的作品。最终计算总分误差绝对值小于' + num
        }
    },
    watch: {
        compDatas:{
            immediate: true, // immediate选项可以开启首次赋值监听
            handler(newVal,oldVal){
                this.competitionData=newVal;
            }
        },
    },
    methods:{
        toexpertDetail(row){
            let competitionId = this.$webapi.getlocal('competitionId')
            let rowId = this.$webapi.getlocal('rowId')
            let pattern = this.$webapi.getlocal('pattern')

            this.$router.push({
                path:"/expert/detail",
                query:{
                    id: Base64.encode(row.id),
                    reviewStatus: row.reviewStatus,
                    groupId: Base64.encode(row.groupId),
                    competitionId: competitionId,
                    rowId: rowId,
                    pattern: pattern
                }
            })
        },
        getFilterTeam(){
            this.$api.get('review/resource/selectGroupNames',{
                rowId: this.$webapi.getlocal("rowId")
            }).then((res)=>{
                if(res.code==0){
                    let arr = []
                    for(let i in res.data){
                        arr.push({
                            label: res.data[i]+'',
                            value: res.data[i]+''
                        })
                    }
                    this.filterTeam = arr

                }else{
                    this.filterTeam = []
                    this.$netcode.getApiCode(res)
                }
            })
            
        },
        changeCountType(val){
            // 后台设置分数
            this.$api.get('/review/resource/updateScore',{
                rowId:this.$webapi.getlocal("rowId"),
                countType: val
            }).then(res=>{
                if(res.code==0){
                    // 查看是否计算完成 scoreStatus == 1时正在计算
                    this.$store.dispatch("getPattern").then((value)=>{
                        if(val==0 || val){
                            this.countType = val
                        }
                        this.datas = value
                        if(value){
                            if (value.isDone) {
                                this.isDone=true
                                this.$Message.warning("已晋级到下一赛段,不能操作有关内容!")
                            }else{
                                this.isDone=false
                            }
                            // 获取列表
                            this.searchChange()
                        }else{
                            this.$Message.warning("暂无数据")
                            this.objArr=[]
                            this.pageShow=false;
                        }
                    })
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
            
        },
        editPoolSort(i, flag){
            this.$set(this.objArr[i],'poolSortEdit', flag)
            if(!flag){
                this.$api.get('/review/resource/exchangePoolSort',{
                    poolId: this.objArr[i].id,
                    sort: this.objArr[i].poolSort
                }).then(res=>{
                    if(res.code==0){
                        this.$Message.success('修改成功')
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            }
        },
        getCompChild () {
            let _this = this
            let data={
                competitionId:this.$webapi.getlocal("compId")
            }
            return new Promise((relove,reject)=>{
                this.$api.get('web/competition/childsReviewCompetition',data).then(reset => {
                    if (reset.code == 0) {
                        this.compData=reset.data
                        if (this.compData.length!=0) {
                            let name=this.compData[0].name
                            this.formValidate.compId=this.compData[0].id
                            this.rowId=this.compData[0].rowId
                            this.$store.commit("selComptitionJudge",this.formValidate.compId)
                            this.$store.commit("selComptitionName",name)
                            this.$store.commit("compChildJudge",this.compData)
                            this.$webapi.savelocal("competitionId",this.formValidate.compId)
                            this.$webapi.savelocal("rowId",this.rowId)
                        }
                        relove(this.compData)
                    }else {
                        _this.pageShow=false;
                        _this.$netcode.getApiCode(reset)
                    }
                })
            })
        },
        getRowId(){
            let data = {
                competitionId: this.$webapi.getlocal('competitionId')
            }
            this.$api.get('/web/competition/rowIds',data).then(res =>{
                this.rowId = this.$webapi.getlocal("rowId");
                if(res.code == 0){
                    this.rowidData = res.data || []
                }else{
                    this.$$netcode.getApiCode(res)
                }
            })
        },
        async list () {
            let _this = this
            this.spinShow=true
            let data={
                groupId:this.$webapi.getlocal("groupId"),
                pattern:this.$webapi.getlocal("pattern"),
                competitionId:this.$webapi.getlocal("competitionId"),
                rowId:this.$webapi.getlocal("rowId"),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            let url = '?'
            if (this.formValidate.province) {
                data.province=this.formValidate.province
                url += '&province='+this.formValidate.province
            }
            if (this.formValidate.poolGroupName) {
                data.poolGroupName=this.formValidate.poolGroupName
                url += '&poolGroupName='+this.formValidate.poolGroupName
            }
            if (this.searchValue) {
                data.q=this.searchValue
                url += '&searchValue='+this.searchValue
            }
            if (this.type!=='' && this.type!=undefined) {
                data.type=this.type
                url += '&type='+this.type
            }

            if(url != '?'){
                url = url.replace(/\?&/g,'?')
                this.$router.push('/expert/judge'+url)
            }else{
                this.$router.push('/expert/judge')
            }

            if(this.$webapi.getlocal("pattern")){
                data.pattern=this.$webapi.getlocal("pattern")
                this.posts(data);
            }else{
                this.$store.dispatch("getPattern").then(()=>{
                    data.pattern=this.$webapi.getlocal("pattern")
                    this.posts(data);
                })
            }
            this.getRowId();

        },
        posts(data){
            var _this=this;
            this.$api.post('review/resource/getReviewList',data,{},{pipe:true}).then(reset => {
                if (reset.code == 0) {
                    if (reset.data) {
                        this.objArr=reset.data.list
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.pageData.pageCurrent=reset.data.pageNum//当前页
                        _this.pageData.pagesize=reset.data.pageSize
                        var j=5
                        var arr1=this.coldata();
                        
                        this.columnsdata=arr1;
                        this.spinShow=false
                        _this.pageShow=true;

                    }else{
                        this.objArr=[];
                        this.spinShow=false
                        this.pageShow=false;
                    }
                }else {
                    this.spinShow=false
                    _this.pageShow=false;
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 搜索
        searchChange(){
            this.pageData.pageCurrent=1
            this.list();
            this.getFilterTeam();
        },
        rowIdChange(e){
            this.$webapi.savelocal("rowId",e.rowId)
            this.formValidate.province = ''
            this.formValidate.poolGroupName = ''
            this.searchValue = ''
            this.type = ''
            this.getDatas();
            this.getFilterTeam();
        },
        // 赛项
        itemChange(e){
            this.$webapi.savelocal("competitionId",e.id)
            this.$webapi.savelocal("rowId",e.rowId)
            this.$store.commit("selComptitionJudge",e.id)
            this.$store.commit("selComptitionName",e.name)
            this.formValidate.province = ''
            this.formValidate.poolGroupName = ''
            this.searchValue = ''
            this.type = ''
            this.getDatas();
            this.getFilterTeam();
        },
        getDatas(){
            this.$store.dispatch("getPattern").then((value)=>{
                this.countType = value && value.countType || 0
                this.datas = value
                if(value){
                    if (value.isDone) {
                        this.isDone=true
                        this.$Message.warning("已晋级到下一赛段,不能操作有关内容!")
                    }else{
                        this.isDone=false
                    }
                    this.list();

                }else{
                    this.$Message.warning("暂无数据")
                    this.objArr=[]
                    this.pageShow=false;
                }
            })
        },

        // 参赛状态
        stateChange(item,e){
            var data={
                id:item.id
            }
            this.$api.get("/review/resource/updateResourcePoolStatus", data).then(reset => {
                if (reset.code == 0) {
                    this.list()
                }else {
                    this.$netcode.getApiCode(reset)
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        // 导出全部作品
        expertList(){
            this.loadShow=true;
            var data={
                competitionId:this.$webapi.getlocal("competitionId"),
                rowId:this.$webapi.getlocal("rowId")
            }
            this.$api.exportPost("/review/review/export/getAllReviewList", data)
            .then(res => {this.loadShow=false})
        },
        // 查看分配记录
        checkRecord(flag){
            let rowId = this.$webapi.getlocal("rowId") //赛程id
            let competitionId = this.$webapi.getlocal("competitionId") //赛项id
            var data={
                groupId:this.$webapi.getlocal("groupId"),
                pattern:this.$webapi.getlocal("pattern"),// 0：作品 1：附件
                competitionId: competitionId,
                rowId:rowId,
                pageNum:1,
                pageSize:1,
            }
            this.$api.post("/review/resource/getDistributionInfo",data)
            .then(res => {
                if (res.code == 0) {
                    if (res.data.list && res.data.list.length>0) {
                        if(flag==1){
                            this.$router.push("/expert/record?rowId="+rowId+'&competitionId='+competitionId)
                        }else if(flag==2){
                            this.$router.push("/expert/worksRecord?rowId="+rowId+'&competitionId='+competitionId)
                        }
                    }else{
                        this.$Message.warning({
                            content:"还未分配过专家",
                            duration:3
                        })
                    }
                }else {
                    this.$netcode.getApiCode(res)
                }
            })
        },
        // 评审统计
        statisticsClick(){
            let rowId = this.$webapi.getlocal("rowId") //赛程id
            let competitionId = this.$webapi.getlocal("competitionId") //赛项id
            this.$router.push("/expert/statistics?rowId="+rowId+'&competitionId='+competitionId)
        },
        // 表头数据
        coldata(){
            var _this=this;
            return [
                {
                    title: '作品编号',
                    align: 'center',
                    minWidth:50,
                    slot: 'id',
                },
                {
                    title: '作品名称',
                    align: 'center',
                    minWidth:70,
                    slot: 'name',
                },
                {
                    title: '作品组名',
                    align: 'center',
                    minWidth:90,
                    slot: 'poolGroupName',
                    className:"poolGroupName-wrap",
                    filters:this.filterTeam,
                    filterMultiple: false,
                    filteredValue: [ _this.formValidate.poolGroupName],
                    filterRemote (value) {
                        _this.formValidate.poolGroupName=value[0]
                        _this.pageData.pageCurrent=1
                        _this.list();
                    }
                },
                {
                    title: '历史评审',
                    align: 'center',
                    minWidth:90,
                    slot: 'history',
                },
                {
                    title: '省份',
                    minWidth:80,
                    align: 'center',
                    key: 'province',
                    className:"province-wrap",
                    filters:this.provinceList,
                    filterMultiple: false,
                    filteredValue: [ _this.formValidate.province],
                    filterRemote (value) {
                        _this.formValidate.province=value[0]
                        _this.pageData.pageCurrent=1
                        _this.list();
                    }
                },
                {
                    title: '团队名/参赛者',
                    align: 'center',
                    minWidth: 70,
                    key: 'groupName'
                },
                {
                    title: '得分详情',
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(treeTable,{
                            props:{
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '总得分',
                    align: 'center',
                    minWidth: 80,
                    slot: 'score',
                },
                {
                    title: '评审状态',
                    align: 'center',
                    minWidth: 90,
                    slot: 'reviewStatus',
                    filters: [
                        {
                            label: '已分配',
                            value: 1
                        },
                        {
                            label: '未分配',
                            value: 0
                        },
                        {
                            label: '已评审',
                            value: 2
                        },
                    ],
                    filteredValue: [ _this.type],
                    filterMultiple: false,
                    filterRemote(value, row){
                        _this.type=value[0];
                        _this.list();
                    }
                },
                {
                    title: '评审详情',
                    align: 'center',
                    minWidth: 70,
                    slot: 'reviewDetail'
                },
                {
                    title: '参赛状态',
                    align: 'center',
                    width: 70,
                    key: 'status',
                    // 改不动，不敢改 2020-08-25
                    render: (h, params) => {
                        var str="启用中"
                        var switch1=true
                        var accreditShow="inline-block"
                        if (this.groupId != -1) {
                            if(params.row.status==2){
                                str="禁用中"
                                switch1=false
                            }else if(params.row.status==1){
                                str="启用中"
                                switch1=true
                            }else if(params.row.status==3){
                                accreditShow="none"
                                str="已晋级"
                            }else if(params.row.status==4){
                                accreditShow="none"
                                str="已淘汰"
                            }else if(params.row.status==5){
                                accreditShow="none"
                                str="已违规"
                            }
                        }else{
                            accreditShow="none"
                            if(params.row.status==2){
                                str="禁用中"
                            }else{
                                str="启用中"
                            }
                        }
                        return h('div', [
                            h('i-switch', {
                                props: {
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
            ]
        },
    }
  }
</script>
<style lang="less" scoped>
    .rule{
        /deep/.ivu-table-cell{
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    .page-component-bd{
        position: relative;
    }
    .red{
        color:red;
    }
    div.page-component-view{
        margin:0px;
    }
    .tableListOperator{
        position: absolute;
        top: 0;
        right: 0;
        // left:400px;
    }
    .tableListOperator button{
        margin-bottom: 10px;
    }
    .demo-spin-icon-load{
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
    .tableListForm{
        .calculation{
            display: inline-block;
            vertical-align: top;
            width:80px;
            height:36px;
            background:rgba(0,170,145,1);
            border-radius:0px 0px 14px 0px;
            font-size:14px;
            line-height: 36px;
            font-weight: bold;
            text-align: center;
            color: #ffffff;
            margin: 5px 40px 20px 0 ;
        }
        .calculationRadio{
            line-height: 36px;
            margin: 5px 0 20px;
            .ivu-radio-wrapper{
                font-size: 14px;
                margin-right: 20px;
            }
        }

        /deep/.ivu-tooltip-inner-with-width{
            width: 300px;
        }
    }
</style>
