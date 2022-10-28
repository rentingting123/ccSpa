<template>
  <div class="navs">
    <div>
      <ul  class="navList">
        <a :href="homeUrl" target="_blank"><li v-if="homeUrl">上级首页</li></a>
        <li
          v-for="list in lists"
          :key="list.id"
          v-if="list.show"
          :class="{'on':path.indexOf(list.path)>-1}"
      >
        <div  @click="topath(list)">{{list.name}}</div>
        <div class="sub" v-if="list.childs">
          <div
            v-for="l in list.childs"
            :key="l.id"
            v-if="l.show"
            class="onsub"
            @click="$router.push(l.path)"
          >{{l.name}}</div>
        </div>
      </li>
      </ul>
      <div>
        <el-input
          v-model="search"
          placeholder="搜索"
          @keyup.enter.native="searchname"
          size="mini"
          style="width:125px;"
        >
          <i slot="suffix" @click="searchname" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- <el-autocomplete v-model="search" size="mini" :fetch-suggestions="querySearchAsync" placeholder="搜索" style="width:125px;" @select="handleSelect"></el-autocomplete> -->

        <el-dropdown  v-if="login" class="loginOut" style="margin-left:10px;" @command="command">
          <span class="el-dropdown-link">
            {{userInfo.idcardName || userInfo.nickname}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="1">我的竞赛</el-dropdown-item>
            <el-dropdown-item  command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          v-else
          type="primary"
          @click="tologin"
          size="mini"
          style="margin-left:10px;"
          icon="el-icon-user"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/api";
import { tologin } from "@@/utils/util";
import {getToken} from "@@/utils/oauth"
import { logout,getUserInfo } from "@/common/common";
export default {
  props:{
    lists:{
      type:Array,
      required:true,
    },
    homeUrl:{
      type: String,
      required: false
    }
  },
  data() {
    return {
      login: getToken(),
      userInfo: getUserInfo()||{},
      search: "",
      path: "/"
    };
  },
  created() {
    this.path = this.$route.path;
  },
  mounted(){
    this.$nextTick(()=>{
      // console.log(localStorage.getItem("login"));
      this.login = getToken()
    })
  },
  methods: {
    tologin() {
      tologin();
    },
    async command(a){
      if(a==1){
        window.open('https://cc.moocollege.com/#/jingsai?autoLogin=true')
      }else if(a==2){
        await logout();
        this.login = ''
      }
    },
    searchname() {
      // if(!this.search) return;
      this.$router.push("/datacenter/searchlist?name=" + this.search);
    },
    async querySearchAsync(val, cb) {
      let res = await network.npgetNewsList({
        data: {
          groupId: localStorage.getItem("groupId"),
          search: val,
          type: "",
          pageNum: 1,
          pageSize: 5
        }
      });
      if (res == "error") return;
      let arr = [];
      for (let i in res.pageData) {
        arr.push({
          value: res.pageData[i].newsTitle,
          majorCode: res.pageData[i].id,
          ...res.pageData[i]
        });
      }
      cb(arr);
    },
    handleSelect(item) {
      this.$router.push("/datacenter/news/detail?id=" + item.id);
    },
    topath(list){
      if(list.childs && list.childs.length) return;
      let path = list.childs?list.childs[0].path:list.path
      if(this.$route.path=='/home' && path=='/home'){
        path = '/'
      }
      this.$router.push(path)
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path || "/";
    }
  }
};
</script>

<style lang="less" scoped>
.navs {
  width: 100%;
  background: #0041ab;
  text-align: center;
  > div {
    width: 1224px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navList{
      flex:1;
      display: flex;
      justify-content: space-between;
    }
  }
  .loginOut {
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 90px;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
  }
  .sub{
      background: #0041ab;
     position: relative;
     z-index: 11;
    .onsub{
        font-size: 14px;
        padding: 0 10px;
        
        &:hover{
           background: #00307e;
        }
    }
  }
  ul {
    li {
      display: inline-block;
      vertical-align: top;
      width: auto;
      overflow: hidden;
      line-height: 38px;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 1.45px;
      margin: 0 5px;
      padding: 0 8px;
      height: 38px;
      cursor: pointer;
    }
    li.on {
      background: #00307e;
    }
    li:hover{
      overflow: visible;
    }
    li:nth-child(1) {
      margin-left: 0;
    }
  }
  /deep/.el-scrollbar {
    width: 250px !important;
  }
}
</style>