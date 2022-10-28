<template>
  <div class="home">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="分类名称：">
            <el-input clearable v-model="formData.cifName" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="创建时间：">
               <el-date-picker
                  v-model="timesa"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
           
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="addnewtab(0)">新增分类</el-button>
          </el-form-item>
        </el-form>
        <div>
            <el-table
               :data="tableData"
               style="width: 100%">
               <el-table-column
                 prop="classificationName"
                 label="分类名称">
               </el-table-column>
               <el-table-column
                 prop="labelsum"
                 label="所属标签数量">
               </el-table-column>
               <el-table-column
                 prop="createTime"
                 label="创建时间">
               </el-table-column>
               <el-table-column
                 label="操作">
                  <template slot-scope='{row}'>
                    <el-button size='mini' type="text"  @click="addnewtab(row)">编辑</el-button>
                    <el-button size='mini' type="text"  @click="deltab(row)">删除</el-button>
                </template>
               </el-table-column>
             </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="formData.pageSize"
                layout="total, prev, pager, next"
                v-if="total > 0"
                :total="total">
              </el-pagination>
        </div>
       <el-dialog
  :title="dialogtitle"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <div>
      <el-form ref="addform" :rules="addrules" :model="form" label-width="80px">
  <el-form-item label="标签名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
      </el-form>
  </div>
  <span  slot="footer" class="dialog-footer" style="text-align-last: right;">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" v-loading="btnloading" @click="checktab">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import network from "@/pps/api/index";
export default {
data(){
    return{
      timesa:[],
      addrules:{
                name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      btnloading:false,
      total:0,
        ids:undefined,
        form:{name:null},
         dialogVisible: false,
         formData: {
           cifType:undefined,
          titcifNamele: '',
          startTime: undefined,
          endTime:undefined,
          pageSize:10,
          pageNum:1
        },
        dialogtitle:'设置分类',
        tableData: [],
        idss:undefined
    }
},
created(){
    this.getList()
    console.log(this.$route.query.type);
},
methods:{
   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.formData.pageNum = val
        this.getList()
        console.log(`当前页: ${val}`);
      },
   deltab(row){
     this.$confirm('是否确认删除分类"' + row.classificationName + '"?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            }).then(function() {
              return network.delcif({data:{
              id:row.id
            }})
            }).then(() => {
            this.getList();
            this.msgSuccess("删除成功");
            })
  },
  async getList(){
    if(this.timesa.length>0){
      this.formData.startTime = this.timesa[0]
      this.formData.endTime = this.timesa[0]
    }
    this.formData.cifType = this.$route.query.type
    let res = await network.ciflist({data:
      this.formData
    })
    if(res == 'error') return
    this.tableData = res.rows
    this.total = res.total
  },
     checktab(){
       this.$refs.addform.validate(async (valid) =>{
         if(valid) {
            if(this.dialogtitle === '编辑分类'){
                this.btnloading = true
               // this.form.name = undefined
              let res = await network.updaecif({data:{
                classificationName:this.form.name,
                type:this.$route.query.type,
                id:this.idss
              }})
              this.btnloading = false
              if(res == 'error') return
              this.$message.success('编辑分类成功')
              this.getList()
              this.dialogVisible = false
              this.form.name = undefined
            }else{
              this.btnloading = true
               // this.form.name = undefined
              let res = await network.addcif({data:{
                name:this.form.name,
                type:this.$route.query.type
              }})
              this.btnloading = false
              if(res == 'error') return
              this.$message.success('新增分类成功')
              this.getList()
              this.dialogVisible = false
              this.form.name = undefined
            }
         }else{
           return
         }
          
       })
        
    },
    addnewtab(id){
        if(id == 0){
            this.dialogtitle = '设置分类',
            this.dialogVisible = true
        }else{
          this.form.name = id.classificationName
          this.idss = id.id
            this.dialogtitle = '编辑分类',
            this.dialogVisible = true
        }
        
    },
 handleClose(done) {  this.dialogVisible = false},
    //查询表单
    onSubmit(){
        console.log(this.formData);
    }
}
}
</script>

<style scoped>
.home ::v-deep .el-dialog__footer{
    text-align-last: right;
}
.home{
    background-color: #fff;
    height: 100%;
    padding: 16px;
    text-align-last: left;
}
</style>