<template>
  <div class="clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级A类竞赛
        <span class="more" @click="$router.push('/competition?tags=1')">查看更多</span>
      </h1>
      <components-list :lists="lists"/>
    </div>
    <div class="fr">
        <top />
    </div>
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
  }
};
</script>


<style lang="less" scoped>
.fl {
  width: 870px;
  height: auto;
}
.fr {
    width: 282px;
    height: auto;
}
</style>


