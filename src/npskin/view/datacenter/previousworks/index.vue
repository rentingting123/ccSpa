<template>
    <div>
        <piclist :lists="lists"/>
        <div style="text-align:center;margin:20px 0;">
            <el-pagination layout="prev, pager, next" :hide-on-single-page='true' :page-size="pageSize"  :current-page.sync="pageNum" @current-change="init" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import piclist from '@/npskin/view/common/piclist'
export default {
    components:{
        piclist
    },
    data(){
        return{
            lists:[],
            pageNum: 1,
            pageSize: 12,
            total: 0
        }
    },
    async created(){
        this.init();
    },
    methods:{
        async init(){
            let id = localStorage.getItem('groupId');
            let res = await network.npgetNewsList({data:{
                groupId: id,
                type: 25,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }})
            if(res=='error') return;
            this.total = res.total || 0
            this.lists = res.pageData || []
        }
    }
}
</script>