<template>
  <div class="right">
      <h3Title title="制作流程" id='9-1'/>
      <datashow :lists='data1' style="margin: 20px 0 40px"/>
      <h3Title title="制作技巧" id='9-2'/>
      <datashow :lists='data2' style="margin: 20px 0 40px"/>
      <h3Title title="资源分享" id='9-3'/>
      <datashow :lists='data3' style="margin: 20px 0 40px"/>
  </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import datashow from '../../common/datashow'
export default {
    components:{
        h3Title,
        datashow
    },
    data(){
        return{
            data1:['敬请期待'],
            data2:['敬请期待'],
            data3:['敬请期待'],
        }
    }
}
</script>

<style lang="less" scoped>
  a{
    color: -webkit-link;
    display: block;
    margin: 20px 0 40px;
  }
</style>