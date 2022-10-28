<template>
  <div class="home">
      <div style="    text-align: left;">
         <el-form  :inline="true"  size="small" :model="formData" class="demo-form-inline">
          <el-form-item label="推送标题：">
            <el-input v-model="formData.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="推送内容：">
            <el-input v-model="formData.tabtitle" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="提交时间：">
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
            <el-select v-model="formData.tuisong" placeholder="请选择">
              <el-option label="个推空间" :value="1"></el-option>
              <el-option label="短信" :value="2"></el-option>
              <el-option label="邮件" :value="3"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="审核状态">
            <el-select v-model="formData.pushState" placeholder="请选择">
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
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mesType"
        label="类型">
          <template slot-scope="{row}">
          <span v-if="row.mesType == '1'">手动发布消息</span>
          <span v-if="row.mesType == '2'">场景模板推送</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="templateTitle"
        label="推送标题">
      </el-table-column>
      <el-table-column
        prop="templateContent"
         width="400"
        label="推送内容">
      </el-table-column>
        <el-table-column
        prop="pushChannel"
        label="推送渠道">
        <template slot-scope="{row}">
          <span v-if="row.pushChannel == 1">个推空间</span>
          <span v-if="row.pushChannel == 2">短信</span>
          <span v-if="row.pushChannel == 3">邮件</span>
          <!-- <span v-if="row.pushChannel == 3">公众号</span> -->
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
        label="重要程度"
        width="180">
        <template slot-scope="{row}">
          <span v-if="row.priority == 0">重要</span>
          <span v-if="row.priority == 1">中等</span>
          <span v-if="row.priority == 2">一般</span>
        </template>
      </el-table-column>
        <el-table-column
        prop="pushState"
        label="状态">
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
        prop="createBy"
        label="创建者">
      </el-table-column>
       <el-table-column
        prop="createTime"
        label="提交时间">
        <template slot-scope="{row}">
          {{row.createTime | dtime}}
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="{row}">
            <el-button type="text" @click="detiail(row)">查看详情</el-button>
            <el-button type="text" v-if="row.pushState == 1" @click="shenhe(row)">审核</el-button>
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
    <el-dialog
  title="审核推送消息"
  :visible.sync="dialogVisible"
  width="600px"
  :before-close="handleClose">
    <el-form ref="form" :model="formexamine" label-width="0">
        <el-form-item label="">
           <el-radio-group v-model="formexamine.radio">
              <el-radio :label="0">通过</el-radio>
              <el-radio :label="1">不通过</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formexamine.radio == 1" label="">
          <el-input v-model="formexamine.reson" placeholder="不通原因（选填）"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="checkshenhe">确 定</el-button>
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
      timesa:[],
        dialogVisible:false,
         formData:{
             pageSize:10,
          pageNum:1,
          reson:''
         },
         formexamine:{},
         tableData: [],
         ids:undefined,
         obj:{},
         titlelist:[]
    }
},
created(){
this.onSubmit()
},
methods:{
  detiail(row){
    if(row.mesType == '2'){
      this.$router.push({path:'/pps/createconttemplate',query:{id:row.id,del:1}})
    }else{
      this.$router.push({path:'/pps',query:{id:row.id}})
    }
  },
  async checkshenhe(){
    let res = await network.newsreview({
      data:{
        id:this.ids,
        pushState:this.formexamine.radio +'',
        auditOpinion:this.formData.reson
      }
    })
    if(res == 'error') return
    if(this.obj.mesType == '1' && this.obj.pushChannel == 2 && this.formexamine.radio == 0){
      let peoples = await network.ruledata({data:{
        type:this.obj.targetUser,
        labelId:this.obj.labelId,
        user:this.obj.user 
      }})
      if(peoples == 'error') return
      let phoneNumberJson = []
      let templateParamJson = []
      peoples.forEach(item => {
        phoneNumberJson.push(item.phone)
      })
      let send = await network.sendmessage({data:{
        templateCode:this.obj.gtContentTemplate?.noteId,
        phoneNumberJson:phoneNumberJson,
        templateParamJson:peoples
      }})
      if(send == 'error') return
       let content = await network.noterecord({data:{
        id:this.obj.id
      }})
      if(content == 'error') return
    }else if(this.obj.mesType == '1' && this.obj.pushChannel == 3 && this.formexamine.radio == 0){
      let mailcontent = await network.emaildata({data:{
        id:this.obj.id,
      }})
      if(mailcontent == 'error') return
       let mails = await network.sendmail({data:mailcontent})
       if(mails == 'error') return
       console.log(mails);
    }
    this.$message.success('审核成功！')
      this.dialogVisible = false
    this.onSubmit()
  },
    handleClose(){
        this.dialogVisible = false
    },
   async  shenhe(row){
     
      this.obj = row
      this.ids = row.id
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
        this.formData.pageNum = val
        this.onSubmit()
      },
    async onSubmit(){
          this.formData.startTime = this.timesa[0]
      this.formData.endTime = this.timesa[1]
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
      this.tableData = res.rows
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
    text-align-last: left;
    min-width: 1000px;
}
</style>