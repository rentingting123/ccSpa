<template>
  <div class="serviceList">
    <h1>路由管理</h1>

    <div class="search">
      <el-input placeholder="请输入内容" v-model="search" @keyup.enter.native="init" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click.native="init"></el-button>
      </el-input>
      <add :close='init' />
    </div>

    <el-table border :data="tableData">
      <el-table-column prop="id" label="id" width="80"> </el-table-column>
      <el-table-column prop="name" label="权限名" > </el-table-column>
      <el-table-column prop="white_urls" label="白名单路由"> </el-table-column>
      <el-table-column prop="perm_code" label="权限编码"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
          <template slot-scope="{row}">
              {{row.create_time | date}}
          </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="180">
          <template slot-scope="{row}">
              {{row.update_time | date}}
          </template>
      </el-table-column>
      
      <el-table-column label="操作" >
        <template slot-scope="{ row }">
          <!-- 修改 -->
          <add :close='init' :data='row' />
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import network from "@/operate/api";
import add from './add'
import moment from 'moment'
export default {
    components:{
        add,
    },
    data() {
        return {
        tableData: [],
        search: '',
        };
    },
    created(){
        this.init()
    },
    
    methods:{
        del(row){
            this.$confirm('删除后无法恢复，请确认是否删除', '提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
            }).then(async ()=>{
            let res = await network.delPersission({data:{
                id: row.id
            }});
            if(res=='error') return;
            this.$message.success('删除成功');
            this.init();
            })
        },
        async init(){
            let res = await network.getPersissionList({data:{
                search: this.search
            }});
            if(res=='error') return;
            this.tableData = res || []
        },
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    }
};
</script>

<style lang="less" scoped>
.serviceList{
  .search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .input-with-select{
        width: 300px;
    }
  }
}
</style>