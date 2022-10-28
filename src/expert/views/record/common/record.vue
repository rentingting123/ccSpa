<template>
    <div class="page-component-bd">
        <Table border :columns="columnsdata" :data="objArr" :loading='loadShow'></Table>
        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
    </div>
</template>
<script>
    import paging from "@/expert/components/pub/page"
    import provices from "@/expert/until/province.js"
    import expandRow from "./expandRow"
    export default {
        props: ['rowId', 'cId', 'search', 'getPattern', 'notime', 'years'],
        components:{
            paging,
            expandRow
        },
        data () {
            return {
                loadShow:false,
                importBtnLoad:false,
                pageShow:false,//分页是否显示
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[10,20,30],
                    //分页大小
                    pagesize:10,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                columnsdata: [],
                objArr: [],
                compData:[],
                pattern: '',
            }
        },
        created() {
            this.provinceList=provices.provinces()
            this.columnsdata=this.coldata()
            // 分配作品-专家-不显示时间
            if(this.notime){
                this.columnsdata.splice(5, 1)
                this.columnsdata.splice(5, 1)
            }
        },
        methods: {
            getPatterns(){
                this.$api.get('review/review/rule/get',{
                    rowId: this.rowId, 
                    competitionId: this.cId
                }).then(res => {
                    this.pattern= res && res.data && res.data.pattern
                    this.getPattern && this.getPattern(this.pattern)
                    this.list();
                })
            },
            // 查看分配记录
            list(){
                var data={
                    groupId: this.$webapi.getlocal("groupId"),
                    pattern: this.pattern,
                    competitionId: this.cId, //赛项id
                    rowId: this.rowId,//赛程id
                    pageNum: this.pageData.pageCurrent,
                    pageSize: this.pageData.pagesize,
                }
                if(this.search){
                    data.q=this.search
                }
                if(this.years && this.years[0]){
                    data.beginLoginTime = this.years && this.years[0] || null
                }
                if(this.years && this.years[1]){
                    data.endLoginTime = this.years && this.years[1] || null
                }

                this.posts(data);
            },
            posts(data){
                var _this=this;
                this.loadShow = true
                this.$api.post("/review/resource/getDistributionInfo", data)
                .then(res => {
                    this.loadShow = false
                    if (res.code == 0) {
                        this.objArr=res.data.list
                        _this.pageData.pageCount=res.data.pages//总页数
                        _this.pageData.totalCount=res.data.total//总条数
                        _this.pageData.pageCurrent=res.data.pageNum//当前页
                        _this.pageData.pagesize=res.data.pageSize
                        this.pageShow=true;
                    }else {
                        _this.$netcode.getApiCode(res)
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
            // 表头数据
            coldata(){
                var _this=this;
                return [
                    {
                        type: 'index',
                        title: '序号',
                        width: 64,
                        align: 'center',
                        indexMethod: (row)=>{
                            return this.pageData.pagesize * (this.pageData.pageCurrent - 1) + row._index + 1
                        }
                    },

                    {
                        title: '专家',
                        minWidth:120,
                        align: 'center',
                        key: 'name',
                        className:"filter-wrap",
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        minWidth:200,
                        key: 'phone'
                    },
                    {
                        title: '学校',
                        align: 'center',
                        minWidth:200,
                        key: 'school'
                    },
                    {
                        title: '省份',
                        minWidth:100,
                        align: 'center',
                        key: 'province',
                        className:"filter-wrap",
                        filters:this.provinceList,
                        filterMultiple: false,
                        filterRemote (value) {
                            _this.pageData.pageCurrent=1
                            _this.list();
                        }
                    },
                    {
                        title: '最新登录时间',
                        align: 'center',
                        minWidth: 150,
                        key: 'lastestLoginTime'
                    },
                    {
                        title: '最新评审时间',
                        align: 'center',
                        minWidth: 150,
                        key: 'latestTime'
                    },
                    {
                        type: 'expand',
                        width: 60,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    importData:params.row,
                                    rowId: this.rowId,
                                    cId: this.cId,
                                    pattern: this.pattern,
                                    notime: this.notime
                                }
                            })
                        }
                    },
                ]
            }
        },
        watch:{
            rowId:{
                immediate: true,
                async handler(val){
                    if(!val) return;
                    this.getPatterns()
                }
            },
            loadShow(val){
                this.$emit('update:loading', val)
            }
        }
    }
</script>
<style scoped>
    .page-component-bd{
        padding:15px;
    }
</style>
