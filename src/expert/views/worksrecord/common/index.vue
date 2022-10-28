<template>
    <div class="page-component-bd">
        <Table border :columns="columnsdata" :data="objArr" :loading='spinShow'>
            <template slot-scope="{ row }" slot="id">
                <div @click="toexpertDetail(row)" class="columnsdataId">
                    {{row.id}}
                </div>
            </template>
            <template slot-scope="{ row }" slot="status">
                <span v-if="row.reviewStatus==0" style="color:red">未分配</span>
                <span v-else-if="row.reviewStatus==1" style="color:red">已分配</span>
                <span v-else-if="row.reviewStatus==2" style="color:#515a6e">已评审</span>
            </template>
            <template slot-scope="{ row }" slot="score">
                <span v-if="row.score==0||row.score">{{row.score}}</span>
                <span v-else>-</span>
            </template>
            <template slot-scope="{ row }" slot="total">
                <div>
                    <span v-for="item in row.reviewScore" :key="item && item.name" style="margin-right: 10px">
                        {{item.name}}: {{(item.score==0||item.score)?item.score:'未评' }}
                    </span>
                </div>
            </template>
        </Table>
        <paging :pageData="pageData" @pageComponentDate="pageComponentDate"></paging>
    </div>
</template>

<script>
import paging from "@/expert/components/pub/page"
let Base64 = require('js-base64').Base64
export default {
    props: ['rowId', 'cId', 'search', 'getPattern'],
    components:{
        paging
    },
    data(){
        return{
            spinShow: false,
            type: '',
            columnsdata: [],
            objArr: [],
            // 分页
            pageData:{
                //分页数
                arrPageSize: [10,20,30],
                //分页大小
                pagesize: 10,
                //总分页数
                pageCount: 1,
                //当前页面
                pageCurrent: 1,
                //总数
                totalCount: 0
            },
            pattern: '',
        }
    },
    created(){
        this.columnsdata = this.getTable();
    },
    methods:{
        getPatterns(){
            this.$api.get('review/review/rule/get',{
                rowId: this.rowId, 
                competitionId: this.cId
            }).then(res => {
                this.pattern= res && res.data && res.data.pattern
                this.getPattern && this.getPattern(this.pattern)
                this.init();
            })
        },
        getTable(){
            let _this = this
            return [
                {
                    type: 'index',
                    title: '序号',
                    width: 60,
                    align: 'center',
                    indexMethod: (row)=>{
                        return this.pageData.pagesize * (this.pageData.pageCurrent - 1) + row._index + 1
                    }
                },
                {
                    title: '作品编号',
                    width: 100,
                    align: 'left',
                    slot: 'id',
                },
                {
                    title: '状态',
                    width: 80,
                    align: 'center',
                    slot: 'status',
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
                        _this.init();
                    }
                },
                {
                    title: '得分',
                    width: 100,
                    align: 'center',
                    slot: 'score',
                },
                {
                    title: '专家评分',
                    minWidth: 100,
                    align: 'left',
                    slot: 'total',
                },
            ]
        },
        init(){
            var _this=this;
            var data={
                groupId:this.$webapi.getlocal("groupId"),
                pattern: this.pattern,
                competitionId: this.cId, //赛项id
                rowId: this.rowId,//赛程id
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
            }
            if(this.search){
                data.q=this.search
            }
            if (this.type!=='') {
                data.type=this.type
            }
            this.posts(data);
        },
        posts(data){
            var _this=this;
            this.spinShow = true
            this.$api.post("/review/resource/getPoolReviewList", data)
            .then(res => {
                this.spinShow = false
                if (res.code == 0) {
                    this.objArr=res && res.data && res.data.list || []
                    _this.pageData.pageCount=res && res.data && res.data.pages || 0//总页数
                    _this.pageData.totalCount=res && res.data && res.data.total || 0//总条数
                    _this.pageData.pageCurrent=res && res.data && res.data.pageNum || 1//当前页
                    _this.pageData.pagesize=res && res.data && res.data.pageSize || 20
                    this.pageShow=true;
                }else {
                    _this.$netcode.getApiCode(res)
                }
            })
        },
        // 查询
        handleSubmit(){
            this.pageData.pageCurrent=1
            this.init();
        },
        // 页数改变
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.init()
        },
        toexpertDetail(row){
            this.$router.push({
                path:"/expert/detail",
                query:{
                    id: Base64.encode(row.id),
                    reviewStatus: row.reviewStatus,
                    groupId: Base64.encode(row.groupId),
                    show: 1, //控制评分说明是否显示，1是强制不显示，其他为之前逻辑
                    pattern: this.pattern,
                    competitionId: this.cId, //赛项id
                    rowId: this.rowId,//赛程id
                }
            })
        },
    },
    watch:{
        rowId:{
            immediate: true,
            handler(val){
                if(!val) return;
                this.getPatterns();
            }
        }
    }
}
</script>

<style lang='less' scoped>
.page-component-bd{
    padding: 20px;
    .columnsdataId{
        cursor: pointer;
        color: royalblue;
    }
}
</style>