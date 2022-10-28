<template>
  <div class="serviceList">
    <h1>下载管理</h1>

    <div class="search" style="text-align: left; margin: 20px 0">
      <div style="display: inline-block; float: right; margin: 10px 0">
          <el-upload class="upload-demo"
          :before-upload="uploadFile"
           action="/">
        <el-button type="primary" >新增</el-button>
          </el-upload>
      </div>
    </div>

    <el-table border :data="tableData">
      <el-table-column prop="title" label="文件名"> </el-table-column>

      <el-table-column prop="url" label="文件地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="error" @click="del(row, $index)">删除</el-button>
          <el-button :disabled="$index==0" @click="up(row, $index)">上升</el-button>
          <el-button :disabled="$index==tableData.length-1" @click="down(row, $index)">下降</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import upload from "@@/components/fileUpload/spaceNotice.vue";
import network from "@/operate/api";
export default {
  data() {
    return {
      tableData: [],
      type: "",
      show: false,
      showtitle: "新增",
      //obj默认字段不能删
      obj: {
          title2:'下载文件',
          type:'99',
          app:'operate',
          info:'99',
          img:'99',
      },
    };
  },
  created() {
    this.search();
  },
  methods: {
    up(row, index){
          let arr = [this.tableData[index-1], row]
          this.getSort(arr)
      },
      down(row, index){
          let arr = [row, this.tableData[index+1]]
          this.getSort(arr)
      },
      async getSort(arr){
          let res = await network.sortService({data:{
              app: 'operate',
              data: arr
          }})
          if(res=='error') return;
          this.search();
      },
    add() {
      this.showtitle = "新增";
      this.obj = {};
      this.show = true;
    },
    async search() {
      let res = await network.getServiceList({
        data: {
          type: 99,
          app: "operate",
        },
      });
      if (res == "error") return;
      this.tableData = (res && res.list) || [];
    },
    async del(row, index) {
      this.tableData.splice(index, 1);
      let res = await network.delService({
        data: {
          id: row.id + "",
          app: "operate",
        },
      });
      if (res == "error") return;
      this.$message.warning("删除成功");
      this.search();
    },

  uploadFile(file){
      upload.upload({file:file}).then(async ret=>{
          this.obj.url=ret.location
          this.obj.title = file.name
          this.obj.img = ret.location
          await network.addService({ data: {
              ...this.obj,
          } })
        this.search();
      })
    return false
  }
  },

};
</script>

