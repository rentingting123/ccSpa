<template>
  <div>
    <!-- 管理人员可编辑 -->
    <el-button @click="bannerEdit=true">预报名编辑</el-button>
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
              <el-input v-model="scope.row.name" :disabled="scope.row.key=='phone'"></el-input>
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
        </el-table> -->
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
  
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import jxapi from "@/api/index"
import util from '@@/utils/util'

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
    this.init();  
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
// {"html":{"name":"全国数学建模大赛浙江赛区学校报名信息提交","bg":"https://web.moocollege.com/webFile/2019522/LlZ0Ghih_1558496342960.jpg","message":"","tableData":[{"name":"学校代码","require":true},{"name":"学校名称","require":true},{"name":"本科队伍数","require":false},{"name":"专科队伍数","require":false},{"name":"负责人姓名","require":true},{"name":"负责人手机","require":true},{"name":"负责人邮箱","require":true},{"name":"联系人姓名","require":true},{"name":"联系人手机","require":true},{"name":"联系人邮箱","require":true},{"name":"学校地址","require":true},{"name":"学校邮编","require":true}]},"type":7,"id":"405"}
        let param = {
          name: this.name,
          bg: this.bg,
          message: this.message,
          tableData: this.tableData,
        }

        let name = await jxapi.skinSet({data:{html:param,type:7}})

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
        key:util.randomChar(6),
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
      this.init();
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

</style>

<style lang="less">
.el-form-item__label{
  text-align: left !important;
}
</style>
