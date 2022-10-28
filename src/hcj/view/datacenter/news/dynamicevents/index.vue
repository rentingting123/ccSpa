<template>
<div>
    <newslist name="赛事动态" referType='22' :lists='lists'/>
    <div style="text-align:center;margin:20px 0;">
        <el-pagination layout="prev, pager, next" :hide-on-single-page='true' :page-size="pageSize"  :current-page.sync="page" @current-change="getnews" :total="total"></el-pagination>
    </div>
</div>
</template>

<script>
import network from '@/api'
import newslist from '@/hcj/view/common/newslist'
export default {
    components:{
        newslist
    },
    data(){
        return{
            lists:[],
            page: 1,
            total: 0,
            pageSize: 10,
        }
    },
    created(){
        this.page = 1;
        this.getnews()
    },
     methods:{
        async getnews(){
            let res = await network.npgetNewsList({data:{
                pageNum: this.page,
                pageSize: this.pageSize,
                type: 22,
                groupId: localStorage.getItem('groupId')
            }});
            if(res=='error') return;
            this.total = res.total;
            this.lists = res && res.pageData || []
        },
    },
}
</script>