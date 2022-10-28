<template>
  <div class="clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级B类竞赛
        <span class="more" @click="$router.push('/competition?tags=省赛B')">查看更多</span>
      </h1>
      <components-list :lists="lists"/>
    </div>
    <!-- <div class="fr">
        <top />
    </div> -->
  </div>
</template>

<script>
import componentsList from "./componentslist";
import top from "./top";
export default {
  props:['lists'],
  components: {
    componentsList,
    top,
  },
  data() {
    return {}
  }
};
</script>


<style lang="less" scoped>
.fl {
  width: 787px;
  height: auto;
}
.fr {
    width: 312px;
    height: auto;
}
</style>


