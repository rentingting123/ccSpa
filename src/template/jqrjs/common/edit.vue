<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="skinEdit=true">信息编辑</el-button>
    <el-dialog :visible.sync="skinEdit" :append-to-body="true">
    
      <el-form :model="form">

        <el-form-item label="报名入口背景" :label-width="formLabelWidth">
          <el-input v-model="form.signup" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'signup'))"
            :beforeUpload="beforeUpload"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>

        <el-form-item label="参赛指南背景" :label-width="formLabelWidth">
          <el-input v-model="form.guide" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'guide'))"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>

        <el-form-item label="操作手册背景" :label-width="formLabelWidth">
          <el-input v-model="form.works" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'works'))"
            :beforeUpload="beforeUpload"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>
        
        <el-form-item label="操作手册文件" :label-width="formLabelWidth">
          <el-input v-model="form.worksfile" autocomplete="off"></el-input>
          <upload
            accept=".pdf"
            :onSuccess="(res)=>(this.success(res,'worksfile'))"
          >
          <el-button>上传</el-button>
          </upload>
        </el-form-item>
        
        <el-form-item label="视频封面" :label-width="formLabelWidth">
          <el-input v-model="form.video" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'video'))"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>

         <el-form-item label="视频链接地址" :label-width="formLabelWidth">
          <el-input v-model="form.videourl" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="报名是否开放" :label-width="formLabelWidth">
          <el-radio-group v-model="form.openSignup">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
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
export default {
  components: {
    upload
  },
  props:['editOk','skin'],
  data() {
    return {
        skinEdit:false,
        formLabelWidth: '120px',
        loading:false,
        form:{
          signup: '',
          guide: "",
          works: "",
          worksfile: '',
          video: '',
          videourl: '',
          openSignup: 0,
        }
    };
  },
  created(){
  },
  methods: {
    async submit(){
        let name = await jxapi.skinSet({data:{
          type:10,
          html:{
            ...this.form
          }
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
    },
  },
  watch:{
    skin:{
      immediate: true,
      handler(val){
        if(!val) return;
        this.form = val
      }
    }
  }
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
.codeimg{
  display: block;
  margin: 0 auto;
  width: 300px;
}
</style>