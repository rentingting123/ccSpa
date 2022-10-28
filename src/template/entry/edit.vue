<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="skinEdit=true">竞赛信息编辑</el-button>
    <el-dialog :visible.sync="skinEdit" :append-to-body="true">
    

    <el-form >
    <el-form-item label="模块类型" :label-width="formLabelWidth">
      <el-select v-model="types" @change="changeTypes">
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="大赛流程方式" :label-width="formLabelWidth">
      <el-select v-model="model" @change="changeModel">
        <el-option label="列表展示" value="0"></el-option>
        <el-option label="表格展示" value="1"></el-option>
        <el-option label="个人设置展示" value="2"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="中文标题" :label-width="formLabelWidth">
      <el-input v-model="form.chineseName" autocomplete="off"/>
    </el-form-item>
     <el-form-item label="英语标题" :label-width="formLabelWidth">
      <el-input v-model="form.englishName" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="颜色背景" :label-width="formLabelWidth">
      <el-input v-model="form.colorbg" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'colorbg'))"
         :beforeUpload="beforeUpload"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>

     <el-form-item label="模块顺序" :label-width="formLabelWidth">
      <!-- <el-input v-model="form.blockRow" autocomplete="off"/> -->
      <el-select v-model="form.blockRow">
        <el-option v-for="list in lists" :key="list" :label="list" :value="list">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="报名背景" :label-width="formLabelWidth">
      <el-input v-model="form.signup" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'signup'))"
         :beforeUpload="beforeUpload"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>
    <el-form-item v-if="types==4 || types==5" label="提交作品背景" :label-width="formLabelWidth">
      <el-input v-model="form.works" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'works'))"
         :beforeUpload="beforeUpload"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>
    <el-form-item v-if="types==5" label="专家评审背景" :label-width="formLabelWidth">
      <el-input v-model="form.expert" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'expert'))"
         :beforeUpload="beforeUpload"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>

    <el-form-item label="指南背景" :label-width="formLabelWidth">
      <el-input v-model="form.guide" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'guide'))"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>

    <el-form-item label="手册背景" :label-width="formLabelWidth">
      <el-input v-model="form.manual" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="(res)=>(this.success(res,'manual'))"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>
    
    <el-form-item label="操作手册" :label-width="formLabelWidth">
      <el-input v-model="form.pdf" autocomplete="off"></el-input>
       <upload
         accept=".pdf"
         :onSuccess="(res)=>(this.success(res,'pdf'))"
      >
      <el-button>上传</el-button>
      </upload>
    </el-form-item>

  </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
  </div>
    </el-dialog>
  
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import jxapi from "@/api/index"
import {cloneDeep} from 'lodash'
export default {
  components: {
    upload
  },
  props: ["skin",'editOk',"type","models"],
  data() {
    return {
        skinEdit:false,
        form:this.skin||{},
        formLabelWidth: '120px',
        loading:false,
        lists:['1,2,3','1,3,2','2,1,3','2,3,1','3,1,2','3,2,1'],
        types:this.type,
        model: this.models || '0'
    };
  },

  methods: {
    changeTypes(val){
      this.types = val
    },
    changeModel(val){
      this.model = val
    },
    async submit(){
        let name = await jxapi.skinSet({data:{
          type:3,
          ...this.form,
          types:this.types,
          model: this.model
        }})
        if(name == 'error') return 
        this.$message.success('修改成功！')
        this.skinEdit=false
        return this.editOk&&this.editOk()
    },
    success(res,name){
      this.$set(this.form,name,res.location);
      this.loading = false;
    },
    beforeUpload(){
      this.loading = true
    }
  },
   watch:{
        skin(value){
            this.form = cloneDeep(value)
        },
        type(value){
          this.types=value
        },
        models(value){
          this.model=value
        },
    },
};
</script>

<style lang="less" scoped>
.editBanner{
    margin-top: 20px;
}
.linkBanner{
    display: flex;
    .el-input{
        margin-left: 16px;
    }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-select{
  width: 100%;
}
</style>