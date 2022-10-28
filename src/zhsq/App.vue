<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body{
  font-size: 100px;
  max-width: 1156px;
  margin: 0 auto;
  background-color: rgb(233,239,244);
}
#app{
  min-width: 7.5rem !important;
}
</style>
