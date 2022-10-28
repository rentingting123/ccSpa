<template>
    <div class="discipline">
        <h1>专业管理</h1>
        <div class="search" >
            <el-select
                v-model="search"
                filterable
                style="width:300px;"
                remote
                :remote-method="remoteMethod"
                @change="init"
                placeholder='请查询并选择学校'
                :loading="loading">
                <el-option v-for="(option, index) in options" 
                    :value="option.schoolcolName" 
                    :key="index"
                    :label="option.schoolcolName"
                    >
                </el-option>
            </el-select>
            <el-button type="primary" size='small' @click="add">新增专业</el-button>
        </div>

        <div>
            <el-table border :data="tableData">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="专业名称" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="{ row }">
                        <el-button type="error" @click='del(row)' >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :visible.sync="addShow" draggable scrollable title="添加专业">
            <el-input v-model="major" placeholder="请输入新增专业"/>
            <div slot="footer">
                <el-button type="default" @click="addShow=false">取消</el-button>
                <el-button type="primary" @click="toAdd" style="margin-left: 15px">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import network  from '@/operate/api/index'
export default {
    data(){
        return{
            search: '',
            loading: false,
            major: '',
            addShow: false,
            options: [],
            tableData:[],
        }
    },
    methods:{
        async init(){
            let res = await network.getMajorBySchool({data:{
                schoolName: this.search,
                limit: 999
            }});
            if(res=='error') return;
            let arr = []
            for(let i in res){
                arr.push({
                    name: res[i],
                    id: i
                })
            }
            this.tableData = arr
        },
        async remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                let res = await network.schools({data:{
                    q: query,
                    limit: 10,
                }});
                this.loading = false
                if(res=='error') return;
                this.options = res
            } else {
                this.options = [];
            }
        },
        add(){
            if(!this.search) return this.$Message.warning('请先选择学校')
            this.addShow = true
        },
        async toAdd(){
            if(!this.search) return this.$Message.warning('请先选择学校')
            if(!this.major) return this.$Message.warning('请输入专业名称');
            
            let res = await network.insertMajor({data:{
                major: this.major,
                name: this.search,
            }});
            if(res=='error') return;
            this.$Message.success('操作成功')
            this.addShow = false
            this.init()
        },
        async del(row){
            if(!this.search) return this.$Message.warning('请先选择学校')
            let res = await network.delMajor({data:{
                schoolName: this.search,
                major: row.name
            }});
            if(res=='error') return;
            this.$Message.success('操作成功');
            this.init()
        }
    }
}
</script>

<style lang='less' scoped>
.discipline{
    padding: 20px;
    .search{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }
    /deep/.ivu-select-item{
        text-align: left;
    }
}
</style>