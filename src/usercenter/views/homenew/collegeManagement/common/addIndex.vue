<template>
    <div class="">
        <Modal v-model="ashow" width="420"  :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>创建学院</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                    <FormItem label="学院名称:" prop="groupName">
                        <Input v-model="formValidate.groupName" placeholder="学院名称"></Input>
                    </FormItem>
                    <FormItem label="管理员手机:" prop="loginPhonenumber">
                        <Input v-model="formValidate.loginPhonenumber" placeholder="管理员手机"></Input>
                    </FormItem>
                    <FormItem label="初始密码:" prop="password">
                        <Input v-model="formValidate.password" placeholder="初始密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
                       <Button type="error" @click="ashow=false" size="large">取消</Button>
                   </FormItem>
                </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props:['close'],
        data () {
            return {
                focusBool:'',
                ashow:true,
                formValidate: {
                    groupName:'',
                    loginPhonenumber:'',
                    password:''
                },
                isAccount:false,
                ruleValidate: {
                    groupName: [
                        { required: true, message: '学院名称不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '初始密码不能为空' , trigger: 'blur'}
                    ],

                },
            }
        },
        created(){
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
            },
            post () {
                var data = {
                    createType: 1, //1:组织(学校,写死)  2:主办方(admin用的) //3:竞赛组织 
                    downType: 1,//上下级 0上级 1下级
                    type: 1,
                    groupId: this.$webapi.getlocal('groupId'),
                    groupName: this.formValidate.groupName,//组织名
                    password: this.formValidate.password,//密码
                }
                if (this.formValidate.loginPhonenumber) {
                    data.loginPhonenumber=this.formValidate.loginPhonenumber
                }

                this.$api.post('/usercenter/group/addgroup',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success('添加成功');
                        this.ashow=false
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        },
        watch:{
            ashow(val){
                if(!val) return this.close && this.close();
            }
        }
    }
</script>
