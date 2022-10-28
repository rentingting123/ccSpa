<template>
  <div class="clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级A类竞赛
        <span class="more" @click="$router.push('/competition?tags=省赛A')">查看更多</span>
      </h1>
      <components-list :lists="list"/>
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
  },
  data() {
    return {}
  },
  watch(){
    let list=this.lists.list
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


