<template>
  <div class="home">
      <div class="right" style="text-align: left;">
        <el-form  size="small"  :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="学生姓名">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
             <el-select v-model="formData.state" placeholder="请选择">
              <el-option label="已认定" :value="0"></el-option>
              <el-option label="已立项" :value="1"></el-option>
              <el-option label="已申报" :value="2"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="状态时间">
               <el-date-picker
                  v-model="timesa"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
           
          </el-form-item>
           <el-form-item label="项目类型">
             <el-select v-model="formData.type" placeholder="请选择">
              <el-option label="国创项目" :value="0"></el-option>
              <el-option label="论文" :value="1"></el-option>
              <el-option label="专利" :value="2"></el-option>
              <el-option label="雅思托福" :value="3"></el-option>
              <el-option label="学科竞赛" :value="4"></el-option>
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
        <fileimport :dialogVisible='dialogVisible' :datas="objs"  @changeopen="changeopen"></fileimport>
        <!-- <el-button type="primary" size="mini" @click="dialogVisible = true">导入报名表</el-button> -->
           <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="学生姓名">
      </el-table-column>
        <el-table-column
        prop="faculty"
        label="所属学院">
      </el-table-column>
      <el-table-column
        prop="type"
        label="项目类型">
        <template slot-scope="{row}">
              <span v-if="row.type == 0">国创项目</span>
              <span v-if="row.type == 1">论文</span>
              <span v-if="row.type == 2">专利</span>
              <span v-if="row.type == 3">雅思托福</span>
              <span v-if="row.type == 4">学科竞赛</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="year"
        label="年份">
      </el-table-column>
       <el-table-column
        prop="createdr"
        label="状态">
        <template slot-scope="{row}">
          <span v-if="row.state == 0">已认定</span>
          <span v-if="row.state == 1">已立项</span>
          <span v-if="row.state == 2">已申报</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stateTime"
        label="状态时间">
        <template slot-scope="{row}">
           {{row.stateTime | dtime}}
         </template>
      </el-table-column>
      <el-table-column
        prop="admode"
        label="采集方式">
         <template slot-scope="{row}">
              <span v-if="row.admode == 0">默认</span>
              <span v-if="row.admode == 1">数据导入</span>
              <span v-if="row.admode == 2">第三方接口</span>
              <span v-if="row.admode == 3">爬虫</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="admodeTime"
        label="采集时间">
        <template slot-scope="{row}">
           {{row.admodeTime | dtime}}
         </template>
      </el-table-column>
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
import fileimport from './fileimport'
import network from "@/pps/api/index";
export default {
  components:{
    fileimport,
  },
data(){
    return{
      objs:{
        type:4
      },
      dialogVisible:false,
      total:0,
        timesa:[],
        formData:{
          pageSize:10,
          pageNum:1,
          dataType:4
        },
        tableData:[]
    }
},
created(){
  this.getList()
},
methods:{
  changeopen(){
    console.log(123);
    this.dialogVisible = false
  },
  async importTable() {
      // 210709调用查询导入接口，只要竞赛（包含赛项）中有导入中，就不让继续导入
      let res = await network.importdata({
        data: { file: this.competitionId, type: 1},
      });
      if (res == "error") return;
     
    },
   handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.formData.pageNum = val
        this.getList()
      },
   async getList(){
        this.formData.ztstartTime = this.timesa[0]
        this.formData.ztendTime = this.timesa[1]
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