<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="show=true">手动历史编辑</el-button>

    <el-dialog :visible.sync="show" :append-to-body="true" width="800px">
      <el-form >
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="name1" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="英文名称" :label-width="formLabelWidth">
          <el-input v-model="smallName1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="历史数据" :label-width="formLabelWidth">
          <ul class="banners">
              <li v-for="item,i in urls" :key="item.id">
                <div class="img">
                  <img :src="item.image" >
                  <div class="button">
                    <upload
                      accept=".jpg, .png"
                      width= '80px'
                      :onSuccess="(file,fileList)=>{success(i,file,fileList)}"
                      :beforeUpload="beforeUpload"
                      :showlist="false"
                    >
                      <el-button type="primary" size="small">编辑</el-button>
                    </upload>
                    <el-button type="primary" size="small" @click="del(i)" style="margin-top:10px">删除</el-button>
                  </div>
                </div>
                <el-input size="small" v-model="item.name" placeholder="请输入名称"></el-input>
                <el-input size="small" v-model="item.url" placeholder="请输入跳转地址"></el-input>
              </li>
          </ul>
          <upload
            accept=".jpg, .png"
            :onSuccess="logoSuccess"
            :beforeUpload="beforeUpload"
            :showlist="false"
          >
            <el-button>新增</el-button>
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
import network from "@/api/index"
export default {
  components: {
    upload
  },
  props: ["list","editOk", 'name', 'smallName'],
  data() {
    return {
      smallName1: '',
      name1: '',
      urls: [],
      show:false,
      formLabelWidth: '120px',
      loading:false
    };
  },
  methods: {
    async submit(){
        if(!this.name1){
          return this.$message.warning('请填写模块名称')
        }
        if(!this.urls || this.urls.length<1){
          return this.$message.warning('请添加历史')
        }
        let params = {
          name: this.name1,
          smallName: this.smallName1,
          lists: this.urls
        }
        
        let res = await network.skinSet({data:{
          html:params,
          type:21
        }})
        if(res=='error') return;
        this.show = false
        this.editOk && this.editOk(params)

    },
    logoSuccess(file, fileList){
      this.loading = false;
      this.urls.push({
        name: fileList.name,
        image: file.location
      })
    },
    beforeUpload(){
      this.loading = true;
    },
    success(i, file,fileList){
      this.loading = false;
      this.$set(this.urls, i, {
        name: fileList.name,
        image: file.location
      })
    },
    del(i){
      this.urls.splice(i, 1)
    }
  },
  watch:{
    list:{
      immediate: true,
      handler(val){
        this.urls = JSON.parse(JSON.stringify(val))
      }
    },
    name:{
      immediate: true,
      handler(val){
        this.name1 = val
      }
    },
    smallName:{
      immediate: true,
      handler(val){
        this.smallName1 = val
      }
    }
  }
};
</script>

<style lang="less" scoped>
.banners{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  li{
    width: 280px;
    height: 280px;
    position: relative;
    margin-bottom: 30px;
    
    .img{
      width: 100%;
      height: 182px;
      margin-bottom: 10px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .button{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        position: absolute;
        top: 0;
        left: 0;
      }
      &:hover{
        .button{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    
  }
}
</style>