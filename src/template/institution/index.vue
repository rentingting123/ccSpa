<template>
  <div class="ContestService" v-if="$store.state.skin.adminRole || !!html">
    <div class="titleContent" >
      <h3>{{html.websiteName}}</h3>
      <p>{{html.englishName}}</p>
    </div>
    <div class="editorMess">
      <qlEditor :data='html.richText' />
    </div>

     <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
        <edit class="ql-editor" :editOk="getHtml" :html="html" type=15></edit>
    </div>
  </div>
</template>

<script>
import jxapi from "@/api/index"
import edit from "./edit.vue"
import qlEditor from '@@/components/editor/show'
export default {
  components:{
    edit,
    qlEditor,
  },
  data() {
    return {
        html:{}
    };
  },
  created() {
    this.getHtml()
  },
  methods:{
    async getHtml(){
        let res = await jxapi.skinGet({data:{type:15}})
        if(res == 'error' || !res)return
        this.html = res.html
    },
  }
};
</script>

<style lang="less" scoped>
.ContestService {
  position: relative;
  padding-bottom: 76px;
  overflow: hidden;
  .titleContent {
    width: 100%;
    text-align: center;
    margin-bottom: 46px;

    h3 {
      font-weight: bold;
      font-size: 36px;
      color: #111;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: #111;
      text-align: center;
      margin: 0 0 10px;
    }
  }
  .editorMess{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>


