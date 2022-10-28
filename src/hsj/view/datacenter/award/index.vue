<template>
  <div class="right">
      <h3Title title="奖励章程" id='5-1'/>
      <a :href="data1" target="_blank">奖励章程</a>
      <h3Title title="评选标准" id='5-2'/>
      <img :src="data2" style="margin: 20px auto 40px;width: 600px;display:block;"/>
      <h3Title title="奖项设置" id='5-3'/>
      <datashow :lists='data3' style="margin: 20px 0 20px" :indent='true' />
      <titleshow :lists='data3_1' style="margin: 0 0 40px"/>
  </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import datashow from '../../common/datashow'
import titleshow from '../../common/titleshow'
export default {
    components:{
        h3Title,
        datashow,
        titleshow
    },
    data(){
        return{
            data1:'https://web.moocollege.com/mooc/hzq/vueskin/hsj/%E5%A5%96%E5%8A%B1%E7%AB%A0%E7%A8%8B.doc',
            data2:'https://web.moocollege.com/mooc/hzq/vueskin/hsj/20200707160150.jpg',
            data3:[
              `好设计·创意奖（40项）`,
            ],
            data3_1:[
              {
                title: `* 奖项类别及授奖数量会根据当年度参评情况进行调整，中国创新设计产业战略联盟享有最终解释权。`
              }
            ]
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