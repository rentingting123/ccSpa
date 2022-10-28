<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem >竞赛评审</BreadcrumbItem>
                    <BreadcrumbItem to="/expert/judge">评审列表</BreadcrumbItem>
                    <BreadcrumbItem>评审统计</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2 style="display:inline-block;">评审统计</h2>
                    <!-- <Button style="float:right;" type="primary" @click="back">返回</Button> -->
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">

    			</div>
    			<!--操作按钮-->
    			<div class="tableListOperator flex-wrap">
                    <div class="flex-item-left">
                        <Button type="primary" @click="back">返回</Button>
                    </div>
                    <!-- <div class="flex-item flex-item-center">
                        <ButtonGroup size="large">
                            <Button :class="[reviewType==0?'ivu-btn-rate':'']" @click="btnNet">网评</Button>
                            <Button :class="[reviewType==1?'ivu-btn-rate':'']" @click="btnRate">会评</Button>
                        </ButtonGroup>
                    </div> -->
                    <div class="flex-item-rigth">
                        <Button type="primary" @click="importResult" :loading="importBtnLoad">导出</Button>
                    </div>
    			</div>
    			<Row>
    				<Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div class="">
                            <Table border :columns="columnsdata" :data="objArr"></Table>
                        </div>
                        <div v-if="loadShow">
                            <Spin fix>
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>Loading</div>
                            </Spin>
                        </div>
    				</Col>
    			</Row>
    		</div>
        </div>

        <edit v-if="phone" :phone='phone' :rowId='rowId' :close="close"/>
    </div>
</template>
<script>
    import edit from './edit'
    export default {
        components:{
            edit,
        },
        data () {
            return {
                loadShow:false,
                importBtnLoad:false,
                columnsdata: [],
                objArr: [],
                reviewType:0,
                patternData:[],
                phone: '',
                rowId: '',
                competitionId: '',
                pattern: '',
            }
        },
        created() {
            this.rowId = this.$route.query.rowId || ''
            this.competitionId = this.$route.query.competitionId || ''
            if(!this.rowId || !this.competitionId){
                this.$message.warning('未找到对应的竞赛')
                return this.$router.push('/expert/judge')
            }
            this.getPattern();
            
        },
        methods: {
            getPattern(){
                console.log(123);
                this.$api.get('review/review/rule/get',{
                    rowId: this.rowId,
                    competitionId: this.competitionId
                }).then(reset => {
                    if (reset.code == 0) {
                        this.pattern = reset.data && reset.data.pattern
                        this.patternData = reset.data && reset.data.reviewStandardListDto && reset.data.reviewStandardListDto.reviewStandardList || []
                        this.list()
                    }else {
                        this.$network.getApiCode(reset)
                    }
                })
            },
            // 查看分配记录
            list(){
                var _this=this;
                this.loadShow=true;
                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    pattern:this.pattern,// 0：作品 1：附件
                    competitionId:this.competitionId, //赛项id
                    rowId:this.rowId,//赛程id
                    reviewType:this.reviewType
                }
                this.$api.post("/review/review/statistical", data).then(res => {
                    if (res.code == 0) {
                        this.objArr=res.data
                        this.createHearder();
                    }else {
                        this.loadShow=false;
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            // 表头
            createHearder(){
                var j=2
                var arr=this.coldata()
                if (this.pattern==1) {
                    arr.splice(4,1)
                    arr.splice(2,1)
                    arr.splice(2,1)
                    if(this.reviewType==0){//网评
                        this.patternData.forEach((self,num)=>{
                            var obj={
                                align: 'center',
                                key:"attachName",
                                renderHeader:(h,params)=>{
                                    return h('div', [
                                        h('span',self.attachName)
                                    ]);
                                },
                                children:[
                                    {
                                        title: "已分配",
                                        key: 'allocated',
                                        align: 'center',
                                        minWidth: 180,
                                        render:(h,params)=>{
                                            var str=''
                                            for (var i = 0; i < params.row.infoList.length; i++) {
                                                if(self.attachName== params.row.infoList[i].name){
                                                    str=params.row.infoList[i].allocated
                                                }
                                            }
                                            return h('div',[
                                                h('span',str)
                                            ])
                                        }
                                    },
                                    {
                                        title: "已评审",
                                        key: 'reviewed',
                                        align: 'center',
                                        minWidth: 180,
                                        render:(h,params)=>{
                                            var str=''
                                            for (var i = 0; i < params.row.infoList.length; i++) {
                                                if(self.attachName== params.row.infoList[i].name){
                                                    str=params.row.infoList[i].reviewed
                                                }
                                            }
                                            return h('div',[
                                                h('span',str)
                                            ])
                                        }
                                    },
                                ]

                            }
                            arr.splice(j,0,obj);
                            j++;
                        })
                    }else{//会评
                        this.patternData.forEach((self,num)=>{
                            var obj={
                                align: 'center',
                                key:"attachName",
                                renderHeader:(h,params)=>{
                                    return h('div', [
                                        h('span',self.attachName)
                                    ]);
                                },
                                children:[
                                    {
                                        title: "已评审",
                                        key: 'reviewed',
                                        align: 'center',
                                        minWidth: 180,
                                        render:(h,params)=>{
                                            var str=''
                                            for (var i = 0; i < params.row.infoList.length; i++) {
                                                if(self.attachName== params.row.infoList[i].name){
                                                    str=params.row.infoList[i].reviewed
                                                }
                                            }
                                            return h('div',[
                                                h('span',str)
                                            ])
                                        }
                                    }
                                ]
                            }
                            arr.splice(j,0,obj);
                            j++;
                        })
                    }
                }else{
                    if(this.reviewType==1){
                        arr.splice(4,1)
                        arr.splice(2,1)
                    }
                }
                this.columnsdata=arr
                this.loadShow=false;
            },
            // 导出结果
            importResult(){
                this.importBtnLoad=true;
                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    pattern:this.pattern,// 0：作品 1：附件
                    competitionId:this.competitionId, //赛项id
                    rowId:this.rowId,//赛程id
                    reviewType:this.reviewType,//赛程id
                }
                this.$api.exportPost("/review/review/statisticalExpert",data)
                .then(res => {this.importBtnLoad=false})
            },
            // 返回
            back(){
                this.$router.back(-1)
            },
            btnNet(){
                this.reviewType=0
                this.list()
            },
            btnRate(){
                this.reviewType=1
                this.list();
            },
            close(){
                this.phone=''
                this.list();
            },
            show(params){
                this.phone = params.row.phone
            },
            // 表头数据
            coldata(){
                var _this=this;
                return [
                    {
                        title: '专家',
                        minWidth:120,
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        minWidth:200,
                        key: 'phone'
                    },
                    {
                        title: '已分配',
                        align: 'center',
                        minWidth:200,
                        key: 'allocated',
                        render:(h,params)=>{
                            return h('div',[
                                h('span',params.row.infoList[0].allocated)
                            ])
                        }
                    },
                    {
                        title: '已评审',
                        minWidth:100,
                        align: 'center',
                        key: 'reviewed',
                        render:(h,params)=>{
                            return h('div',[
                                h('span',params.row.infoList[0].reviewed)
                            ])
                        }
                    },
                    {
                        title: '操作',
                        width:100,
                        align: 'center',
                        key: 'operate',
                        renderHeader:(h,params)=>{
                            return h('Tooltip',{
                                props:{
                                    content: '未参与过评审的专家才可以进行替换',
                                    placement: 'left'
                                }
                            },[
                                h('span','操作'),
                                h('Icon',{
                                    props:{
                                        type: 'md-information-circle'
                                    }
                                },'')
                            ])
                        },
                        render:(h,params)=>{
                            let data = params.row.infoList[0].reviewed || 0
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: data!=0
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _this.show(params)
                                        }
                                    }
                                }, '专家替换')
                            ])
                        }
                    }
                ]
            }
        }
    }
</script>
<style scoped>
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
    .flex-wrap{
        display: flex;
    }
    .flex-item-left{
        flex:1;
        text-align: left;
    }
    .flex-item-center{
        flex:2;
        text-align: center;
    }
    .flex-item-rigth{
        flex:1;
        text-align: right;
    }
</style>
