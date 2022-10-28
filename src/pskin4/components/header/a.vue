<template>
  <div class="header">
      <div class="">
          <span class="logo" @click="$router.push('/')">全国大学生工程综合能力竞赛虚拟仿真赛道</span>
          <ul class="">
              <li v-for="list in navs" :key="list.id" @click="todetail(list)" :class="{'on':path==list.path}">
                  {{list.name}}
                  <p></p>
              </li>
          </ul>

          <span>
              <span v-if="islogin" class="title">
                  <img :src="user && user.icon?user.icon : circleUrl" alt="" srcset=""><i class="iconfont">&#xe620;</i>
              </span>
              <span v-else class="title">
                  登录<i class="iconfont">&#xe620;</i>
              </span>
              <!-- <span>
                  <span class="san"></span>
                  <p v-if="islogin">
                      <span @click="$router.push('/person')"><i class="iconfont">&#xe655;</i>个人中心</span>
                      <span @click="out"><i class="iconfont">&#xe659;</i>退出</span>
                  </
                  <p v-else>
                      <span @click="login"><i class="iconfont">&#xe69c;</i>登录</span>
                      <span @click="torankadminlogin"><i class="iconfont">&#xe6b6;</i>管理员入口</span>
                  </p>
              </span> -->
              <span class="tel">
                  <i class="iconfont">&#xe6b8;</i>
                  <span>
                      <span class="san"></div>
                      <p class="phone">
                          <span>联系电话：</span>
                          <span>{{tel}}</span>
                      </p>
                  </span>
              </span>
          </span>

          <el-autocomplete id="search" @keyup.enter.native="searchs" class="input-with-select search fr" ref="input" placeholder="搜索竞赛" v-model="searchName" :fetch-suggestions="handleSelect" @select="search"  >
              <template slot="append"  @click="searchs">搜索</template>
          </el-autocomplete>

      </div>
  </div>
</template>
