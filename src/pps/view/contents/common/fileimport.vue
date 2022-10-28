<template>
  <span>
    <el-button type="primary" @click="dialogVisible = true">
       <slot />
    </el-button>
    <el-dialog title="导入数据" :visible.sync="dialogVisible" width="30%">
      <el-upload
        v-if="dialogVisible"
        style="
          border: 1px dashed black;
          border-radius: 5px;
          padding: 20px;
          text-align-last: center;
        "
        class="upload-demo"
        ref="upload"
        :action="action"
        multiple
        :data="importData"
        :limit="1"
        :auto-upload="false"
        :on-success="handleFileSuccess"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-change="handleChange"
        :on-remove="handleChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-loading="uploading" :disabled="fileList.length==0" type="primary" @click="submitUpload"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { getParameterByName } from '@@/utils/util'
export default {
  props: {
    action: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      dialogVisible:false,
      fileList: [],
      importData:{},
      uploading: false,
      obj: {
        type: 1,
      },
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleFileSuccess(response, file, fileList) {
      console.log(response);
      this.uploading = false;
      if (response.code == 200) {
        this.$message.success(response.data);
      } else this.$message.error(response.msg);
    },
    handleChange(file, fileList) {
        this.fileList = fileList
      },
    submitUpload() {
      this.importData.source = getParameterByName('source')
      this.importData.type = getParameterByName('type')
      this.uploading = true;
      this.$refs.upload.submit();
     
    },
  },
};
</script>
