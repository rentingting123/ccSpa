<template>
  <div class="active" v-loading="loading">
    <h2 class="title">
      <p>赛事日程</p>
      <span @click="tomore">more</span>
    </h2>
    <ul>
      <li v-for="list,index in lists">
        <div @click="trannel(index,list.on)" :class="`t${index} btn ${list.on?'on':''}` ">
          <div v-if="list.startTime">
            <p>
              {{list.startTime }}
              <span class="container">
                <span class="corner"></span>
              </span>
            </p>
            <p>{{list.endTime }}</p>
          </div>
          <i v-else class="iconfont" v-html="list.icon"></i>
        </div>
        <p class="dian">{{list.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import {getToken} from "@@/utils/oauth"
import network from "@/api";
import { getCId, getWebInfo, isLogin, getUserInfo } from "@/common/common";
import { cloneDeep } from "lodash";
export default {
  props: ["pnSkin"],
  data() {
    return {
      loading:false,
      base: {},
      userInfo: getUserInfo(),
      cId: "",
      lists: [
        {
          name: "报名参赛",
          id: 0,
          icon: "&#xe691;"
        },
        {
          name: "提交作品",
          id: 2,
          icon: "&#xe698;"
        },
        {
          name: "专家评审",
          id: 1,
          icon: "&#xe697;"
        },
        {
          name: "大赛指南",
          id: 3,
          on: true,
          icon: "&#xe6a8;"
        },
        {
          name: "操作手册",
          id: 4,
          on: true,
          icon: "&#xe6aa;"
        }
      ],
      login: getToken()
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
      this.loading = true
      let res = await network.npgetTimes({ data: { groupId: id } });
      this.loading = false
      if (res == "error") return;
      let date = new Date().getTime();
      // 当前时间做对比

      for (let i in res) {
        if (
          new Date(res[i].startTime).getTime() <= date &&
          date <= new Date(res[i].endTime).getTime()
        ) {
          res[i].on = true;
        } else {
          res[i].on = false;
        }
        //type 1 报名时间 2提交作品 3是评审
        if (!res[i].startTime) continue;
        if (res[i].type == 1) {
          this.lists[0].startTime = moment(res[i].startTime).format("MM.DD");
          this.lists[0].endTime = moment(res[i].endTime).format("MM.DD");
          this.lists[0].on = res[i].on;
        }
        if (res[i].type == 2) {
          this.lists[1].startTime = moment(res[i].startTime).format("MM.DD");
          this.lists[1].endTime = moment(res[i].endTime).format("MM.DD");
          this.lists[1].on = res[i].on;
        }
        if (res[i].type == 3) {
          this.lists[2].startTime = moment(res[i].startTime).format("MM.DD");
          this.lists[2].endTime = moment(res[i].endTime).format("MM.DD");
          this.lists[2].on = res[i].on;
        }
      }

      this.lists = cloneDeep(this.lists);
    },
    tomore() {
      window.open("https://cc.moocollege.com");
    },
    trannel(type,on) {
      //0报名 1提交作品 2评审 3.大赛指南 4 操作手册
      // if (type == 0 && !this.login)
      //   return this.$router.push("/apply");
      switch (type) {
        case 0:
          if(!on){
            this.$message("未在报名时间！");
            break;
          }
          if(!this.login){
             return this.$message("请先登录！");
          }
          // if (this.pnSkin) {
            if (this.signUpStatus == 0) {
              return this.$message("未开放报名或无权限");
            }
            if (this.userInfo.type != null) {
              return this.$message("请前往竞赛服务平台报名：https://cc.moocollege.com");
            }
            this.$router.push("/apply");
          // } 
          // else {
          //   this.$router.push("/datacenter/divisionseries");
          // }
          break;
        case 1:
          if(!on){
            this.$message("未在作品上传时间！");
            break;
          }
          window.location.href =
            "https://cc.moocollege.com/#/details?id=" + this.cId + '&autoLogin=true';
          break;
        case 2:
          if(!on){
            this.$message("未在评审时间！");
            break;
          }
          window.open("http://cc.moocollege.com/expert/login");
          break;
        case 3:
          this.$router.push("/details/entryGuide");
          break;
        case 4:
          if(this.base.pdf){
            this.$router.push({
              name: "manual",
              query: { url: encodeURIComponent(this.base.pdf) }
            });
          }else{
            this.$message("未上传竞赛手册！");
          }
          break;
      }
    }
  },
  computed: {
    signUpStatus() {
      return this.$store.state.signUpStatus;
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  margin-top: 17px;
  width: 440px;
  height: auto;
  ul {
    text-align: left;
    margin-top: 24px;
    li {
      width: 75px;
      display: inline-block;
      vertical-align: top;
      margin-right: 16px;

      .on {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          box-shadow: -5px -6px 0 0 #dddede;
        }
      }
      .btn {
        width: 70px;
        height: 84px;
        border-radius: 5px;
        line-height: 84px;
        text-align: center;
        box-shadow: 5px 6px 0 0 #dddede;

        i {
          font-size: 30px;
          color: #fff;
        }
        p {
          width: 100%;
          height: 42px;
          line-height: 42px;
          font-size: 16px;
          color: #4a4a4a;
          letter-spacing: 1.45px;
          text-align: center;
          position: relative;
          margin: 0;
        }
        p:nth-child(2n + 1) {
          background: #3d7fea;
          color: #fff;
          border-radius: 5px 5px 0 0;
        }
        p:nth-child(2n) {
          background: #ffffff;
          color: #3d7fea;
          border: 1px solid #3d7fea;
          border-radius: 0 0 5px 5px;
        }
        .container {
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          width: 6px;
          margin-left: -3px;
          z-index: 2;
        }
        .corner {
          display: block;
          width: 0px; /*  宽高设置为0，很重要，否则达不到效果 */
          height: 0px;
          border: 6px solid #3d7fea;
          border-bottom-color: transparent; /* 设置透明背景色 */
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
      .t0 {
        background-image: linear-gradient(-180deg, #5797ff 3%, #2569d7 100%);
      }
      .t1 {
        background-image: linear-gradient(-180deg, #5797ff 3%, #2569d7 100%);
      }
      .t2 {
        background-image: linear-gradient(-180deg, #72bafc 3%, #4f91fd 100%);
      }
      .t3 {
        background-image: linear-gradient(-180deg, #7cc0ff 3%, #4ca9ff 100%);
      }
      .t4 {
        background-image: linear-gradient(-180deg, #7cc0ff 3%, #4ca9ff 100%);
      }
      p {
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 0.52px;
        margin-top: 8px;
        text-align: center;
      }
    }
    li:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>