<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="createCode">生成二维码</el-button>
    <el-button @click="bannerEdit=true">培训报名编辑</el-button>
    <el-dialog :visible.sync="bannerEdit" :close-on-click-modal="false" :append-to-body="true">
      <el-form >
        <el-form-item label="背景" :label-width="formLabelWidth">
          <el-input v-model="bg" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="logoSuccess"
            :beforeUpload="beforeUpload"
          >
          <el-button>上传背景图片</el-button>
          </upload>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="标题说明" :label-width="formLabelWidth">
          <el-input v-model="message" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="用户填写内容" :label-width="formLabelWidth">
          <!-- <el-table label-position="left" :data="tableData" border class="table">
            <el-table-column prop="name" label="内容" min-width="200">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.key=='phone'" v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="require" label="是否必填" min-width="80">
              <template slot-scope="scope">
                <el-switch  v-model="scope.row.require" :disabled="scope.row.key=='phone'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="edit" label="编辑" min-width="80">
              <template slot-scope="scope">
                <el-button size="mini" v-if="scope.row.key!='phone'"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>  -->
           <Table :columns="columns" :data="tableData" class="table">
             <template slot-scope="{ row }" slot="name">
                <el-input :disabled="row.key=='phone'" v-model="row.name"></el-input>
            </template>
            <template slot-scope="{ row }" slot="require">
              <el-switch  v-model="row.require" :disabled="row.key=='phone'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template slot-scope="{ row, index }" slot="edit">
              <el-button size="mini" v-if="row.key!='phone'"  type="danger"  @click="handleDelete(index, row)">删除</el-button>
            </template>
           </Table>
          <el-button size="mini"  type="success"  @click="handleadd()">添加</el-button>
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
        name: "",
        message: "",
        bannerEdit:false,
        code:false,
        codeurl:'',
        id:this.$store.state.skin.id,
        formLabelWidth: '120px',
        loading:false,
        columns:[
          {
            title: '内容',
            slot: 'name',
          },
          {
            title: '是否必填',
            slot: 'require',
          },
          {
            title: '编辑',
            slot: 'edit',
          }
        ],
        tableData:[
          {
            name: '手机号',
            key:'phone',
            require: true
          }
        ],

    };
  },
  created(){
   this.init()
  },
  methods: {
    init(){
      this.name = this.list.name;
      this.bg = this.list.bg;
      this.message = this.list.message;

      this.tableData = this.list.tableData&&this.list.tableData.length>0?this.list.tableData:[{
          name: '手机号',
          key:'phone',
          require: true
        }];

    },
    createCode(){
      if(!this.bg) return this.$message("请先设置背景");
      let url = "http://"+location.host+"/code"
      utils.getQRcode(url,{width:1024,height:1024}).then(url=>{
        this.codeurl = url;
        this.code = true;
      })
    },
    download(){
      downloadFile(this.codeurl,"二维码.png")
    },
    async submit(){
        if(this.bg){
          if(!this.name){
            return this.$message.info("标题不能为空");
          }
  
          if(this.tableData.length<1){
            return this.$message.info("用户填写内容不能为空");
          }
          let flag = false
          for(let i in this.tableData){
            if(!this.tableData[i].name){
              flag = true
              return this.$message.info("内容不能为空");
            }
          }
          if(flag) return;
        }

        let param = {
          name: this.name,
          bg: this.bg,
          message: this.message,
          tableData: this.tableData,
        }

        let name = await jxapi.skinSet({data:{html:param,type:5}})

        if(name == 'error') return 
        this.$message.success('修改成功！')
        this.bannerEdit=false
        return this.editOk&&this.editOk();
    },
    handleDelete(index,row){
      // todo 删除
      this.tableData.splice(index,1)
    },
    handleadd(){
      this.tableData.push({
        name: '',
        key:utils.randomChar(6),
        require: false
      })
    },
    logoSuccess(res,file,fileList){
      this.bg=res.location
      this.loading = false;
    },
    beforeUpload(){
      this.loading = true;
    },
  },
  watch:{
    list(){
      this.init()
    },
    tableData(val){
      console.log(val)
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
