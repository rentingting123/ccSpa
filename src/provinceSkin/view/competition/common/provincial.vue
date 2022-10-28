<template>
  <div class="clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级A类竞赛
        <el-select v-model="year" placeholder="请选择" @change="init" size="mini" style="margin-left:10px;vertical-align: middle">
          <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="more" @click="$router.push('/competition?tags=1&year='+year)">查看更多</span>
      </h1>
      <components-list :lists="lists"/>
    </div>
    <div class="fr">
        <top />
    </div>
  </div>
</template>

<script>
import componentsList from "./componentslist";
import network from '@/api/index'
import top from "./top";
export default {
  props:['lists','yearchange'],
  data(){
    return{
      years:[],
      year: new Date().getFullYear(),
    }
  },
  components: {
    componentsList,
    top,
  },
  created(){
    this.getYears()
  },
  methods:{
    async getYears(){
      let res = await network.getProbinceYearList({data:{
        provinceId: localStorage.getItem('competitionId')
      }});
      if(res=='error' || !res || res==[]) return this.years.push(this.year);
      this.years = res;
    },
    init(val){
      return this.yearchange && this.yearchange(val)
    }
  }
};
</script>


<style lang="less" scoped>
.fl {
  width: 787px;
  height: auto;
}
.fr {
    width: 312px;
    height: auto;
}
</style>


