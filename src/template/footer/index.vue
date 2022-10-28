<template>
     <!--footer-->
      <div class="footer" v-if="$store.state.skin.adminRole || message"  style="position:relative;">
        <div class="container">
          <div class="footerTextContent">
            <qlEditor :data='message' />
          </div>
        </div>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
          <edit :editOk="init" :message="message"></edit>
        </div>
      </div>
</template>

<script>
import network from "@/api/index"
import edit from './edit'
import qlEditor from '@@/components/editor/show'
export default {
  components:{
    edit,
    qlEditor,
  },
  data(){
    return {
      message:'',
    }
  },
  methods:{
    async init(){
      let footer = await network.getFooter({data:{type:4}})
      if(footer=='error') return;
      this.message = footer&&footer.message;
    }
  },
  async created(){
     this.init()
  }
}
</script>


<style lang="less" scoped>
.footer {
      width: 100%;
      // height: 112px;
      background: #111;
      color: #666;

      .container {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        padding: 0;

        .footerTextContent {
          padding: 15px 0;

          p:last-child {
            margin-bottom: 0;
          }
        }
        .footerFont {
          font-size: 12px;
          color: #666;
          line-height: 1.5;
          margin-bottom: 0;
          text-align: center;
          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }
</style>
