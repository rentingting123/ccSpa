<template>
  <div class="home" style="width: 100%">

    <div class="right" style="text-align: left;width: 100%;">
      <div style="text-align:left;">
        <el-form size="small" :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="学生姓名">
            <el-input v-model="formData.name" clearable placeholder="请输入学生姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="clear">重置</el-button>
            <el-button type="primary" @click="down">导出</el-button>
            <!-- <el-button type="primary">+导入数据</el-button> -->
            <!-- <el-button type="primary">同步更新</el-button> -->
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="data" style="width: 100%;">
        <el-table-column prop="name" label="学生姓名">
        </el-table-column>
        <el-table-column prop="college" label="所属学院">
        </el-table-column>
        <el-table-column prop="isWeChat" label="是否关注公主号">
        </el-table-column>
        <el-table-column prop="time" label="采集时间">
        </el-table-column>
      </el-table>
      <el-pagination style="text-align-last:right;margin-top:10px" layout="total, prev, pager, next" v-if="total > 0"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  name: 'weChat',
  data () {
    return {
      activeName: 'first',
      formData: {
        name: ''
      },
      total: 9,
      tableData: [
        {
          "name": "孙永乐（20220102）",
          "college": "教育学院",
          'isWeChat': '否',
          'time': '2022/10/15 18:00:00'
        },
        {
          "name": "李晓明（20220121）",
          "college": "教育学院",
          'isWeChat': '否',
          'time': '2022/10/16 18:00:00'
        },
        {
          "name": "李晓燕（20220126）",
          "college": "经管学院",
          'isWeChat': '否',
          'time': '2022/10/16 18:00:00'
        },
        {
          "name": "叶俊（111111）",
          "college": "经管学院",
          'isWeChat': '否',
          'time': '2022/10/18 18:00:00'
        },
        {
          "name": "马文文（20220133）",
          "college": "音乐学院",
          'isWeChat': '否',
          'time': '2022/10/19 18:00:00'
        },
        {
          "name": "任婷（20220111）",
          "college": "音乐学院",
          'isWeChat': '否',
          'time': '2022/10/20 18:00:00'
        },
        {
          "name": "喻言（20220126）",
          "college": "体育学院",
          'isWeChat': '否',
          'time': '2022/10/21 18:00:00'
        },
        {
          "name": "李佳乐（20220177）",
          "college": "美术学院",
          'isWeChat': '否',
          'time': '2022/10/22 18:00:00'
        },
        {
          "name": "宁静（20220190）",
          "college": "体育学院",
          'isWeChat': '否',
          'time': '2022/10/23 18:00:00'
        }

      ],
      data: [{
        "name": "孙永乐（20220102）",
        "college": "教育学院",
        'isWeChat': '否',
        'time': '2022/10/15 18:00:00'
      },
      {
        "name": "李晓明（20220121）",
        "college": "教育学院",
        'isWeChat': '否',
        'time': '2022/10/16 18:00:00'
      },
      {
        "name": "李晓燕（20220126）",
        "college": "经管学院",
        'isWeChat': '否',
        'time': '2022/10/16 18:00:00'
      },
      {
        "name": "叶俊（111111）",
        "college": "经管学院",
        'isWeChat': '否',
        'time': '2022/10/18 18:00:00'
      },
      {
        "name": "马文文（20220133）",
        "college": "音乐学院",
        'isWeChat': '否',
        'time': '2022/10/19 18:00:00'
      },
      {
        "name": "任婷（20220111）",
        "college": "音乐学院",
        'isWeChat': '否',
        'time': '2022/10/20 18:00:00'
      },
      {
        "name": "喻言（20220126）",
        "college": "体育学院",
        'isWeChat': '否',
        'time': '2022/10/21 18:00:00'
      },
      {
        "name": "李佳乐（20220177）",
        "college": "美术学院",
        'isWeChat': '否',
        'time': '2022/10/22 18:00:00'
      },
      {
        "name": "宁静（20220190）",
        "college": "体育学院",
        'isWeChat': '否',
        'time': '2022/10/23 18:00:00'
      }]
    }
  },
  mounted () {

  },
  methods: {
    handleClick () {

    },
    clear () {
      this.formData.name = ''
    },
    getList () {
      console.log(this.formData, 'this.formData.name')
      if (this.formData.name != '') {
        this.data = []
        this.data = this.tableData.filter(item => {
          return item.name.indexOf(this.formData.name) > -1
        })
      } else {
        this.data = this.tableData
      }

    },
    down () {
      window.location.href = 'https://vtrs.oss-cn-hangzhou.aliyuncs.com/client/微信公众号未关注名单.xlsx'
    }
  }
}
</script>
<style scoped>
.home {
  text-align-last: left;
  background-color: #fff;
  height: 100%;
}
</style>