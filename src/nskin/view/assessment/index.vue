<template>
  <div class="assessment">
    <div>
      <!-- 本科、高职、专业 -->
      <ul class="types">
        <li @click="typechange('本科')" :class="{'on': type=='本科'}">本科</li>
        <li @click="typechange('高职')" :class="{'on': type=='高职'}">高职</li>
        <li @click="typechange('专业')" :class="{'on': type=='专业'}">专业</li>
      </ul>
      <!-- 搜索 -->
      <div class="search">
          <template v-if="type=='专业'">
            <el-select v-model="majorVersion" placeholder="请选择专业" @change="init">
              <el-option
                v-for="item in majorVersionList"
                :key="item.value"
                :label="item.label"
                :value="item.value+'@'+item.name"
              ></el-option>
            </el-select>
          </template>
          <template v-else>
            <!-- 时间 -->
            <el-select v-model="statusValue" placeholder="请选择" @change="statusValueChange">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <!-- 省份 -->
          <el-select v-model="provincesValue" placeholder="请选择省份" @change="init">
            <el-option
              v-for="item in provinces"
              :key="item.province"
              :label="item.province"
              :value="item.province"
            ></el-option>
          </el-select>
          <!-- 搜索院校 -->
          <el-select
            filterable
            v-model="schoolname"
            reserve-keyword
            remote
            :remote-method="remoteMethod"
            :loading="loading1"
            placeholder="搜索院校"
            @change="search"
            class="searchicon"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 扩容申请 -->
          <applay></applay>
      </div>
      <!-- 标题 -->
      <template class="h">
        <h :title='type+"院校学生竞赛评估"' v-if="type!='专业'" />
        <h :title='showname' v-else small='(备：每个分数段内，按照省（市、自治区）拼音排序，同省内按奖项数进行排序)' />
      </template>
      <!-- 列表 -->
      <div class="main">
        <ul class="type" v-if="scoolTypes.length>0">
          <li v-for="item in scoolTypes" :key="item.value" :class="{'on':hot == item.value}" @click="choosehot(item.value)">
            {{item.name}}
          </li>
        </ul>
        <discipline v-if="type=='专业'" v-loading="loading" :lists="lists" :type="type" />
        <detail v-else v-loading="loading" :lists="lists" :type="type" />
      </div>
    </div>
  </div>
</template>
<script>
import detail from "./common/index";
import discipline from "./common/discipline";
import applay from "./common/apply";
import network from "@/api/index";
import { cloneDeep } from "lodash";
import h from '@/nskin/components/h'
export default {
  components: {
    detail,
    discipline,
    applay,
    h,
  },
  data() {
    return {
      hot: 5,
      lists: [],
      oldlists: [],
      status: [
        {
          value: "2017-2021",
          label: "2017-2021"
        },
        {
          value: "2016-2020",
          label: "2016-2020"
        },
        {
          value: "2015-2019",
          label: "2015-2019"
        },
        {
          value: "2014-2018",
          label: "2014-2018"
        },
        {
          value: "2013-2017",
          label: "2013-2017"
        },
        {
          value: "2012-2016",
          label: "2012-2016"
        },
        {
          value: "2012-2021",
          label: "2012-2021"
        },
      ],
      majorVersionList: [
        {
          value: "2019学生本科机器人topv1",
          label: "2019学生本科机器人",
          name: "机器人竞赛"
        },
        {
          value: "2020学生本科机器人top",
          label: "2020学生本科机器人",
          name: "机器人竞赛"
        },
        {
          value: "2021学生本科机器人top",
          label: "2021学生本科机器人",
          name: "机器人竞赛"
        },
        {
          value: "2021学生机器人竞赛指数（布点专业排行）top",
          label: "2021学生机器人竞赛指数（布点专业排行）",
          name: "机器人竞赛"
        },
        {
          value: "2021学生机器人竞赛指数（未布点专业排行）top",
          label: "2021学生机器人竞赛指数（未布点专业排行）",
          name: "机器人竞赛"
        },
         {
          value: "2022学生本科艺术类竞赛top",
          label: "2022学生本科艺术类",
          name: "艺术类竞赛"
        }
      ],
      majorVersion: "2019学生本科机器人topv1@机器人竞赛",
      statusValue: "2017-2021",
      provinces: [],
      provincesValue: "全国",
      schoolname: "",
      type: "本科",
      loading: false,
      loading1: false,
      schoolList: [],
      showname: ""
    };
  },
  async created() {
    this.type = this.$route.query.type == 2 ? "高职" : "本科";
    await this.getProvinceList();
    this.init();
  },
  computed: {
    scoolTypes(){
      if(this.type=='高职'&&(this.statusValue=='2017-2021'||this.statusValue=='2016-2020')){
        return [
          {
            name: '总榜单',
            value: 5,
          },
          {
            name: '双高',
            value: 1,
          },
          {
            name: '一般(除双高)',
            value: 2,
          },
          {
            name: '东北',
            value: 3,
          },
          {
            name: '东部',
            value: 4,
          },
          {
            name: '中部',
            value: 6,
          },
          {
            name: '西部',
            value: 7,
          },
          {
            name: '民办',
            value: 8,
          }
        ]
      }else if(this.type=='高职'&&this.statusValue=='2015-2019'){
        return [
          {
            name: '总榜单',
            value: 5,
          },
          {
            name: '示范校',
            value: 0,
          },

          {
            name: '骨干校',
            value: 1,
          },

          {
            name: '高水平',
            value: 3,
          },
          {
            name: '一般',
            value: 2,
          },
          {
            name: '民办',
            value: 9,
          },

          {
            name: '东部',
            value: 4,
          },
          {
            name: '中部',
            value: 6,
          },
          {
            name: '西部',
            value: 7,
          },
          {
            name: '东北',
            value: 8,
          },
          
        ]
      }else if(this.type=='本科'&&(this.statusValue=='2017-2021'||this.statusValue=='2016-2020' || this.statusValue=='2015-2019')){
        return [
          {
            name: '总榜单',
            value: 5,
          },
          {
            name: '双一流',
            value: 0,
          },
          {
            name: '地方院校',
            value: 1,
          },
          {
            name: '综合类',
            value: 2,
          },
          {
            name: '理工类',
            value: 3,
          },
          {
            name: '人文社科类',
            value: 4,
          },
          {
            name: '农林类',
            value: 6,
          },
          {
            name: '医药类',
            value: 7,
          },
          {
            name: '师范类',
            value: 8,
          },
          {
            name: '民办独立院校',
            value: 9,
          },
          {
            name: '新建本科',
            value: 10,
          },
        ]
      }else if(this.type=='本科'&&this.statusValue=='2014-2018'){
        return [
          {
            name: '总榜单',
            value: 5
          },
          {
            name: '综合类',
            value: 0
          },
          {
            name: '理工类',
            value: 1
          },
          {
            name: '人文社科类',
            value: 4
          },
          {
            name: '农林医药类',
            value: 2
          },
          {
            name: '师范类',
            value: 3
          },
          {
            name: '民办及独立学院',
            value: 6
          },

        ]
      }else{
        return []
      }
    }
  },
  mounted() {
    document.querySelector(".searchicon i").classList.add("el-icon-arrow-up");
  },
  methods: {
    async getProvinceList() {
      let res = await network.getProvinceList();
      if (res == "error") return;
      var arr = [];
      for (let i in res) {
        if (
          !(
            res[i].province == "香港特别行政区" ||
            res[i].province == "澳门特别行政区" ||
            res[i].province == "台湾省" ||
            res[i].province == "中国" ||
            res[i].province == "亚太" ||
            res[i].province == "国际"
          )
        ) {
          arr.push(res[i]);
        }
      }
      arr.unshift({
        province: "全国",
        provinceId: 1
      });
      this.provinces = arr;
    },
    async init() {
      this.schoolname = "";
      this.loading = true;
      let arr = this.majorVersion.split("@");
      let verson = arr[0];
      this.showname = arr.length > 1 ? this.majorVersion.split("@")[1] : "";
      let res = "";
      if (this.type == "专业") {
        res = await network.majorStudentCompetition({
          data: {
            provinceId: 1,
            province: this.provincesValue == "全国" ? "" : this.provincesValue,
            version: verson
          }
        });
        this.loading = false;
        if (res == "error") return;
        this.lists = res;
        this.oldlists = cloneDeep(res);
      } else {
        res = await network.getEvaluationWhiteBook({
          data: {
            provinceId: 1,
            province: this.provincesValue == "全国" ? "" : this.provincesValue,
            version: this.statusValue,
            type: this.type == "本科" ? 0 : 1,
            schoolType: this.hot
          }
        });
        this.loading = false;
        if (res == "error") return;
        this.lists = res.slice(0, 99);
        this.oldlists = cloneDeep(res);
        let _this = this;
        setTimeout(_this.search, 2000);
      }
    },

    search() {
      this.lists = cloneDeep(this.oldlists);

      if (this.type == "专业") {
        for (let i in this.lists) {
          for (let j in this.lists[i].rankList) {
            if (this.lists[i].rankList[j].schoolName == this.schoolname) {
              this.lists[i].rankList[
                j
              ].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
            }
          }
        }
      } else {
        for (let i in this.lists) {
          if (this.lists[i].schoolName == this.schoolname) {
            this.lists[
              i
            ].schoolName = `<span class="ref" style="background-color:rgb(241,154,74);">${this.schoolname}</span>`;
          }
        }
      }

      this.$nextTick(() => {
        let lis = document.querySelectorAll(".ref");
        if (!this.schoolname) return;
        if (lis.length <= 0) return this.$message.warning("未找到该学校");
        scrollTo(0, lis[0].offsetTop - 15);
      });
    },
    remoteMethod(q) {
      if (q !== "") {
        this.loading1 = true;
        this.querySchool({ q });
      } else {
        this.schoolList = [];
      }
    },
    async querySchool(param) {
      this.loading1 = false;
      param.limit = 10;
      const data = await network.school({ data: param });
      if (data == "error") return;
      if (!data) {
        this.schoolList = [];
        return;
      }
      this.schoolList = data.map(r => {
        return { value: r.schoolcolName, label: r.schoolcolName };
      });
    },
    choosehot(i) {
      this.hot = i;
      this.init();
    },
    statusValueChange(){
      this.hot = 5
      this.schoolname = "";
      this.init();
    },
    typechange(type) {
      this.type = type
      this.hot = 5
      this.schoolname = "";
      this.init();
    }
  }
};
</script>


<style lang="less" scoped>
.assessment {
  background: #F2F2F2;;
  width: 100%;
  padding-bottom: 50px;
  >div {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    .types{
      display: inline-block;
      vertical-align: top;
      background: #B7B7B7;
      li{
        width: 148px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        color: #ffffff;
        font-size: 23px;
        cursor: pointer;
        display: inline-block;
        vertical-align: left;
        &.on{
          background: #ED1E26;
        }
      }
    }
    .search {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 30px;
      .el-select {
        margin-right: 15px;
      }
      .el-input {
        width: 278px;
      }
    }
    .h{
      margin: 35px 0 21px;
    }
    .main {
      .type{
        height: 50px;
        background: #252223;
        line-height: 50px;
        color: #ffffff;
        font-size: 19px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li{
          padding: 0 16px;
          cursor: pointer;
          &.on{
            background: #ED1E26;
          }
        }
      }
    }


  }
}
</style>