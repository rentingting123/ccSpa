<template>
    <div class="openSkin">
        <h1>数据服务平台管理员认证审核</h1>
        <div class="search" style="text-align:left;">
            <Input placeholder="搜索" suffix="ios-search" @keyup.enter.native="init" v-model="search" style="margin:10px 0;width:200px;"/>
        </div>
        <Table border :columns="columns1" :data="tableData">
            <template slot-scope="{ row }" slot="info">
                <div v-for="(item,index) in row.info" :key="index"  class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
                </div>
            </template>
            <template slot-scope="{ row }" slot="updateTime">
                {{ row.updateTime | date}}
            </template>
            <template slot-scope="{ row }" slot="status">
                <div v-if="row.status==0">
                    <Button type="primary" style="margin: 5px 5px 5px 0;" @click="edit(row,1)">通过</Button>
                    <Button type="primary" style="margin: 5px 5px 5px 0;" @click="edit(row,2)">拒绝</Button>
                </div>
                <div v-else-if="row.status==1">
                    已通过
                </div>
                <div v-else-if="row.status==2">
                    已拒绝
                </div>
            </template>
        </Table>
        <Page class="page" :page-size='pageSize' :total="total" @on-change="changePage"/>

        <Modal v-model="bmodal" draggable width="100%" fullscreen scrollable title="信息展示">
            <h2 slot="header" style="text-align:center">
                <span>信息展示</span>
            </h2>
            <iframe :src="modalvalue" width="100%" style="padding:0 80px;" height="100%" scrolling="yes" frameborder="0"></iframe>
        </Modal>
        
    </div>
</template>

<script>
import network  from '@/operate/api/index'
import moment from 'moment'
export default {
    data(){
        return{
            page:1,
            pageSize:50,
            total:0,
            search:'',     
            columns1: [
                {
                    title: '用户名',
                    key: 'userName'
                },
                {
                    title: '机构名',
                    key: 'groupName'
                },
                  {
                    title:'联系方式',
                    key:'mobile',
                },
                {
                    title: '机构id',
                    key: 'groupId'
                },
                {
                    title: '上传文件',
                    slot: 'info'
                },
                {
                    title: '时间',
                    slot: 'updateTime'
                },
                {
                    title: '操作',
                    slot: 'status'
                }
            ],
            tableData:[],
            bmodal:false,
            modalvalue:''
        }
    },
    created(){
        this.init();
    },
    methods:{
        changePage(page){
            this.page = page;
            this.init()
        },
        async init(){
            let data = await network.manageOnlineResourceList({data:{
                search: this.search,
                pageNum:this.page,
                pageSize:this.pageSize
            }})
            if(data=='error') return;
            this.tableData = data.list;
            this.total = data.total;
        },
        async edit(row, index){
            let res = await network.manageVerifyOnline({data:{
                id: row.id,
                userId: row.userId,
                status: index
            }})
            if(res=='error') return;
            this.init();
        },
        show(info){
            let flag = ['.jpg','.png','.pdf','.gif','jpeg'];
            let str = info.substring(info.lastIndexOf(".")).toLowerCase();

            if(flag.includes(str)){
                this.modalvalue = info
                this.bmodal = true
            }else{
                this.$Message.warning('下载中');
                location.href = info 
                // window.open(info)
            }
        }
    },
    filters:{
        date(val){
            if(!val) return '-'
            return moment(val).format('YYYY.MM.DD');
        }
    }
}
</script>

<style lang="less" scoped>
h1{
    margin: 20px 0;
}
.page{
    margin: 20px 0;
}
</style>
