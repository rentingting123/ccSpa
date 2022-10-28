<template>
  <div class="edit">
    <!-- 管理人员可编辑 -->
    <el-button @click="showEdit" class="editbutton">底部栏编辑</el-button>
    <el-dialog  :visible.sync="skinEdit" width="1280px" :append-to-body="true">
        <editor class="m-text" :setDate="setRichText" :stateData="footermes"/>
        <div class="submit">
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
  
  </div>
</template>

<script>
import network from "@/api/index"
import editor from '@@/components/editor/index'
export default {
  props:['message','editOk'],
  components: {
    editor
  },
  data() {
    return {
        skinEdit: false,
        footermes: '',
        mess: '',
    };
  },
  methods: {
    showEdit(){
      this.footermes = this.message
      this.skinEdit = true
    },
    setRichText(v){
      this.footermes =v
    },
    async submit(){
      let mess = await network.setFooter({data:{type:4,message:this.footermes}});
      if(mess=='error') return;
      this.skinEdit = false
      return this.editOk&&this.editOk()
    }
  },
};
</script>

<style lang="less" scoped>

.editbutton{
    position: absolute;
    top: 0;
    right: 0;
}
.submit{
    text-align: center;
    margin-top: 20px;
}
.m-text{
  width: 1200px;
  margin: 0 auto;
}
</style>