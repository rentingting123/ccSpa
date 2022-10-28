<template>
  <div>
    <!-- <div @click="open = true">填写发票信息</div> -->
           <el-dialog
            class="persubmit"
            :visible.async= "open"
            :append-to-body="true"
            :close-on-press-escape="false"
            :before-close="close"
            width="800px"
            >

                <h1 class="">全国数学建模大赛浙江赛区发票申请</h1>
                <el-form class="form" ref="form" :model="form" label-width="120px">
                    <el-form-item label="学校代码" prop="schoolCode" :rules="{required: true, message: '学校代码不能为空', trigger: 'blur'}">
                        <el-input v-model="form.schoolCode"></el-input>
                    </el-form-item>
                    <el-form-item label="学校名称" prop="schoolName"  :rules="{required: true, message: '学校名称不能为空', trigger: 'blur'}">
                        <el-input v-model="form.schoolName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="本科队伍数" prop="undergraduateTeams" :rules="{required: true, message: '本科队伍数不能为空', trigger: 'blur'}">
                        <el-input v-model="form.undergraduateTeams"></el-input>
                    </el-form-item>
                    <el-form-item label="专科队伍数" prop="specialistTeams" :rules="{required: true, message: '专科队伍数不能为空', trigger: 'blur'}">
                        <el-input v-model="form.specialistTeams"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人姓名" prop="chargeName" :rules="{required: true, message: '负责人姓名不能为空', trigger: 'blur'}">
                        <el-input v-model="form.chargeName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机" prop="chargeTel" :rules="{required: true, message: '负责人手机不能为空', trigger: 'blur'}">
                        <el-input v-model="form.chargeTel"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="负责人电话" prop="chargePhone" :rules="{required: false, message: '负责人电话不能为空', trigger: 'blur'}">
                        <el-input v-model="form.chargePhone"></el-input>
                    </el-form-item> -->
                   <el-form-item label="税号" prop="invoiceNo" :rules="{required: true, message: '填写税号', trigger: 'blur'}">
                        <el-input v-model="form.invoiceNo"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" prop="invoicePay" :rules="{required: true, message: '填写金额', trigger: 'blur'}">
                        <el-input v-model="form.invoicePay"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <!-- <el-button type="primary" :loading="loadingPre" @click="outLogin()" >退出登录</el-button> -->
                    <!-- <el-button type="primary" :loading="loadingPre" @click="download('form')" >前往下载</el-button> -->
                    <el-button type="primary" :loading="loadingPre" @click="close" >取 消</el-button>
                    <el-button type="primary" :loading="loadingPre" @click="submit('form')" > 确 认</el-button>
                </div>
        </el-dialog>
        
   
  </div>
</template>

<script>
import network from "@/api/index";
import {cloneDeep} from 'lodash'
export default {
  props: ["user","form1","close"],
  data() {
   return {
     loadingPre:false,
     form:this.form1||{},
     open:true,
   }
  },
  created() {
   
  },
  methods: {
          submit(name){
            this.$refs[name].validate(async (valid)=>{
                if(!valid) return;
                this.loadingPre = true;
                let res = await network.setSchoolApply({data:{
                    //competitionId:this.competitionId,
                    type:4,
                    userId:this.user.id,
                    html:this.form
                }})
                this.loadingPre = false;
                if(res=='error') return;
                this.$message.success('发票申请提交成功')
                this.close()
            })
        },
  },   
  watch:{
        form1(val){
          console.log(val)
            this.form = cloneDeep(val)
        }
    }
};
</script>

<style lang="less">
.persubmit{
    h1{
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin: 10px 0;
    }
    .form{
        width: 80%;
        margin: 0 auto;
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
    }
}
</style>
