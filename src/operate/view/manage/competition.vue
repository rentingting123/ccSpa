<template>
    <div class="openSkin">
        <h1>竞赛征集审核</h1>
        <div class="search" style="text-align:left;">
            <Input placeholder="搜索主办方名称/手机号" suffix="ios-search" @keyup.enter.native="init" v-model="search"
                style="margin:10px 0;width:200px;" />
            <Select v-model="status" style="width:200px" placeholder="请选择状态" @change="init">
                <Option v-for="item in statusLists" :key="item.code" :value="item.code">
                    {{item.value}}
                </Option>
            </Select>
            <Button type="primary" @click="init">查询</Button>
        </div>
        <Table border :columns="columns1" :data="tableData">
            <template slot-scope="{ row }" slot="createTime">
                {{ row.createTime | date}}
            </template>
            <template slot-scope="{ row }" slot="contractUrlList">
                <div v-for="(item,index) in row.contractUrlList" :key="index" class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
                </div>
            </template>
            <template slot-scope="{ row }" slot="declareUrlList">
                <div v-for="(item,index) in row.declareUrlList" :key="index" class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
                </div>
            </template>
            <template slot-scope="{ row }" slot="licenseUrlList">
                <div v-for="(item,index) in row.licenseUrlList" :key="index" class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
                </div>
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
            <template slot-scope="{ row }" slot="down">
                <div>
                    <Button type="primary" style="margin: 5px 5px 5px 0;" @click="downLoad(row)">下载</Button>
                </div>
            </template>
        </Table>
        <Page class="page" :page-size='pageSize' :total="total" @on-change="changePage" />

        <Modal v-model="bmodal" draggable width="100%" fullscreen scrollable title="信息展示">
            <h2 slot="header" style="text-align:center">
                <span>信息展示</span>
            </h2>
            <iframe :src="modalvalue" width="100%" style="padding:0 80px;" height="100%" scrolling="yes"
                frameborder="0"></iframe>
        </Modal>

    </div>
</template>

<script>
import network from '@/operate/api/index'
import moment from "moment";

export default {
    data() {
        return {
            page: 1,
            pageSize: 50,
            total: 0,
            search: '',
            status: '',
            statusStr: '',
            statusLists: [
                {
                    code: "",
                    value: "全部"
                }
            ],
            columns1: [
                {
                    title: '竞赛主办方名称',
                    key: 'userName'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '邮箱',
                    key: 'email',
                },
                {
                    title: '使用协议',
                    slot: 'contractUrlList'
                },
                {
                    title: '竞赛项目申报书',
                    slot: 'declareUrlList'
                },
                {
                    title: '各年度报名及获奖数据',
                    slot: 'licenseUrlList'
                },
                {
                    title: '提交时间',
                    slot: 'createTime'
                },
                {
                    title: '操作',
                    slot: 'status'
                },
                {
                    title: '下载全部文件',
                    slot: 'down'
                },
            ],
            tableData: [],
            bmodal: false,
            modalvalue: ''
        }
    },
    created() {
        this.init();
        this.getStatusLists()

    },
    filters: {
        date(val) {
            if (!val) return '-'
            return moment(val).format('YYYY.MM.DD');
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.init()
        },
        downLoad(row) {
            network.downloadFileZip({
                data: { id: row.id },
            }).then((res) => {
                location.href = res
            })
        },

        async getStatusLists() {
            let data = await network.dictStatus()
            // this.statusLists = []
            if (data == 'error') return;
            this.statusLists = [...this.statusLists,...data];

        },
        async init() {
            let statusStr = ''

            let data = await network.applyResourcePage({
                data: {
                    search: this.search,
                    status: this.status,

                    pageNum: this.page,
                    pageSize: this.pageSize
                }
            })
            if (data == 'error') return;
            this.tableData = data.list;
            this.total = data.total;
        },
        async edit(row, index) {
            let res = await network.groupVerifyOnline({
                data: {
                    id: row.id,
                    userId: row.userId,
                    status: index
                }
            })
            if (res == 'error') return;
            this.init();
        },
        show(info) {
            let flag = ['.jpg', '.png', '.pdf', '.gif', 'jpeg'];
            let str = info.substring(info.lastIndexOf(".")).toLowerCase();
            if (flag.includes(str)) {
                this.modalvalue = info
                this.bmodal = true
            } else {
                console.log(info,111111);
                this.$Message.warning('下载中');
                location.href = info
                // window.open(info)
            }
        }
    }
}
</script>

<style lang="less" scoped>
h1 {
    margin: 20px 0;
}

.page {
    margin: 20px 0;
}
</style>
