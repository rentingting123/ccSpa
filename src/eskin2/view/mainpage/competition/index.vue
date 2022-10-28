<template>
  <div class="competition">
    <!-- 人气竞赛TOP -->
    <div>
      <top />
    </div>
    <div>
        <div v-if="competitionList5.length>0">
            <h1 class="title">校级竞赛
                <span class="more" @click="$router.push('/competition?tags=5')">查看更多</span>
            </h1>
           <components-listtotal :lists="competitionList5"/>
        </div>
    </div>
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
import componentsList from "@/pskin2/view/mainpage/common/competition";
import componentsListtotal from "@/pskin2/view/mainpage/common/competitiontotal";
import componentsThree from "@/pskin2/view/mainpage/common/competitionthree";

import top from "@/pskin2/view/mainpage/competition/common/top";
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
      competitionList5: [],
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
    this.getschoolcompetition();
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
    async getschoolcompetition(){
      let res = await network.getschoolcompetition({
        data: {
          provinceId: localStorage.getItem("competitionId"),
          schoolCode: localStorage.getItem("schoolCode"),
          page: 1,
          size: 12
        }
      });
      if (res == "error") return;
      this.competitionList5 = res.list||[];
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

