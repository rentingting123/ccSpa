<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="skinEdit=true;setCheck()">信息编辑</el-button>
    <el-dialog :visible.sync="skinEdit" :append-to-body="true" width="700px">

      <el-table 
        :data="tableData" 
        style="width: 100%" 
        border 
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称" min-width="120">
          <template slot-scope="scope">
            <div>
              <span v-if="!scope.row.nameEdit">
                {{scope.row.name}} 
                <i class="el-icon-edit-outline" v-if="!scope.row.canDel" @click="editName(scope.$index, true)"></i> 
              </span>
              <el-input v-else v-model="scope.row.name" @blur="editName(scope.$index, false)" maxlength="8"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="background" label="背景" min-width="120">
          <template slot-scope="scope">
            <upload
              accept=".jpg, .png"
              :onSuccess="(res)=>(success(res, scope.$index))"
              :beforeUpload="beforeUpload"
              :showlist='false'
              >
              <img v-if="scope.row.background" :src="scope.row.background" width="100px">
              <el-button v-else size="small">上传(278*187)</el-button>
            </upload>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="链接地址" min-width="180" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" :disabled='scope.row.noadderss' ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button size="small" type="error" :disabled='scope.row.canDel' @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" @click="add" style="margin-top:10px">新增</el-button>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import jxapi from "@/api/index"
export default {
  components: {
    upload
  },
  props:['editOk','skin'],
  data() {
    return {
        skinEdit:false,
        loading:false,
        tableData: [],
        chooseList:[]
    };
  },
  methods: {
    async submit(){
      if(this.chooseList.length<2){
        return this.$message.warning('请至少选择2个要显示的模块')
      }
      if(this.chooseList.length>6){
        return this.$message.warning('最多选择6个要显示的模块')
      }
      for(let i in this.tableData){
        if(!this.tableData[i].name){
          return this.$message.warning('名称不能为空')
        }
        if(!this.tableData[i].background){
          return this.$message.warning(this.tableData[i].name+'背景不能为空')
        }
      }
      let arr = this.tableData.map(item=>{
        if(this.chooseList.includes(item)){
          return {
            ...item,
            checkout: true
          }
        }else{
          return {
            ...item,
            checkout: false
          }
        }
      })

      let res = await jxapi.skinSet({data:{
        type:22,
        html:arr
      }})
      if(res == 'error') return 
      this.$message.success('修改成功！')
      this.skinEdit=false
      return this.editOk&&this.editOk()
    },
    add(){
      this.tableData.push({
        name: '',
        background: '',
        address: '',
        canDel: false
      })
    },
    del(i){
      this.tableData.splice(i, 1)
    },
    success(res, i){
      this.$set(this.tableData[i], 'background', res.location)
      this.loading = false;
    },
    editName(i, flag){
      this.$set(this.tableData[i], 'nameEdit', flag)
    },
    beforeUpload(){
      this.loading = true
    },
    // 选择
    handleSelectionChange(val){
      this.chooseList = val
    },
    // 显示页面时，表格勾选
    setCheck(){
      this.$nextTick(()=>{
        this.tableData.forEach(row => {
          if(row.checkout){
            let table = this.$refs.multipleTable
            table && table.toggleRowSelection(row);
          }
        });
      })
    }
  },
  watch:{
    skin:{
      immediate: true,
      handler(val){
        if(!val) return;
        if(val.length<1){
          this.tableData = [
            {
              name: '报名入口',
              background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg1.png',
              address: '',
              canDel: true,
              noadderss: true,
            },
            {
              name: '参赛指南',
              background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png',
              address: '',
              canDel: true,
              noadderss: true,
            },
            {
              name: '操作手册',
              background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg3.png',
              address: '',
              canDel: true
            },
            {
              name: '视频',
              background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg5.jpg',
              address: '',
              canDel: true
            },
          ]
        }else{
          this.tableData = JSON.parse(JSON.stringify(val)) 
        }
      }
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
.el-select{
  width: 100%;
}
.codeimg{
  display: block;
  margin: 0 auto;
  width: 300px;
}
</style>