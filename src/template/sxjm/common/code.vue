<template>
  <div class="banner">
    <el-dialog :visible.sync="dialogVisible" center :fullscreen="true" class="dialogVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" width="800px">
      <div slot="title">
        <h1>{{title}}</h1>
        <h2>{{message}}</h2>
      </div>
      
      <el-form ref="form" class="form" :model="form" label-width="120">
        <el-form-item 
          :label="table.name"
          v-for="(table) in lists.tableData" 
          :prop="table.key"
          :key="table.key"
          :required="table.require"
          >
          <el-input @blur="change(table)" v-model="form[table.key]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jxapi from "@/api/index"
export default {
  props:['id'],
  data() {
    return {
        lists:{},
        dialogVisible:true,
        title:'',
        message:'',
        form:{}
    };
  },
  created(){
      this.getUrls()
  },
  methods: {
    async change(table){
      if(table.key=='phone'){
        let userId = this.form[table.key];
        if(!userId) return;
        let name =  await jxapi.getSchoolApply({data:{
          userId:userId,
          type:3
        }});
        if(name=='error' | !name) return;
        this.$confirm('该手机号已报名！', '提示', {
            confirmButtonText: '确定',
          }).then(() => {
            for(let i in name){
              this.$set(this.form,name[i].key,name[i].value)
            }
        }).catch(() => {
            for(let i in name){
              this.$set(this.form,name[i].key,name[i].value)
            }
        })
      }

    },
    async getUrls(){
        let html = await jxapi.skinGet({data:{type:10}})
        if(html == "error") return 
        this.lists = html.html
        this.urls = html.html.bg
        this.title = html.html.title
        this.message = html.html.message
    },
    getNameByKey(key){
      let _name = ''

      if(this.lists.tableData){
        // for(let _key in this.lists.tableData){
        //   if (_key == key) _name = this.lists.tableData[_key].name    
        //      }
        this.lists.tableData.map(_item=>{
          if(_item.key == key) _name = _item.name
        })
      }
      return _name
    },
    submit(formName){
      this.$refs[formName].validate(async (valid) => {
        if(!valid) return;

        let userId ='';
        let arr = []
        Object.keys(this.form).forEach((key)=>{
          //let keys = key.split("@");
          if(key=='phone') userId = this.form[key];
          let _listName = this.getNameByKey(key)
          if(_listName)
          {
            arr.push({
            name:_listName,
            key:key,
            value:this.form[key]
          })
          }
        })

        let name = await jxapi.setSchoolApply({data:{
            competitionId:this.competitionId,
            type:3,
            userId: userId,
            html: arr
        }})
        if(name=='error') return;
        let _that = this
        this.$message.success('报名提交成功！')
        setTimeout(()=>{_that.$router.push("/")},1500)
          
      })
    }
  },
};
</script>

 <style lang="less" scoped>
 .banner{
     position: relative;
 }


.el-carousel{
  z-index: 0 !important;
}
.dialogVisible{
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

<style lang="less">
.banner{
  .el-dialog__header,.el-dialog__body,.el-dialog__footer{
    width: 80%;
    display: block;
    margin: 0 auto;
  }
}
</style>
