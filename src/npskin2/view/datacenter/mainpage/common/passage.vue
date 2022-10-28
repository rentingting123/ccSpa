<template>
  <div class="active">
    <h2 class="title">
      <p>竞赛通道</p>
        <span @click="$router.push('/datacenter/divisionseries')">more</span>
    </h2>
    <ul>
      <li class="test" @click="toLists" v-for="list,index in lists" :key="index">
        {{list.province}}
      </li>
    </ul>
  </div>
</template>

<script>
import network from "@/api";
import { getCId, getWebInfo, isLogin, getUserInfo } from "@/common/common";
export default {
  props: ["pnSkin"],
  data() {
    return {
      base: {},
      userInfo: getUserInfo(),
      cId: "",
      lists:[],
      login: localStorage.getItem("login")
    };
  },
  created() {
    this.base = getWebInfo();
    this.groupId = localStorage.getItem("groupId");
    this.cId = getCId();
    if (this.pnSkin && isLogin())
      this.$store.dispatch("singUpRefresh", this.cId);
    if (!this.groupId) return;
    this.getlist(this.groupId);
  },
  methods: {
    async getlist(id) {
      let res = await network.npqueryContest({ data: { groupId: id } });
      if (res == "error") return;
      if(res.length>6)res.length=6
      this.lists =res
    },
    todetail(url){
      if(!url) return this.$message.warning('暂未开通');
      url = url.indexOf('http') == -1 ? 'http://' + url : url
      window.open(url)
    },
    toLists(){
      this.$router.push('/datacenter/divisionseries')
    }

  }
};
</script>

<style lang="less" scoped>
.active {
  margin-top: 17px;
  width: 440px;
  height: auto;
  &>ul{
    margin-top:24px;
  }
 .test{
    background-image: linear-gradient(90deg,  #2569D7 0%,#5797FF 100%);
    border-radius: 5px;
    width: 216px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
    margin-bottom:8px; 
    font-size: 14px;
    text-align: left;
    letter-spacing: 0.52px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position:relative;
    color: #fff;
    cursor: pointer;
    padding: 0 18px;
    &::after{
      content: "";
      display: inline-block;
      width: 7px;
      height: 40px;
      background-image: url('./rigit.png');
      position: absolute;
      right: 10px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    &:nth-child(2n){
      margin-right: 0px;
    }

    &:nth-child(3),&:nth-child(4){
      background-image: linear-gradient(90deg, #4F91FD 0%,#72BAFC 100%);
    }
      &:nth-child(5),&:nth-child(6){
      background-image: linear-gradient(90deg,  #4CA9FF 0%,#7CC0FF 100%);
    }
 }
}
</style>