<template>
  <!--团队赛报名弹框-->
  <div class="signup">
    <group-join ref="join" isSkin v-if="(type==1 || type==2) && !flag"></group-join>
    <div v-else class="choosetype">
      <h2>{{$t('skin.signupPoints')}}</h2>
      <ul v-if="pointsData.length>0">
        <li v-for="item in pointsData" :key="item.id" @click="toSign(item)">
          {{item.name}}
        </li>
      </ul>
      <div v-else class="nomess">
        {{$t('skin.notFound')}}
      </div>
    </div>
  </div>
  
</template>

<script>
import network from "@@/api/jxapi";
import { getCId } from "@/common/common.js";
import groupJoin from "@@/views/details/team/teamsignup";

export default {
  components: {
    groupJoin,
  },
  data() {
    return {
      pointsData: [],
      flag: false,
      type: ''
    };
  },
  async created(){
    
  },
  async mounted(){
    // 判断，当有团队时，默认显示赛段列表
    let id1 = this.$route.query.competitionId || getCId();
    let res = await network.groupInfo({data:{competitionId:id1}});
    if (res == "error") return this.$router.push({ path: "/", query: { login: true } });
    if (res && res.list && res.list.length>0) {
      this.flag = true
    }

    // 如果路由中包含competitionId,信息获取竞赛信息
    if(this.$route.query.competitionId){
      let obj = await network.getCompetitionDetail({id: this.$route.query.competitionId})
      if(obj == "error") return this.$router.push({ path: "/", query: { login: true } });
      this.type = obj.applyType
    }else{
      this.type = this.$store.state.skin.competitionDetail.applyType
    }
    let id = this.$route.query.competitionId || this.$store.state.skin.competitionDetail.id
    if(!id) return;
    localStorage.setItem('competitionId',id)
    
    let params = {
      competitionId:id
    }
    if(this.$route.query.label){
      params.label = this.$route.query.label
    }
    const res1 = await network.getSignupCompetition({data:params}); 
    if(res1=='error') return
    this.pointsData = res1 && res1.childs || [];
    if(this.pointsData.length<1){
      let baseInfo = localStorage.getItem('baseInfo') && JSON.parse(localStorage.getItem('baseInfo'))
      this.pointsData.push({
        ...baseInfo,
        childType: null,
        endTime: null,
        icon: baseInfo && baseInfo.bannerUrl,
        startTime: null,
        subname: null,
      })
    }
    // }
  },
  methods:{
    async toSign(item){
      localStorage.setItem('competitionId',item.id)
      this.checkJoin(item)
    },
    async checkJoin(item){
      let id = item.id;
      let res = await network.getSignUpStatus({data:{competitionId:id}});
      if (res == "error") return this.$router.push({ path: "/", query: { login: true } });
      // 2 已报名 0显示无法报名 1可报名 null可报名
      if(res == 2){
        // 进入下一步
        let id = this.$store.state.skin.competitionDetail.id
        if(!id) return;
        localStorage.setItem('competitionId',id)
        this.gotoStep && this.gotoStep(3)
      }else if(res===0){
        // 提示无法报名
        return this.$Message.warning('该竞赛暂时无法报名')
      }else{
        this.flag = false
        this.type = item.applyType
        if(this.type==3 || this.type==4 ){
          this.$Message.warning('请联系主办方设置报名方式')
        }
      }
    },
  },
  beforeDestroy(){
    let id = this.$store.state.skin.competitionDetail.id
    if(!id) return;
    localStorage.setItem('competitionId',id)
  },
  props:{
    gotoStep:Function,
  }
};
</script>

<style lang="less" scoped>
.signup{
  padding: 50px;
  text-align: left;
  .choosetype{
    ul{
      width: 100%;
      margin-left: 20px;
      li{
        margin: 10px 0;
        padding: 10px;
        background: #999999;
        font-size: 16px;
        cursor: pointer;
        color: #ffffff;
        &:hover{
          background: #333333;
          color: #ffffff;
        }
      }
    }
  }
  .nomess{
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
    color: #999999;
  }
}
</style>

