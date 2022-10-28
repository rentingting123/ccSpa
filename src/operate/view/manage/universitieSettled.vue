<template>
    <div class="openSkin">
        <h1>高校入驻</h1>
        <Table border :columns="columns1" :data="tableData">
            <template slot-scope="{ row }" slot="info">
                <div v-for="(item,index) in row.info" :key="index"  class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
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

export default {
    data(){
        return{
            page:1,
            pageSize:20,
            total:0,   
            columns1: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '手机号',
                    key: 'tel'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '学校',
                    key: 'school'
                },
                {
                    title: '职位',
                    key: 'business'
                },
                {
                    title: '部门',
                    key: 'department'
                },
                {
                    title: '上传文件',
                    slot: 'info'
                },
                {
                    title:'申请时间',
                    key:'updateTime'
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
            let list = await network.getSchoolApplylist({data:{
                type: 6,
                current:this.page,
                pageSize:this.pageSize,
            }})
            if(list=='error') return;
            let res = list.data
            this.page = list.current
            this.total = list.total
            let tableList = []
            for(let i in res){
                let html = JSON.parse(res[i].html);
                let obj = {
                    ...html.userMessage,
                    'info': html.dataList,
                    updateTime:res[i].update_time
                }
                tableList.push(obj)
            }
            this.tableData = tableList

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
