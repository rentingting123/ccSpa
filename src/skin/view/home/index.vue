<template>
  <div class="home" v-if="id">
    <div v-if="$store.state.skin.adminRole" style="padding:10px 0;text-align:center;">
      <el-button type="primary" @click="edit">选择显示模块</el-button>
    </div>
    <div class="netSuiteProject">
      <component v-for="list in lists" :key="list.id" :is="list.is" v-if="list.choose" ></component>
    </div>
  </div>
</template>

<script>
import network from "@/api/index";

import banner from "@/template/bannerLoader"; // 轮播图
import smallbannerLoader from "@/template/smallbannerLoader"; // 小轮播图（300）
import raceNews from "@/template/raceNews"; // 大赛动态-图文
import raceNews1 from "@/template/raceNewsTimeline"; // 大赛动态-列表
import raceNewsJgs from "@/template/raceNewsTimeline/four"; // 大赛动态-列表-结构赛
import raceIntroduce from "@/template/raceIntroduce"; // 子竞赛以及规程
import raceIntroduces from "@/template/raceIntroduces"; //大赛章程
import raceIntroduces2021 from "@/template/raceIntroduces2021"; //大赛章程新版自定义
import raceReview from "@/template/raceReview"; // 大赛回顾-图文
import joinIn from '@/template/joinIn' // 报名参赛

import subwork from '@/template/subwork' // 往届作品展示
import raceService from "@/template/raceService"; // 大赛服务
import preRegistration from '@/template/preRegistration' // 预报名
import training from '@/template/training' // 培训报名
import zhsq from '@/template/zhsq' // 账号申请

import competitionList from '@/template/competitionList' // 竞赛直通车
import provincialList from '@/template/provincialList' // 结构赛-省赛直通车
import history from "@/template/history"  // 大赛回顾
import historyauto from "@/template/historyauto" // 大赛回顾(自定义)

import sxjm from '@/template/sxjm' // 数学建模
import sxjmNormal from '@/template/sxjmNormal'  // 机器人竞赛(自定义)
import jqrjs from '@/template/jqrjs' // 机器人竞赛(旧：不推荐使用)
import footerTem from '@/template/footer' // 页脚
import institution from '@/template/institution'  // 组织机构
import links from '@/template/links'  // 友情链接

import bilingual from '@/template/bilingual'  // 双语选择


export default {
  data() {
    return {
      lists:[]
    };
  },
  components: {
    raceNews,
    raceIntroduce,
    raceReview,
    banner,
    smallbannerLoader,
    raceService,
    footerTem,
    joinIn,
    subwork,
    preRegistration,
    training,
    zhsq,
    raceNews1,
    raceNewsJgs,
    raceIntroduces,
    raceIntroduces2021,
    competitionList,
    provincialList,
    history,
    historyauto,
    sxjm,
    sxjmNormal,
    jqrjs,
    institution,
    links,
    bilingual,

  },
  computed:{
    id(){
      return this.$store.state.skin.id
    }
  },
  created(){
    this.init();
  },
  methods:{
    edit(){
      let token = this.$route.query.token
      this.$router.push('/edit?token='+token)
    },
    async init(){
      let res = await network.skinGet({data:{
        type:13
      }});
      if(res=='error') return;
      if(!res) return;
      this.lists = res.html;
    }
  }
};
</script>

<style lang="less">
</style>
