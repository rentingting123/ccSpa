<template>
    <div>
        <el-dialog
            :close-on-click-modal='false'
            :modal-append-to-body="false" 
            title="确认要结束竞赛吗？" 
            :show-close="false" 
            :visible.sync="finishShow" width="480px">
            <div>
                <p class="red">结束竞赛后，将不能进行任何操作（不影响动态发布）</p>

                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item prop="mobile" >
                        <el-input placeholder="请输入电话号码" maxlength="11" v-model.trim="form.mobile" ></el-input>
                    </el-form-item>
                    <el-form-item prop="smsCode">
                        <el-input style="width: 200px" placeholder="请输入验证码" v-model.trim="form.smsCode"></el-input>
                        <el-button class="get_auth_code" type="primary" v-if="seconds == 0 ? true : false"
                            :disabled="!form.mobile" @click="getAuthCode" >获取验证码
                        </el-button>
                        <span class="wait_auth_code" v-else>重新获取({{ seconds }})</span>
                    </el-form-item>
                    <el-form-item class="center">
                        <el-button @click="finishShow=false">取消</el-button>
                        <el-button type="danger" :loading="submitLoading" @click="tologin('form')" :disabled="!form.smsCode || !form.mobile">结束</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { checkPhone, randomChar } from "@@/utils/util";


export default {
    props: ['close','id'],
    data(){
        return{
            finishShow: true,
            form: {
                smsCode: '',
                mobile: '',
            },
            rules:{
                mobile: [
                    { required: true, message: '电话不能为空', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'blur' },
                ],
                smsCode: [
                    { required: true, message: '请输入验证码' },
                    { min: 6, max: 6, message: '验证码错误', trigger: 'blur' },
                ]
            },
            seconds: 0,
            submitLoading: false,
            uuid: '',

        }
    },
    created(){
        this.uuid = randomChar()
    },
    methods:{
        tologin(name){
            this.$refs[name].validate((valid) => {
                if(!valid) return;
                this.pubSubmit()
            })
        },
        pubSubmit(){
            var deviceId=this.uuid+this.form.mobile

            let data={
                competitionId:this.id,
                ...this.form
            }
            this.submitLoading = true
            this.$api.smsGet('/usercenter/validationCode',data,deviceId).then(reset => {
                if (reset.code == 0) {
                    this.$api.get('/review/award/publish',data).then(reset => {
                        this.submitLoading = false
                        if (reset.code == 0) {
                            this.$Message.success("发布成功!")
                            this.finishShow=false;
                        }
                    })
                }else{
                    this.submitLoading = false
                }
            })
        },
        async getAuthCode(){
            let mobile = this.form.mobile;
            if(!checkPhone(mobile)){
                return this.$message.warning('请输入正确的手机号')
            }
            var data={
                mobile: mobile,
                domain: location.hostname
            }
            
            var deviceId=this.uuid+mobile
            this.$api.smsGet("/usercenter/code/sms",data,deviceId).then((res)=>{
                if(res.code==0){
                    let _this = this;
                    this.seconds = 59;
                    let secTimer = setInterval(function () {
                        _this.seconds--;
                        if (_this.seconds == 0) {
                            clearInterval(secTimer);
                        }
                    }, 1000);
                }
            })

            
        },
    },
    watch:{
        finishShow(val){
            if(!val){
                this.close && this.close();
            }
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    font-size: 14px;
    font-weight: 400;
    color: #CB5268;
    line-height: 22px;
    margin-bottom: 15px;
}
.center{
    text-align: right;
}
</style>