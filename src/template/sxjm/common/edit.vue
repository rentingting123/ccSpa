<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="skinEdit=true">信息编辑</el-button>
    <el-dialog :visible.sync="skinEdit" :append-to-body="true">
    
      <el-form >
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
        <el-form-item label="评审入口背景" :label-width="formLabelWidth">
          <el-input v-model="form.works" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'works'))"
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
        <el-form-item label="报名背景" :label-width="formLabelWidth">
          <el-input v-model="form.manual" autocomplete="off" placeholder="未填写时默认使用二维码"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'manual'))"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>
        <el-form-item label="申请发票背景" :label-width="formLabelWidth">
          <el-input v-model="form.invoice" autocomplete="off"></el-input>
          <upload
            accept=".jpg, .png"
            :onSuccess="(res)=>(this.success(res,'invoice'))"
          >
          <el-button>上传(278*187)</el-button>
          </upload>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"/>
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
                <el-switch :disabled="scope.row.key=='phone'" v-model="scope.row.require"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="require" label="编辑" min-width="80">
              <template slot-scope="scope">
                
                <el-button size="mini" v-if="scope.row.key!='phone'" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table> -->
          <Table :columns="columns" :data="tableData" class="table">
             <template slot-scope="{ row, index }" slot="name">
                <el-input :disabled="row.key=='phone'" v-model="row.name" @blur="(e)=>change(e,index)"></el-input>
            </template>
            <template slot-scope="{ row, index }" slot="require">
              <el-switch  v-model="row.require" :disabled="row.key=='phone'" @change="(e)=>requireChange(e,index)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template slot-scope="{ row, index }" slot="edit">
              <el-button size="mini" v-if="row.key!='phone'"  type="danger"  @click="handleDelete(index, row)">删除</el-button>
            </template>
           </Table>
          <el-button size="mini"  type="success"  @click="handleadd()">添加</el-button>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCode">生成二维码</el-button>
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
  props:['editOk','skin'],
  data() {
    return {
        skinEdit:false,
        code:false,
        form:{},
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
            name: '手机号码',
            key:'phone',
            require: true
          }
        ],
        codeurl:'',
        name:'',
    };
  },
  created(){
    if(!this.skin) return;
    this.name = this.skin.title;
    this.tableData = this.skin.tableData;
    this.form = {
      signup:this.skin.signup,
      works:this.skin.works,
      guide:this.skin.guide,
      manual:this.skin.manual
    }
  },
  methods: {
    async submit(){
        let name = await jxapi.skinSet({data:{
          type:10,
          html:{
            ...this.form,
            title:this.name,
            tableData:this.tableData,
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
    requireChange(val,i){
      this.$set(this.tableData[i],'require',val);
    },
    change(val,i){
      this.$set(this.tableData[i],'name',val.target.value);
    },
    handleadd(){
      this.tableData.push({
        name: '',
        key:utils.randomChar(6),
        require: false
      })
    },
    handleDelete(index,row){
      // todo 删除
      this.tableData.splice(index,1)
    },
    createCode(){
      if(this.tableData.length<1) return this.$message("请先设置用户填写内容");
      let url = "http://"+location.host+"/sxjmcode"
      utils.getQRcode(url,{width:1024,height:1024}).then(url=>{
        this.codeurl = url;
        this.code = true;
      })
    },
    download(){
      downloadFile(this.codeurl,"二维码.png")
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
.el-select{
  width: 100%;
}
.codeimg{
  display: block;
  margin: 0 auto;
  width: 300px;
}
</style>