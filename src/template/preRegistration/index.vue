<template>
  <div v-if="$store.state.skin.adminRole || urls" class="banner">
    <div @click="linkClick" :style="`background-image:url(${urls})`" class="ContestBanner">
    </div>

    <el-dialog :visible.sync="dialogVisible" class="dialogVisible" :show-close="false" :close-on-click-modal="false" width="800px">
      <div slot="title">
        <h1>{{title}}</h1>
        <h2>{{message}}</h2>
      </div>
      
      <el-form ref="form" class="form" :model="form" label-width="120px">
        <el-form-item 
          :label="table.name" 
          v-for="(table,index) in lists.tableData" 
          :prop="index+'@'+table.key" 
          :key="table.key" 
          :required="table.require"
          >
          <el-input v-model="form[index+'@'+table.key]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      <preRegEdit :editOk="getUrls" :list="lists"></preRegEdit>
    </div>
    
  </div>
</template>

<script>
import jxapi from "@/api/index"
import preRegEdit from './edit'
import { getUserInfo } from '@@/utils/commons'
export default {
  props:['id'],
  components: {
    preRegEdit
  },
  data() {
    return {
        urls:"",
        lists:{},
        dialogVisible:false,
        title:'',
        message:'',
        form:{},
        user:{},
    };
  },
  created(){
      this.getUrls()
  },
  methods: {
    async linkClick(){
      this.user = getUserInfo()
      if(this.user&&this.user.type==8 || this.$store.state.skin.adminRole){
        let name =await jxapi.getSchoolApply({data:{
          type:4,
          userId:this.user.id,
        }});
        if(name=='error') return;
        this.dialogVisible = true
        if(!name) return;
        for(let i in name){
          this.$set(this.form,i+'@'+name[i].key,name[i].value)
        }

       
      }else{
        return this.$message.warning("请使用报名管理员登录")
      }
    },
    async getUrls(){
        let html = await jxapi.skinGet({data:{type:7}})
        if(html == "error" | !html) return 
        this.lists = html.html
        this.urls = html.html.bg
        this.title = html.html.name
        this.message = html.html.message
    },
    submit(formName){
      this.$refs[formName].validate(async (valid) => {
        if(!valid) return;

        let arr = []
        Object.keys(this.form).forEach((key)=>{
          let keys = key.split("@");
          arr.push({
            name:this.lists.tableData[keys[0]].name,
            key:keys[1],
            value:this.form[key]
          })
        })

        let name = await jxapi.setSchoolApply({data:{
            competitionId:this.competitionId,
            type:4,
            userId: this.user.id,
            html: arr
        }})
        if(name=='error') return;
        this.dialogVisible = false
        this.$message.success("提交成功！")
        this.form={}
       })
    }
  },
};
</script>

 <style lang="less" scoped>
 .banner{
     position: relative;
 }
 .edit{
     position:absolute;
     right: 0;
     top:0;
    z-index: 999;
 }
  .ContestBanner {
      height: 650px;
      overflow: hidden;
      background: center 0 no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .el-carousel{
      z-index: 0 !important;
    }
.dialogVisible{
  padding: 15px;
  h1{
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
  }
  h2{
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 150;
    
  }
  .form{
    width: 80%;
    display: block;
    margin: 0 auto;

  }
}

</style>