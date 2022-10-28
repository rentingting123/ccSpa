<template>
  <div class="navs">
    <div>
      <ul>
        <li v-for="list in lists" :class="{'on':path==list.path}" :key='list.id' @click="todetail(list)">
            <div>{{list.name}}</div>
            <div class="sub" v-if="list.childs">
              <div v-for="l in list.childs" :key="l.id" class="onsub" @click.stop="todetail(list,l)">{{l.name}}</div>
            </div>
        </li>
      </ul>
      <div>
        <!-- <el-input
          v-model="search"
          placeholder="搜索"
          @keyup.enter.native="searchname"
          size="mini"
          style="width:125px;"
        >
          <i slot="suffix" @click="searchname" class="el-input__icon el-icon-search"></i>
        </el-input> -->
       <span
          v-if="login"
          class="loginOut"
          style="margin-left:10px;"
        >退出:{{userInfo.nickname}}</span>
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
import {navs} from '@/hsj/mock/navs'
import { tologin } from "@@/utils/util";
export default {
  data() {
    return {
      login: false, //localStorage.getItem("login"),
      userInfo: {},
      search: "",
      path: "/",
      lists: navs
    };
  },
  created() {
    this.path = this.$route.path;
  },
  methods: {
    todetail(list,l){
      // 当为外链时，直接新窗口打开
      if(list.type==0){
        window.open(list.path)
      }else{
        // 当点击二级菜单时显示
        if(l){
          this.$router.push(list.path+'?id='+l.id)
        }else{
          this.$router.push(list.path)
        }
      }
    },
    tologin() {
      window.open('https://cc.moocollege.com')
      // location.href = 'https://cc.moocollege.com'
      // tologin();
    },
    searchname() {
      // if(!this.search) return;
      // this.$router.push("/datacenter/searchlist?name=" + this.search);
    },
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
  background: #760118;
  text-align: center;
  > div {
    width: 1280px;
    padding: 0 28px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /deep/ .el-button{
    background: #000000;
    border-color: #000000;
    border-radius: 28px;
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
  
  ul {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    li {
      width: auto;
      line-height: 38px;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 1.45px;
      padding: 0 13px;
      height: 38px;
      position: relative;
      cursor: pointer;
      &:hover{
        background: #550615;
        .sub{
          display: block;
        }
      }
      .sub{
        position: absolute;
        top: 38px;
        left: 0;
        background: #550615;
        z-index: 11;
        display: none;
        width: 210px;
        text-align: left;
        .onsub{
            font-size: 14px;
            padding: 0 10px;
            &:hover{
              background: #760118;
            }
        }
      }
    }
    li.on {
      background: #000000;
    }
  }
}
</style>