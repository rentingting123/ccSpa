<template>
    <div>
       <Modal v-model="show" :mask-closable="false" width="550">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>添加账户</span>
         </p>
         <div style="text-align:center;margin-top:30px;">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="left" style="text-align:center;">
                <FormItem label="姓名" prop="idcardName">
                     <Input  v-model="formValidate.idcardName"  placeholder="请填写姓名"></Input>
                </FormItem>
                <FormItem label="登录名" prop="loginName">
                     <Input  v-model="formValidate.loginName"  placeholder="请填写登录名"></Input>
                </FormItem>
                <FormItem label="手机号" prop="loginPhonenumber">
                     <Input  v-model="formValidate.loginPhonenumber"  placeholder="请填写手机号"></Input>
                </FormItem>
                <FormItem label="初始密码" prop="password">
                     <Input  v-model="formValidate.password"  placeholder="请填写初始密码"></Input>
                </FormItem>

                <FormItem class="footer">
                    <Button type="primary" :loading='loading' @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="error" :loading='loading' @click="show=false" style="margin-left: 8px">取消</Button>
                </FormItem>
                <!-- :target-keys="targetKeys" -->
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
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else if (value !== this.formValidate.password) {
                callback(new Error('密码不同，请核查'));
            } else {
                callback();
            }
        };
        return{
            show:true,
            formValidate:{},
            ruleValidate:{
                idcardName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                loginName: [
                        { required: true, message: '登录名不能为空', trigger: 'blur' }
                ],
                loginPhonenumber: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                ],
                password: [
                        { required: true, message: '初始密码不能为空', trigger: 'blur' }
                ]
            },
            loading: false,
        }
    },
    props:["close"],
    methods:{
        handleSubmit (name) {
           this.$refs[name].validate((valid) => {
               if(!valid) return;
               let data = {
                   ...this.formValidate,
                   groupId: this.$webapi.getlocal("groupId"),
                   targetType: this.$webapi.getselfType()
               }
               this.loading = true
               this.$api.post('/usercenter/user/insertUser',data).then(res=>{
                   this.loading = false
                   if(res.code==0){
                       this.$Message.success('添加成功');
                       this.show = false
                   }else{
                       this.$netcode.getApiCode(res)
                   }
               }).catch(error=>{
                   this.loading = false
                   this.$Message.error(error);
               })
           })
        }
    },
    watch:{
        show(val){
            if(!val) return this.close && this.close();
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
