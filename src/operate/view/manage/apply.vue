<template>
    <div class="openSkin">
        <h1>申请试用审核</h1>
        <div class="search" style="text-align:left;">
            <Input placeholder="手机号搜索" suffix="ios-search" @keyup.enter.native="init" v-model="mobile" style="margin:10px 0;width:200px;"/>
        </div>
        <Table border :columns="columns1" :data="tableData">
            <template slot-scope="{ row }" slot="updateTime">
                {{ row.updateTime | date}}
            </template>
            <template slot-scope="{ row }" slot="memo">
                <div >
                    {{ row.memo }}
                </div>
            </template>
                <template slot-scope="{ row }" slot="info">
                <div v-for="(item,index) in row.fileList" :key="index"  class="">
                    <Button style="color:#409eff;" type="text" @click="showFile(item.url)">{{item.name}}</Button>
                </div>
            </template>
            <template slot-scope="{ row }" slot="status">
                <div >
                    <span v-if="row.status==0">未处理</span>
                    <span v-else-if="row.status==1">通过</span>
                    <span v-else>已拒绝</span>
                </div>
            </template>
            <template slot-scope="{ row }" slot="operate">
                <div v-if="row.status==0">
                    <Button type="primary" v-if="!row.fileList" @click="setShow(row, '通过', 1, true)">发送体验账号</Button>
                    <Button type="primary" v-else @click="setShow(row,'通过',1)">通过</Button>
                    <Button type="error" @click="setShow(row,'拒绝',2)">拒绝</Button>
                </div>
                <div v-else>
                    已处理
                </div>

            </template>
        </Table>
        <Page class="page" :page-size='pageSize' :total="total" @on-change="changePage"/>

        <Modal v-model="show">
            <div>
                <h3>备注信息({{obj.title}})</h3>
                <Input v-model="obj.memo" />
            </div>
            <div slot="footer">
                <Button type="default" @click="show=false">取消</Button>
                <Button type="primary" @click="edit(obj)" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>
        
        <Modal v-model="show1">
            <div>
                <h3>备注信息</h3>
                <Input v-model="obj.memo" />
                <h3>文件上传</h3>
                <upload
                    class="avatar-uploader"
                    :showlist="true"
                    :onSuccess="handleAvatarSuccessimg"
                >
                    <el-button type="primary">上传</el-button>
                </upload>
            </div>
            <div slot="footer">
                <Button type="default" @click="show1=false">取消</Button>
                <Button type="primary" @click="editEmail(obj)" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>

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
import upload from "@@/components/fileUpload/index";
import moment from 'moment'
export default {
    data(){
        return{
            page:1,
            pageSize:20,
            total:0,
            mobile:'',
            status: '',   
            modalvalue:'',
            bmodal:false,
            columns1: [
                {
                    title: '竞赛名称',
                    key: 'name'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                  {
                    title:'更新时间',
                    slot:'updateTime',
                },
                   {
                    title:'邮箱',
                    key:'email',
                },
                   {
                    title:'主办方账号',
                    key:'loginName',
                },
                {
                    title: '备注信息',
                    slot: 'memo'
                },
                {
                    title: '上传文件',
                    slot: 'info'
                },
                {
                    title: '状态',
                    slot: 'status',
                    filterMultiple: false,
                    filters: [
                        {
                            label: '未处理',
                            value: '0'
                        },
                        {
                            label: '已通过',
                            value: '1'
                        },
                          {
                            label: '拒绝',
                            value: '2'
                        },
                    ],
                    filterRemote: (arr, i)=>{
                        if(arr.length>0){
                            this.status = arr[0]
                        }else{
                            this.status = ''
                        }
                        this.init()
                    }
                },
                {
                    title: '操作',
                    slot: 'operate',
                    width: 220
                }
            ],
            tableData:[],
            show: false,
            show1: false,
            obj: {},
        }
    },
    components:{
        upload
    },
    created(){
        this.init();
    },
    methods:{
        handleAvatarSuccessimg(file){
            console.log(file.location);
            this.obj.url = file.location
        },
        changePage(page){
            this.page = page;
            this.init()
        },
        async init(){
            let data = await network.getApplyList({data:{
                status: this.status,
                mobile: this.mobile,
                pageNum:this.page,
                pageSize:this.pageSize
            }})
            if(data=='error') return;
            this.tableData = data && data.list;
            this.total = data.total;
        },
        showFile(info){
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
        },
        async edit(row){
            let res = await network.setApplyList({data:{
                id: row.id,
                status: row.status,
                memo: row.memo
            }})
            this.show = false;
            if(res=='error') return;
            this.$Message.success('修改成功')
            this.init();
        },
        // 发送申请试用
        async editEmail(row){
            if(!row.url) return this.$Message.warning('请上传需要发送的文件')
            let res = await network.setApplySendEmail({data:{
                id: row.id,
                status: row.status,
                memo: row.memo,
                url: '体验平台地址: http://cc.mycloudedu.cn/ 您申请的体验账号,请下载后查看,妥善保管,点击下载('+row.url+')'
            }})
            this.show1 = false;
            if(res=='error') return;
            this.$Message.success('修改成功')
            this.init();
        },
        setShow(row, title, status, flag){
            this.obj = {...row};
            this.$set(this.obj,'title',title)
            this.$set(this.obj,'status',status)
            if(flag){
                this.show1 = true
            }else{
                this.show = true
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
h3{
    font-size: 16px;
    line-height: 1.5;
    margin: 20px 0 10px;
}
</style>
