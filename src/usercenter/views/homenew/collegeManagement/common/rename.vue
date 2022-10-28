<template>
    <div>
       <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="550">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>重命名</span>
         </p>
         <div style="text-align:center;margin-top:30px;">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="left" style="text-align:center;">
                <FormItem label="学院名称" prop="name">
                     <Input v-model="formValidate.name"  placeholder="请填写学院名称"></Input>
                </FormItem>

                <FormItem class="footer">
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="error" @click="show=false" style="margin-left: 8px">取消</Button>
                </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show:true,
            formValidate:{},
            ruleValidate:{
                name: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    props:["importEditData","close"],
    methods:{
        handleSubmit (name) {
           this.$refs[name].validate((valid) => {
               if(!valid) return;
               let data = {
                   id: this.importEditData,
                   name: this.formValidate.name
               }
               this.$api.get('/usercenter/school/updateCollegeName',data).then(res=>{
                   if(res.code==0){
                       this.$Message.success('修改成功');
                       return this.close && this.close();
                   }else{
                       this.$Message.error('修改失败，请重试');
                   }
               }).catch(error=>{
                   this.$Message.error(error);
               })
           })
        },
    },
    watch:{
        show(val){
            if(!val) return this.close && this.close()
        }
    }
}
</script>

<style>
.footer{
    transform: translateX(-32px);
    margin-top: 30px; 
}
</style>
