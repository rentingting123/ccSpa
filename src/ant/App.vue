<template>
  <div id="app">
    <router-view/>
    <foot />
  </div>
</template>
<script>
import foot from './components/common/footer'
export default {
  name: "App",
  components:{
    foot
  }
};
</script>

<style>
#app {
  font-family: "Source Han Sans","PingFang SC","Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
