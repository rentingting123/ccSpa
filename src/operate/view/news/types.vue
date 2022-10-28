<template>
    <div class="news">
        <h1>新闻类型管理</h1>

        <div class="search" style="text-align:left;margin: 20px 0;">
            <div style="display:inline-block; float:right;margin:10px 0">
                <el-button type="primary" @click="add">新增</el-button>
            </div>
        </div>

        <div class="newTab">
            <el-table :lazy= true border v-loading="loading" :data="newsList" style="width:100%" >

                <el-table-column type="index" label="序号" width="50" ></el-table-column>

                <el-table-column prop="name" label="类型名称" width="350"></el-table-column>

                <el-table-column prop="type" label="类型type" min-width="200" :column-key="'newType'" >
                </el-table-column>

                <el-table-column prop="id" label="操作" width="120">
                    <template slot-scope="scope">
                        <p class="permis_span"> 
                            <i class="el-icon-edit" @click="editNews(scope.row)"></i>
                            <i class="el-icon-delete" :class="{'addPend':scope.row.type==1}" @click="delNews(scope.row.id)"></i>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :page-size="pageSize" :current-page.sync='pageNum' layout="prev, pager, next" @current-change='getNews' :total="total"></el-pagination>
            </div>
        </div>

        <el-dialog :visible.sync="show" title="新增类型" width='800px' :close-on-click-modal='false'>
            <el-form ref="obj" label-position="top" :model="obj" class="serviceListform">
                <el-form-item label="类型名称" prop="title">
                    <el-input v-model="obj.name" />
                </el-form-item>

                <el-form-item label="类型type" prop="name">
                    <el-input v-model="obj.type"  />
                </el-form-item>
                
                <el-form-item>
                    <el-button @click="submit" style="margin-right: 8px">确定</el-button>
                    <el-button type="primary" @click="show=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import network from '@/operate/api'
export default {
    data(){
        return{
            type: 1,
            loading:false,
            total:null,
            pageNum:1,
            pageSize:12,
            newsList:[],
            show: false,
            obj:{
                name: ''
            }
        }
    },
    created(){
        this.getNews();
    },
    methods:{
        async getNews(){
            this.loading = true
            let res = await network.selectPlatformNewsType()
            this.loading = false
            if(res=='error') return;
            this.newsList = res || []
        },
        
        //删除新闻
        delNews(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(async () => {
                let res = await network.updatePlatformNewsType({data:{id:id,status:0}});
                if(res=='error') return;
                this.$message.success('删除成功');
                this.getNews()
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        add(){
            this.obj = {name: '',add:true}
            this.show = true            
        },
        //编辑新闻
        editNews(item){
            this.obj = item 
            this.show = true
        },
        async submit(){
            if(!this.obj.name) return this.$message.warning('请填写新闻类型')
            if(!this.obj.add){
                this.obj.status = 1
                let res = await network.updatePlatformNewsType({data:this.obj})
                if(res=='error') return;
                this.$message.success('修改成功')
                this.show = false
                this.getNews();
            }else{
                let res = await network.addPlatformNewsType({data:this.obj})
                if(res=='error') return;
                this.$message.success('添加成功')
                this.show = false
                this.getNews();
            }
        }
    },
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
.serviceListform{
    text-align: left;
}
</style>
