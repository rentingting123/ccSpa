<template>
    <div class="searchlist">
        <el-input placeholder="搜索" @keyup.enter.native="init" v-model="name" style="width:500px;">
            <template slot="append" @click="init">搜索</template>
        </el-input>

        <newslist :lists='lists' path='true'/>
        <div style="text-align:center;margin:10px 0;">
            <el-pagination layout="prev, pager, next" :hide-on-single-page='true' :page-size="pageSize"  :current-page.sync="pageNum" @current-change="init" :total="total"></el-pagination>
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
            lists: [],
            name: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    created(){
        this.name = this.$route.query.name || ''
        this.init();
    },
    methods:{
        async init(){
            let res = await network.npgetNewsList({data:{
                groupId: localStorage.getItem('groupId'),
                search: this.name,
                type: '',
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }})
            if(res=='error') return;
            this.total = res.total
            this.lists = res.pageData || []
        },
    },
    watch:{
        $route(){
            this.name = this.$route.query.name || ''
            this.init();
        }
    }
}
</script>

<style lang="less" scoped>
.searchlist{
    width: 1200px;
    margin: 30px auto;
    text-align: left;
}
</style>