<template>
  <div class="home">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手动发布推送记录" name="first">
           <div style="text-align:left">
               <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
          <el-form-item label="推送标题">
            <el-input v-model="formData.temTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="推送内容">
            <el-input v-model="formData.templateContent" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item clearable label="推送时间">
              <el-date-picker
                  v-model="timesa"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="推送渠道">
            <el-select clearable v-model="formData.pushChannel" placeholder="请选择">
              <el-option label="短信" :value="2"></el-option>
              <el-option label="邮箱" :value="3"></el-option>
              <el-option label="个推空间" :value="1"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="审核状态">
            <el-select clearable v-model="formData.pushState" placeholder="请选择">
              <el-option label="待发送" :value="0"></el-option>
              <el-option label="等待审核" :value="1"></el-option>
              <el-option label="待发送" :value="2"></el-option>
              <el-option label="审核不通过" :value="3"></el-option>
              <el-option label="发送中" :value="4"></el-option>
              <el-option label="已发送" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
           </div>
        <el-table
      :data="onetable"
      style="width: 100%">
      <el-table-column
        prop="templateTitle"
        label="推送标题">
      </el-table-column>
      <el-table-column
        prop="templateContent"
        label="推送内容">
      </el-table-column>
      <el-table-column
        prop="pushChannel"
        label="推送渠道">
        <template slot-scope="{row}">
          <span v-if="row.pushChannel == 1">个推空间</span>
          <span v-if="row.pushChannel == 2">短信</span>
          <span v-if="row.pushChannel == 3">邮件</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="labelName"
        label="目标用户">
      </el-table-column>
      
      <el-table-column
        prop="userNum"
        label="覆盖用户数">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="重要程度">
          <template slot-scope="{row}">
          <span v-if="row.priority == 0">重要</span>
          <span v-if="row.priority == 1">中等</span>
          <span v-if="row.priority == 2">一般</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        label="创建人">
      </el-table-column>
      
      <el-table-column
        prop="pushState"
        label="推送状态">
                <template slot-scope="{row}">
          <span v-if="row.pushState == 0">待发送</span>
          <span v-if="row.pushState == 1">等待审核</span>
          <span v-if="row.pushState == 2">审核不通过</span>
          <span v-if="row.pushState == 3">发送中</span>
          <span v-if="row.pushState == 4">已发送</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="look(row.id)">查看详细记录</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="消息模板发送记录" name="second">
          <div style="text-align:left">
              <el-form :inline="true" :model="formData1" size="small" class="demo-form-inline">
          <el-form-item label="推送标题">
            <el-input v-model="formData1.temTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="推送内容">
            <el-input clearable v-model="formData1.templateContent" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="推送时间">
              <el-date-picker clearable
                  v-model="timesa1"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="推送渠道">
            <el-select clearable v-model="formData1.pushChannel" placeholder="请选择">
              <el-option label="短信" :value="2"></el-option>
              <el-option label="邮箱" :value="3"></el-option>
              <el-option label="个推空间" :value="1"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="审核状态">
             <el-select clearable v-model="formData1.pushState" placeholder="请选择">
              <el-option label="待发送" :value="0"></el-option>
              <el-option label="等待审核" :value="1"></el-option>
              <el-option label="待发送" :value="2"></el-option>
              <el-option label="审核不通过" :value="3"></el-option>
              <el-option label="发送中" :value="4"></el-option>
              <el-option label="已发送" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit1">查询</el-button>
          </el-form-item>
        </el-form>
          </div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="serialNumber"
        label="模板ID">
      </el-table-column>
      <el-table-column
        prop="templateTitle"
        label="模板标题">
      </el-table-column>
      <el-table-column
        prop="pushChannel"
        label="推送渠道">
          <template slot-scope="{row}">
          <span v-if="row.pushChannel == 1">个推空间</span>
          <span v-if="row.pushChannel == 2">短信</span>
          <span v-if="row.pushChannel == 3">邮件</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userNum"
        label="覆盖用户数">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="重要程度">
         <template slot-scope="{row}">
          <span v-if="row.priority == 0">重要</span>
          <span v-if="row.priority == 1">中等</span>
          <span v-if="row.priority == 2">一般</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        label="创建人">
      </el-table-column>
     <el-table-column
        prop="pushState"
        label="推送状态">
        <template slot-scope="{row}">
          <span v-if="row.pushState == 0">待发送</span>
          <span v-if="row.pushState == 1">等待审核</span>
          <span v-if="row.pushState == 2">待发送</span>
          <span v-if="row.pushState == 3">审核不通过</span>
          <span v-if="row.pushState == 4">发送中</span>
          <span v-if="row.pushState == 5">已发送</span>
        </template>
      </el-table-column>
       <el-table-column
            prop="createTime"
            label="推送时间">
            <template slot-scope="{row}">
          {{row.createTime | dtime}}
        </template>
          </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="look(row.id)">查看详细记录</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
    style="text-align-last:right;margin-top:10px"
                @current-change="handleCurrentChange1"
                :page-size="formData1.pageSize"
                layout="total, prev, pager, next"
                v-if="total1 > 0"
                :total="total1">
              </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
      title="查看详细记录"
      :visible.sync="dialogVisible"
      width="1000px">
       <el-table
          :data="dialogtable"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="channel"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="content"
            label="推送内容">
          </el-table-column>
          <el-table-column
            prop="pushStats"
            label="推送状态">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="推送时间">
            <template slot-scope="{row}">
          {{row.createTime | dtime}}
        </template>
          </el-table-column>
        </el-table>
           <el-pagination
    style="text-align-last:right;margin-top:10px"
                @current-change="handleCurrentChange2"
                :page-size="detailedRecordsForm.pageSize"
                layout="total, prev, pager, next"
                v-if="total2 > 0"
                :total="total2">
              </el-pagination>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import network from "@/pps/api/index";
export default {
data(){
  return{
    total:0,
    total1:0,
    total2:0,
    tableData1:[],
    timesa:[],
    timesa1:[],
    onetable:[
      {
        title:'推送标题',
        content:'content',
        qvdao:'qvdao',
        users:'users',
        usernum:'usernum',
        chengdu:'chengdu',
        people:'people',
        pushState:'pushState'
      }
      ],
    activeName: 'second',
    formData:{
      pageSize:10,
          pageNum:1,
    },
    formData1:{
      pageSize:10,
          pageNum:1,
    },
    dialogtable:[
      {
        name:'name',
        time:'shijian',
        pushState:'zhuangtai',
        content:'content',
        qvdao:'qvdao'
      }
    ],
    detailedRecordsForm:{
        pageSize:5,
          pageNum:1,
    },
    dialogVisible:false,
    tableData: []
  }
},
created(){
  this.onSubmit()
  this.onSubmit1()
},
methods:{
  async look(row){
    this.idss = row
    this.dialogVisible = true
    this.detailedRecordsForm.id = this.idss
    let res = await network.pushdetail({data:this.detailedRecordsForm})
    if(res == 'error') return
    this.total2 = res.total
    this.dialogtable = res.rows
    console.log(res);
  },
   handleCurrentChange2(val) {
        this.detailedRecordsForm.pageNum = val
        this.look(this.idss)
      },
  handleCurrentChange1(val) {
        this.formData1.pageNum = val
        this.onSubmit1()
      },
   handleCurrentChange(val) {
        this.formData.pageNum = val
        this.onSubmit()
      },
  async onSubmit(){
      this.formData.startTime = this.timesa[0]
      this.formData.endTime = this.timesa[1]
      this.formData.mesType = 1
      let res = await network.scenetemlist({
        data:this.formData
      })
      if(res == 'error') return
      res.rows.forEach(item => {
        item.templateContent = item.gtContentTemplate.templateContent
        item.serialNumber = item.gtContentTemplate.serialNumber
        item.labelName = item.gtUserLabel?.labelName
        item.templateTitle = item.gtContentTemplate.templateTitle
      })
      this.total = res.total
      this.onetable = res.rows
  },
   async onSubmit1(){
      this.formData1.startTime = this.timesa1[0]
      this.formData1.endTime = this.timesa1[1]
      this.formData1.mesType = 2
      let res = await network.scenetemlist({
        data:this.formData1
      })
      if(res == 'error') return
      res.rows.forEach(item => {
        item.templateContent = item.gtContentTemplate.templateContent
        item.serialNumber = item.gtContentTemplate.serialNumber
        item.labelName = item.gtUserLabel?.labelName
        item.templateTitle = item.gtContentTemplate.templateTitle
      })
      this.total1 = res.total
      this.tableData = res.rows
  },
    handleClick(tab, event) {
        console.log(tab, event);
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
.home{
    background-color: #fff;
    height: 100%;
    padding: 20px;
    min-width: 1000px;
}
</style>