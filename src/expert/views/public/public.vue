<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <!-- <BreadcrumbItem to="/">首页</BreadcrumbItem> -->
                    <BreadcrumbItem >颁奖发布</BreadcrumbItem>
                    <BreadcrumbItem>颁奖发布</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>颁奖发布</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">
                    <div class="sourch-left">
                        <div class="" style="display:inline-block;">
                            <Select v-model="competitionId" filterable placeholder="请选择赛项">
                                <Option v-for="(item,index) in compData" :value="item.id" :key="item.id" @click.native="itemChange(item)">{{item.name}}</Option>
                            </Select>
                        </div>
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Input v-model="search" search placeholder="学校,团队名,队长或手机号" @on-search="handleSubmit" />
                        </div>
                    </div>
                    <div class="sourch-right">
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Button type="primary" @click="importResultMeber">导出公示表</Button>
                        </div>
                        <div class="" style="display:inline-block;margin-left:15px;" v-if="isDone!=2">
                            <uploadComponent 
                                importData="review/award/importGroupList" 
                                @exportData="exportResult">
                            </uploadComponent>
                        </div>
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Button style="background:#00AA91" type="success" @click="setAwards" :disabled="isDone==2">奖项设置</Button>
                        </div>
                        <div class="" style="display:inline-block;margin-left:15px;">
                            <Button type="warning" @click="resultLoadShow=true" :disabled="isDone!=1" class="btn-loading">
                                结果发布
                            </Button>
                            <!-- 结果发布弹窗 -->
                            <finish v-if="resultLoadShow" :id='competitionId' :close='close'/>
                        </div>
                    </div>
    			</div>
    			<!--操作按钮-->
    			<div class="tableListOperator">
                    <div class="title">赛段分数占比</div>
                    <ul>
                        <li v-for="(list,index) in rowsList" :key="index">
                            <span>赛段{{index+1}}： {{list.competition_times[0].name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <InputNumber 
                                :max="100" 
                                :min="0" 
                                :step="0.01" 
                                :precision="2"
                                v-model="list.scoreWeight"
                                size="small"
                                >
                            </InputNumber>  %
                        </li>
                        <div class="buttonSubmit">
                            <Button v-if="showCount" style="background:#00AA91" type="success" :disabled='isDone==2' @click="countFinalScore">最终得分计算</Button>
                            <Button v-else style="background:#00AA91" type="success" @click="getShowCount(true)">刷新</Button>
                        </div>
                    </ul>
    			</div>
                <Row>
    				<Col :xs="24" :sm="24" :md="24" :lg="24">
                        <p style="display:inline-block;margin-bottom:15px;">
                            当前总计：{{pageData.totalCount || 0}}个团队
                            <span v-for="list in prizesList" :key="list.awardName">
                                ，{{list.awardName}}{{list.sum}}个
                            </span>
                        </p>
                        <!-- <p class="result-watch" @click="awardsNum">查看奖项数量</p> -->
    				</Col>
    			</Row>
    			<Row>
    				<Col :xs="24" :sm="24" :md="24" :lg="24">
                        <Table border :columns="columnsdata" :data="objArr" :loading="loadingTable"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
    				</Col>
    			</Row>
    		</div>
        </div>
        <!-- 奖项设置弹窗 -->
        <awards :importShow="awardsShow" :id='competitionId' v-if="awardsShow" @exportData="exportAwardsData"></awards>
        <!-- 查看奖项数量弹窗 -->
        <awardsNum :importShow="awardsNumShow" v-if="awardsNumShow" @exportData="exportAwardsNumData"></awardsNum>
        <!-- <promotedComp :importShow="promotedCompShow" v-if="promotedCompShow" @exportData="exportPromotedCompData"></promotedComp> -->
        <div v-if="loadShow">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>
    </div>
</template>
<script>
    import network from '@@/api/jxapi'
    import paging from "@/expert/components/pub/page"
    import awards from "./awards"
    import awardsNum from "./awardsNum"
    import uploadComponent from "@/expert/components/pub/upload"
    import finish from './common/finish'

    export default {
        components:{
            paging,
            awards,
            awardsNum,
            uploadComponent,
            finish,
        },
        data () {
            return {
                resultLoadShow:false,
                loadShow:false,
                awardsShow:false,
                awardsNumShow:false,
                promotedCompShow:false,
                pageShow:false,//分页是否显示
                // 查询条件
                search: '',
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
                    totalCount:0
                },
                columnsdata: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 64,
                        align: 'center'
                    },
                    {
                        title: '奖项',
                        align: 'center',
                        minWidth:80,
                        key: 'awardName',
                        render:(h,params)=>{
                            var str="暂未设置"
                            if(params.row.awardName){
                                str=params.row.awardName
                            }
                            return h('span', str)
                        }
                    },
                    {
                        title: '得分',
                        align: 'center',
                        children: []
                    },
                    {
                        title: '最终得分',
                        align: 'center',
                        minWidth:87,
                        key: 'totalScore',
                        render:(h,params)=>{
                            return h('span', !this.showCount?'计算中':params.row.totalScore)
                        }
                    },
                    {
                        title: '赛项',
                        align: 'center',
                        minWidth:230,
                        key: 'competitionName'
                    },
                   
                    {
                        title: '学校',
                        align: 'center',
                        minWidth:100,
                        key: 'school'
                    },
                    {
                        title: '团队名/参赛者',
                        align: 'center',
                        minWidth:100,
                        key: 'groupName'
                    },
                    {
                        title: '队长',
                        align: 'center',
                        minWidth:100,
                        key: 'leadName'
                    },
                    {
                        title: '联系电话',
                        align: 'center',
                        minWidth:120,
                        key: 'leadPhone'
                    },

                ],
                objArr: [],
                compData:[],
                isDone: 0,//是否发布
                loadingTable: false,
                rowsList: [], //赛段分数占比列表
                prizesList: [], //获奖数统计
                showCount: true, //是否计算
                competitionId: '',
            }
        },
        created() {
            this.getCompChild().then(val=>{
                this.list();
                this.getIsDone()
                this.getShowCount()
            })
        },
        mounted () {
            
        },
        methods: {
            // 查询竞赛的发布状态 0:未设置奖项 不能发布  1：已经设置奖项 可以发布  2：已经发布  不能操作了
            getIsDone(){
                this.$api.get('/review/award/publishStatus',{
                    competitionId: this.competitionId
                }).then(res=>{
                    if(res.code==0){
                        this.isDone = res.data
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                    this.getSchedule()
                    this.getPrizes()
                })
            },
            // 查询是否计算完毕
            getShowCount(flag){
                this.$api.get('/review/award/selectScoreStatus',{
                    competitionId: this.competitionId
                }).then(res=>{
                    if(res.code==0){
                        this.showCount = !res.data
                        if(flag && this.showCount){
                            this.list()
                        }
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            // 获取奖项列表
            getPrizes(){
                this.$api.get('/review/award/selectAwardNums',{
                    competitionId: this.competitionId
                }).then(res=>{
                    if(res.code==0){
                        this.prizesList = res.data || []
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            // 计算最终得分
            countFinalScore(){
                let sums = 0
                this.rowsList.map(res=>{
                    sums += res.scoreWeight
                })
                if(sums!=100) return this.$Message.warning('赛段分数占比总和必须为100')
                let arr = []
                this.rowsList.map(res=>{
                    arr.push({
                        rowId: res.rowId,
                        scoreWeight: res.scoreWeight * 100 / 10000
                    })
                })
                this.$api.post('/review/award/updateScoreWeight',arr).then(res=>{
                    this.showCount = false
                })
            },
            // 获取赛段分数占比
            async getSchedule(id){
                let res = await network.getSchedule({data:{
                    competitionId: this.competitionId
                }})
                if(res=='error') return;
                res && res.competitionTimes.map(competitionTimes=>{
                    competitionTimes.scoreWeight = competitionTimes.scoreWeight * 100
                })
                this.rowsList = res && res.competitionTimes || []
            },
            // 得分table
            gettable(){
                if(!this.objArr[0].rowIdWeightDtos) return this.loadingTable = false;
                let lists = this.objArr[0].rowIdWeightDtos
                let arr = []
                for(let i in lists){
                    arr.push({
                        title: lists[i].rowName+'('+(lists[i].scoreWeight*100)+'%)',
                        align: 'center',
                        minWidth:132,
                        key: 'rowIdWeightDtos'+i,
                        render:(h,params)=>{
                            var str=params.row.rowIdWeightDtos[i]
                            str = (str.totalScore||0) + ' * ' + (str.scoreWeight*100) + '%'
                            return h('span',str)
                        }
                    })
                }
                this.columnsdata.splice(2,1,{
                    title: '得分',
                    align: 'center',
                    children: arr
                })
                this.loadingTable = false
                
            },
            // 获取竞赛列表
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
                                this.$store.commit("selComptitionName",this.compData[0].name)
                                this.$webapi.savelocal("competitionName",this.compData[0].name)
                                this.competitionId=this.compData[0].id
                            }

                            relove(this.compData)
                        }else {
                            _this.pageShow=false;
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            async list () {
                let _this = this
                let data={
                    competitionId:this.competitionId,
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                }
                if(this.search){
                    data.search=this.search
                }
                this.loadingTable = true;
                this.$api.get('/review/award/selectGroupList',data).then(reset => {
                    if (reset.code == 0) {
                        this.objArr=reset.data.list
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.pageData.pageCurrent=reset.data.pageNum//当前页
                        _this.pageData.pagesize=reset.data.pageSize
                        if (this.objArr.length>0) {
                            this.gettable()
                            _this.pageShow=true;
                        }else{
                            this.loadingTable = false;
                            _this.pageShow=false;
                        }

                    }else {
                        this.loadingTable = false;
                        _this.pageShow=false;
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            // 搜索
            handleSubmit(){
                this.pageData.pageCurrent=1
                this.list();
            },
            setAwards(){
                this.awardsShow=true;
            },
            awardsNum(){
                this.awardsNumShow=true;
            },
            exportAwardsData(e){
                this.awardsShow=e.show;
                this.list();
                this.getIsDone();
            },
            exportAwardsNumData(e){
                this.awardsNumShow=e.show;
            },
            // 关闭结果发布
            close(){
                this.resultLoadShow=false
                this.getIsDone();
            },
            //导出获奖成员
            importResultMeber(){
                this.loadShow=true;
                var data={
                    competitionId:this.competitionId
                }
                this.$api.exportGet("/review/award/exportGroupList", data)
                .then(res => {
                    this.loadShow=false;
                })
            },
            // 导入结果
            exportResult(e){
                if (e) {
                    this.list();
                    this.getIsDone();
                }
            },
            // 赛项
            itemChange(e){
                this.$store.commit("selComptitionName", e.name)
                this.$webapi.savelocal("competitionName", e.name)
                this.competitionId = e.id
                this.list();
                this.getIsDone()
            },
        }
    }
</script>
<style lang="less" scoped>
    .sourch-left{
        float: left;
        margin-bottom:15px;
        min-width:345px;
    }
    .sourch-right{
        float: right;
        margin-bottom:15px;
    }
    .tableListForm{
        overflow: hidden;

    }
    .result-watch{
        float: right;
        margin-bottom:15px;
        margin-left:15px;
        cursor:pointer;
        color:#2089E5;
    }
    .page-component-bd{
        padding:15px;
    }
    .btn-loading{
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
    .tableListOperator{
        text-align: left;
        box-shadow: 0 0 3px #999999;
        .title{
            width:108px;
            height:36px;
            background:rgba(0,170,145,1);
            border-radius:0px 0px 14px 0px;
            font-size:14px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:36px;
            text-align: center;
            display: inline-block;
            vertical-align: top;
            margin-right: 20px;
        }
        .buttonSubmit{
            display: inline-block;
            vertical-align: middle;
        }
        ul{
            display: inline-block;
            vertical-align: middle;
            list-style: none;
            line-height: 56px;
            li{
                display: inline-block;
                vertical-align: middle;
                margin-right: 60px;
            }
        }
    }
</style>
