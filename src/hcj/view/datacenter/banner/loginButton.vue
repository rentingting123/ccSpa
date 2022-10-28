<template>
  <div>
    <!-- <el-button >立即报名</el-button> -->
    <img
      src="https://web.moocollege.com/mooc/hzq/vueskin/hcj/signup.png"
      @click="toChoose"
      class="signup"
    />
    <el-dialog title="选择区域" :visible.sync="dialogVisible" width="600px">
      <div class="groupId">
        <p v-for="(list, index) in lists" :key="list.competitionId">
          <el-radio
            v-model="choose"
            :label="list.competitionId"
            border
            @change="
              (e) => {
                getDetails(e, index);
              }
            "
            >{{ list.province }}</el-radio
          >
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="show"
      :append-to-body="true"
      width="600px"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="选择类型">
          <div class="groupId">
            <p v-for="(list, i) in childrens" :key="i">
              <el-radio v-model="children" :label="list" border>{{
                list
              }}</el-radio>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="报名渠道" v-if="opinions.length > 0">
          <el-radio-group v-model="opinion">
            <el-radio
              v-for="item in opinions"
              :label="item.key"
              :key="item.key"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
          <el-input
            v-model="opinionOther"
            style="margin-left: 30px; width: 400px"
            placeholder="请问您是从什么渠道得知华灿奖？"
            type="textarea"
            v-if="opinion == '其他'"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="资料下载" v-if="download">
          <a
            v-if="children === '青年设计师组'"
            style="padding-left: 30px; color: #0000ff"
            :href="download1"
            >竞赛报名表-青年组</a
          >
          <a
            v-if="children === '高校学生组'"
            style="padding-left: 30px; color: #0000ff"
            :href="download2"
            >竞赛报名表-高校组</a
          >

          <!-- <a style="padding-left: 30px;color:#0000ff;" :href="download">竞赛报名表</a> -->
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import network from "@/api";
import datas from "@/hcj/mock/login";
import source from "@/hcj/mock/source";
export default {
  data() {
    return {
      dialogVisible: false,
      show: false,
      choose: "",
      chooseIndex: "",
      lists: datas,

      children: "高校学生组",
      childrens: null,
      opinion: "",
      opinions: [],
      download: "",
      opinionOther: "",
      download1:
        "https://web.moocollege.com/mooc/hzq/vueskin/hcj/%E7%AB%9E%E8%B5%9B%E6%8A%A5%E5%90%8D%E8%A1%A8-%E9%9D%92%E5%B9%B4%E7%BB%84.docx",
      download2:
        "https://web.moocollege.com/mooc/hzq/vueskin/hcj/%E7%AB%9E%E8%B5%9B%E6%8A%A5%E5%90%8D%E8%A1%A8-%E9%AB%98%E6%A0%A1%E7%BB%84.docx",
    };
  },
  created() {},
  methods: {
    async toChoose() {
      // 数据写死
      // let groupId = localStorage.getItem('groupId')
      // let res = await network.npqueryProvince({ data: { groupId: groupId } })
      // this.lists = res || []
      this.dialogVisible = true;
    },
    async getDetails(e, i) {
      let res = await network.npqueryProvinceInfo({
        data: {
          competitionId: e,
        },
      });
      if (res == "error") return;
      if (res && res.childLabels && res.childLabels.length > 0) {
        this.childrens = res.childLabels;
        this.show = true;
      }
      this.chooseIndex = i;
      this.$set(this.lists[i], "childLabels", res && res.childLabels);

      this.download = this.lists[i].download;

      // 获取数据来源数据
      if (this.lists[i].index || this.lists[i].index === 0) {
        this.opinions = source[this.lists[i].index];
      } else {
        this.opinions = [];
      }
    },
    // 直接选择区域跳转
    submit1() {
      if (!this.choose) {
        this.dialogVisible = false;
      } else {
        if (this.lists[this.chooseIndex].childLabels) {
          return this.$message.warning("请选择该赛区中的类型");
        } else {
          this.$router.push("/apply?competitionId=" + this.choose);
          this.dialogVisible = false;
        }
      }
    },
    // 选择类型跳转
    submit2() {
      // 报名渠道选择判断
      let opinion = "";
      if (this.opinions.length > 0) {
        opinion = this.opinionOther || this.opinion;
        if (opinion == "其他") {
          return this.$message.warning("请输入报名渠道");
        } else if (!opinion) {
          return this.$message.warning("请选择报名渠道");
        }
      }

      if (!this.children) {
        return this.$message.warning("请选择类型");
      } else {
        let query = {
          competitionId: this.choose,
          label: this.children,
        };
        if (opinion) query.opinion = opinion;

        this.$router.push({ path: "/apply", query: query });
        this.show = false;
        this.dialogVisible = false;
      }
    },
  },
  watch: {
    show(val) {
      if (!val) {
        this.children = "高校学生组";
        this.opinions = [];
        this.opinion = "";
        this.opinionOther = "";
      }
    },
    dialogVisible(val) {
      if (!val) this.choose = "";
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 10px 0;
  padding-left: 30px;
}
.groupId {
  text-align: left;
}
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
.signup {
  width: 133px;
  height: auto;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
/deep/.el-radio-group {
  padding-left: 30px;
  padding-top: 12px;
}
/deep/.el-radio {
  display: block;
  margin-bottom: 10px;
}
</style>
