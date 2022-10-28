<template>
  <div class="home">
      <searchtable :identity='1'></searchtable>
  </div>
</template>

<script>
import searchtable from './common/searchtab'
export default {
components:{
    searchtable
}
}
</script>

<style scoped>
.home{
    background-color: #fff;
    height: 100%;
}
</style>