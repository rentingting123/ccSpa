<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button class="edit" @click="reviewEdit=true">编辑</el-button>
    <el-dialog :visible.sync="reviewEdit">

    <!-- <el-form >
    <el-form-item label="网站名称" :label-width="formLabelWidth">
      <el-input v-model="websiteName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="review图" :label-width="formLabelWidth"> -->
        <upload
            v-if="addreview"
            class="upload-demo"
            :onRemove="onRemove"
            drag
            :fileList="urls"
            accept=".jpg, .png"
            name="attach"
            :onSuccess="handleAvatarSuccess"
            :config="{skin:true}"
            listType="picture"
          >
        <i class="iconfont">&#xe614;</i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
          <div class="el-upload__tip" slot="tip" style="color:#000000;">
            支持扩展名：
            .jpg.png
          </div>
        </div>
      </upload>
    <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确 定</el-button>
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
  props: ["list"],
  data() {
    return {
        addreview:true,
        urls:this.list||[],
        reviewEdit:false,
        websiteName:this.$store.state.skin.data.name,
        id:this.$store.state.skin.id,
        formLabelWidth: '120px',
    };
  },

  methods: {
    async submit(){
        //let name = await jxapi.websiteName({data:{name:this.websiteName,reviews:this.urls}})
        //if(name == 'error') return 
        //this.$message.success('修改成功！')
        this.reviewEdit=false
    },
    async onRemove(file, fileList) {
        let res = await jxapi.reviewDel({data:{
            id:file.fileKey
        }})
      this.urls = fileList;
    },
    async handleAvatarSuccess(res, file, fileList) {
        this.urls = fileList
    let result = await jxapi.reviewAdd({data:{
        url:res.location,
        name:file.name,
        fileKey:res.name,
    }})
    if(result=='error') return this.urls.pop()
    this.$message.success('review添加成功')    
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
.edit{
  position: absolute;
  top: 0;
  right: 0;
}
.editreview{
    margin-top: 20px;
}
.el-el-upload{
      margin: 0 auto;
}
.linkreview{
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
</style>