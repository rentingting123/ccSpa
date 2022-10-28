<template>
    <div>
        <Button type="primary"  @click="search">查询导入</Button>

        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>查询导入记录</span>
            </p>
            <div style="text-align:center">
                <Table :columns="columns" :data="data" border>
                    <template slot-scope="{row}" slot="createTime">
                        {{row.createTime | date}}
                    </template>
                    <template slot-scope="{row}" slot="failNum">
                        {{row.failNum || 0}}条
                    </template>
                    <template slot-scope="{row}" slot="successNum">
                        {{row.successNum || 0}}条
                    </template>
                </Table>
            </div>
            <div slot="footer">
            </div>
      </Modal>

    </div>
</template>

<script>
import moment from 'moment'
import expand from './expand'
export default {
    components:{
        expand
    },
    data(){
        return{
            show: false,
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expand, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '时间',
                    slot: 'createTime',
                },
                {
                    title: '文件名',
                    key: 'excelName',
                },
                {
                    title: '成功数',
                    slot: 'successNum',
                },
                {
                    title: '失败数',
                    slot: 'failNum',
                },
            ],
            data: []
        }
    },
    methods:{
        search(){
            this.show = true
            this.$api.get('/usercenter/specialist/selectExportLog').then(res => {
                if(res.code==0){
                    this.data = res.data || []
                }
            })
        },
        cancel(){
            this.show = false
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}
</script>

<style lang='less' scoped>

</style>