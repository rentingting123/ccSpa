<template>
  <div class="home">
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="消息模板" name="first">
          <el-form :inline="true" :model="xiaoxiform" class="demo-form-inline">
          <el-form-item label="推送标题：">
            <el-input v-model="xiaoxiform.temTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="推送内容：">
            <el-input v-model="xiaoxiform.temContent" placeholder="请输入"></el-input>
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
          <el-form-item>
            <el-button type="primary" @click="getList1">查询</el-button>
            <el-button type="primary" @click="$router.push('/pps/addnewtemplate')">+新增消息模板</el-button>
          </el-form-item>
        </el-form>
         <el-table
      :data="tableData1"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="模板ID">
      </el-table-column>
        <el-table-column
        prop="templateType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="templateTitle"
        label="内容标题">
      </el-table-column>
       <el-table-column
        prop="templateContent"
        label="推送内容">
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
            <el-button type="text" @click="updata1(row)">修改</el-button>
            <el-button type="text" @click="delmessage1(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @current-change="changecurrent1"
      :current-page="formData.pageNum"
      :page-size="formData.pageSize"
      :total="total1">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="短信模板" name="second">
         <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="推送标题：">
            <el-input v-model="formData.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="推送内容：">
            <el-input v-model="formData.tabtitle" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="提交时间：">
             <el-date-picker
               v-model="formData.begintime"
               type="date"
               placeholder="">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="">
             <el-date-picker
               v-model="formData.endtime"
               type="date"
               placeholder="">
             </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="addmessage()">新增短信模板</el-button>
          </el-form-item>
        </el-form>
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="templateCode"
        label="模板ID">
      </el-table-column>
      <el-table-column
        prop="templateName"
        label="内容标题">
      </el-table-column>
      <el-table-column
        prop="templateContent"
        label="短信模板">
      </el-table-column>
      <el-table-column
        prop="status"
        label="当前状态">
        <template slot-scope="{row}">
            <!-- AUDIT_STATE_NOT_PASS -->
            {{row.status}}
             <el-tooltip v-if="row.auditStatus == 'AUDIT_STATE_NOT_PASS'" :content="row.reason.rejectInfo" placement="top">
             <i style="font-size:18px" class="el-icon-warning"></i>
            </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="提交时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{row}">
            <el-button type="text" v-if="row.status !== '审核通过'" @click="updata(row)">修改</el-button>
            <el-button type="text" @click="delmessage(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @current-change="changecurrent"
      :current-page="current"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    </el-tab-pane>
  </el-tabs>
  
  <el-dialog
  :title="titledia"
  :visible.sync="dialogVisible"
  :append-to-body="true"
  width="1100px"
  :before-close="handleClose">

  <el-form ref="messageform" :rules="rules" :model="messageform" label-width="140px">
    <el-form-item label="短信类型" prop="templateType">
        <el-select v-model="messageform.templateType" placeholder="请选择">
    <el-option
      v-for="item in messageoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
     <el-form-item label="模板名称" prop="templateName">
      <el-input v-model="messageform.templateName"  show-word-limit maxlength="30" minlength="0"></el-input>
    </el-form-item>
     <el-form-item label="模板内容" prop="templateContent">
           <el-button v-for="att in attrs" size="mini" :key="att.id" @click="addattr(att.dictValue)" round>{{att.dictLabel}}</el-button>
      <el-input ref="tempContent" v-model="messageform.templateContent" show-word-limit maxlength="500" minlength="0">
            <template slot="append">
                    <el-tooltip content="应如${code}，其中$符在{ }外面，变量内容不能为空。变量名称不能为email、mobile、id、nick、site、ip等" placement="top">
             <i style="font-size:25px" class="el-icon-warning"></i>
        </el-tooltip>
                </template>
      </el-input>
    </el-form-item>
     <el-form-item label="短信模板申请说明" prop="remark">
          <el-input v-model="messageform.remark">
                <template slot="append">
                    <el-tooltip content="短信模板申请说明，是模板审核的参考信息之一。" placement="top">
             <i style="font-size:25px" class="el-icon-warning"></i>
        </el-tooltip>
                </template>
          </el-input>
         
     
    </el-form-item>
  </el-form>
  <div>

  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="checkmessage">确 定</el-button>
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
      timesa:[],
      rules:{
        templateType:[
          {
            required:true,
            message:'请选择短信类型',
            trigger:'blur'
          }
        ],
        templateName:[
          {
            required:true,
            message:'请输入模板名称',
            trigger:'blur'
          }
        ],
        templateContent:[
          {
            required:true,
            message:'请输入模板内容',
            trigger:'blur'
          }
        ],
        remark:[
          {
            required:true,
            message:'请输入短信模板申请说明',
            trigger:'blur'
          }
        ]
    },
        tableData1:[
            {
            mubanid:'模板ID',
            leixing:'类型',
            contenttitle:'内容标题',
            pushcontent:'推送内容',
            createdr:'创建者',
            updatatime:'提交时间',
        }
        ],
        // 消息筛选表单
        xiaoxiform:{
          pageSize:10,
          pageNum:1,
        },
        total1:0,
        current:1,
        pageSize:5,
        total:0,
        messageoptions:[
            {
                label:'验证码',
                value:0
            },
            {
                label:'短信通知',
                value:1
            },
            {
                label:'推广短信',
                value:2
            },
            {
                label:'国际/港澳台消息',
                value:3
            },
        ],
        attrs:[],
        messageform:{
          templateContent:'',
        },
        titledia:'新增短信模板',
        dialogVisible:false,
        formData:{},
         activeName: 'second',
           tableData: [],
           ids:undefined
    }
},
async created(){
      this.getList()
      this.getList1()
      let attrs = await network.getDicts('note_fields')
      if(attrs=='error')return 
      this.attrs = attrs
  },
methods:{
  async updata1(row){
    this.$router.push({path:'/pps/addnewtemplate',query:{id:row.id}})
  },
  async getList1(){
    this.formData.startTime = this.timesa[0]
    this.formData.endTime = this.timesa[1]
    let res = await network.contentlist({data:this.xiaoxiform})
    if(res == 'error') return
    this.total1 = res.total
    this.tableData1 = res.rows
    console.log(res);
  },
    changecurrent(val){
        this.current = val
        this.getList()
    },changecurrent1(val){
        this.formData.pageNum = val
        this.getList1()
    },
    async delmessage1(row){
       let res = await network.delcontent({data:{
            id : row.id
        }})
        if(res == 'error') return
        this.$message.success('删除成功')
        this.getList1()
    },
    async delmessage(row){
        let res = await network.delmessage({data:{
            templateCode : row.templateCode
        }})
        if(res == 'error') return
        this.$message.success('删除成功')
        this.getList()
    },
    async getList(){
        let res = await network.messagelist({data:{
            pageSize:this.pageSize,
            current:this.current
        }})
        if(res == 'error') return
        this.tableData = res.list
        this.total = res.total
    },
    async checkmessage(){
      this.$refs.messageform.validate(async (valid) => {
        if(!valid) return
        if(this.ids){
            this.messageform.templateCode = this.ids
            let res = await network.updatamessage({data:this.messageform})
            if(res == 'error') return
            console.log(res);
            this.ids = undefined
        }else{
            let res = await network.addmessage({data:this.messageform})
            if(res == 'error') return
            this.getList()
              this.dialogVisible = false
        this.$message.success('模板添加成功')
        
        }
      })
        
        
    },
    addattr(attr){
      this.messageform.templateContent += `\$\{${attr}\}`
      this.$nextTick(()=>{
                this.$refs.tempContent.focus()
            })
    },
    handleClose(){
        this.dialogVisible = false
    },
    // 短信模板
    addmessage(){
      this.titledia = '新增短信模板'
        this.dialogVisible = true
    },
    onSubmit(){
        console.log(this.formData);
    },
    updata(row){
        this.messageform = row
        this.ids = row.templateCode
        this.titledia = '修改短信模板'
        this.dialogVisible = true
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
.home ::v-deep .el-form-item__label {
    text-align-last: right;
}
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