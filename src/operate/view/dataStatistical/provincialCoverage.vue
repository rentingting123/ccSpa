<template>
    <div class="openSkin">
        <h1>省份覆盖</h1>
        <div class="title clearfix">
            <p>覆盖本科合计：{{collegeNumIn}}</p>
            <p>本科合计：{{collegeNum}}</p>
            <p>本科合计比例：{{collegeRatio}}%</p>
            <p>覆盖专科合计：{{vocationalNumIn}}</p>
            <p>专科合计：{{vocationalNum}}</p>
            <p>专科合计比例：{{vocationalRatio}}%</p>
            <p>覆盖总数合计：{{totalNumIn}}</p>
            <p>院校合计：{{totalNum}}</p>
            <p>院校合计比例：{{totalRatio}}%</p>
            <Button type="primary" @click="expert" size="small">导出</Button>
        </div>
        <Table border :loading="loading" :columns="columns1" :data="tableData">
            <template slot-scope="{ row }" slot="collegeNumIn">
                <strong>{{ row.collegeNumIn }} / {{ row.collegeNum }}</strong>
            </template>
            <template slot-scope="{ row }" slot="collegeRatio">
                <strong>{{ row.collegeRatio }}%</strong>
            </template>
            <template slot-scope="{ row }" slot="vocationalNumIn">
                <strong>{{ row.vocationalNumIn }} / {{ row.vocationalNum }}</strong>
            </template>
            <template slot-scope="{ row }" slot="vocationalRatio">
                <strong>{{ row.vocationalRatio }}%</strong>
            </template>
            <template slot-scope="{ row }" slot="totalNumIn">
                <strong>{{ row.totalNumIn }} / {{ row.totalNum }}</strong>
            </template>
            <template slot-scope="{ row }" slot="totalRatio">
                <strong>{{ row.totalRatio }}%</strong>
            </template>
        </Table>
       <Page class="page" :page-size="pageSize" :total="total" @on-change="changePage"/>      
    </div>
</template>

<script>
import network  from '@/operate/api/index'

export default {
    data(){
        return{
            page:1,
            pageSize:50,
            total:0,
            columns1: [
                {
                    type: 'index',
                    title: '序号',
                    width: 60,
                    align: 'center',
                    indexMethod: (row)=>{
                        return this.pageSize * (this.page - 1) + row._index + 1
                    }
                },
                {
                    title: '省份',
                    align: 'center',
                    key: 'province'
                },
                {
                    title: '覆盖本科/本科总数',
                    align: 'center',
                    slot: 'collegeNumIn'
                },
                {
                    title: '本科比例',
                    align: 'center',
                    slot: 'collegeRatio'
                },
                {
                    title: '覆盖专科/专科总数',
                    align: 'center',
                    slot: 'vocationalNumIn'
                },
                {
                    title: '专科比例',
                    align: 'center',
                    slot: 'vocationalRatio'
                },
                {
                    title: '覆盖总数/院校总数',
                    align: 'center',
                    slot: 'totalNumIn'
                },
                // {
                //     title: '本科总数',
                //     align: 'center',
                //     key: 'collegeNum'
                // },
                // {
                //     title: '专科总数',
                //     align: 'center',
                //     key: 'vocationalNum'
                // },
                // {
                //     title: '院校总数',
                //     align: 'center',
                //     key: 'totalNum'
                // },
                {
                    title: '合计比例',
                    align: 'center',
                    slot: 'totalRatio'
                },
            ],
            tableData:[],
            collegeNumIn:'',
            vocationalNumIn:"",
            totalNumIn:"",
            collegeNum:"",
            vocationalNum:"",
            totalNum:"",
            collegeRatio:"",
            vocationalRatio:"",
            totalRatio:"",
            loading: false,

        }
    },
    created(){
        this.init();
        this.getNum();
    },
    methods:{
        async expert(){
            let res = await network.expertAllprovincial({
                data:{responseType:'stream'},
                config:{responseType:'arraybuffer'}}
            );
            if(res=='error') return;
        },
        async getNum(){
            let res = await network.getprovinceSumSchool();
            if(res=='error' || !res) return;
            this.collegeNumIn = res.collegeNumIn
            this.vocationalNumIn = res.vocationalNumIn
            this.totalNumIn = res.totalNumIn
            this.collegeNum = res.collegeNum
            this.vocationalNum = res.vocationalNum
            this.totalNum = res.totalNum
            this.collegeRatio = res.collegeRatio
            this.vocationalRatio = res.vocationalRatio
            this.totalRatio = res.totalRatio

        },
        changePage(page){
            this.page = page;
            this.init();
            this.getNum();
        },
        async init(){
            this.loading = true;
            let res = await network.getAllprovincial({data:{
                pageNum: this.page,
                pageSize: this.pageSize
            }});
            this.loading = false;
            if(res=='error' || !res) return;
            this.tableData = res.list;
            this.total = res.total;
           
        }
    }
}
</script>

<style lang="less" scoped>
h1{
    margin: 20px 0;
}
.title{
    width: 100%;
    padding: 10px;
    text-align: left;
    p{
        display: inline-block;
        font-weight: bold;
        margin-right: 20px;
    }
    .ivu-btn{
        float: right;
    }

}
.page{
    margin: 20px 0;
}
</style>
