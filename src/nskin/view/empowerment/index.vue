<template>
  <div class="empowerment">
    <!-- 新闻 -->
    <fastnews />
    <!--  -->
    <videoList />
    <!-- 榜单内竞赛链接 -->
    <competitionList />
    <!-- 申请排行榜扩容竞赛 -->
    <ranking></ranking>
  </div>
</template>

<script>
import competitionList from "./common/competitionList";
import videoList from "./common/videoList";
import fastnews from "./common/fastnews";
import ranking from "./common/ranking";
export default {
  components: {
    competitionList,
    videoList,
    fastnews,
    ranking,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.empowerment {
  background: rgba(155, 155, 155, 0.05);
  padding: 42px 0 100px;
}
</style>
