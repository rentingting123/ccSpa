<template>
  <div class="serviceList">
    <h1>用户管理</h1>

    <div class="search">
      <el-input placeholder="请输入内容" v-model="search" @keyup.enter.native="init" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click.native="init"></el-button>
      </el-input>
      <add :close='init' />
    </div>

    <el-table border :data="tableData">
      <el-table-column prop="user_id" label="id" width="80"> </el-table-column>
      <el-table-column prop="realname" label="用户名"> </el-table-column>
      <el-table-column prop="username" label="登录账号"> </el-table-column>
      <el-table-column prop="locked" label="状态" width="100">
        <template slot-scope="{row}">
          {{row.locked ? '关闭' : '开通'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <!-- 角色管理 -->
          <relation :data='row' :lists='lists' />
          <el-button type="primary" v-if="row.locked" size="mini" @click="editLocked(row, 0)">开通</el-button>
          <el-button type="danger" v-else size="mini" @click="editLocked(row, 1)">关闭</el-button>
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
import relation from './relation'
export default {
  components:{
    add,
    relation,
  },
  data() {
    return {
      tableData: [],
      search: '',
      lists: []
    };
  },
  created(){
    this.init();
    this.getList();
  },
    
  methods:{
      async getList(){
        let res = await network.getRoleList();
        if(res=='error') return;
        this.lists = res || []
      },
      del(row){
        this.$confirm('删除后无法恢复，请确认是否删除', '提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async ()=>{
          let res = await network.delUser({data:{
            user_id: row.user_id
          }});
          if(res=='error') return;
          this.$message.success('删除成功');
          this.init();
        })
      },
      async init(){
        let res = await network.getUserList({data:{
          search: this.search
        }});
        if(res=='error') return;
        this.tableData = res || []
      },

      async editLocked(row, flag){
        let res = await network.setLocked({data:{
          locked: flag,
          user_id: row.user_id
        }})
        if(res=='error') return;
        this.$message.success('修改成功')
        this.init();
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

