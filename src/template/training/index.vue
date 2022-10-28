<template>
  <div v-if="$store.state.skin.adminRole || urls" class="banner">
    <div @click="linkClick" :style="`background-image:url(${urls})`" class="ContestBanner">
    </div>
    <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      
      <trainEdit :editOk="getUrls" :list="lists"></trainEdit>
    </div>
  </div>
</template>

<script>
import jxapi from "@/api/index"
import trainEdit from './edit'
export default {
  components: {
    trainEdit
  },
  data() {
    return {
        urls:"",
        lists:{},
    };
  },
  created(){
      this.getUrls()
  },

  methods: {
    linkClick(){
      this.$router.push({path:'/code'})
    },
    async getUrls(){
      let html = await jxapi.skinGet({data:{type:5}})
      if(html == "error" | !html) return 
      this.lists = html.html
      this.urls = html.html.bg
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

</style>