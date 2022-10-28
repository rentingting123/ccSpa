<template>
    <div class="openSkin">
        <h1>985/211覆盖</h1>
        <div class="title clearfix">
            <p>覆盖985合计：{{collegeSuperIn}}</p>
            <p>覆盖211合计：{{collegeSeniorIn}}</p>
            <p>覆盖985/211合计：{{collegeAllIn}}</p>
            <p>985/211合计：{{collegeIn}}</p>
            <p>总覆盖率：{{collegeAllRatio}}%</p>
            <Button type="primary" @click="expert" size="small">导出</Button>
        </div>
        <Table border :loading="loading" :columns="columns1" :data="tableData">
             <template slot-scope="{ row }" slot="collegeAllRatio">
                <strong>{{ row.collegeAllRatio }}%</strong>
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
            collegeAllRatio:'',
            collegeIn:'',
            collegeAllIn:'',
            collegeSeniorIn:'',
            collegeSuperIn:'',
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
                    title: '覆盖985',
                    align: 'center',
                    key: 'collegeSuperIn'
                },
                {
                    title: '覆盖211',
                    align: 'center',
                    key: 'collegeSeniorIn'
                },
                {
                    title: '覆盖985/211',
                    align: 'center',
                    key: 'collegeAllIn'
                },
                {
                    title: '985/211总数',
                    align: 'center',
                    key: 'collegeIn'
                },
                {
                    title: '覆盖率',
                    align: 'center',
                    slot: 'collegeAllRatio'
                }
            ],
            tableData:[],
            loading: false,
        }
    },
    created(){
        this.init();
        this.getNum();
    },
    methods:{
        async expert(){
            let res = await network.expertSchoolCoverage({
                data:{responseType:'stream'},
                config:{responseType:'arraybuffer'}}
            );
            if(res=='error') return;
        },
        async getNum(){
            let res = await network.getprovinceSumSuperSchool();
            if(res=='error' || !res) return;
            this.collegeAllRatio = res.collegeAllRatio
            this.collegeIn = res.collegeIn
            this.collegeAllIn = res.collegeAllIn
            this.collegeSeniorIn = res.collegeSeniorIn
            this.collegeSuperIn = res.collegeSuperIn
        },
        changePage(page){
            this.page = page;
            this.init();
            this.getNum();
        },
        async init(){
            this.loading = true;
            let res = await network.getSchoolCoverage({data:{
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
