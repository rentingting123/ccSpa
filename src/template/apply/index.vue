<template>
  <div v-loading="loading" class="apply">
    <el-steps
      :active="active"
      finish-status="success"
      align-center
      style="width:80%;margin:20px auto;"
    >
      <el-step :title="$t('skin.login')"></el-step>
      <el-step :title="$t('skin.message')"></el-step>
      <el-step :title="$t('skin.signupname')"></el-step>
      <el-step :title="$t('skin.downloadForm')"></el-step>
      <el-step :title="$t('skin.upload')"></el-step>
    </el-steps>

    <div class="main">
      <div class="content">
        <user v-if="active==1" ref="child"/>
        <signup v-else-if="active==2" :gotoStep="gotoStep" ref="child"/>
        <team v-else-if="active==3" ref="child"/>
        <upload v-else-if="active==4" ref="child"/>
      </div>
    </div>
    <div class="footer">
      <el-button style="margin-top: 12px;text-align:center;" @click="toHome">返回首页</el-button>
      <el-button style="margin-top: 12px;text-align:center;" @click="pre">{{$t('skin.pre')}}</el-button>
      <el-button style="margin-top: 12px;text-align:center;" :loading="nextLoading" @click="next" v-if="active!=4">{{$t('skin.next')}}</el-button>
      <!-- 下一步只进行判断能否进入下一步，查看团队查看能否直接进入下一步 -->
      <el-button style="margin-top: 12px;text-align:center;" :loading="nextLoading" @click="goTeamDetail" v-if="active==2">查看团队</el-button>
      <works v-if="active==3" />
      <el-button style="margin-top: 12px;text-align:center;" @click="back" >{{$t('skin.outLogin')}}</el-button>
    </div>
  </div>
</template>


<script>
import { isLogin, getCId } from "@/common/common.js";
import { mapMutations } from "vuex";
import { tologin } from '@@/utils/util' 
import signup from './common/signup'
import team from '@@/views/details/team/team'
import upload from './common/upload'
import user from './common/user'
import works from './common/works'
import network from "@@/api/jxapi/index";
import {removeToken} from "@@/utils/oauth"
export default {
  data() {
    return {
      maxLength: 5,
      active: parseInt(this.$route.query.active) || 0,
      loading: true,
      nextLoading: false
    };
  },
  async created() {
    if (!isLogin()) {
      return tologin()
    }else{
      //这里需要检查登录是否有效所以直接请求个人信息接口 无效自动清理用户信息
      let user = await network.getUserInfo()
      if(user=='error') return tologin()
      if(user.type){
          return  this.$alert(this.$t('skin.loginMess'),'',{
          confirmButtonText: this.$t('skin.toCC'),
          callback: async action => {
              if(action=='confirm'){
                location.href='https://cc.moocollege.com/#/details?id='+localStorage.getItem('competitionId') + '&autoLogin=true';
              }else{
                let res = await network.setLoginOut();
                if (res == "error") return;
                //登录信息
                removeToken()
                //用户组织id
                // localStorage.removeItem("groupId");
                //用户信息
                localStorage.removeItem("userInfo");
                this.$router.push("/");
              }
          }
          })
      }else{
        // 检测个人信息是否完善
        let res = await network.checkUserInfo()
        if(res=='error') return this.$router.push("/");
        if (!res) {
          this.loading = false;
          return this.gotoStep(1);
        }
        // 判断是否为刷新，刷新进入当前
        if (this.$route.query.active) {
          this.gotoStep(this.active);
          this.loading = false;
          return;
        }
        
        await this.checkJoin();
      }
    }
    
  },
  methods: {
    ...mapMutations("competitionApply", ["openTeam"]),
    async checkJoin(){
      // 判断，当有团队时，跳转下一步
      let id = this.$route.query.competitionId || getCId();
      let res = await network.groupInfo({data:{competitionId:id}});
      this.loading = false;
      if (res == "error") return this.$router.push({ path: "/", query: { login: true } });
      if (res && res.list && res.list.length>0) {
        this.gotoStep && this.gotoStep(3)
      }else{
        this.gotoStep && this.gotoStep(2)
      }
    },
    checkActive(step) {
      //校验当前步骤 是否可以到下一步
      return true;
    },
    toHome(){
      this.$router.push('/')
    },
    pre() {
      if (this.active > 1) {
        this.active--;
        this.gotoStep(this.active);
      } else {
        this.$router.push("/");
      }
    },
    next() {
      
      if(this.active == 1){
        this.active1();
      }else if(this.active==2){
        this.active2()
      } else{
        if (this.active < this.maxLength - 1 && this.checkActive(this.active)) {
          this.gotoStep(++this.active);
        }
      }
    },
    async active2(){
      this.nextLoading = true;
      let id = getCId();
      // 2 已报名 0显示无法报名 1可报名 null可报名
      let res = await network.getSignUpStatus({data:{competitionId:id}});
      if(res=='error') return this.$router.push({ path: "/", query: { login: true } });
      if(res==2){
        // 跳转下一步
        this.nextLoading = false;
        return this.gotoStep(++this.active);
      }else if(res===0){
        // 提示无法报名
        this.nextLoading = false;
        return this.$Message.warning('该竞赛暂时无法报名')
      }else{
        try{
          this.$refs.child.$refs.join.signUpTeam(err =>{
            this.nextLoading = false;
            if(!err) this.gotoStep(++this.active);
          })
        }catch(err){
          this.$Message.warning('请选择要报名的赛项')
          return this.nextLoading = false;
        }
      }
    },
    active1(){
        this.nextLoading = true;
        try {
          this.$refs.child.$refs.profile.submitForm(err => {
            this.nextLoading = false;
            if(!err) this.gotoStep(++this.active);
          });
        } catch (err) {
          return this.nextLoading = false;
        }
    },
    async back() {
      let res = await network.setLoginOut();
      if (res == "error") return;
      //登录信息
      removeToken()
      //用户信息
      localStorage.removeItem("userInfo");
      this.$router.push("/");
    },
    gotoStep(step) {
      let query = this.$route.query
      this.active = step;
      this.$router.push({path:"/apply",query:{
        ...query,
        active: this.active
      }});
    },
    async goTeamDetail(){
      let id = this.$route.query.competitionId || getCId();
      let res = await network.groupInfo({data:{competitionId:id}});
      if (res == "error") return;
      if (res && res.list && res.list.length>0) {
        this.gotoStep(++this.active)
      }else{
        this.$message.warning('暂无团队，请先报名')
      }
    }
  },
  components:{
    signup,
    team,
    upload,
    user,
    works,
  }
};
</script>


<style lang="less" scoped>
.main {
  padding: 25px 0;
  .content {
    max-width: 1100px;
    width: 60%;
    margin: 20px auto;
    border: 1px solid #dedede;
    box-shadow: 4px 4px 4px #dedede;
    .msg_edit {
      width: 650px;
      border: none !important;
      margin: 0 auto;
    }
  }
}

.footer {
  text-align: center;
  margin-bottom: 25px;
}
</style>

<style lang="less">
.cha-pagination {
  display: block;
  text-align: center;
}
</style>

