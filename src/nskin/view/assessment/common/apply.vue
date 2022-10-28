<template>
  <div class="conent">
    <!-- 管理人员可编辑 -->
    <div class="button" @click="goSolicitation">
      扩容申请
    </div>
    <!-- <div class="button" @click="skinEdit = true">
      扩容申请
    </div> -->
    <!-- <el-dialog :visible.sync="skinEdit" width="700px" center title="" :append-to-body="true">
       <div slot="title" >
         高校竞赛排行榜评估扩容申请
        </div>
       <register v-if="skinEdit" type="1" :close='close'/>
    </el-dialog> -->
  
  </div>
</template>

<script>
import register from './register'
export default {
  components: {
    register
  },
  data() {
    return {
      skinEdit:false,
    };
  },
  methods:{
    close(){
      this.skinEdit = false
    },
    goSolicitation(){
      this.$router.push('/empowerment/solicitation')
    }
  }
};
</script>

<style lang="less" scoped>
.conent{
  display: inline-block;
  vertical-align: top;
  .button{
    width: 102px;
    height: 32px;
    background: #ED1E26;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 40px;
    line-height: 32px;
    margin-left:20px;
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    text-align: center;
  }
}
</style>
<style lang="less">
  .el-dialog__header{
      padding: 20px 0 10px;
      div{
        border-bottom:1px solid #ebebee;
        width:100%;
        padding-bottom: 20px;
        font-size: 24px;
      }
  }
</style>