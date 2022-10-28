<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button class='adminEdit' @click="htmlEdit=true">编辑</el-button>
    <el-dialog width="1240px" :visible.sync="htmlEdit" :append-to-body="true">
        <el-form >
            <el-form-item label="标题名" >
                <el-input v-model="websiteName" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="英文名" >
                <el-input v-model="englishName" autocomplete="off"/>
            </el-form-item>
            <el-form-item >
                <editor class="m-text" :setDate="setRichText" :stateData="richText"/>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>

import jxapi from "@/api/index"
import editor from '@@/components/editor/index'
export default {
  components: {
    editor
  },
  props: {
    editOk:Function,
    html:{},
    type:{
      required:true,
    }
  },
  data() {
    return {
      htmlEdit:false,
      richText:'',
      websiteName:'',
      englishName:''
    };
  },
  created(){
      this.richText = this.html.richText || ''
      this.websiteName = this.html.websiteName
      this.englishName = this.html.englishName
  },
  methods: {
    setRichText(val){
      this.richText = val
    },
    async submit(){
        if(!this.type) return this.$message.error('typeNeeded')
        let obj = {
            richText: this.richText,
            websiteName: this.websiteName,
            englishName: this.englishName
        }
        let name = await jxapi.skinSet({data:{html:obj,type:this.type}})
        if(name == 'error') return 
        this.$message.success('修改成功！')
        this.htmlEdit=false
        return this.editOk && this.editOk()
    },
  },
  watch:{
    htmlEdit(val){
      if(val){
        this.richText = this.html.richText || ''
        this.websiteName = this.html.websiteName
        this.englishName = this.html.englishName
      }
    }
  }
};
</script>

<style lang="less" >
.adminEdit{
  position: absolute;
  right: 0;
  top:0;
  // color:#fff;
  z-index: 999;
  // background-color: red;
}
.m-text {
    width: 1200px;
    margin: 0 auto;
    .ql-editor{
      min-height: 500px;
    }
}
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
</style>