<template>
  <div class="ContestAbstract" style="">
    <div class="mains">
      <Loder class="main" :setbg='setbg' :setModel="setModel"/>
    </div>
    <div class="legs" :style="`background-image:url(${colorbg});`">
      <tableleg v-if="model=='1'" />
      <personleg v-else-if="model=='2'" />
      <leg class="leg" v-else  :id="id" :baseInfo="baseInfo"/>

    </div>
  </div>
</template>

<script>
import leg from '@/template/raceProgress/index'
import tableleg from '@/template/raceIntroduces/common/index'
import personleg from '@/template/raceIntroduces/common/person'
import Loder from './entry'

export default {
  components:{
    leg,
    tableleg,
    personleg,
    Loder
  },
  data() {
    return {
      colorbg: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/abstractBg.png',
      model: '0'
    };
  },
  methods:{
    setbg(bg){
      if(bg){
        this.colorbg = bg;
      }else{
        this.colorbg = 'https://web.moocollege.com/mooc/hzq/vueskin/assets/abstractBg.png'
      }
    },
    setModel(val){
      this.model = val
    }
  },
  computed:{
    id(){
      return this.$store.state.skin.id;
    },
    baseInfo(){
      return this.$store.state.skin.competitionDetail;
    }
  }
};
</script>

<style lang="less" scoped>
.ContestAbstract {
  // background: #f7f7f7;
  // min-height: 400px;
  // background-image:url(https://web.moocollege.com/mooc/hzq/vueskin/assets/abstractBg.png);
  // background-position:  center 335px;
  // background-repeat:  no-repeat;
   margin-bottom: -170px;
  overflow: hidden;
  
  .mains {
    width: 100%;
    position: relative;
    padding-top: 60px;
    z-index: 1;
    .main{
      width: 1200px;
      margin: 0 auto;
    }
    
  }
  .legs{
    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
    position: relative;
    top: -170px;
    padding-top: 170px;
    padding-bottom: 74px;
    z-index: 0;
    .leg{
      width: 1200px;
      margin: 0 auto;
    }
  }

}

</style>

