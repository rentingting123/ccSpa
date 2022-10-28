<template>
  <div>
    <slot />

    <el-dialog class="persubmit" :visible="open" width="800px">
      <h1 class="">各校巡视员信息登记</h1>
      <el-form class="form" ref="form" :model="form" label-width="120px">
        <el-form-item
          label="学校名称"
          prop="schoolName"
          :rules="{
            required: true,
            message: '学校名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.schoolName" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="巡视员姓名"
          prop="inspector"
          :rules="{
            required: true,
            message: '巡视员姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.inspector"></el-input>
        </el-form-item>
        <el-form-item
          label="巡视员电话"
          prop="mobile"
          :rules="{
            required: true,
            message: '巡视员电话不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" :loading="loadingPre" @click="outLogin()" >退出登录</el-button> -->
        <!-- <el-button type="primary" :loading="loadingPre" @click="download('form')" >前往下载</el-button> -->
        <el-button type="primary" :loading="loadingPre" @click.stop="close"
          >取 消</el-button
        >
        <el-button type="primary" :loading="loadingPre" @click="submit('form')">
          确 认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import network from "@/api/index";
import { cloneDeep } from "lodash";
export default {
  props: ["user", "form1","close","open"],
  data() {
    return {
      loadingPre: false,
      form: this.form1 || {},
    //   open: false,
    };
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(async (valid) => {
        if (!valid) return;
        this.loadingPre = true;
        const {inspector, mobile, schoolName} =this.form
        let res = await network.setSchoolApply({
          data: {
            //competitionId:this.competitionId,
            type: 10,
            userId: this.user.id,
            html: { inspector, mobile, schoolName},
          },
        });
        this.loadingPre = false;
        if (res == "error") return;
        this.$message.success("巡视员登记成功！");
        this.close();
      });
    },
    // close() {
    //   this.open = false;
    // },
    // openDialog() {
    //   this.open = true;
    // },
  },
  watch: {
    form1(val) {
      console.log(val);
      this.form = cloneDeep(val);
    },
  },
};
</script>

<style lang="less">
.persubmit {
  h1 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
  }
  .form {
    width: 80%;
    margin: 0 auto;
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
