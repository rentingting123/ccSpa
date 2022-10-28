<template>
    <div class="openSkin">
        <h1>证书审核</h1>
        <div class="search" style="text-align:left;">

            <Select v-model="competitionId" style="width:200px" placeholder="请选择竞赛">
                <Option v-for="item in competitions" :key="item.competitionId" :value="item.competitionId">
                    {{item.competitionName}}
                </Option>
            </Select>

            <Select v-model="status" style="width:200px" placeholder="请选择状态">
                <Option v-for="item in statusLists" :key="item.value" :value="item.value">
                    {{item.name}}
                </Option>
            </Select>

            <Input placeholder="收件人/手机号/收件地址/团队名" suffix="ios-search"  v-model="search" style="margin:10px 0;width:200px;"/>

            <Button type="primary" @click="init">查询</Button>

            <div style="display:inline-block; float:right;margin:10px 0">
                <uploadComponent :importData="tableUrl" @exportData="exportResult"></uploadComponent>
                <!-- <Button type="primary" @click="init">导入</Button> -->
                <Button type="primary" @click="download">导出</Button>
            </div>

        </div>
        <Table border :columns="columns1" :data="tableData">
            <!-- 证书 -->
            <template slot-scope="{row}" slot="imgUrl">
                <img v-if="row.imgUrl"  style="cursor: pointer" :src="row.imgUrl" height="30px" @click="showImg(row.imgUrl)">
            </template>
            <!-- 状态 -->
            <template slot-scope="{row}" slot="status">
                <span v-if="row.status==0">待审核</span>
                <span v-else-if="row.status==1">已通过</span>
                <span v-else-if="row.status==2">已拒绝</span>
            </template>
            <!-- 时间 -->
            <template slot-scope="{row}" slot="createTime">
                <span>{{row.createTime | date}}</span>
            </template>
            <!-- 物流单号 -->
            <template slot-scope="{row, index}" slot="orderNo">
                <span v-if="!row.editorderNo">
                    {{row.orderNo}}
                    <Icon v-if="row.status==0" type="ios-open-outline" @click="edit('editorderNo', index)"/>
                </span>
                <Input v-else v-model="row.orderNo" @on-blur="(e)=>editBlur(e, 'orderNo', index)"/>
            </template>
            <!-- 操作 -->
            <template slot-scope="{row}" slot="operate">
                <Button type="primary" size='small' :disabled='row.status!=0' @click="pass(row,1)">通过</Button>
                <Button type="error" size='small' :disabled='row.status!=0' @click="pass(row,2)">拒绝</Button>
            </template>
        </Table>

        <Page class="page" :page-size='pageSize' :total="total" @on-change="changePage"/>

        <Modal v-model="show" title="证书查看" @on-ok="show=false" @on-cancel="show=false">
            <img :src="imgshow"  v-if="imgshow" width="100%">
        </Modal>

    </div>
</template>

<script>
import network  from '@/operate/api/index'
import uploadComponent from "./upload"
import moment from 'moment'

export default {
    components:{
        uploadComponent
    },
    data(){
        return{
            pageNum:1,
            pageSize:50,
            total:0,
            search:'',     
            columns1: [
                {
                    title: '竞赛',
                    key: 'competitionName',
                    minWidth: 100,
                },
                {
                    title: '收件人',
                    key: 'name',
                    minWidth: 100,
                },
                {
                    title:'手机号',
                    key:'phone',
                    minWidth: 70,
                },
                {
                    title:'团队编号',
                    key:'groupId',
                    minWidth: 100,
                },
                {
                    title:'团队名称',
                    key:'groupName',
                    minWidth: 100,
                },
                {
                    title:'证书编号',
                    key:'certificateNumber',
                    minWidth: 100,
                },
                {
                    title:'收件地址',
                    key:'address',
                    minWidth: 100,
                },
                {
                    title: '邮寄份数',
                    key: 'num',
                    minWidth: 40,
                },
                // {
                //     title: '时间',
                //     slot: 'createTime',
                //     minWidth: 60
                // },
                // {
                //     title:'证书',
                //     slot:'imgUrl',
                // },
                {
                    title:'状态',
                    slot:'status',
                    minWidth: 40,
                },
                {
                    title:'物流单号',
                    slot:'orderNo',
                    minWidth: 100,
                },
                {
                    title:'操作',
                    slot:'operate',
                    minWidth: 100,
                },
            ],
            tableData:[],
            competitionId: '',
            competitions: [],
            imgshow: '',
            show: false,
            status: '',
            tableUrl: 'web/import/applyCertificateList ',
            statusLists:[
                {
                    name: '全部',
                    value: ''
                },
                {
                    name: '待审核',
                    value: '0'
                },
                {
                    name: '已通过',
                    value: '1'
                },
                {
                    name: '已拒绝',
                    value: '2'
                },
            ]
        }
    },
    created(){
        this.getCompetition()
    },
    methods:{
        async getCompetition(){
            let res = await network.selectApplyCompetitionList();
            if(res=='error') return;
            this.competitions = res || []
        },
        changePage(page){
            this.pageNum = page;
            this.init()
        },
        async init(){
            let data = await network.selectApplyCertificateList({data:{
                competitionId: this.competitionId,
                search: this.search,
                status: this.status,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }})
            if(data=='error') return;
            this.total = data.total || 0
            this.tableData = data.list || []
        },
        edit(name,index){
            this.$set(this.tableData[index], name, true);
        },
        editBlur(e, name, index){
            this.$set(this.tableData[index], name, e.target.value)
            this.$set(this.tableData[index], 'edit'+name, false)
        },
        showImg(url){
            this.imgshow = url
            this.show = true
        },
        async pass(row, flag){
            if(flag==1 && !row.orderNo){
                return this.$Message.warning('请填写物流单号')
            }
            if(flag==2){
                this.orderNo = ''
            }
            let res = await network.updateApplyCertificate({data:{
                id: row.id,
                status: flag,
                orderNo: row.orderNo
            }});
            if(res=='error') return;
            this.$Message.success('操作成功')
            this.init();
        },
        exportResult(e){
            if(e) this.init();
        },
        async download(){
            let res = await network.applyCertificateList({
                data:{
                    competitionId: this.competitionId,
                    status: this.status,
                    responseType:'stream'
                },
                config: { 
                    responseType: 'arraybuffer'
                }
            });
            if(res=='error') return;


        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY.MM.DD')
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
