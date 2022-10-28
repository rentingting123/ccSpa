<template>
  <div class="provincial2 clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级其他竞赛
        <span class="more" @click="$router.push('/competition?tags=2')">查看更多</span>
      </h1>
      <components-list :lists="lists"/>
    </div>
  </div>
</template>

<script>
import componentsList from "./point";
export default {
  props:['lists'],
  components: {
    componentsList,
  }
};
</script>


<style lang="less" scoped>
.provincial2{
  margin-top: 50px;
}
.fl {
  // width: 787px;
  height: auto;
}
.fr {
    width: 312px;
    height: auto;
}
</style>


