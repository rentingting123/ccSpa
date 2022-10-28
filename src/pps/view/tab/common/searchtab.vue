<template>
  <div class="home">
        <el-form :inline="true" size="small" :model="formData" class="demo-form-inline">
          <el-form-item label="分类：">
            <el-input v-model="formData.cifName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标签名称：">
            <el-input v-model="formData.labelName" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="创建时间：">
             <el-date-picker
               v-model="formData.startTime"
               type="date"
               placeholder="">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="">
             <el-date-picker
               v-model="formData.endTime"
               type="date"
               placeholder="">
             </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="标签状态：">
            <el-select v-model="formData.status" placeholder="请选择">
              <el-option label="正常运行" :value="0"></el-option>
              <el-option label="已暂停" :value="1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="setclass(0)">设置分类</el-button>
            <el-button type="primary" @click="setclass(1)">+创建标签</el-button>
          </el-form-item>
        </el-form>
        <div>
            <el-table
    :data="tableData1"
    style="width: 100%"
    :row-key="rowKeyFunc"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="classificationName"
      label="全部标签（99）"
      width="180">
    </el-table-column>
    <!-- <el-table-column
      prop="id"
      label="标签值"
      width="180">
    </el-table-column> -->
    <el-table-column
    v-if="identity !== 2"
      prop="usernum"
      label="覆盖用户数">
    </el-table-column>
    <el-table-column
      prop="status"
      label="最近更新状态">
    </el-table-column>
    <el-table-column
      prop="createBy"
      label="创建者">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
      <template slot-scope="{row}">
        {{row.createTime | dtime}}
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="{row,  $index}">
          <el-button v-if="!row.hasChildren" type="text" @click="setclass(1,row.id)">查看详情</el-button>
          <el-button v-if="!row.hasChildren" @click="delclasstab(row, $index)" type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
             <el-pagination
                @current-change="handleCurrentChange"
                :page-size="formData.pageSize"
                layout="total, prev, pager, next"
                v-if="total > 0"
                :total="total">
              </el-pagination>
        </div>
  </div>
</template>

<script>
import moment from 'moment'
import network from "@/pps/api/index";
export default {
    props:['identity'],
data(){
    return{
        bigtitle:'',
        formData:{
          pageSize:10,
          pageNum:1,
          cifType:undefined
        },
         tableData1: [],
        total:0,
    }
},
created(){
    if(this.identity == 1){
        this.bigtitle = '用户标签库'
    }else if(this.identity == 2){
        this.bigtitle = '内容标签库'
    }else if(this.identity == 3){
        this.bigtitle = '数据标签库'
    }
    this.getList()
},
methods:{
  async delclasstab(row,index){
    let res = await network.dellabel({data:{
      id:row.id
    }})
    if(res == 'error') return
    this.$message.success('删除成功！')
    this.$router.go(0)
  },
      handleCurrentChange(val) {
        this.formData.pageNum = val
        this.getList()
      },
  async getList(){
    this.formData.cifType = this.identity
    let res = await network.labeldblist({data:this.formData})
    this.total = res.total
    res.rows.forEach(item => {
      if(item.gtUserLabel){
        item.hasChildren = true
      }
    })
    this.tableData1 = res.rows
  },
  rowKeyFunc(row) {
  return `${row.id}${row.createTime}`
},
    setclass(type,id){
        if(type == 0){
          //  if(this.identity == 2){
              this.$router.push({path:'/tab/setclass',query:{type:this.identity}})
          // }
            
        }else{
          if(this.identity == 2){
              this.$router.push({path:'/tab/contentaddtab',query:{type:this.identity,id:id}})
          }else if(this.identity == 3){
              this.$router.push({path:'/tab/dataaddtab',query:{type:this.identity,id:id}})
          }else{
            this.$router.push({path:'/tab/addtab',query:{type:this.identity,id:id}})
          }
            
        }
        
    },
     load(tree, treeNode, resolve) {
       let arr = tree.gtUserLabel
       if(tree.gtUserLabel){
         tree.gtUserLabel.forEach(item => {
           item.classificationName = item.labelName
         })
       }
        setTimeout(() => {
          resolve(
            arr
          )
        }, 1000)
      },
    serachGroupInfo(row){
        console.log(row);
    },
    onSubmit(){
        console.log(this.formData);
    }
},
 filters:{
         dtime(val){
        if(val){
            return moment(val).format('YYYY-MM-DD HH:MM')
        }else{
            return ''
        }
    }
 }
}
</script>

<style scoped>
.home ::v-deep .el-table th{
    background-color:#f9fafb;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.home{
    background-color: #fff;
    height: 100%;
    padding: 16px;
    text-align-last: left;
}
</style>