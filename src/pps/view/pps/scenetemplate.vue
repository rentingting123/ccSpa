<template>
    <div class="home">
        <div class="head">
            场景模板推送
        </div>
        <div class="bodys">
              <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="模板ID：">
            <el-input v-model="formData.serialNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标题：">
            <el-input v-model="formData.temTitle" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="最近发送时间：">
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
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="$router.push('/pps/createconttemplate')">+创建场景模板</el-button>
          </el-form-item>
        </el-form>
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
        prop="labelName"
        label="用户标签">
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
        prop="createTime"
        label="最近发送时间">
        <template slot-scope="{row}">
          {{row.createTime | dtime}}
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="{row}">
            <el-button type="text" v-if="row.pushState == 0 || row.pushState == 2" @click="fasongsou(row)">立即发送</el-button>
            <el-button type="text" v-if="row.pushState == 5" @click="fasongsou(row)">重新发送</el-button>
            <el-button type="text" v-if="row.pushState == 1 || row.pushState == 3" @click="update(row)">修改</el-button>
            <el-button type="text" v-if="row.pushState !== 5" @click="dellist(row)">删除</el-button>
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
import network from "@/pps/api/index";
export default {
data(){
    return{
      total:0,
      timesa:[],
        formData:{
          pageSize:10,
          pageNum:1,
        },
          tableData: [{
            updatatime: '2016-05-02',
            creater: '王小虎',
            zhuangtai: '状态',
            chengdu: '程度',
            yonghunum:'用户数',
            yonghu:'目标用户',
            tuisongqvdao:'推送渠道',
            neirong:'推送内容',
            biaoti:'推送标题',
            leixing:'类型',
            id:1
          }]
    }
},
created(){
this.onSubmit()
},
methods:{
   handleCurrentChange(val) {
        this.formData.pageNum = val
        this.onSubmit()
      },
  update(row){
    this.$router.push({path:'/pps/createconttemplate',query:{id:row.id}})
  },
  async dellist(row){
    let res = await network.delscene({data:{
      id:row.id
    }})
    if(res == 'error') return
    this.$message.success('删除成功')
    this.onSubmit()
  },
  async fasongsou(row){
    if(row.pushChannel == 2){
      let peoples = await network.ruledata({data:{
        type:2,
        labelId:row.labelId,
        user:row.user,
      }})
      if(peoples == 'error') return
      let phoneNumberJson = []
      let templateParamJson = []
      peoples.forEach(item => {
        phoneNumberJson.push(item.phone)
      })
      let send = await network.sendmessage({data:{
        templateCode:row.gtContentTemplate?.noteId,
        phoneNumberJson:phoneNumberJson,
        templateParamJson:peoples
      }})
      if(send == 'error') return
      let content = await network.noterecord({data:{
        id:row.id
      }})
      if(content == 'error') return
      this.$message.success('操作成功！')
      this.onSubmit()
    }else if(row.pushChannel == 3){
       let mailcontent = await network.emaildata({data:{
        id:row.id,
      }})
      if(mailcontent == 'error') return
       let mails = await network.sendmail({data:mailcontent})
       if(mails == 'error') return
       let content = await network.noterecord({data:{
        id:row.id
      }})
      if(content == 'error') return
      this.$message.success('操作成功！')
      this.onSubmit()
    }else{
      let res = await network.sendmessagemoban({data:{
        id:row.id
      }})
      if(res == 'error') return
      this.$message.success('操作成功！')
      this.onSubmit()
    }
    
  },
    async onSubmit(){
       this.formData.startTime = this.timesa[0]
      this.formData.endTime = this.timesa[1]
      let res = await network.scenetemlist({
        data:this.formData
      })
      if(res == 'error') return
      res.rows.forEach(item => {
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
.head{
     position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: black;
      text-align-last: left;
      padding-left: 30px;
      border-bottom: 1px solid #f2f2f2;
}
.head::before{
     content: '';
    display: block;
    position: absolute;
    top: 14px;
    left: 21px;
    background-color: rgb(34, 34, 34);
    width: 3px;
    height: 22px;
}
.bodys{
    padding: 20px;
}
.home{
    background-color: #fff;
    height: 100%;
    text-align-last: left;
    min-width: 1000px;
}
</style>