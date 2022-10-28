<template>
    <div>
       <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="550">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改账户密码</span>
         </p>
         <div style="text-align:center;margin-top:30px;">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="left" style="text-align:center;">
                <FormItem label="新密码" prop="password">
                     <Input type="password" v-model="formValidate.password"  placeholder="请填写新密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="newpassword">
                     <Input type="password" v-model="formValidate.newpassword"  placeholder="请再次填写密码"></Input>
                </FormItem>

                <FormItem class="footer">
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="error" @click="cancel()" style="margin-left: 8px">取消</Button>
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
                password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                newpassword:[
                     { required: true,validator: validatePassCheck, trigger: 'blur' },
                ]
            }
        }
    },
    props:["importEditData","close"],
    methods:{
        handleSubmit (name) {
            let this_ = this
           this.$refs[name].validate((valid) => {
               if(!valid) return;
                this.$Modal.confirm({
                    title: "确认要重置密码吗？",
                    content: "重置后原来修改的密码则无法登陆",
                    onOk:function(){
                        this_.post()
                    },
                    onCancel: () => {
                    }        
                })
           })
        },
        post(){
            let data = {
                idList:[this.importEditData],
                password:this.formValidate.password
            }
            this.$api.post('/web/specialist/batch/reset',data).then(res=>{
                if(res.code==0){
                    this.$Message.success('重置密码成功');
                    return this.close && this.close();
                }else{
                    this.$Message.error('重置密码失败，请重试');
                }
            }).catch(error=>{
                this.$Message.error(error);
            })
        },
        cancel(){
            return this.close && this.close();
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
