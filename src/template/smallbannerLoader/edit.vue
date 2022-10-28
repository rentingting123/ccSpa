<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="bannerEdit=true">logo图片编辑</el-button>
    <el-dialog :visible.sync="bannerEdit" :append-to-body="true">

    <el-form >
    <el-form-item label="网站名称" :label-width="formLabelWidth">
      <el-input v-model="websiteName" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="网站Logo" :label-width="formLabelWidth">
      <el-input v-model="websiteLogo" autocomplete="off"></el-input>
       <upload
         accept=".jpg, .png"
         :onSuccess="logoSuccess"
         :beforeUpload="beforeUpload"
      >
      <el-button>上传logo</el-button>
      </upload>
    </el-form-item>
    <el-form-item label="banner图" :label-width="formLabelWidth">
        <upload
        v-if="addBanner"
        class="upload-demo"
        :onRemove="onRemove"
        drag
        :fileList="urls"
        accept=".jpg, .png"
        name="attach"
        :onSuccess="handleAvatarSuccess"
        :beforeUpload="beforeUpload"
        :config="{skin:true}"
        listType="picture"
      >
        <i class="iconfont">&#xe614;</i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
          <div class="el-upload__tip" slot="tip" style="color:#000000;">
            支持扩展名：
            .jpg.png.gif
          </div>
        </div>
      </upload>
      <ul v-else>
          <li  v-for="item in urls">
              <div>{{item.name}}</div>
              <div class="linkBanner"><p>linkTo:</p><el-input v-model="item.link"/></div>
          </li>
          <el-button class="editBanner" @click="addBanner=true">编辑banner</el-button>
      </ul>
       <el-button v-if="addBanner" @click="addBanner=false">绑定链接</el-button>
     
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
  props: ["list","editOk"],
  data() {
    return {
        addBanner:false,
        urls:this.list||[],
        websiteLogo:this.$store.state.skin.data.logo,
        bannerEdit:false,
        websiteName:this.$store.state.skin.data.name,
        id:this.$store.state.skin.id,
        formLabelWidth: '120px',
        loading:false
    };
  },

  methods: {
    async submit(){
        let name = await jxapi.websiteName({data:{
          name:this.websiteName,
          logo:this.websiteLogo,
          banners:this.urls
        }})
        if(name == 'error') return 
        this.$message.success('修改成功！')
        this.bannerEdit=false
        return this.editOk&&this.editOk();
    },
    async onRemove(file, fileList) {
        let res = await jxapi.bannerDel({data:{
            id:file.fileKey
        }})
      this.urls = fileList;
    },
    async handleAvatarSuccess(res, file, fileList) {
       this.loading = false
        this.urls = fileList
      let result = await jxapi.bannerAdd({data:{
          url:res.location,
          name:file.name,
          fileKey:res.name,
      }})
      if(result=='error') return this.urls.pop()
      this.$message.success('banner添加成功')    
    },
    logoSuccess(res,file,fileList){
      this.websiteLogo=res.location
      this.loading = false;
    },
    beforeUpload(){
      this.loading = true;
    },
  },
   watch:{
        list(value){
            this.urls = cloneDeep(value)
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
    p{
      width: 50px;
      display: inline-block;
    }
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
</style>