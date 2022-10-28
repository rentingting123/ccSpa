<template>
    <div class="openSkin">
        <h1>高校清单</h1>
        <div class="title clearfix">
            <Button type="primary" @click="expert" size="small">导出</Button>
        </div>
        <Table border :loading='loading' :columns="columns1" :data="tableData"></Table>
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
                    title: '学校',
                    align: 'center',
                    key: 'schoolName'
                },
                {
                    title: '省份',
                    align: 'center',
                    key: 'province'
                },
                {
                    title: '层次',
                    align: 'center',
                    key: 'schoolDegree'
                },
                {
                    title: '级别',
                    align: 'center',
                    key: 'lever'
                }
            ],
            tableData:[],
            loading:false,

        }
    },
    created(){
        this.init();
    },
    methods:{
        async expert(){
           let res = await network.expertAllschoolList({
                data:{responseType:'stream'},
                config:{responseType:'arraybuffer'}}
            );
            if(res=='error') return;
        },
        changePage(page){
            this.page = page;
            this.init()
        },
        async init(){
            this.loading = true;
            let res = await network.getAllschoolList({data:{
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
