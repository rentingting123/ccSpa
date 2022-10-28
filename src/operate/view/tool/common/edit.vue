<template>
  <div>
    <Modal v-model="show" title="皮肤编辑" footer-hide>
      <Form ref="formItem" class="form" :model="formItem" :rules="rules" :label-width="100">
        <FormItem label="id" prop="competitionId">{{formItem.competitionId}}</FormItem>
        <FormItem label="皮肤名称" prop="name">
          <Input v-model="formItem.name" />
        </FormItem>
        <FormItem label="定制服务" prop="skin">
          <Select v-model="formItem.theme" @on-change="themeChange" style="width:200px">
            <Option v-for="item in serviceList" :value="item.theme" :key="item.theme">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="皮肤地址" prop="url">
          <Input v-model="formItem.url" />
        </FormItem>
        <FormItem label="adminToken" prop="adminToken" v-if="type==1">
          <Input v-model="formItem.adminToken" />
        </FormItem>
        <FormItem>
          <Button @click="ok('formItem')" type="primary" :loading="loading">修改</Button>
          <Button @click="show=false" :loading="loading" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import network from "@/operate/api/index";
export default {
  props: ["formItem", "close", 'type'],
  data() {
    let this_ = this
    return {
      show: true,
      loading: false,
      serviceList: [],
      rules: {
        name: [
          { required: true, message: "皮肤名称不能为空", trigger: "blur" }
        ],
        adminToken: [
          { required: this_.type==1?true:false, message: "adminToken不能为空", trigger: "blur" }
        ],
        theme: [
          { required: true, message: "定制服务不能为空", trigger: "blur" }
        ],
        url: [{ required: true, message: "皮肤地址不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getSkinList(this.type); 
  },
  methods: {
    themeChange(e) {
      this.serviceList.map(item => {
        if (item.theme == e) {
          this.formItem.skin = item.urlkey;
        }
      });
    },
    async getSkinList(type) {
      // 4 校皮肤 3 国省系列赛 2 省皮肤   1 一体皮肤和老版本皮肤
      let res = await network.getSkinList({data:{level:type}});
      if (res == "error") return;
      this.serviceList = res;
    },
    ok(name) {
      if (!this.formItem.competitionId) return this.$Message.warning("竞赛id不能为空");
      this.$refs[name].validate(async valid => {
        if (!valid) return;

        this.loading = true;
        let res = await network.operateEdit({ data: {
          ...this.formItem
        }});
        if (res == "error") return this.loading = false;
        this.$Message.success("修改成功");
        this.loading = false;
        this.show = false;
      });
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return this.close && this.close();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 80%;
  margin: 20px auto;
}
</style>


