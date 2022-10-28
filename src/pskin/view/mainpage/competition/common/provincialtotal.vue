<template>
  <div class="clearfix">
    <div class="fl">
      <h1>
        <i class="iconfont">&#xe688;</i>省级竞赛
        <el-select v-model="year" placeholder="请选择" @change="init" size="mini" style="margin-left:10px;vertical-align: middle">
          <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="more" @click="$router.push('/competition?tags=4&year='+year)">查看更多</span>
      </h1>
      <components-list :lists="lists"/>
    </div>
    <div class="fr">
        <top />
    </div>
  </div>
</template>

<script>
import network from '@/api/index'
import componentsList from "./componentslisttotal";
import top from "./top";
export default {
  components: {
    componentsList,
    top,
  },
  data(){
    return{
      lists:[],
      years:[],
      year: new Date().getFullYear(),
    }
  },
  async created(){
    this.getYears();
    this.init();
  },
  methods:{
    async getYears(){
      let res = await network.getProbinceYearList({data:{
        provinceId: localStorage.getItem('competitionId')
      }});
      if(res=='error' || !res || res==[]) return this.years.push(this.year);
      this.years = res;
    },
    async init(year=this.year){
        let res = await network.getCompetitionA({data:{
            provinceId: localStorage.getItem('competitionId'),
            year: year
        }});
        if(res=='error' || res=={} || !res) return;

        let arr1 = res.competitionList1 || []
        arr1 = arr1.map(item=>{
          return {
            'sort': 0, // 省A
            ...item
          }
        })
        let arr2 = res.competitionList2 || []
        arr2 = arr2.map(item=>{
          return {
            'sort': 1, //省其他
            ...item
          }
        })
        this.lists =  arr1.concat(arr2);

    },
    change1(val){
      return this.yearchange && this.yearchange(val)
    }
  }
};
</script>


<style lang="less" scoped>
.fl {
  width: 870px;
  height: auto;
}
.fr {
    width: 282px;
    height: auto;
}
</style>


