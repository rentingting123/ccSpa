<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="toShow">竞赛信息编辑</el-button>
    <el-dialog :visible.sync="show" :append-to-body="true" :close-on-click-modal='false' >
      <el-form >

        <el-form-item label="模块大标题" :label-width="formLabelWidth">
          <el-input v-model="title" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="模块小标题" :label-width="formLabelWidth">
          <el-input v-model="smallTitle" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="模块背景" :label-width="formLabelWidth">
          <el-input v-model="background" autocomplete="off"></el-input>
          <upload accept=".jpg, .png" :onSuccess="(res)=>(this.success(res,'background'))" :beforeUpload="beforeUpload">
            <el-button>上传背景</el-button>
          </upload>
        </el-form-item>

        <el-form-item label="大赛流程方式" :label-width="formLabelWidth">
          <el-select v-model="model" @change="changeModel">
            <el-option label="列表展示" value="0"></el-option>
            <el-option label="表格展示" value="1"></el-option>
            <el-option label="个人设置展示" value="2"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div>
        <h3>模块管理</h3>
        <el-table :data="tableData" style="width: 100%;margin:10px 0;" ref="multipleTable" border @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="名称" width="120">
            <template slot-scope="{row}">
              <el-input v-model="row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bg" label="背景" >
            <template slot-scope="{row, $index}">
              <el-input v-model="row.bg"></el-input>
              <upload accept=".jpg, .png, .jpeg" :onSuccess="(res)=>(successTable(res, $index, 'bg'))" :beforeUpload="beforeUpload" :showlist="false">
                <el-button>上传背景</el-button>
              </upload>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="详情地址" >
            <template slot-scope="{row, $index}">
              <el-input v-model="row.url" :disabled='$index<5&&!row.pdf'></el-input>
              <upload accept=".pdf" v-if="row.pdf" :onSuccess="(res)=>(successTable(res, $index, 'url'))" :beforeUpload="beforeUpload" :showlist="false">
                <el-button>上传操作手册</el-button>
              </upload>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" width="120px">
            <template slot-scope="{row, $index}">
              <el-button type="danger" size="small" :disabled='$index<5' @click="del($index)">删除</el-button>
              <i class="el-icon-top" style="color:red;font-size:14px;" @click="up($index)"></i>
              <i class="el-icon-bottom" style="color:#409eff;font-size:14px;" @click="down($index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="add" size="small" type="primary">新增</el-button>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import network from "@/api/index"
import {cloneDeep} from 'lodash'
export default {
  components: {
    upload
  },
  props: ['close'],
  data() {
    return {
        smallTitle: '',
        title: '',
        background: '',
        model: '0',
        show:false,
        formLabelWidth: '120px',
        loading:false,
        tableData: [
          {
            name: '报名参赛',
            bg: '',
            url: '',
            prop: 'signup',
          },
          {
            name: '大赛指南',
            bg: '',
            url: '',
            prop: 'entryGuide',
          },
          {
            name: '提交作品',
            bg: '',
            url: '',
            prop: 'works',
          },
          {
            name: '操作手册',
            bg: '',
            url: '',
            pdf: true,
            prop: 'manual',
          },
          {
            name: '专家评审登录',
            bg: '',
            url: '',
            prop: 'expert',
          },
        ],
        choose: [],

    };
  },
  methods: {
    toShow(){
      this.show = true
      this.init();
    },
    async init(){
      let res = await network.skinGet({ data: { type: 23 } });
      if(res=='error' || !res) return;
      this.title = res && res.title || ''
      this.smallTitle = res && res.smallTitle || ''
      this.background = res && res.background || ''
      this.model = res && res.model || ''
      this.tableData = res && res.tableData || []

      let arr = []
      this.tableData.forEach(res=>{
        if(res.checkout){
          arr.push(res)
        }
      })
      console.log(arr);
      this.$nextTick(()=>{
        this.toggleSelection(arr)
      })
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    add(){
      this.tableData.push({
        name: '',
        bg: '',
        url: ''
      })
    },
    del(i){
      this.tableData.splice(i, 1)
    },
    up(i){
      if(i<=0) return;
      let obj1 = cloneDeep(this.tableData[i])
      let obj0 = cloneDeep(this.tableData[i-1])
      this.$set(this.tableData, i, obj0)
      this.$set(this.tableData, i-1, obj1)
    },
    down(i){
      if(i+1>=this.tableData.length) return;
      let obj1 = cloneDeep(this.tableData[i])
      let obj0 = cloneDeep(this.tableData[i+1])
      this.$set(this.tableData, i, obj0)
      this.$set(this.tableData, i+1, obj1)
    },
    handleSelectionChange(val){
      this.choose = val
    },
    changeModel(val){
      this.model = val
    },
    async submit(){
      if(!this.title){
        return this.$message.warning('请输入模块大标题')
      }

      if(this.choose.length>6 || this.choose.length<1){
        return this.$message.warning('请选择1-6个模块')
      }

      for(let i  in this.tableData){
        if(!this.tableData[i].name){
          return this.$message.warning('请输入新增模块名称')
        }
      }

      let choose = JSON.stringify(this.choose)
      this.tableData.forEach(res=>{
        if( choose.indexOf(JSON.stringify(res)) != -1 ){
          res.checkout = true
        }
      })
      
      let res = await network.skinSet({data:{
        type: 23,
        smallTitle: this.smallTitle,
        title: this.title,
        background: this.background,
        model: this.model,
        tableData: this.tableData,
      }})
      if(res == 'error') return 
      this.$message.success('修改成功！')
      this.show=false
      return this.close&&this.close()

    },
    success(res,name){
      this.loading = false;
      this.$set(this, name, res.location);
    },
    successTable(res, i, name){
      this.$set(this.tableData[i], name, res.location);
      this.loading = false;
    },
    beforeUpload(){
      this.loading = true
    }
  }
};
</script>

<style lang="less" scoped>
.el-select{
  width: 100%;
}
</style>