<template>
    <div>
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
                <!-- 赛题 -->
                <template slot="topicName" slot-scope="{ row }"> 
                    {{row.topicName || '-'}}
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
                <!-- 评审状态 -->
                <template slot="reviewStatus" slot-scope="{ row }"> 
                    <div v-if="row.reviewStatus==2">已评审</div>
                    <div v-else-if="row.reviewStatus==0" style="color:red;">未分配</div>
                    <div v-else>已分配</div>
                </template>
            </Table>
            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
        </div>
    </div>
</template>

<script>
import paging from "@/expert/components/pub/page"
import provices from "@/expert/until/province.js"
import expertDetail from "./expertDetail"
let Base64 = require('js-base64').Base64
export default {
    props: ['rowId', 'competitionId', 'search', 'pattern'],
    components:{
        paging,
        expertDetail,
    },
    data(){
        return{
            groupId: this.$webapi.getlocal("groupId"),
            spinShow:false,//加载中
            pageShow:false,//分页是否显示
            // 查询条件
            formValidate:{
                groupName:'',
                status:'',
                rowId:'',
                province:'',
                poolGroupName: '',
                topicName: ''
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
            objArr: [],
            columnsdata: [],
            provinceList:[], //省份筛选
            filterTeam: [], //作品组名筛选
            topicList: [], //赛题赛选

        }
    },
    created(){
        this.provinceList=provices.provinces()
    },
    methods:{
        handleSubmit(){
            this.pageData.pageCurrent=1
            this.list();
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        toexpertDetail(row){
            this.$router.push({
                path:"/expert/detail",
                query:{
                    id: Base64.encode(row.id),
                    reviewStatus: row.reviewStatus,
                    groupId: Base64.encode(row.groupId),
                    competitionId: this.competitionId,
                    rowId: this.rowId,
                    pattern: this.pattern
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
        async list () {
            this.spinShow=true
            let data={
                groupId: this.groupId,
                pattern: this.pattern,
                competitionId: this.competitionId,
                rowId: this.rowId,
                pageNum: this.pageData.pageCurrent,
                pageSize: this.pageData.pagesize,
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
            if (this.formValidate.topicName) {
                data.topicName=this.formValidate.topicName
                url += '&topicName='+this.formValidate.topicName
            }
            if (this.search) {
                data.q=this.search
                url += '&searchValue='+this.search
            }
            if (this.type!=='' && this.type!=undefined) {
                data.type=this.type
                url += '&type='+this.type
            }

            if(url != '?'){
                url = url.replace(/\?&/g,'?')
                this.$router.push('/expert/works'+url)
            }else{
                this.$router.push('/expert/works')
            }

            this.posts(data);
            this.getFilterTeam();
            this.selectTopicNames();
        },
        posts(data){
            this.objArr = []
            this.$api.post('review/resource/getReviewList',data,{},{pipe:true}).then(reset => {
                if (reset.code == 0) {
                    if (reset.data) {
                        this.objArr=reset.data.list
                        this.pageData.pageCount=reset.data.pages//总页数
                        this.pageData.totalCount=reset.data.total//总条数
                        this.pageData.pageCurrent=reset.data.pageNum//当前页
                        this.pageData.pagesize=reset.data.pageSize
                        var j=5
                        var arr1=this.coldata();
                        
                        this.columnsdata=arr1;
                        this.spinShow=false
                        this.pageShow=true;

                    }else{
                        this.objArr=[];
                        this.spinShow=false
                        this.pageShow=false;
                    }
                }else {
                    this.spinShow=false
                    this.pageShow=false;
                    this.$netcode.getApiCode(reset)
                }
            })
        },
        // 作品组名列表
        getFilterTeam(){
            this.$api.get('review/resource/selectGroupNames',{
                rowId: this.rowId
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
        // 赛题列表
        selectTopicNames(){
            this.$api.get('review/resource/selectTopicNames',{
                rowId: this.rowId
            }).then((res)=>{
                if(res.code==0){
                    let arr = []
                    for(let i in res.data){
                        arr.push({
                            label: res.data[i]+'',
                            value: res.data[i]+''
                        })
                    }
                    this.topicList = arr

                }else{
                    this.topicList = []
                    this.$netcode.getApiCode(res)
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
                    title: '赛题',
                    align: 'center',
                    minWidth:90,
                    slot: 'topicName',
                    filters:this.topicList,
                    filterMultiple: false,
                    filteredValue: [ _this.formValidate.topicName],
                    filterRemote (value) {
                        _this.formValidate.topicName=value[0]
                        _this.pageData.pageCurrent=1
                        _this.list();
                    }
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
                    title: '学校',
                    align: 'center',
                    minWidth:90,
                    key: 'school',
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
                    title: '查看详情',
                    type: 'expand',
                    width: 85,
                    render: (h, params) => {
                        return h(expertDetail,{
                            props:{
                                importData: params.row,
                                rowId: this.rowId,
                                pattern: this.pattern
                            }
                        })
                    }
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
                // {
                //     title: '参赛状态',
                //     align: 'center',
                //     minWidth: 70,
                //     key: 'status',
                //     // 改不动，不敢改 2020-08-25
                //     render: (h, params) => {
                //         var str="启用中"
                //         var switch1=true
                //         var accreditShow="inline-block"
                //         if (this.groupId != -1) {
                //             if(params.row.status==2){
                //                 str="禁用中"
                //                 switch1=false
                //             }else if(params.row.status==1){
                //                 str="启用中"
                //                 switch1=true
                //             }else if(params.row.status==3){
                //                 accreditShow="none"
                //                 str="已晋级"
                //             }else if(params.row.status==4){
                //                 accreditShow="none"
                //                 str="已淘汰"
                //             }else if(params.row.status==5){
                //                 accreditShow="none"
                //                 str="已违规"
                //             }
                //         }else{
                //             accreditShow="none"
                //             if(params.row.status==2){
                //                 str="禁用中"
                //             }else{
                //                 str="启用中"
                //             }
                //         }
                //         return h('div', [
                //             h('i-switch', {
                //                 props: {
                //                     value:switch1,
                //                     size: 'small',
                //                 },
                //                 style: {
                //                     display:accreditShow,
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     'on-change': (e) => {
                //                         this.stateChange(params.row,e)
                //                     }
                //                 }
                //             }),
                //             h('span',str)
                //         ]);
                //     },
                // },
            ]
        },
    },
    watch:{
        spinShow(val){
            this.$emit('update:loading', val)
        }
    }
}
</script>

<style lang='less' scoped>

</style>