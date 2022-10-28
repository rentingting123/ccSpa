<template>
  <div v-if="$store.state.skin.adminRole" style="position:relative;">
    <div class="img" :style="`background-image:url(${lists.bg})`"></div>
    <div class="edit">
      <bannerEdit v-if="loading" :editOk="getUrls" :list="lists"></bannerEdit>
    </div>
  </div>
</template>

<script>

import jxapi from "@/api/index"
import bannerEdit from './edit'
export default {
  props:['id'],
  components: {
    bannerEdit
  },
  data() {
    return {
        loading:false,
        lists:{
            bg:'',
        },
    };
  },
  created(){
      this.getUrls()
  },
  methods: {
    async getUrls(){
      this.loading = false;
      let html = await jxapi.skinGet({data:{type:9}})
      this.loading = true;
      if(html == "error" | !html) return 
      this.lists = html.html
    }
  },
};
</script>

 <style lang="less" scoped>
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
.img{
    width: 750px;
    height: 300px;
    margin: 20px auto;
}
</style>