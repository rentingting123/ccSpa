<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="bannerEdit=true">往届作品编辑</el-button>
    <el-dialog :visible.sync="bannerEdit" :append-to-body="true">
      <el-form>
        <el-form-item label="标题名" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="英文名" :label-width="formLabelWidth">
            <el-input v-model="englishname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <upload
            v-if="addBanner"
            class="upload-demo"
            :onRemove="onRemove"
            drag
            :fileList="urls"
            accept=".jpg, .png, .mp4"
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
                支持扩展名：.mp4
                .jpg.png
              </div>
            </div>
          </upload>
          <ul v-else>
            <li v-for="item in urls">
              <div>{{item.name}}</div>
              <div class="linkBanner">
                <p>linkTo:</p>
                <el-input v-model="item.link" />
              </div>
            </li>
            <el-button class="editBanner" @click="addBanner=true">编辑内容</el-button>
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
import jxapi from "@/api/index";
import { cloneDeep } from "lodash";
export default {
  components: {
    upload
  },
  props: ["list", "editOk"],
  data() {
    return {
      addBanner: false,
      urls: [],
      bannerEdit: false,
      formLabelWidth: "120px",
      loading: false,
      name:'',
      englishname:'',

    };
  },
  created(){
    this.name = this.list.name;
    this.englishname = this.list.englishname;
    this.urls = this.list.urls;
  },
  methods: {
    async submit() {
      let obj = {
        name: this.name,
        englishname: this.englishname,
        urls: this.urls
      }
      let name = await jxapi.skinSet({data:{html:obj,type:14}})
      if(name == 'error') return 
      
      this.$message.success("修改成功！");
      this.bannerEdit = false;
      return this.editOk && this.editOk();
    },
    async onRemove(file, fileList) {
      this.urls = fileList;
    },
    async handleAvatarSuccess(res, file, fileList) {
      this.loading = false;
      this.urls = fileList;
    },
    beforeUpload() {
      this.loading = true;
    }
  },
  watch:{
    bannerEdit(val){
      if(val){
        this.name = this.list.name;
        this.englishname = this.list.englishname;
        this.urls = this.list.urls;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.editBanner {
  margin-top: 20px;
}
.linkBanner {
  display: flex;
  p {
    width: 50px;
    display: inline-block;
  }
  .el-input {
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