<template>
  <div class="card">
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: [
    'title',
    'content'
  ]
}
</script>
<style lang="less" scoped>
.card {
  position: relative;
  background-color: #e6eaeb;
  padding: .6rem .36rem .34rem;
  margin-bottom: .84rem;
  .title {
    position: absolute;
    top: -0.24rem;
    left: 0.24rem;
    background-color: black;
    padding: .04rem .08rem;
    color: white;
  }
  .content {
    background-color: #E6EAEB;
  }
}
</style>
