<template>
  <div class="competition">
    <!-- 人气竞赛TOP -->
    <div>
      <top />
    </div>
    <!-- 省A -->
    <!-- <div>
        <div>
            <h1 class="title">省级A类竞赛
                <span class="more" @click="$router.push('/competition?tags=1')">查看更多</span>
            </h1>
            <components-list :lists="competitionList1"/>
        </div>
    </div> -->
    <!-- 省B -->
    <!-- <div>
        <div>
            <h1 class="title">省级其他竞赛
                <span class="more" @click="$router.push('/competition?tags=2')">查看更多</span>
            </h1>
           <components-list :lists="competitionList2"/>
        </div>
    </div> -->
    <!-- 省级竞赛 -->
    <div>
        <div>
            <h1 class="title">省级竞赛
              <el-select v-model="proyear" placeholder="请选择" @change="init" size="mini" style="margin-left:10px;vertical-align: middle;text-indent:0;">
                <el-option v-for="item in proyears" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <span class="more" @click="$router.push('/competition?tags=4&year='+proyear)">查看更多</span>
            </h1>
           <components-listtotal :lists="competitionList4"/>
        </div>
    </div>
    <!-- 直通国赛 -->
    <div>
      <div>
        <h1 class="title">直通国赛
            <el-select v-model="nationyear" placeholder="请选择" @change="throughNationalCompetition" size="mini" style="margin-left:10px;vertical-align: middle;text-indent:0;">
              <el-option v-for="item in nationyears" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <span class="more" @click="$router.push('/competition?tags=3&year='+nationyear)">查看更多</span>
        </h1>
        <components-three :lists="competitionList3"/>
      </div>
    </div>
  </div>
</template>
<script>
import componentsList from "../common/competition";
import componentsListtotal from "../common/competitiontotal";
import componentsThree from "../common/competitionthree";

import top from "./common/top";
import network from "@/api/index";
export default {
  components: {
    componentsList,
    componentsThree,
    componentsListtotal,
    top,
  },
  data() {
    return {
      competitionList1: [],
      competitionList2: [],
      competitionList3: [],
      competitionList4: [],
      proyear: new Date().getFullYear(),
      proyears: [],
      nationyear: new Date().getFullYear(),
      nationyears: [],
    };
  },
  created() {
    this.getproYears();
    this.getnationYears();
    this.init();
    this.throughNationalCompetition();
  },
  methods: {
    async getproYears(){
      let res = await network.getProbinceYearList({data:{
        provinceId: localStorage.getItem('competitionId')
      }});
      if(res=='error' || !res || res==[]) return this.proyears.push(this.proyear);
      this.proyears = res;
    },
    async getnationYears(){
        let res = await network.throughNationalCompetitionYearList();
        if(res=='error' || !res || res==[]) return this.nationyears.push(this.nationyear);
        this.nationyears = res;
    },
    async init(year=this.proyear) {
      let res = await network.getCompetitionA({
        data: {
          provinceId: localStorage.getItem("competitionId"),
          year: year
        }
      });
      if (res == "error") return;
      this.competitionList1 = res.competitionList1||[];
      this.competitionList2 = res.competitionList2||[];
      this.competitionList1 = this.competitionList1.map(item=>{
        return {
          'sort': 0, // 省A
          ...item
        }
      })
      this.competitionList2 = this.competitionList2.map(item=>{
        return {
          'sort': 1, // 省其他
          ...item
        }
      })
      this.competitionList4 = this.competitionList1.concat(this.competitionList2)
    },
    async throughNationalCompetition(year=this.nationyear){
      let res = await network.throughNationalCompetition({data:{
          provinceId: localStorage.getItem('competitionId'),
          year: year
      }});
      if(res=='error') return;
      this.competitionList3 = res.competitionList
    }
  }
};
</script>

<style lang="less" scoped>
.competition {
  width: 100%;
  text-align: left;
  > div {
    margin-top: 30px;
    background: #ffffff;
    width: 100%;
    > div {
      width: 1171px;
      margin: 0 auto;
    }
  }
  .mold {
    margin-top: 100px;
  }
}
h1{
  margin-bottom: 30px;
}
</style>

