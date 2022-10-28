<template>
  <div class="ContestService PaddingSpacing ql-container ql-snow" v-if="$store.state.skin.adminRole || !!html">
    <div class="titleContent" >
      <h3>{{$t('skin.competitionServices')}}</h3>
      <p>COMPETITION SERVICES</p>
    </div>
      
    <a href="javascript:;" id="ContestService"></a>
    <img class="LargerPcShow rightspaceShow" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/iPhone_right.png" alt>
    <img class="LargerPcShow leftspaceShow" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/iPhone_left.png" alt>
    <div class="editorMess">
      <qlEditor  :data='html' />
    </div>
    <edit class="ql-editor" v-if="$store.state.skin.adminRole" :html="html" :editOk='getHtml' type=2></edit>
  </div>
</template>

<script>
import jxapi from "@/api/index"
import edit from "@/template/htmlEdit/edit.vue"
import qlEditor from '@@/components/editor/show'
export default {
  components:{
    edit,
    qlEditor
  },
  data() {
    return {
      html:''
    };
  },
  created() {
    this.getHtml()
  },
  methods:{
    async getHtml(){
      let html = await jxapi.getRegister({data:{type:2}})
          if(html == 'error')return
          this.html = html
    }
  }
};
</script>

<style lang="less" scoped>
.ContestService {
  position: relative;
  background: linear-gradient(to right, #d9d9d9, #f9f9f9);
  background-color: #F0F0F0;
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
.ContestService > img.rightspaceShow {
  position: absolute;
  top: 0px;
  right: 0;
}
.ContestService > img.leftspaceShow {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>


