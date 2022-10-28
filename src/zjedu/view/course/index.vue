<template>
  <div class="course">
    <div class="navs ">
      <p>专业类别</p>
      <ul>
        <li
          v-for="item in types"
          :key="item.id"
          :class="{ on: item.id == type }"
          @click="()=>{type = item.id;getData()}"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="navs">
      <p>课程状态</p>
      <ul>
        <li
          v-for="item in types2"
          :key="item.status"
          :class="{ on: item.status == course_status }"
          @click="()=>{course_status = item.status;getData()}"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="navs">
      <p>课程热度</p>
      <ul>
        <li
          v-for="item in types3"
          :key="item.status"
          :class="{ on: item.status == hot }"
          @click="()=>{hot=item.status;getData()}"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="coursemain">
      <div v-for="item in datas" :key="item.id">
        <course :item="item" />
      </div>
    </div>
    <div style="margin-bottom:30px">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page.sync="page"
        @current-change="getData"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import course from "@/zjedu/components/courselist";
import network from "@/api";
export default {
  components: {
    course
  },
  data() {
    return {
     types:[],
      type: 0,
      types3:[
              {
          name: "全部",
          status: "all"
        },

        {
          name: "热门",
          status: 'hot'
        },
        {
          name: "最新",
          status: 'latest'
        },
      ],
      hot:'all',
      types2: [
        {
          name: "全部",
          status: "all"
        },

        {
          name: "进行中",
          status: 'ongoing'
        },
        {
          name: "即将开课",
          status: 'notStarted'
        },
        {
          name: "已结束",
          status: 'closed'
        }
      ],
      course_status:'all',
      datas: [],
      total: 0,
      page: 1,
      size: 8,
      keyword: '',
    };
  },
  created() {
    this.keyword = this.$route.query.keyword || ''
    this.getCourseType();
    this.getData();
  },
  methods: {
    async getCourseType(){
        let res = await network.getCourseType()
        if (res == "error") return;
        this.types = res
    },
    async getData() {
      let res = await network.getZjeduCourse({
        data: {
          page: this.page,
          size: this.size,
          course_status:this.course_status,
          classification_ids:this.type,
          course_type:this.hot,
          keyword: this.keyword
        }
      });
      if (res == "error") return;
      this.datas = (res && res.data) || [];
      this.total = (res && res.total) || 0;
    }
  },
  watch:{
    $route(to){
      this.keyword = to.query.keyword || ''
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.course {
  width: 1200px;
  margin: 0 auto;
  padding-top: 38px;
  .navs {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
    p {
      width: 88px;
      height: 35px;
      font-size: 16px;
      font-weight: 400;
      color: #9b9b9b;
      line-height: 35px;
    }
    ul {
      width: 1112px;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      li {
        height: 35px;
        line-height: 35px;
        border-radius: 35px;
        font-size: 16px;
        font-weight: 400;
        color: #4a4a4a;
        text-align: center;
        padding: 0 14px;
        margin-right: 12px;
        margin-bottom: 10px;
        cursor: pointer;
        &.on {
          background: #1dbd76;
          color: #ffffff;
        }
      }
    }
  }
  .coursemain {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    padding-top: 60px;
    > div {
      width: 280px;
      height: auto;
      margin-right: 26px;
      margin-bottom: 30px;
      display: inline-block;
      vertical-align: top;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
