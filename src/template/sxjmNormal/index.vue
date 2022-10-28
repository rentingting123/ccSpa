<template>
    <div class="skin3main">
        <div >
          <div class="left">
            <news /> 
          </div>
          <div class="right">
            <detail />
          </div>
        </div>
      </div>
</template>

<script>
import news from "./common/news"
import detail from "./common/detail"
export default {
    components:{
        news,
        detail
    }
}
</script>


<style lang="less" scoped>
.skin3main{
  min-height: calc(100vh - 300px - 60px);
  position: relative;
  padding-top: 40px;
  > div{
    margin-top: 20px;
    width: 1200px;  
    overflow: hidden;
    margin: 0 auto;
  }
  .left{
    width: 590px;
    //height: 300px;
    margin-right: 50px;
    float: left;
  }
  .right{
    width: 560px;
    //height: 300px;
    float: left;
  }
}
</style>

