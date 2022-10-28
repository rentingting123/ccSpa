<template>
    <div class="organization">
        <ul>
            <li v-for="list in lists" :key="list.id" @click="todetail(list)">
                <img :src="list.newsIcon" alt="" srcset="">
                <p class="dian" :title="list.newsTitle">{{list.newsTitle}}</p>
            </li>
        </ul>
        <div style="text-align:center;margin:20px 0;">
            <el-pagination layout="prev, pager, next" :hide-on-single-page='true' :page-size="pageSize"  :current-page.sync="page" @current-change="getnews" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import network from '@/api'
export default {
    data(){
        return{
            lists:[],
            page: 1,
            pageSize: 9,
            total: 0,
            referType: 31,
        }
    },
    created(){
        this.page = 1;
        this.getnews()
    },
    methods:{
        todetail(list){
            // 返回字段不同，未复用组件
            this.$router.push({path:'/datacenter/newsdetail', query:{'id':list.id}})
        },
        async getnews(){
            let res = await network.npgetNewsList({data:{
                pageNum: this.page,
                pageSize: this.pageSize,
                type: this.referType,
                groupId: localStorage.getItem('groupId')
            }});
            if(res=='error') return;
            this.total = res.total;
            this.lists = res && res.pageData || []
        }
    }
}
</script>

<style lang="less" scoped>
.organization{
    text-align: left;
    ul{
        width: 846px;
        li{
            width: 262px;
            height: 191px;
            border: 1px solid #E8E7E7;
            display: inline-block;
            vertical-align: top;
            margin-right: 20px;
            margin-bottom: 17px;
            cursor: pointer;
            img{
                width: 100%;
                height: 150px;
            }
            p{
                width: 100%;
                line-height: 40px;
                text-align: center;
                padding: 0 5px;
            }
        }
    }
}
</style>