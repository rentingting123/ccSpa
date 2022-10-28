<template>
    <div class="sendEmail">
        <el-form ref="form" class="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="收件人" prop="emails">
                <el-input v-model="form.emails" placeholder="多个收件人时，英文逗号（,）隔开"></el-input>
            </el-form-item>
            <el-form-item label="邮件标题" prop="subject">
                <el-input v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item label="邮件内容" prop="content">
                <el-input v-model="form.content" ></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :loading='loading'>发送</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import network from '@/operate/api'
export default {
    data(){
        return{
            rules:{
                subject: [
                    { required: true, message: '请填写邮件标题', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写邮件内容', trigger: 'change' }
                ],
                emails: [
                    { required: true, message: '请上传收件人', trigger: 'change' }
                ],
            },
            form:{
                subject: '',
                content: '',
                emails: '',
            },
            loading: false
        }
    },
    methods:{
        onSubmit(name){
            this.$refs[name].validate(async (valid) => {
                if(!valid) return;
                this.loading = true
                let res =  await network.sendEmails({data:this.form})
                this.loading = false
                if(res=='error') return;
                this.$message.success('发送成功！')
            })
        }
    }
}
</script>

<style lang='less' scoped>
.sendEmail{
    text-align: left;
    .form{
        width: 600px;
        margin-top: 20px;
    }
}
</style>