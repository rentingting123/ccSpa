<template>
    <div class="openSkin">
        <h1>国省系列赛皮肤列表</h1>
        <div class="add">
            <Input v-model="search" placeholder="皮肤名称" suffix="ios-search" @keyup.enter.native="init" style="width: 300px;" />
        </div>
        <Table border :columns="columns" :data="tableData" class="table">
            <template slot-scope="{ row }" slot="aviliable">
                <Button type="error"  v-if="row.aviliable==1" style="margin: 5px 5px 5px 0;" @click="show(row,0)">关闭</Button>
                <Button type="primary" v-else  style="margin: 5px 5px 5px 0;" @click="show(row,1)">开放</Button>
                <Button type="primary" style="margin: 5px 5px 5px 0;" @click="edit(row)">编辑</Button>
                <Button type="primary" style="margin: 5px 5px 5px 0;" :disabled='row.aviliable!=1' @click="toskin(row)">前往皮肤</Button>
                <Button type="primary" style="margin: 5px 5px 5px 0;" :disabled='row.aviliable==1' @click="del(row)">删除</Button>
            </template>
        </Table>
        <Page class="page" :page-size="pageSize" :total="total" @on-change="changePage"/>
        
        <!-- 编辑 -->
        <edit v-if="editShow" :close="close" :formItem="formItem" type='3'/>

    </div>
</template>

<script>
import edit from '../common/edit'
import network  from '@/operate/api/index'
export default {
    components:{
        edit
    },
    data(){
        return{
            page:1,
            pageSize:50,
            total:0,
            search:'',
            columns: [
                {
                    title: 'groupId',
                    key: 'competitionId',
                    width: 120,
                },
                {
                    title: '皮肤名称',
                    key: 'name'
                },
                {
                    title: '皮肤类型(theme)',
                    key: 'theme',
                    width: 140,
                },
                {
                    title: '皮肤地址(url)',
                    key: 'url'
                },
                {
                    title: '是否开放',
                    slot: 'aviliable'
                },
            ],
            tableData:[],
            editShow:false,
            addShow:false,
            loading:false,
            formItem:{}
        }
    },
    created(){
        this.init();
    },
    methods:{
        close(){
            this.editShow = false
            this.addShow = false
            this.init()
        },
        del(row){
            this.$Modal.confirm({
                title: '删除',
                content: '<p>删除后无法恢复，请再次确认是否删除</p>',
                onOk: async () => {
                    let res = await network.operateDel({data:{
                        id: row.id
                    }})
                    if(res=='error') return this.$Message.info('删除失败，请稍后重试');
                    this.$Message.info('删除成功');
                    this.init();
                },
                onCancel: () => {
                    this.$Message.info('已取消删除');
                }
            });
        },
        toskin(row){
            if(row.aviliable!=1) return this.$Message.warning('请先开通皮肤');
            window.open('http://' + row.url)
        },
        changePage(page){
            this.page = page;
            this.init()
        },
        async init(){
            let data = await network.operateDomainList({data:{
                current:this.page,
                pageSize:this.pageSize,
                type: 4,
                search:this.search,
            }})
            if(data=='error') return;
            this.tableData = data.data;
            this.total = data.total;
        },
        async show(row,aviliable){
            let res = await network.operateSwitch({data:{
                id: row.id,
                competitionId: row.competitionId,
                aviliable: aviliable
            }});
            if(res=='error') return;
            this.init();
        },
        edit(row){
            this.formItem = {}
            this.formItem = Object.assign({},row); 
            this.editShow = true
        },
    }

}
</script>

<style lang="less" scoped>
.add{
    text-align: left;
    margin: 20px 0;
    width: 100%;
}
.page{
    margin: 20px 0;
}
</style>
