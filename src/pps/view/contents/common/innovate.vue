<template>
  <div class="home">
      <div class="right" style="    text-align: left;">
         <el-form  size="small"  :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="标题名称">
            <el-input v-model="formData.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="formData.auther" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="发布时间">
               <el-date-picker
                  v-model="timesa"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
           
          </el-form-item>
          <el-form-item label="原始分类">
            <el-select v-model="formData.originalClass" placeholder="请选择">
              <el-option label="实验教学" :value="0"></el-option>
              <el-option label="产教融合" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采集方式">
            <el-select v-model="formData.admode" placeholder="请选择">
              <el-option label="默认" :value="0"></el-option>
              <el-option label="数据导入" :value="1"></el-option>
              <el-option label="第三方接口" :value="2"></el-option>
              <el-option label="爬虫" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="getList">查询</el-button>
            <!-- <el-button type="primary">+导入数据</el-button> -->
            <!-- <el-button type="primary">同步更新</el-button> -->
          </el-form-item>
        </el-form>
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
        <el-table-column
        prop="auther"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="originalClass"
        label="原始分类">
        <template slot-scope="{row}">
              <span v-if="row.originalClass == 0">实验教学</span>
              <span v-if="row.originalClass == 1">产教融合</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="dataSources"
        label="数据来源">
        
      </el-table-column>
       <el-table-column
        prop="releaseTime"
        label="发布时间">
        <template slot-scope="{row}">
           {{row.releaseTime | dtime}}
         </template>
      </el-table-column>
      <el-table-column
        prop="admode"
        label="采集方式">
        <template slot-scope="{row}">
              <span v-if="row.originalClass == 0">默认</span>
              <span v-if="row.originalClass == 1">数据导入</span>
              <span v-if="row.originalClass == 2">第三方接口</span>
              <span v-if="row.originalClass == 3">爬虫</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="admodeTime"
        label="采集时间">
         <template slot-scope="{row}">
           {{row.admodeTime | dtime}}
         </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作">
        <template slot-scope="{row}">
            <el-button type="text" >源地址</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
    style="text-align-last:right;margin-top:10px"
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
data(){
    return{
        timesa:[],
        formData:{
            pageSize:10,
          pageNum:1,
          dataType:2
        },
        tableData:[],
        total:0
    }
},
created(){
  this.getList()
},
methods:{
    handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.formData.pageNum = val
        this.getList()
      },
   async getList(){
        this.formData.fbstartTime = this.timesa[0]
      this.formData.fbendTime = this.timesa[1]
    let res = await network.getconlist({data:
    this.formData})
    if(res == 'error') return
    this.tableData = res.rows
    this.total = res.total
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
.home{
    text-align-last: left;
    background-color: #fff;
    height: 100%;
}
</style>