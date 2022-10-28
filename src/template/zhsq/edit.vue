<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="createCode">生成二维码</el-button>
    <el-button @click="bannerEdit=true">高博会编辑</el-button>
    <el-dialog :visible.sync="bannerEdit" :close-on-click-modal="false" :append-to-body="true">
      <el-form >
        <el-form-item label="背景" :label-width="formLabelWidth">
          <el-input v-model="bg" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="logoSuccess"
            :beforeUpload="beforeUpload"
          >
          <el-button>上传背景图片(750*300)</el-button>
          </upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="二维码" :visible.sync="code" :close-on-click-modal="false" :append-to-body="true">
      <img class="codeimg" :src="codeurl" >
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="code=false" >取 消</el-button>
        <el-button type="primary" @click="download" >下载</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import jxapi from "@/api/index"
import utils from '@@/utils/util'
import {downloadFile} from '@/common/common.js'

export default {
  components: {
    upload
  },
  props: ["list","editOk"],
  data() {
    return {
        bg: "",
        bannerEdit:false,
        code:false,
        codeurl:'',
        id:this.$store.state.skin.id,
        formLabelWidth: '120px',
        loading:false,
    };
  },
  created(){
    this.bg = this.list.bg;
    this.tableData = this.list.tableData?this.list.tableData:[];
  },
  methods: {
    createCode(){
      if(!this.bg) return this.$message("请先设置背景");
      let url = "http://"+location.host+"/zhsq"
      utils.getQRcode(url,{width:1024,height:1024}).then(url=>{
        this.codeurl = url;
        this.code = true;
      })
    },
    download(){
      let imgname = localStorage.getItem('baseInfo')&&JSON.parse(localStorage.getItem('baseInfo'))
      imgname = imgname.name+".png"
      downloadFile(this.codeurl,imgname)
    },
    async submit(){
        let param = {
          bg: this.bg
        }
        let name = await jxapi.skinSet({data:{html:param,type:9}})
        if(name == 'error') return 
        this.$message.success('修改成功！')
        this.bannerEdit=false
        return this.editOk&&this.editOk();
    },
    logoSuccess(res,file,fileList){
      this.bg=res.location
      this.loading = false;
    },
    beforeUpload(){
      this.loading = true;
    },
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
.table{
  margin: 10px 0;
}
.codeimg{
  display: block;
  margin: 0 auto;
  width: 300px;
}

</style>

<style lang="less">
.el-form-item__label{
  text-align: left !important;
}
</style>
