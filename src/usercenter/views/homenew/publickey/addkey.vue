<template>
  <div>
    <Button type="primary" @click="show=true" style="margin-right:6px;">添加公钥</Button>
    <Modal v-model="show" :mask-closable="false" width="550">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>添加公钥</span>
      </p>
      <div style="text-align:center;margin-top:30px;">
        <Form ref="formValidate" :model="formValidate" :label-width="120" style="text-align:center;" >
          <FormItem label="请选择绑定组织" prop="groupId">
            <Select v-model="groupId" filterable remote :remote-method="remoteMethod1" :loading="loading1">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </FormItem>
          

          <FormItem class="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <Button type="error" @click="show=false" style="margin-left: 8px">取消</Button>
          </FormItem>
          <!-- :target-keys="targetKeys" -->
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  props:['close'],
  data() {
    return {
      show: false,
      formValidate: {},
      groupId: '',
      loading1: false,
      options1: [],
    };
  },
  methods: {
    remoteMethod1 (query) {
      let _this = this
      let data={
          pageNum: 1,
          pageSize: 10,
          groupName: query
      }
      this.$api.get('/usercenter/group/query',data).then(reset => {
          if (reset.code == 0) {
            let res = reset.data.list || []
              _this.options1 = res.map((item)=>{
                return{
                  value: item.id,
                  label: item.groupName,
                  ...item
                }
              });
          }else {
              _this.$netcode.getApiCode(reset)
          }
      })
    },
    handleSubmit(name) {
        if(!this.groupId) return this.$Message.warning('请选择组织');
        let data = {
          groupId: this.groupId
        };
        this.$api.get("/usercenter/key/addKey", data)
          .then(res => {
            if (res.code == 0) {
              this.$Message.success("添加成功");
              this.show = false;
            } else {
              this.$netcode.getApiCode(res);
            }
          })
          .catch(error => {
            this.$Message.error(error);
          });
    },
    
  },
  watch:{
    show(val){
      if(!val) return this.close && this.close();
    }
  }
};
</script>

<style>
.footer {
  transform: translateX(-32px);
  margin-top: 30px;
}
</style>
