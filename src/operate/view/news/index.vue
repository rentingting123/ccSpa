<template>
    <div class="news">
        <h1>新闻列表</h1>

        <div class="search" style="text-align:left;margin: 20px 0;">
            <el-select v-model="type" style="width:200px" placeholder="请选择类型" @change="init">
                <el-option v-for="item in typesLists" :key="item.id" :value="item.type" :label="item.name"></el-option>
            </el-select>

            <div style="display:inline-block; float:right;margin:10px 0">
                <el-button type="primary" @click="toAddnews">发布新闻</el-button>
            </div>
        </div>

        <div class="newTab">
            <el-table :lazy= true border v-loading="firstTableLoading" :data="newsList" style="width:100%" >
                <el-table-column type="index" label="序号" width="50" ></el-table-column>
                <el-table-column prop="newsTitle" label="新闻名称" width="350"></el-table-column>
                <el-table-column prop="type" label="新闻类型" min-width="200" :column-key="'newType'" >
                    <template slot-scope="scope">
                        {{scope.row.platformType | newstypeshow}}
                   </template>
                </el-table-column>

                <el-table-column  prop="publishTime" label="发布日期" width="210">
                    <template slot-scope="scope">
                        <p>{{scope.row.publishTime | date}}</p>
                    </template>
                </el-table-column>

                <el-table-column prop="clickCount" label="点击量" width="100"></el-table-column>
                <el-table-column prop="id" label="操作" width="120">
                    <template slot-scope="scope">
                        <p class="permis_span"> 
                            <i class="el-icon-edit" @click="editNews(scope.row.id)"></i>
                            <i class="el-icon-delete" :class="{'addPend':scope.row.type==1}" @click="delNews(scope.row.id)"></i>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :page-size="pageSize" :current-page.sync='pageNum' layout="prev, pager, next" @current-change='getNews' :total="total"></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import network from '@/operate/api'
import moment from 'moment'
export default {
    data(){
        return{
            firstTableLoading:false,
            total:null,
            pageNum:1,
            pageSize:12,
            newsList:[],
            type: "",
            typesLists: [],
        }
    },
    created(){
        this.getTypesLists();
    },
    methods:{
        // 获取列表类型
        async getTypesLists(){
            this.loading = true
            let res = await network.selectPlatformNewsType()
            this.loading = false
            if(res=='error') return;
            this.typesLists = res || []
            if(this.typesLists.length>0){
                this.type = this.typesLists[0].type
                this.init()
            }
        },
        init(){
            this.pageNum = 1
            this.getNews();
        },
        async getNews(){
            this.firstTableLoading = true
            let param = {
                platformType: this.type || null,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                search: ''
            }
            let res = await network.selectPlatformNews({data:param})
            this.firstTableLoading = false
            if(res=='error') return;
            this.total = res.total
            this.newsList = res.list || []
            this.firstTableLoading = false
        },
        //编辑新闻
        editNews(id){
            this.$router.push('/news/issue?id='+id)
        },
        //删除新闻
        delNews(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(async () => {
                let res = await network.savePlatformNews({data:{id:id,delStatus:0}});
                if(res=='error') return;
                this.$message.success('删除成功');
                this.getNews()
                
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        toAddnews(){
            this.$router.push('/news/issue')
        },
    },
    filters:{
        date(val){
            if(!val) return
            let value = parseInt(val)
            return moment(value).format('YYYY-MM-DD');
        },
        newstypeshow(val){
            if(val==1){
                return '国皮肤'
            }
        }
    }
}
</script>

<style lang="less">
a{
    text-decoration:none;
}
.news{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;
}
.newTab{
    margin-top: 11px;
    margin-bottom: 60px;
    .el-table tr {
        height: 50px;
    }
}
.newTab .el-table th {
    background: #f0f2f4;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #787D81;
    letter-spacing: 0;
    font-weight: 500;
    padding: 7px 0;
}
.newTab .el-table td{
    padding: 1px 0;
}

.permis_span{
    i{
        cursor: pointer;
        margin-right: 16px;
        color: #9B9B9B;
    }
    .gold{
        color: #FFD700;

    }
}
.addPend{
    padding-left: 38px;
}
.pagination{
    margin-top: 20px;
    text-align: center;
}

</style>
