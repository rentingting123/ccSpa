<template>
  <Select
    class="org-select"
    filterable
    :value="value"
    clearable
    remote
    :remote-method="remoteMethod"
    @on-change="change"
    :loading="loading"
    placeholder="请选择学校"
  >
    <Option
      v-for="item,index in schoolList"
      :key="item.value + index"
      :label="item.label"
      :value="item.value"
    ></Option>
  </Select>
</template>

<script>
import network from "@@/api/jxapi/index";
export default {
  props: {
    onChange: Function,
    value: String,
  },
  model: {
    prop: "value",
    event: "changed",
  },
  data() {
    return {
      schoolList: [],
      loading: false,
    };
  },
  methods: {
    change(v) {
      this.$emit("changed", v);
      console.log(1111);
      this.onChange && this.onChange(v)
      console.log(2222);
    },
    remoteMethod(q) {
      if (q !== "") {
        this.loading = true;
        this.querySchool({ q });
      } else {
        this.schoolList = [];
      }
    },
    async querySchool(param) {
      this.loading = false;
      param.limit = 10;

      const data = await network.schools({ data: param });
      if (data == "error") return;
      if (!data) {
        this.schoolList = [];
        return;
      }
      this.schoolList = data.map((r) => {
        return {
          value: r.schoolcolName,
          label: r.schoolcolName,
        };
      });
    },
  }
};
</script>

<style lang="less" scoped>
.org-select {
  display: inline-block;
  width: 100%;
}
</style>