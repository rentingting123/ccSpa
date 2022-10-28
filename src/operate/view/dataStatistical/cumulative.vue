<template>
    <div class="openSkin">
        <h1>累计登录高校</h1>
        <div class="title clearfix">
            <p>总计(已去重)：{{schoolNum}}</p>
            <DatePicker type="datetimerange" placeholder="选择日期" @on-change="ok" style="width: 300px"></DatePicker>
            <Button type="primary" @click="expert" size="small">导出</Button>
        </div>
        <Table :loading="loading" border :columns="columns1" :data="tableData">
             <template slot-scope="{ row }" slot="updateTime">
                <p>{{ row.updateTime.replace('.0','') }}</p>
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
            schoolNum:0,
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
                    title: '高校',
                    align: 'center',
                    key: 'schoolName'
                },
                    {
                    title: '姓名',
                    align: 'center',
                    key: 'idcardName'
                },
                    {
                    title: '手机号',
                    align: 'center',
                    key: 'contactPhone'
                },
                    {
                    title: '职位',
                    align: 'center',
                    key: 'business'
                },
                {
                    title: '最近登录时间',
                    align: 'center',
                    slot: 'updateTime'
                }
            ],
            tableData:[],
            startTime:'',
            endTime:'',
            loading:false

        }
    },
    created(){
        this.init();
    },
    methods:{
        ok(val,a){
            this.page = 1;
            this.startTime = val[0];
            this.endTime = val[1];
            this.init()
        },
        changePage(page){
            this.page = page;
            this.init()
        },
        async expert(){
            let res = await network.expertAllschoolLogin({
                data:{responseType:'stream'},
                config:{responseType:'arraybuffer'}}
            );
            if(res=='error') return;
        },
        async init(){
            this.loading = true
            let res = await network.getAllschoolLogin({data:{
                pageNum: this.page,
                pageSize: this.pageSize,
                startTime:this.startTime,
                endTime:this.endTime,
            }});
            this.loading = false
            if(res=='error' || !res) return;
            this.tableData = res.list;
            this.total = res.total;
            let schoolNum = await network.getTotalSchoolNum()
        
            this.schoolNum = schoolNum;
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
