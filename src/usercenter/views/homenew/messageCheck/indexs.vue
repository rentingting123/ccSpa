<template>
  <div class="roles-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>组织审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-main>
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" size="medium">
          <el-select style="width: 100px;" v-model="select" slot="prepend" :placeholder="'请选择'">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" style="color: #409EFF;">搜索</el-button>
        </el-input>

        <div class="table-wrapper">
          <el-table :data="tableData" style="width: 100%" :header-row-style="{'background': '#EEF0F2'}">
            <el-table-column prop="name" label="请求组织名称" width="180"></el-table-column>
            <el-table-column prop="name" label="组织类型" width="180"></el-table-column>
            <el-table-column prop="name" label="请求时间" width="180"></el-table-column>
            <el-table-column prop="address" label="消息类型"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div>
                  <el-button @click="dialogFormVisible = true" :data="scope" type="text" size="small">同意</el-button>
                </div>
                <div>
                  <el-button @click="dialogFormVisible = true" :data="scope" type="text" size="small" style="color: #909399;">拒绝</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <el-pagination background layout="total, prev, pager, next, sizes" :total="1000"></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "RolesManage",
  components: {},
  data() {
    return {
      select: "请选择",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      input5: "",
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true
    };
  }
};
</script>

<style lang='less' scoped>
.roles-wrapper {
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }

  .el-container {
    background: #fff;

    .el-main {
      background: #fff;

      .input-with-select {
        width: 400px;
      }

      .table-wrapper {
        width: 100%;
        margin-top: 20px;
      }
    }

    .el-footer {
      text-align: right;
    }
  }

  .dialog1 {
    .access_form_item {
      .access_change {
        display: inline-block;
        vertical-align: middle;
      }

      .access_item {
        display: inline-block;
        vertical-align: middle;
        width: 200px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        padding: 10px;

        .access_title {
          overflow: hidden;

          .tips {
            float: right;
          }
        }

        .show_checkbox {
          height: 100px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background-color: #f5f5f5;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background-color: #dbdbdb;
          }

          .el-checkbox {
            width: 100%;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
